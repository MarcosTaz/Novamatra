# DECREIA — G15.1–G18.0, Bíblia 0054 (metadados públicos)

**Data:** 2026-11-15. **Estado:** `PASS_WITH_BLOCKERS` (engenharia offline). **Produção:** NÃO ALTERADA.

O recibo Windows `DECREIA_G121_G150_RESULTADOS_20261115T130358Z.zip`, SHA-256 `0a18bd89c83844d766ea469eaaf1c7ed3c132cc3ca0ed5d9eda80b61e4fd6cf8`, confirmou os bytes de duas dependências históricas previamente ausentes. CRC e 16/16 hashes do manifesto PASS.

## Fontes históricas recuperadas
- `global_gateway_v05.py` (G10): SHA-256 `286e166277a4164feb027266291f73868994ddc72c5fdbf1fd5e4513bf2c2d7b`.
- `scientific_gateway.py` (G15): SHA-256 `8cd619155d16f1ab92580689ed0c255d8302ce537d853b8098eec9552db5704b`.
- `CATALOGO_CIENTIFICO_GLOBAL_V05.json` (G15): SHA-256 `27aaa73cbff93e0465e2f77591494eaa25b2e1c3af122644188fde0fbe6d9f3e`.
- Candidato G13 `global_gateway_v05.py`: SHA-256 `47dfbcc4c9fc34579977a3a569f1c7d9603fcc848e5e3a330b0ac82459d309f2`; mantido em separado.

Inventário verificado de **166 identificadores de fontes**: 14 do V04, 149 catalogadas e 3 federadas. A documentação histórica que menciona 163 está desatualizada. **34 caminhos de tentativa de consulta**; restantes modos de catálogo e acesso condicionado.

## Testes executados independentemente
- **43/43 testes novos PASS**; dez etapas de macroexecução PASS; teste de ZIP extraído em nova pasta PASS.
- **166 estados auditados em fixtures exclusivamente artificiais**, sendo 31 `OK`, 3 `SKIPPED_MISSING_GEO`, 132 `CATALOG_ONLY`, 0 `ERROR`.
- Com localização artificial explícita: 34 caminhos simulados.
- Zero operações de rede. A recusa de `active_only=True` antes de I/O foi revalidada.
- Novo risco de software: passar apenas um transporte simulado ao V05/G13 permite que o componente V04 tente recolha por rede; um **adaptador offline separado** passou a exigir os dois transportes explicitamente. Originais e candidato G13 preservados.

Pacote **privado** `DECREIA_G151_G180_MACRO_GATEWAY_RECUPERADO_BIBLIA_0054.zip`, SHA-256 `a8bfc9e4d5c2ef026d278b75b1e485b6f389c5b86fa69e475a6a80bbaea8963b`, 16 ficheiros, 15/15 hashes de distribuição. **Não carregar o ZIP neste repositório público: contém código privado.**

**Estado científico/operacional:** fontes do gateway recuperadas e contratos ensaiados **apenas em ambiente sintético offline**; integração real com o Centro de Controlo, endpoints vivos, dados científicos externos, licenças e custódia ainda NÃO DEMONSTRADOS. Nenhuma promoção. Dez rotas científicas SHADOW limitadas; treze posições científicas por resolver; AETHER_NEXUS original NÃO APTO.

Os testes anteriores G13–G15 são recibos históricos, **não** foram reexecutados neste gate.
