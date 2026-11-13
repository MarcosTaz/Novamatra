# DECREIA — Fecho técnico G4.4 (Bíblia 0031)

Data: 13 de novembro de 2026. Entrada: `DECREIA_G4_4_REFSEQ_RESULTADOS_G4_4_REFSEQ_20261113_210525_b5d1ee.zip`.

## Verificações independentes
- CRC da entrega, recibo SHA-256 do relatório, SHA-256 das três respostas FASTA e SHA-256 do resumo: PASS.
- RefSeq `NC_012920.1` (rCRS): 16.569 nt, `N` na posição 3107, SHA-256 da sequência `f156ff3f65bbcc80c7ebb9936dceb96b1477b4f8f535c4e1dbe7baea225cbc66`.
- RefSeq `NM_000546.6`: CDS TP53 com 1.182 nt, substring do transcrito nas posições 143–1324, SHA-256 CDS `828a93ac94731fa87ba0d1f085879938f5425efd2b030f8476575dfb0d914f79`.
- Seis originais e seis ficheiros corrigidos: hashes reportados coincidentes com as fontes G4.3 da entrega anterior (sem publicação das fontes).
- **Reprodução computacional independente:** artefactos compactados de referências reconstruídos com hashes iguais; código corrigido executado em ambiente temporário, `python -m dna_atlas.engine --count 56 --seed 20261113 --no-full-csv`, exit code 0; STDOUT byte a byte idêntico e resumo igual exceto timestamp e duração.
- 56 variantes **artificiais**: 38 baseadas em mtDNA, 12 em CDS TP53, 6 construtos inteiramente sintéticos. Não são 56 casos clínicos nem 56 efeitos biológicos comprovados.

## Limitações e próxima fase
Atribuição remota das sequências ao NCBI está declarada pelos URLs HTTPS EFetch e é coerente com os registros versionados, mas não existe **assinatura independente dos bytes emitidos pela fonte remota**. A reprodução verifica a computação, não a proveniência por autoridade externa nem validação biológica.

O `__init__.py` original identifica `DERKEIA research-only DNA sequence variant simulation; no clinical prediction.` com versão `2.0.0-research`. O módulo reside em `dna_atlas/`. **GENOMICA é o slot de staging**, ainda sem prova de identidade histórica/autonomia própria. Não houve fusão nem ativação no coordenador.

Classificação final G4.4: **DEMONSTRADO (engenharia, dados de referência versionados, variantes sintéticas)**; identidade GENOMICA **PENDENTE**; validação científica externa **NÃO DEMONSTRADA**; uso clínico **NÃO APROVADO**; promoção OMNI **NÃO EFETUADA**.

G4.5: auditoria de identidade e autonomia DNA_ATLAS/GENOMICA, busca delimitada de fontes originais de GENOMICA e validação do contrato de registo no CENTRO_CONTROLO_SAUDE_GLOBAL antes de qualquer decisão de promoção.
