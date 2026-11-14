# DECREIA G6.2–G6.5 — macrofase de consolidação (Bíblia 0044)

**Data:** 2026-11-14 · **Âmbito:** desenvolvimento Linux/Python 3.13.5, testes SHADOW com entradas sintéticas. **Aceitação Windows da macrofase ainda PENDENTE**.

## Execução local verificada
- ZIP histórico G6.0 SHA-256 `b29debb4bf50e81321a6fe51a321bf611301c9aa5166da35255aabb5b939cc7d`, 265 entradas, **215/215 hashes do manifesto**. Nome histórico Unicode normalizado só numa cópia.
- Recibos G6.0: **73/73 PASS**.
- **6/6 patches G5.9 reaplicados em memória byte a byte por Python**, sem `patch` externo. Isto não converte o teste histórico em PASS quando este é SKIP.
- G5.9: **119 PASS, 4 SKIP (dp_accounting ausente), 0 FAIL/ERROR**. Razões por teste recolhidas.
- G6.0: **22/22 PASS**.
- **G6.3 descobriu uma falha numérica adicional**: `ECOLOGIA.spectral_score` aceita peso infinito e devolve `lambda_max=NaN`. Dos dez ensaios de propriedades da versão atual, **9 PASS / 1 FAIL**.
- **Patch candidato ECOLOGIA isolado** (não promovido): rejeita infinito ou correlação fora de [-1,1], preserva semântica NaN→0. **10/10 ensaios numéricos PASS e 23/23 regressões históricas ECOLOGIA PASS**.
- OMNI_EXODUS bloqueou os cinco dt inválidos e falhou de forma segura para valores extremos, mas gerou dois avisos numéricos: estabilidade geral NÃO demonstrada.
- SHADOW G6.0 original: **10/10 saídas JSON idênticas; 36/36 testes negativos PASS; SQLite quick_check ok, dez recibos e g1/g2/g3=NAO_TESTADO**. Esta reexecução **não integra** ainda o patch candidato ECOLOGIA.
- Matriz 25: **11 DEMONSTRADO_LIMITADO (10 motores + coordenador), 12 ESTRUTURA_REGISTADA_IMPLEMENTACAO_PENDENTE, 1 NAO_APTO (AETHER_NEXUS), 1 PENDENTE (FONTES_GLOBAIS)**.

## Decisão e limitações
Estado global `PASS_WITH_BLOCKERS`, com **nenhum motor promovido**. Persistem quatro SKIP de `dp_accounting` no ambiente local, um FAIL numérico no baseline ECOLOGIA, necessidade de avaliação da nova versão no SHADOW e falta de evidência para 13 posições científicas e o gateway.

O pacote privado entregue ao responsável, `DECREIA_G62_G65_MACRO_EXECUCAO_BIBLIA_0044.zip`, tem SHA-256 `402dfeaac0bfbdf60c5ad89510d5e4428b2f50c18f340ecc9e3aa9ec980ca936` e 12 ficheiros, incluindo código de **uma versão candidata** de ECOLOGIA, não publicado aqui. Os recibos locais completos ficam apenas nesse pacote privado. A prova local tem SHA-256 `c794baf560b1bf9be34ae306fc7dd4612e51acc54c16117f0ab03b9b8a5cb6d8`.

**Sem fusão de motores; sem novos stubs; sem contactos externos; sem alterações à produção; sem atestação de ciência, criptografia, privacidade ou clínica.**

**Próximo gate:** executar o pacote no Windows e auditar `DECREIA_G62_G65_RESULTADOS_*.zip`; avaliar integração SHADOW específica do patch ECOLOGIA (novo hash/contrato) antes de qualquer promoção de versão.
