# DECREIA G4.6 — Inventário somente leitura do coordenador

**Data:** 13-11-2026 · **Estado:** pacote de recolha preparado, execução no Windows ainda PENDENTE.

Protocolo: examinar de forma direcionada `C:\DECREIA` para `gestor.py`, `omni25.py` e os registos estruturados, excluindo as versões SHADOW e bibliotecas irrelevantes. Calcular SHA-256 e inspecionar apenas estrutura sintática AST ou nomes de adaptadores, **sem executar código, abrir bases de dados científicas, modificar registos ou exportar conteúdos dos motores**.

Recolher opcionalmente observação de processos Python, omitindo argumentos e valores sensíveis. Relatório interno em ZIP, com manifesto SHA-256, sob Downloads local. A presença de ficheiro/processo não é, isoladamente, atestação de versão de produção.

O coletor foi testado num fixture artificial: inventário de 3 alvos PASS, exclusão da cópia SHADOW PASS, preservação dos hashes de origem PASS e CRC/manifesto do ZIP PASS. **Nenhuma verificação Windows real G4.6 foi ainda recebida.**

O pacote técnico privado `DECREIA_G4_6_INVENTARIO_COORDENADOR_BIBLIA_0033.zip` foi entregue pelo ChatGPT ao utilizador. O executável de recolha não é publicado no repositório público. A integração GENOMICA permanece NOT_PROMOTED.
