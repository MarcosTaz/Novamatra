# DECREIA G6.1 — correção de codificação Windows (Bíblia 0042)

**Data:** 2026-11-14 · **Estado:** PATCH AUDITADO LOCALMENTE; ACEITAÇÃO WINDOWS PENDENTE.

O executor original `AUDITAR_G60_WINDOWS.py` falhou no Windows após verificar 265 entradas do ZIP G6.0, normalizar um nome histórico e validar 215 hashes de manifesto, com:
```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe7 in position 159
```
A análise identificou a leitura incondicional `log.read_text(encoding='utf-8')` do stdout de um subprocesso como causa compatível com este erro; a consola Windows pode usar CP1252 quando a saída é redirecionada, onde 0xe7 representa `ç`.

## Correção isolada

- Verificar o marcador ASCII `VERIFICACAO: 73/73 PASS` sobre bytes originais do log, sem exigir UTF-8 do log inteiro.
- Preservar bytes dos logs e registar `UTF8_VALID` ou `NON_UTF8_PRESERVED_RAW`.
- Definir `PYTHONIOENCODING=utf-8:backslashreplace` para subprocessos Python.
- Sem mudanças no código dos motores, no manifesto G6.0, no ZIP original, no catálogo ou no registo de produção.

## Testes executados

- Fixture CP1252 com byte 0xe7: falha UTF-8 do auditor anterior reproduzida; leitura robusta de bytes PASS.
- Fixture de stdout UTF-8: PASS.
- Auditor corrigido contra ZIP real G6.0 em Linux/Python 3.13.5, modo `--sem-shadow`: **265 entradas; 215/215 hashes; 73/73 recibos; 22/22 G6.0; 119 PASS e 4 SKIP G5.9 (sem `dp_accounting`); código de saída 0**.
- Testes internos do pacote de correção: **2/2 PASS**; ZIP e manifesto SHA-256 íntegros.
- **A corrida completa SHADOW não foi repetida nesta revisão nem aceite no Windows**.

Pacote privado de distribuição: `DECREIA_G61_CORRECAO_ENCODING_WINDOWS_BIBLIA_0042.zip`. Não inclui fontes científicas. O erro de UTF-8 não demonstra erro científico.

**Validação científica/criptográfica/clínica: NÃO DEMONSTRADA. Produção: NÃO PROMOVIDA.**
