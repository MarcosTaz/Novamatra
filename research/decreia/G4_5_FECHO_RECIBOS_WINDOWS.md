# DECREIA G4.5 — fecho dos recibos SHADOW

**Data:** 2026-11-13 · **Bíblia:** 0033 · **Estado:** EXECUTED_SHADOW_ONLY; NOT_PROMOTED

Foi auditado o ficheiro `DECREIA_G4_5_RESULTADOS_SOMBRA_e13de210dcc1.zip`, recebido após execução Windows comunicada pelo utilizador.

**21/21 verificações de integridade e coerência PASS**: CRC, 10 recibos SHA-256 de ficheiro, hashes canónicos do relatório principal e de abstenção (excluindo o campo próprio `report_sha256`), contratos SHA-256 de entrada/saída, contagem por rota e correspondência do código do coordenador G3.5 e adaptadores com o pacote G4.5 previamente entregue.

- Caso positivo: **4 EXECUTED** (MAC, MPCVG, NCLE, alias GENOMICA→DNA_ATLAS), **21 BLOCKED**, 0 FAILED.
- Caso sem parâmetros GENOMICA: **3 EXECUTED, 1 ABSTAINED, 21 BLOCKED**.
- O próprio `CENTRO_CONTROLO_SAUDE_GLOBAL` é uma das 21 entradas BLOCKED do relatório; é um coordenador, não motor científico.
- O recibo declara 12 replays sintéticos e respetivo digest; não contém os 12 registos individuais para reprodução nesta fase.
- Os testes de pedidos adulterados e escopo clínico são declarados como rejeitados pelo executor; não existem logs individuais dessas tentativas no ZIP.
- Os hashes das fontes originales/patch e da ponte coincidem com manifestos previamente entregues, mas os bytes instalados em Windows não constam do ZIP.

**Limites:** Os recibos são internamente coerentes e suportam execução técnica de uma **cópia isolada** do coordenador G3.5. Não existe atestação independente da máquina Windows nem auditoria ao coordenador efetivamente ativo. GENOMICA é alias arquitetural de DNA_ATLAS (DERKEIA 2.0.0-research), não motor histórico independente demonstrado. **Sem validação científica externa ou clínica, sem alteração do registo de produção, sem promoção OMNI-25.**

**Próximo gate G4.6:** inventariar em modo só de leitura o `gestor.py`/`omni25.py`, registos e caminhos de execução encontrados em `C:\DECREIA`, excluindo staging/SHADOW. Só depois decidir se uma proposta de registo é apropriada.
