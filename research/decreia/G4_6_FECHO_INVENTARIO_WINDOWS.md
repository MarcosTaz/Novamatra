# DECREIA G4.6 — Auditoria do inventário Windows

**Data da captura:** 2026-11-14T01:56:02.283832Z. **Data do fecho:** 2026-11-14. **Modo:** READ_ONLY_NO_NETWORK.
**Origem:** `DECREIA_G4_6_INVENTARIO_COORDENADOR_20261114T015603Z_2a919926ec.zip`.

O ZIP passou CRC. O SHA-256 do `G4_6_COORDENADOR_INVENTARIO.json` é `2a919926eccddf4bf3ca14f69cb71d6f54af24edad1409f5cd2a905814d47a07`, idêntico ao recibo em `RECIBO_SHA256.json`. ZIP SHA-256: `31e1f0031be83eee26747378b16fcaf8a054063436f5075ea5240c78f0c60e5b`.

### Resultado delimitado

- Raiz percorrida: `C:\DECREIA`.
- **6.613 pastas examinadas**, **3.937 nomes de ficheiro examinados**.
- **1 candidato** `gestor.py`, nenhum aviso.
- Caminho encontrado: `C:\DECREIA\RECUPERACAO_20261112\05_ORIGINAIS_RECUPERADOS_DO_WINDOWS\C__Users_marco_Downloads\SAUDE_GLOBAL_CONTROLO_V01_WINDOWS\SAUDE_GLOBAL_CONTROLO_V01\gestor.py`.
- Tamanho: 16.102 bytes; SHA-256 **`9b1efedfa457f46eff467b9f960dbd9d43bc869ff8f27d3a1a6ca67f70fbff9a`**; sintaxe AST Python PASS.
- Funções topo identificadas: `now,sha,connect,init,required_text,finite_number,check_row,check_manifest,ingest,register_disease,register_source,register_engine,report,sample,main`. Nenhuma classe de topo detetada.
- Hash G3.5 do coordenador SHADOW: `86db03dbd01fc6e1768e18f9d4307e35cc033be953862e182fa03bdd050688fa` — **não coincide** com o candidato.
- Observação pontual de processos Python: lista vazia. Não foi demonstrado nenhum processo coordenador ativo.

**Limite da inferência:** a fonte original de 16 KB não faz parte dos recibos G4.6. O caminho indica uma recuperação histórica, e não uma instalação ativa comprovada. Não se pode inferir contrato compatível apenas a partir dos nomes de funções nem provar inexistência do coordenador fora do escopo pesquisado.

### Decisão

**Não promover GENOMICA** e não alterar o registo de produção. Manter G4.5 como ponte SHADOW demonstrada. Próximo passo: recolher apenas a fonte exata do candidato, conferir SHA-256 e auditar estaticamente os contratos `register_engine`, `ingest`, `report` e pontos de entrada; procurar evidência separada de serviço efetivamente ativo. Não publicar a fonte num repositório público. Nenhuma validade científica ou clínica é deduzida desta etapa.
