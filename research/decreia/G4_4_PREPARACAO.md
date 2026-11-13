# DECREIA G4.4 — Referências RefSeq NCBI (preparação técnica)

**Data:** 2026-11-13 · Bíblia 0030 · Estado: pacote de execução Windows preparado, **não executado ainda em RefSeq real neste ambiente**.

Foi entregue um lançador Windows, feito exclusivamente com biblioteca padrão Python, que valida SHA-256 dos 6 módulos originais e dos 6 corrigidos G4.3, obtém via HTTPS de NCBI EFetch os registos versionados **NC_012920.1** e **NM_000546.6** (CDS e transcrito), verifica a convenção rCRS 16569 nt com N na posição 3107, a CDS TP53 de 1182 nt, o seu enquadramento no transcrito e o round-trip de representação 2-bit. As referências são guardadas numa nova pasta `versions/G4_4_REFSEQ_*`. O motor corrigido é executado sobre 56 variantes **geradas artificialmente** usando estas referências.

**Verificações realizadas ao programa:** 16/16 testes unitários PASS com dados artificiais e um teste integral do fluxo com respostas NCBI simuladas PASS. **Não** constituem uma transferência real do NCBI nem validação biológica.

**Recolha pendente:** recibo Windows `DECREIA_G4_4_REFSEQ_RESULTADOS_*.zip` com respostas originais, hashes, log e resumo sintético.

A obtenção HTTPS e comparação estrutural não equivalem a assinatura independente de origem, avaliação clínica, capacidade de diagnosticar, ou validação científica. Mantêm-se `genomica_identity=PENDING`, `omni25_integration=NOT_PROMOTED`. A arquitetura permanece 23 motores candidatos, um catálogo FONTES_GLOBAIS e um coordenador.

Não publicar motores, referências clínicas pessoais ou dados confidenciais no GitHub público.
