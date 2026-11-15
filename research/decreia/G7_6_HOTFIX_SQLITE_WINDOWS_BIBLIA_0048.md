# DECREIA G7.6 — Hotfix SQLite Windows · Bíblia 0048

**Data:** 2026-11-15. **Âmbito:** infraestrutura de testes G6.9–G7.5. **Aceitação Windows do hotfix: pendente.**

O utilizador executou a macro no Windows e recebeu `[WinError 32]` na etapa 2/9 ao apagar a SQLite artificial de `G71_EPI_.../db/sintetica.sqlite`.

## Causa demonstrada por inspeção de código

Em `TESTES_DIRIGIDOS_G69_G75.py`, `with sqlite3.connect(p) as c:` gere commit/rollback, **mas não garante fechar a ligação**. O `TemporaryDirectory` tentava eliminar a SQLite enquanto ainda havia uma ligação aberta no mesmo processo. Não há indícios de erro dos motores científicos, nem de ficheiro produtivo afetado.

## Correção G7.6

Usar `contextlib.closing(sqlite3.connect(p))` envolvendo um `with c:` interno. A ligação é explicitamente fechada antes da limpeza de temporários. Apenas o teste sintético e os documentos/lançador de distribuição mudaram. As fontes ECOLOGIA, OMNI_EXODUS e gate EPIDEMIOLOGIA continuam iguais à Bíblia 0047.

- Testes dirigidos locais: **26/26 PASS** (Linux/Python 3.13.5).
- Teste instrumental de handles: **1 ligação SQLite sintética criada, 1 ligação explicitamente fechada; PASS**.
- Pacote distribuído `DECREIA_G69_G76_HOTFIX_SQLITE_WINDOWS_BIBLIA_0048.zip`: **19 ficheiros, 18/18 SHA-256 e CRC PASS**. SHA-256 do arquivo: `1be8b18c79abda1c0fc95d7ea0e7bb6ab38c0a8c0ba5b82760f158592884cc36`.
- Uma tentativa local de execução integral chegou à etapa 5/9, mas **não concluiu dentro do limite do ambiente**; não declarar a macro G7.6 como integralmente PASS.
- Recibo Windows `DECREIA_G69_G75_RESULTADOS_*.zip` **ainda pendente**.

**Nenhum motor fundido; nenhuma produção alterada; nenhum código científico privado publicado; nenhuma validação científica, clínica, criptográfica ou de privacidade demonstrada.**
