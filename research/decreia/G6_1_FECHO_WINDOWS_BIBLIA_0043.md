# DECREIA / OMNI-2000 — Fecho Windows G6.1 · Bíblia 0043

**Data:** 2026-11-14. **Estado:** ACEITAÇÃO TÉCNICA SHADOW LIMITADA; não promover produção nem inferir validação científica.

Recebidos os recibos `DECREIA_G61_AUDITORIA_WINDOWS_20261114T164556Z.zip`, SHA-256 `8befb7c9c64f3cd22dc11a4ac39cdcf0a383f13ad85aca39d984f1e9927f2379`; ZIP CRC PASS, seis ficheiros. Referência a `DECREIA_PERPLEXITY_G6_EXECUCAO_INTEGRAL.zip` SHA-256 `b29debb4bf50e81321a6fe51a321bf611301c9aa5166da35255aabb5b939cc7d` — **conferido com a cópia previamente recebida**.

## Relatório Windows (Python 3.12.10)

- Inventário: **265 entradas, 215/215 hashes** do manifesto, corrigindo apenas em cópia de ensaio o nome de um arquivo histórico.
- Verificador original: **73/73 PASS**.
- G6.0: **22/22 PASS**, sem SKIP.
- G5.9: **118 PASS, 5 SKIP, 0 FAIL, 0 ERROR**, total 123.
- SHADOW positivo: **10 EXECUTED / 15 BLOCKED**.
- SHADOW abstenção: **4 EXECUTED / 6 ABSTAINED / 15 BLOCKED**.
- Entrada inválida: **3 FAILED esperados / 7 EXECUTED**.
- Testes negativos: **36/36 PASS**, declarados no log Windows.
- Catálogo V01: 10 recibos, `g1/g2/g3=NAO_TESTADO` em todos.
- Sem instalação automática de dependências, sem promoção de produção declarada.

Os cinco SKIP compreendem **quatro casos GA03/SY05** dependentes do oráculo externo `dp_accounting` e **um caso INTEGRITY** cujo teste de reaplicação de patches depende do executável `patch` no PATH; estas condições foram identificadas no código de testes G6.0. Os logs fornecidos não incluem o detalhe de `skipTest` por caso; o motivo é inferido do código e categoria.

O log inclui avisos de overflow, raiz quadrada inválida e `NaN` em ensaios OMNI_EXODUS e uma advertência futura do Pandas em ECOLOGIA. Sem FAIL; acompanhar os casos de estabilidade numérica.

**Limite forense:** o arquivo recebido contém só JSON-resumo e quatro logs, não os bytes do código executado nem atestação externa do PC. Os valores e marcadores foram confrontados com o JSON, e o hash do pacote G6.0 coincide com a referência disponível. Logo, a classificação correta é **execução técnica SHADOW documentada em Windows**; não integração produtiva, prova de autoria, homologação científica ou aprovação clínica.

### Próximos gates G6.2
- Confirmar **5 SKIP** com o oráculo e `patch` num ambiente reproduzível;
- guardar resultados por teste com razões individuais de SKIP e hashes dos recibos;
- investigar estabilidade numérica de OMNI_EXODUS e contrato Pandas/ECOLOGIA;
- manter **AETHER_NEXUS NÃO APTO**, 12 candidatos de motor sem demonstração e `FONTES_GLOBAIS` pendente;
- não ativar ZKP, CKKS, threshold cryptography, DP externa ou causalidade sem prova.

O relatório técnico integral e recibos ficam no pacote privado `DECREIA_G6_1_FECHO_WINDOWS_BIBLIA_0043.zip`. Só metadados são registados aqui; **nenhum código científico foi publicado**.
