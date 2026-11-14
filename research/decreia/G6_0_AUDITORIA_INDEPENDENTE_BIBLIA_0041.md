# DECREIA G6.0 — Auditoria independente e aceitação G6.1 (Bíblia 0041)

**Data:** 2026-11-14. **Estado:** execução técnica sintética SHADOW corroborada; bug de empacotamento identificado; aceitação Windows pendente. **Produção não alterada.**

## Prova local (ambiente distinto do Perplexity)

Recebido o arquivo privado `DECREIA_PERPLEXITY_G6_EXECUCAO_INTEGRAL.zip`; SHA-256 `b29debb4bf50e81321a6fe51a321bf611301c9aa5166da35255aabb5b939cc7d`. CRC: PASS, 265 entradas.

- Manifesto: 215 ficheiros; **um nome de arquivo codificado incorretamente no ZIP** (`DECREIA G5.9 ΓÇô pacote de revis├úo (...).zip` vs `DECREIA G5.9 – pacote de revisão (...).zip`). **Os bytes e o SHA-256 do ficheiro são idênticos aos esperados**.
- Verificador G6.0 sem corrigir o nome: **71/73 PASS, 2 FAIL** (um esperado ausente; outro inesperado). Corrigido **apenas numa cópia temporária:** **215/215 hashes PASS e 73/73 controlos PASS**.
- Testes originais G6.0 reexecutados em Linux/Python **3.13.5**: **22 PASS, 0 FAIL/ERROR/SKIP**.
- Testes G5.9: **119 PASS, 4 SKIP, 0 FAIL/ERROR** (dependência opcional `dp_accounting` ausente). O resultado 123/123 em Python 3.12.15 com o oráculo consta dos recibos Perplexity, não desta reprodução.
- Corrida positiva de `EXECUTAR_G60.py` em SHADOW: **10 EXECUTED, 15 BLOCKED**; **10/10 saídas algorítmicas JSON idênticas às da entrega**.
- Corrida sem parâmetros nos seis candidatos: **4 EXECUTED, 6 ABSTAINED, 15 BLOCKED**.
- Três testes independentes dos adaptadores: entrada inválida em `ONE_HEALTH`, `ECOLOGIA`, `OMNI_EXODUS` devolveu `FAILED`.
- SQLite da entrega lida em modo somente leitura: `quick_check=ok`, sem FK inválidas, 10 linhas em `motores`, 10 em `execucoes`, `g1/g2/g3=NAO_TESTADO`.

**Limite da reprodução:** a corrida completa do caso de erros e 36 controlos negativos do executor foi interrompida pelo limite do ambiente de revisão. Existem recibos no pacote recebido, mas **não são 36/36 testes independentes reproduzidos nesta auditoria**.

## Correção adicional necessária

O `run_windows.cmd` original elimina a pasta fixa `%TEMP%\DECREIA_G60_RUN` e pode instalar dependências automaticamente com `pip install`. **Não recomendar o seu uso sem revisão**.

Foi preparado o pacote privado **`DECREIA_G6_1_AUDITORIA_INDEPENDENTE_BIBLIA_0041.zip`** (SHA-256 `023df968f54515fe95cd9fcf9baa3141daa42e3ad666364bfc32b6e180a22e6b`), com um lançador Windows somente em cópias temporárias únicas, sem instalação automática ou código científico incluído. O mesmo auditor passou em teste local `--sem-shadow`: manifesto 215/215, verificador 73/73, G6.0 22/22 e G5.9 119 PASS+4 SKIP. A aceitação Windows deste lançador **continua pendente**.

**Arquitetura:** 10 motores com rotas limitadas, 1 coordenador, 12 posições de motor sem implementação demonstrada, 1 `AETHER_NEXUS` NÃO APTO e 1 gateway `FONTES_GLOBAIS` pendente. `GENOMICA` é alias de `DNA_ATLAS`, não um motor histórico adicional.

**Sem código publicado, sem fusão, sem promoção, sem dados clínicos. Validação científica/criptográfica/externa: NÃO DEMONSTRADA.**
