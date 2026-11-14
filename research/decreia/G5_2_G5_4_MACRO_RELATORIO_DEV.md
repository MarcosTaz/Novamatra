# DECREIA G5.2–G5.4 — macrofase seis candidatos adicionais

**Data:** 2026-11-14 · **Bíblia:** 0037. **Âmbito:** execução de funções restritas em desenvolvimento, ambiente SHADOW; aceitação Windows pendente.

## Fontes reais identificadas

Fonte de proveniência: pacote privado histórico `DECREIA_G3_6_INTEGRACAO_ACUMULADA_BIBLIA_0022.zip`. Seis fontes científicas separadas, preservadas byte a byte:

| Componente | SHA-256 fonte original | Função efetivamente ensaiada |
|---|---|---|
| ONE_HEALTH | `35548c3881a8938341fb45bdae607d4f0ac706ebb38f3a8f1280a1d5eeaa2c6c` | Smith–Waterman, pares de DNA artificiais |
| GAIA_ECOPATHOLOGY | `50d9ab59fe7acb3f9226704b9cf3e8054b9736faf90d05e33cd73f1bff02b4c5` | Fórmula/proxy RDP |
| SYNAPSE | `afe69a44946f760f406b85115a6e8110a4ef04f01dc979dc06b15968d5e25417` | Fórmula/proxy RDP |
| NEXUS | `56e1d42f7138d2efd83194f879f0679dc0b2f9c64c93b2de964ceac208a497ab` | CVaR amostral, mínimo 30 observações |
| OMNI_EXODUS | `e522884cb5c0d623ac25ac95d5451619a4c3953310823ac2a44e73233069ea13` | Um passo estocástico com semente |
| ECOLOGIA | `ff415fac8971bbae13f82c172d64d0286ed2b823bd73862a7d52c3e7eb1b058e` | Ajuste FDR Benjamini–Hochberg |

**Falha histórica NEXUS reproduzida:** adaptador G3.6 chamava `ScaleInvariantNexusEngine()` sem `config` e usava só 6 amostras, apesar de mínimo original de 30. A correção está **apenas numa cópia do adaptador** (SHA-256 `6edc2c949ff5a7dca7e82f8a5550674e640b98aa85d3acf596dddf4418129016`); a fonte NEXUS original permaneceu imutável. Para 30 números artificiais e `alpha=0.8`, CVaR reproduziu **2.65**.

## Testes integrados em desenvolvimento

- G5.2: seis fontes identificadas/verificadas por SHA-256; 5 adaptadores G3.6 executaram diretamente, e NEXUS passou depois da correção isolada.
- G5.3: coordenador original G3.5 em **cópia SHADOW** com 10 rotas `MAC`, `MPCVG`, `NCLE`, `GENOMICA→DNA_ATLAS` e as seis acima: **10 EXECUTED / 15 BLOCKED**.
- Ausência de parâmetros para os seis candidatos: **4 EXECUTED / 6 ABSTAINED / 15 BLOCKED**.
- Oito controlos negativos PASS: alteração do adaptador, fonte, pedido, mínimo NEXUS de 30, escopo clínico, hash distinto do adaptador histórico, integridade das fontes e restauração da cópia.
- G5.4: `gestor.py` V01 (hash `9b1efedf...f70fbff9a`) intacto; SQLite de ensaio: **10 metadados e 10 recibos técnicos**, `g1/g2/g3=NAO_TESTADO` em todos.
- Validador independente: **28/28 hashes** e recibos I/O, 10 execuções, abstenção e base SQLite, PASS.
- ZIP técnico de entrega privada: `DECREIA_G52_G54_MACRO_EXECUCAO_BIBLIA_0037.zip`, 80 808 bytes, 26 ficheiros, SHA-256 `37532a33d9bee3e6e8e2ba4853065464cc86225e46110eed91398321f59a4908`.

## Limitações vinculantes

**10 rotas SHADOW executadas NÃO SIGNIFICAM 10 motores cientificamente validados ou aprovados em produção.** Alguns ensaios exercitam apenas funções auxiliares (RDP, FDR, alinhamento, CVaR). Os 25 itens catalogados incluem o coordenador e o gateway FONTES_GLOBAIS, que não são motores científicos. Não criar stubs nem inflacionar métricas.

Não se alterou código original, não houve fusão, não se enviou código científico ao repositório público nem se promoveu componente de produção. O orquestrador G3.5 por subprocessos não constitui sandbox de segurança de sistema operativo. Bibliotecas necessárias são pré-existentes (numpy, torch, pandas, statsmodels, scipy, scikit-learn); não são instaladas automaticamente.

**Gate restante:** executar no Windows e enviar `DECREIA_G52_G54_RESULTADOS_RUN_*.zip` para auditoria independente; rever funções científicas completas e dependências por candidato antes de qualquer promoção. **Validação científica externa: NÃO DEMONSTRADA; uso clínico: NÃO APROVADO.**
