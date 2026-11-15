# DECREIA G18.1–G21.0 — Aceitação G18.0 e macro de evidência · Bíblia 0055

**Data:** 2026-11-15. **Estado:** PASS_WITH_BLOCKERS em ensaios offline Linux/Python 3.13; aceitação da nova macro no Windows PENDENTE.

## Aceitação do recibo Windows anterior

Recebido e auditado `DECREIA_G151_G180_RESULTADOS_20261115T140101Z.zip`, SHA-256 `880be5dfc6cb0d7ce7530f414c09deefc0f8c3814aa954749f77957b4810efef`: 5 entradas, CRC PASS, 4/4 recibos SHA-256 PASS; **43/43 testes G15.1–G18.0 PASS**, 10/10 etapas concluídas no Windows Python 3.12.10. Não houve rede ou promoção de produção reportadas.

## Novidade observada

O relatório sintético do gateway tem **166 fontes registadas**, 31 respostas de demonstração, 3 `SKIPPED_MISSING_GEO`, 132 `CATALOG_ONLY` e 0 `ERROR`. Entre os 31 registos artificiais, `ols_ebi / EFO:1` tem campo `link` vazio, não detetado pelos 43 testes anteriores. Os outros 30 links são aceitáveis somente no sentido sintático. Também existem colisões de IDs entre fontes: `OPENFDA:12345`, `PMID:10001`, `PUBMED:10001`. **Estas colisões não são evidência científica independente.**

## Macro G18.1–G21.0 implementada e executada em desenvolvimento

- **12/12 etapas PASS**.
- **48/48 testes novos PASS** (inclusão de formatos e rejeição de links inseguros, alterações de estado, provas indevidas, contagens inconsistentes e falsificação).
- **43/43 testes históricos G18 reexecutados PASS**, não contabilizados apenas por histórico. **91 testes executados nesta macro.**
- Reproduziu novamente o gateway offline de três fontes históricas com transportes artificiais e bloqueio de rede: 166 identificadores; 31 registos.
- Relatório canónico igual ao Windows anterior ignorando somente `retrieved_utc`; SHA-256 canónico `a31d7e0f17e441e25672084b89fe646141bebd9411ee3a5154215b1822300e8b`.
- Auditou 31 registos; **30 ACCEPTED_FORMAT_ONLY e 1 QUARANTINED**. O registo original fica preservado por SHA-256, sem inventar URL.
- Produziu CSV de 166 fontes, plano por modalidade de acesso, detetor de colisões e recibos independentes.
- Repetiu uma execução a partir de pasta limpa e verificou **12/12 hashes** dos recibos.
- **Nenhum acesso real às fontes, nenhuma licença verificada, nenhuma ciência validada, nenhum motor novo e nenhuma promoção à produção.**

Pacote privado: `DECREIA_G181_G210_MACRO_UNICA_BIBLIA_0055.zip`, SHA-256 `31a25cc0123647086c636c3cde7a4091bfe77ae6f683fd6f735b55ebc876a403`; 12 ficheiros, 11/11 hashes de distribuição PASS. Contém os arquivos históricos com fontes privadas: **não publicar neste repositório público.**

**Arquitetura inalterada:** 10 rotas científicas com execução sintética limitada, 13 posições científicas não resolvidas, AETHER_NEXUS original NÃO APTO, gateway recuperado e validado apenas em simulação. Não declarar aceitação Windows da macro G18.1–G21.0 sem respetivo recibo.
