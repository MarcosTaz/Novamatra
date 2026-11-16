import pg from 'pg';
const {Pool}=pg;
export const pool = new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true},max:4,connectionTimeoutMillis:10000,idleTimeoutMillis:30000});
export const query = (sql,params=[])=>pool.query(sql,params);
export async function initialize(){
  await query(`CREATE TABLE IF NOT EXISTS nm_owner (
    id integer PRIMARY KEY DEFAULT 1 CHECK(id=1), email text NOT NULL,
    project_salt text NOT NULL, project_hash text NOT NULL,
    admin_salt text NOT NULL, admin_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(), changed_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_sessions (
    id_digest text PRIMARY KEY, stage smallint NOT NULL CHECK(stage IN (1,2)),
    csrf text NOT NULL, expires_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE,
    title text NOT NULL, summary text NOT NULL DEFAULT '', details text NOT NULL DEFAULT '',
    status text NOT NULL DEFAULT 'Em estudo', track text NOT NULL DEFAULT 'Investigação',
    priority text NOT NULL DEFAULT 'Normal', created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES nm_projects(id) ON DELETE RESTRICT,
    kind text NOT NULL CHECK(kind IN ('ideia','tarefa','marco','nota')),
    title text NOT NULL, body text NOT NULL DEFAULT '', state text NOT NULL DEFAULT 'Aberto',
    created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES nm_projects(id) ON DELETE RESTRICT,
    title text NOT NULL,url text NOT NULL,kind text NOT NULL DEFAULT 'Referência',created_at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE TABLE IF NOT EXISTS nm_audit (
    id bigserial PRIMARY KEY, operation text NOT NULL, entity text NOT NULL,
    entity_id text, at timestamptz NOT NULL DEFAULT now())`);
  await query(`CREATE INDEX IF NOT EXISTS nm_items_project ON nm_items(project_id)`);
  await query(`CREATE INDEX IF NOT EXISTS nm_documents_project ON nm_documents(project_id)`);
  await query(`CREATE INDEX IF NOT EXISTS nm_sessions_expire ON nm_sessions(expires_at)`);
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority) VALUES
   ('sterion-core','STERION CORE','Câmara de tratamento fechada de calçado.','Geometria experimental V0.9 e auditoria REV10; processo antimicrobiano ainda por demonstrar.','Engenharia / testes pendentes','Descontaminação','Alta'),
   ('sterion-insert','STERION INSERT','Dois insertos compactos e base externa comum.','REV11 P1-M0: STEP/STL experimentais e 18 fixações modeladas; tratamento não validado.','Engenharia / testes pendentes','Descontaminação','Alta'),
   ('scan2cnc','SCAN2CNC','Digitalização espacial e fabrico modular.','Sistema próprio do grupo NOVAMATRA; grua/gantry modular de estrutura imprimível em 3D.','Desenvolvimento','Fabricação','Alta'),
   ('arcvault-step','ARCVAULT STEP','Estudo de recuperação de energia associada à marcha.','Objetivos de potência ainda não demonstrados fisicamente.','Investigação','Energia','Normal'),
   ('novamatra-c4','NOVAMATRA C4','Investigação de suspensão automóvel ativa com quatro apoios coordenados.','Conceito em investigação: estabilização inercial da carroçaria, comparação controlada com sistemas de referência e avaliação de aderência, limites físicos e energia. Modelo computacional inicial disponível; não existem protótipo físico, ensaios em estrada, homologação ou vantagem industrial demonstrada. Analisar anterioridade e propriedade intelectual antes de qualquer divulgação técnica diferenciadora.','Investigação','Mobilidade automóvel','Alta')
   ON CONFLICT(slug) DO NOTHING`);
  // DECREIA: projeto de investigação autónomo; a inicialização é idempotente.
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority)
    VALUES ('decreia','DECREIA / OMNI-25','Investigação científica computacional: motores independentes, contratos I/O auditáveis e governação rigorosa da evidência.','Projeto autónomo da NOVAMATRA. 25 componentes oficiais: 24 posições de motores científicos e 1 coordenador (CENTRO_CONTROLO_SAUDE_GLOBAL). Estado forense G3.9: 3 componentes com funções técnicas executadas em casos sintéticos (MAC, MPCVG, NCLE); 6 com código algorítmico identificado e integração pendente (ONE_HEALTH, GAIA_ECOPATHOLOGY, SYNAPSE, NEXUS, OMNI_EXODUS, ECOLOGIA); 5 com fonte ou identidade pendente de reconciliação (ATLAS_HUMANO, AETHER_NEXUS, GENOMICA, EPIDEMIOLOGIA, FONTES_GLOBAIS); 10 sem implementação autónoma demonstrada nas fontes examinadas. Próximo marco G4.0: autenticação e auditoria de DNA_ATLAS como candidato de GENOMICA, sem presumir equivalência. Nenhum resultado demonstra uso clínico, descoberta médica ou 25 execuções científicas. Motores autónomos, contratos I/O isolados, código original intocado, hashes SHA-256, rastreabilidade; sem fusão e sem aprovação fictícia.','Investigação','Saúde computacional e evidência científica','Alta') ON CONFLICT(slug) DO NOTHING`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','Evidência técnica confirmada (âmbito limitado)','MAC, MPCVG e NCLE: funções originais executadas sobre entradas sintéticas em G3.5. Isto não é validação clínica, científica geral nem execução conjunta dos 25 motores.','Concluído' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='Evidência técnica confirmada (âmbito limitado)')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','Seis ligações algorítmicas em verificação','ONE_HEALTH, GAIA_ECOPATHOLOGY, SYNAPSE, NEXUS, OMNI_EXODUS e ECOLOGIA têm código identificado; os adaptadores foram preparados, mas os testes de execução conjunta permanecem pendentes.','Em validação' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='Seis ligações algorítmicas em verificação')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','Reconciliação de identidade e fontes','ATLAS_HUMANO, AETHER_NEXUS, GENOMICA, EPIDEMIOLOGIA e FONTES_GLOBAIS: confirmar correspondência, autoria técnica, dependências e autonomia. Não atribuir código apenas por correspondência textual.','Aberto' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='Reconciliação de identidade e fontes')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','Recuperar dez núcleos científicos em falta','EPIGENOMICA, VETERINARIA, TOXICOLOGIA, IMUNOLOGIA, MICROBIOLOGIA, NEUROCIENCIAS, CLIMA, OCEANOGRAFIA, FARMACOLOGIA e BIOESTATISTICA: ainda sem implementação independente demonstrada nas fontes recuperadas.','Aberto' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='Recuperar dez núcleos científicos em falta')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','Centro de Controlo de Saúde Global','Coordenador dos 25 componentes: registo, qualidade, proveniência, contratos I/O e auditoria. Nunca contabilizar como um novo motor científico.','Concluído' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='Centro de Controlo de Saúde Global')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G4.0 — GENOMICA / DNA_ATLAS','Auditar engine.py, patterns.py, triage.py, replay.py e external.py por SHA-256, dependências e identidade. Ativar ligação OMNI-25 apenas após prova de código independente, contrato I/O, execução real e resultados auditáveis.','Aberto' FROM nm_projects p
    WHERE p.slug='decreia' AND NOT EXISTS
      (SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G4.0 — GENOMICA / DNA_ATLAS')`);

  // PROJECT PROOF R16: registo interno idempotente; os ficheiros ZIP/GLB ficam fora do repositório público.
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority)
    VALUES ('project-proof','PROJECT PROOF','Laboratório local de simulação industrial: catálogo de 15 máquinas 3D, 15 células, HMIs virtuais e ferramentas de inspeção de peças.','R16: Engineering Lab, Factory Builder, R14 Control Lab, R15 PART STUDIO e LIVE SECTION LAB. Biblioteca de 49 GLB e 147 animações declaradas nos 15 modelos principais. Versões integras e corrigida PowerShell 5.1 preservadas em NOVAMATRA_PRIVADO/PROJECT_PROOF, com SHA-256. O arranque em Windows, a integração CAD peça-máquina, as HMIs OEM, os modelos físicos e a segurança funcional não estão validados. Este registo não torna o simulador executável pela Internet nem deve ser usado com hardware industrial.','Engenharia / testes pendentes','Simulação industrial','Alta')
    ON CONFLICT(slug) DO NOTHING`);

  // RF300: metadados de baixo risco apenas; desenhos, simulações e ZIPs no arquivo privado.
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority)
    VALUES ('rf300-multirotor','RF300 / TURBINA MULTIRROTOR',
      'Projeto autónomo de engenharia para estudo de aproveitamento de energia em escoamentos pressurizados.',
      'P0.1 (15/11/2026): bancada virtual paramétrica, três referências mecânicas de origem preservadas e balanço didático para ar de baixa queda de pressão. Não existem CFD, ensaios com vapor, potência elétrica medida, materiais ou segurança de pressão validados. Dossier técnico integral reservado em NOVAMATRA_PRIVADO/RF300_MULTIROTOR. Não publicar detalhes geométricos nem iniciar contactos externos.',
      'Engenharia / validação pendente','Sistemas de energia','Alta')
    ON CONFLICT(slug) DO NOTHING`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','P0.1 — bancada virtual inicial',
    'Ambiente local interativo, modelo CAD de referência e testes de invariantes matemáticos implementados; sem validade CFD ou desempenho medido.','Concluído'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='P0.1 — bancada virtual inicial')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G1 — condições de contorno e geometria operacional',
    'Determinar pressão absoluta, temperatura, caudal, propriedades do fluido, saída, perdas, ligação da câmara superior e compatibilidade de gerador, suporte e veio. Depois avançar para conservação de energia e CFD.','Aberto'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G1 — condições de contorno e geometria operacional')`);

  // RF300 P0.2: apenas metadados. Código e dados técnicos não são publicados no repositório.
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','P0.2 — modelo 1D pressurizado',
    'Substituição do cálculo eólico por balanço de massa e energia, pressão absoluta e expansão por estágios em gás ideal. Inclui aplicação offline, comparação de arquiteturas e testes sintéticos. Variação de potência apenas condicional; não demonstra CFD, vapor real, curvas de rotor nem geração líquida. Arquivo restrito NOVAMATRA_PRIVADO/RF300_MULTIROTOR.','Concluído'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='P0.2 — modelo 1D pressurizado')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G2 — validar vapor real e dinâmica da pressão',
    'Obter propriedades IAPWS-IF97, condições de entrada/saída e caudal, mapas de perdas e bypass na câmara superior. Depois estudar CFD, ondas de pressão, rendimento por rotor e compatibilidade do gerador. Sem construção pressurizada ou contactos externos não autorizados.','Aberto'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G2 — validar vapor real e dinâmica da pressão')`);

  // RF300 P0.3: metadados não técnicos. ZIP, código, desenhos e cálculos no Drive privado.
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','P0.3 — painel serpentino acústico',
      'Nova bancada local em modo de estudo: geometria de serpentina com curvas a 180 graus, teto de 20 metros incluindo curvas, perdas locais de pressão assumidas e reserva exterior para isolamento acústico. Modelo sintético 1D, testes executados, sem validação experimental ou CFD. Dossier P0.3 guardado na pasta privada RF300_MULTIROTOR. Nenhum valor de potência ou redução sonora representa medição.',
      'Concluído'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='P0.3 — painel serpentino acústico')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G3 — avaliação física e acústica',
      'Confirmar comprimento limite incluindo retornos, escolher raio e topologia modular, obter coeficientes de curva medidos, validar caudal versus pressão, analisar ruído e vibração, isolamento térmico, drenagem de condensado, segurança, manutenção e arrefecimento dos geradores. Não publicar engenharia interna ou contactar terceiros sem autorização.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G3 — avaliação física e acústica')`);

  // RF300 P0.4: registo de fase, apenas metadados; sem publicar geometria original ou resultados privados.
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','P0.4 — estudo de densidade de rotores',
      'Estudo virtual de 56/154/168/224 rotores em painel serpentino até 20m totais, incluindo curvas. 168 apenas como limite axial geométrico; 224 exige rotor redesenhado. Sem demonstração de eficiência ou viabilidade mecânica. Interface, código, testes e comparações arquivados exclusivamente em NOVAMATRA_PRIVADO/RF300_MULTIROTOR.','Concluído'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='P0.4 — estudo de densidade de rotores')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G4 — otimização densidade versus perdas por estágio',
      'Medir ou modelar curvas hidráulicas individuais do rotor, perdas mecânicas, mancais e espaçamentos; comparar ligações geradoras e áreas úteis de secção sob as mesmas condições de entrada e saída. Não presumir que mais rotores aumentam a potência disponível. Resolver ainda geometria dos estatores, compatibilidade térmica do RF300 e controlo de condensado.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
      AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G4 — otimização densidade versus perdas por estágio')`);

  // RF300 P0.5: apenas metadados; código, catálogo e ensaios permanecem na pasta privada.
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','P0.5 — selecção de geradores',
      'Bancada RF300 virtual P0.5: biblioteca de seis perfis eléctricos, incluindo variantes Mabuchi derivadas de fichas em modo motor, escolha por troço e parâmetros de gerador personalizados. 43 testes Python PASS, quatro reconciliações browser/Python PASS e 144 cenários de software. Dados eléctricos condicionais, sem validação no modo gerador e sem acoplamento dinâmico da turbina. Ficheiros técnicos arquivados em NOVAMATRA_PRIVADO/RF300_MULTIROTOR e não publicados.',
      'Concluído'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='P0.5 — selecção de geradores')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','G5 — medir curvas reais de geração',
      'Identificar variantes exactas; medir FEM-rpm, resistência interna, eficiência, limites térmicos, torque de arranque, curvas carga-corrente e relação rotor-pressão-caudal-rotação. Validar custos de alimentação e electricidade líquida; não declarar capacidades de produção sem ensaios. Contactos externos e publicação de engenharia reservada exigem autorização.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='rf300-multirotor'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='G5 — medir curvas reais de geração')`);

  // ENERGY RECOVERY STUDIO E0.1 — metadados mínimos; documentação, código e dados no Drive privado.
  // Independente do RF300 físico; sem mesclar implementações ou expor fontes técnicas.
  await query(`INSERT INTO nm_projects(slug,title,summary,details,status,track,priority)
    VALUES('energy-recovery-studio','ENERGY RECOVERY STUDIO',
      'Plataforma multissetorial de triagem de oportunidades de aproveitamento energético.',
      'Estudo computacional interno E0.1. Cálculos de triagem de energia, pressupostos editáveis e indicadores económicos condicionais; cinco famílias físicas simplificadas e interface opcional IF97. Software offline e ensaios sintéticos; sem validação de campo, certificação, licenciamento comercial ou promessas de poupança. O código permanece no arquivo NOVAMATRA_PRIVADO/ENERGY_RECOVERY_STUDIO e não no repositório público. O RF300 mantém-se como projeto autónomo.',
      'Engenharia / testes pendentes','Software energético multissetorial','Alta')
    ON CONFLICT(slug) DO NOTHING`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'marco','E0.1 — software local e testes',
      'Interface offline e motor Python concluídos para triagem multissetorial, com casos fictícios, exportação e contas condicionais. 15 testes unitários Python PASS; 308 casos de paridade Python/JavaScript PASS em 11 indicadores. Teste visual de navegador não confirmado; propriedades reais e aplicação física pendentes. Arquivo privado E0.1 preservado.',
      'Concluído'
    FROM nm_projects p WHERE p.slug='energy-recovery-studio'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='E0.1 — software local e testes')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','E0.2 — propriedades reais e integração de medições',
      'Testar IF97 com a biblioteca oficial e estados de referência, introduzir perfis horários, curvas reais de bombas, compressores, turbinas, geradores e sistemas térmicos, e modelar limitações físicas. Sem afirmações de segurança ou economia sem validação.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='energy-recovery-studio'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='E0.2 — propriedades reais e integração de medições')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','E0.3 — validação comparativa independente',
      'Estabelecer casos de referência independentes, métricas de erro e proveniência, verificação das incertezas, auditoria de segurança e comparação entre plataformas e equipamentos existentes.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='energy-recovery-studio'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='E0.3 — validação comparativa independente')`);
  await query(`INSERT INTO nm_items(project_id,kind,title,body,state)
    SELECT p.id,'tarefa','E0.4 — backend e licenciamento seguro',
      'Arquitetura de backend privado, segurança, backups, autenticação, controlo de direitos e modelo de licença. Não publicar código, contactar clientes ou vender sem aprovação explícita e as validações necessárias.',
      'Aberto'
    FROM nm_projects p WHERE p.slug='energy-recovery-studio'
    AND NOT EXISTS(SELECT 1 FROM nm_items i WHERE i.project_id=p.id AND i.title='E0.4 — backend e licenciamento seguro')`);

}
export async function audit(operation, entity, id=''){await query('INSERT INTO nm_audit(operation,entity,entity_id) VALUES($1,$2,$3)',[operation,entity,String(id)]);} 