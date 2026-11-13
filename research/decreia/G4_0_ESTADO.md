# DECREIA G4.0 — DNA_ATLAS / GENOMICA
Data: 2026-11-13. Baseline: Bíblia DECREIA 0026.

**Fase preparada, não validada como motor científico.** O registo G3.8 identificou 5 fontes algorítmicas sob DNA_ATLAS (engine.py, patterns.py, triage.py, replay.py, external.py) e 1 __init__.py auxiliar. A correspondência DNA_ATLAS ↔ GENOMICA permanece pendente de reconciliação de identidade.

O coletor G4.0 suporta arquivos ZIP aninhados, inspeção estática AST e verificação SHA-256, mantendo os originais intactos. Funciona com arquivos históricos encontrados por nome em diretórios usuais do Windows ou com caminhos explícitos; **não depende da existência de C:\DECREIA**.

**Testes do coletor:** 11/11 PASS com fontes artificiais. Ensaio com arquivo sem DNA_ATLAS: 0/5, saída 2 (falha fechada). **Ensaios de execução científica do algoritmo original: não realizados.**

O manifesto SHA-256 deste candidato encontra-se em `G4_0_MANIFESTO_DNA_ATLAS.json`; o arquivo de recolha/validação foi entregue separadamente ao operador. Não contém módulos originais nem dados de saúde; não publicar fontes privadas sem autorização.

**Próximo marco:** obter fontes G3.8 com hashes exatos, auditar dependências/interfaces, construir adaptador de I/O estrito sem fusão e só então executar testes controlados. O registo OMNI-25 não promove GENOMICA automaticamente.
