# DECREIA — G5.5 a G5.8 | Auditoria de seis núcleos recuperados

**Data:** 2026-11-14 · **Bíblia:** 0038 · **Âmbito:** ensaios em ambiente de desenvolvimento, com dados sintéticos; sem alterações à produção.

## Fases realmente realizadas

| Fase | Atividade e resultado |
|---|---|
| G5.5 | Verificação SHA-256 dos **seis módulos originais** do pacote histórico G3.6 e inventário de classes/funções via AST; **6/6 correspondentes**. |
| G5.6 | **26/26 casos de engenharia PASS**, com oráculos independentes para alinhamento, CVaR, BH e operações matemáticas limitadas. |
| G5.7 | **17 observações** registadas: **11 reproduções funcionais** e **6 limitações confirmadas por leitura do método**. A existência de observações é evidência de bloqueios, não métrica de qualidade. |
| G5.8 | Matriz de gating: **zero fusões de código, zero motores novos, zero promoções e zero critérios de validade científica aprovados**. |

## Observações por núcleo

- **ONE_HEALTH:** score Smith–Waterman passou oráculo DP em 24 pares. O contador `mismatches` enumera diferenças em todas as comparações DP, não diferenças do alinhamento ótimo. `window_size=1` gera exceção não tratada.
- **GAIA_ECOPATHOLOGY:** fórmula de contabilidade RDP tem execução aritmética; compromisso de 64 caracteres arbitrários é aceite pelo falso portão `ZKP`, e a cadeia de hashes pode ser recalculada sem âncora externa. Não há demonstração de DP nem prova zero knowledge.
- **SYNAPSE:** `encrypt_weights` aplica **ruído aditivo** em torno de `1e-6`, **não criptografia CKKS**. A flag de limiar não constitui threshold cryptography; existe o mesmo problema de portão ZKP e cadeia recalculável. **Risco crítico se usado como cifragem**, sem evidência de exposição produtiva.
- **NEXUS:** CVaR empírico, ângulos Grassmann e distância de médias com covariância fixa passaram testes limitados. O algoritmo chamado `compute_exact_fisher_rao_distance` é Mahalanobis de médias com covariância comum; não demonstra Fisher–Rao geral para covariâncias diferentes.
- **OMNI_EXODUS:** passo estocástico reproduzido com semente; passo temporal negativo devolve não finitos `NaN`; a alegada prova ZKP apenas gera hash truncado/estatística, sem verificador criptográfico e sem âncora de auditoria externa.
- **ECOLOGIA:** BH passou oráculo independente. `cycle_detection` falha com `TypeError` na coluna de nós em lista; a chamada `transition_matrix` é cruzamento transversal `burden_bin × state`, sem transição temporal; rede vazia provoca falha em `spectral_score`.

**Critério decisivo:** funções sintéticas testadas não tornam o motor cientificamente validado, muito menos clinicamente apto. A classificação do risco assinala prioridades caso os métodos sejam utilizados em contextos específicos; não é prova de exploração produtiva.

## Estado de aceitação

- Auditoria G5.5–G5.8 em desenvolvimento: **CONCLUÍDA**, fontes e resultado auditáveis.
- Recibos Windows G5.2–G5.4: **NÃO RECEBIDOS NESTA FASE**.
- Recibos Windows G5.5–G5.8: **PENDENTES**.
- Produção OMNI-25/OMNI-2000: **NÃO ALTERADA**. `GENOMICA` continua alias arquitetural de `DNA_ATLAS / DERKEIA 2.0.0-research`.
- Validação científica externa: **NÃO DEMONSTRADA**. Uso clínico: **NÃO APROVADO**.

O pacote privado `DECREIA_G55_G58_AUDITORIA_PROFUNDA_BIBLIA_0038.zip` contém código original e não está publicado neste repositório. O relatório e a matriz são apenas metadados de auditoria.
