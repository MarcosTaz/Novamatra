# DECREIA G4.1 — auditoria do candidato DNA_ATLAS

Data do ensaio: **13 de novembro de 2026**  
Projeto: DECREIA / OMNI-25 — NOVAMATRA  
Candidato: **DNA_ATLAS** (identificação original do pacote: **DERKEIA 2.0.0-research**)  
Ligação proposta: GENOMICA — **não ativada / identidade pendente**

## Evidência técnica delimitada

- 5 módulos científicos originais + 1 auxiliar com SHA-256 recalculados e coincidentes com o manifesto G3.8.
- Inspeção estática: dependências Python standard library; referências biológicas externas do pipeline integral não incluídas no arquivo recuperado.
- Testes diretos: **12 PASS / 1 FAIL** num caso de classificação de consequência codificante.
- Geração e reconstrução sintética: **450/450** operações de replay verificadas em 15 classes.
- Pipeline original executado **apenas com referências sintéticas injetadas em memória**: 56 variantes de teste, 28 estratos e 56 reconstruções, resultados reproduzíveis à mesma semente.
- Contrato I/O JSON isolado: **6/6 testes PASS**, valida hashes e rejeita entradas inválidas. Não está ativado na orquestração OMNI-25.
- Auditoria reproduziu **cinco problemas de qualidade/proveniência**: classificação do primeiro códon, contagem real/sintético, triagem vazia, saída CSV em modo reduzido e verificação insuficiente da identidade do FASTA.

## Bloqueios para integração

**GENOMICA permanece PENDENTE**. As duas referências externas requeridas pelo código original — `refs/mt_rCRS_2bit.b64` e `refs/TP53_CDS_NM_000546.fa` — não constavam da entrega G4.0. Não houve campanha integral com mtDNA/TP53, avaliação de desempenho clínico, prova de patogenicidade ou validação científica externa.

A condição de promoção continua: código independente, identidade comprovada, contrato I/O, execução real no contexto apropriado, verificações negativas e evidência auditável. A **Bíblia 0027** e o ZIP técnico completo foram entregues ao responsável do projeto; o código-fonte original **não foi publicado neste repositório**.

**Próximo passo:** recuperar as referências autenticadas, corrigir os cinco pontos em cópia versionada e repetir os ensaios antes de considerar a integração OMNI-25. Sem contactos externos sem autorização explícita.
