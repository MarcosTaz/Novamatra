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

}
export async function audit(operation, entity, id=''){await query('INSERT INTO nm_audit(operation,entity,entity_id) VALUES($1,$2,$3)',[operation,entity,String(id)]);} 