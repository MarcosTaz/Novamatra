# DECREIA G4.3 — Regressões F01–F05 e recibos G4.2

Data: **13 de novembro de 2026**. Projeto: DECREIA / OMNI-25 (também referido OMNI-2000).

## Recibos recebidos e reproduzidos

O pacote `DECREIA_G4_2_RECIBOS_WINDOWS_40a43a861a77.zip` foi analisado. CRC e SHA-256 de entrada, auditoria e resultado **PASS**. Os 12 registos sintéticos foram **reexecutados e reproduzidos exatamente** com as funções originais e a semente declarada.

**Reserva crítica de proveniência:** o JSON de auditoria recebido é **byte a byte idêntico** ao ficheiro de exemplo `PROVA_LOCAL` do instalador G4.2. O conteúdo não distingue uma execução no Windows de uma cópia do exemplo. A recolha declara horários Windows, mas esses metadados não são atestação independente.

## Fase G4.3 (desenvolvimento local)

Foram elaboradas versões **separadas dos originais** para corrigir:

- F01: falso reconhecimento de códon inicial em variação sinónima.
- F02: contagem real/sintético baseada em rótulo e não no campo explícito de proveniência.
- F03: triagem sem elegíveis causava exceção.
- F04: modo sem CSV completo gerava amostra vazia.
- F05: accession anunciado sem confronto lexical exato com o cabeçalho FASTA.

Os ensaios da cópia corrigida deram **15/15 PASS**, incluindo pipeline sintético com **56/56** reconstruções e ensaio de modo reduzido com CSV não vazio. Instalador testado em diretório temporário: PASS, originais imutáveis e recusa de input G4.2 adulterado. **A G4.3 ainda não foi executada nem confirmada no Windows final do utilizador.**

O pacote G4.3 e a Bíblia 0029 foram entregues como anexo privado de conversa; não publicar o código original nem a versão corrigida no GitHub público.

## Gates ainda pendentes

1. Confirmar execução G4.3 no Windows e analisar recibo novo.
2. Resolver a identidade **DERKEIA / DNA_ATLAS ↔ GENOMICA**, sem fusão nem renomeação por conveniência.
3. Obter proveniência e integridade das referências biológicas mtDNA / TP53. A melhoria F05 só compara o identificador textual do FASTA; **não autentica a proveniência externa**.
4. Fazer ensaios adequados às referências e revisão científica independente antes de alegações científicas ou clínicas.
5. Só então decidir eventual ativação no coordenador OMNI-25.

**Classificação:** EXECUÇÃO TÉCNICA SINTÉTICA LIMITADA; IDENTIDADE PENDENTE; VALIDAÇÃO CIENTÍFICA NÃO DEMONSTRADA; USO CLÍNICO NÃO APROVADO; INTEGRAÇÃO OMNI-25 NÃO PROMOVIDA.

**Precisão do inventário:** 25 componentes arquiteturais = **23 posições de motores científicos candidatos + 1 catálogo FONTES_GLOBAIS + 1 coordenador CENTRO_CONTROLO_SAUDE_GLOBAL**, e não 25 motores cientificamente demonstrados.
