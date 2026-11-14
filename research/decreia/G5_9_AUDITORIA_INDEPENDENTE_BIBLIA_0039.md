# DECREIA G5.9 — Auditoria independente (Bíblia 0039)

**Data:** 2026-11-14 · **Âmbito:** revisão de integridade e engenharia; sem alteração produtiva.

Recebido pacote privado `DECREIA G5.9 – pacote de revisão (patches, hashes, diffs, resultados).zip` (SHA-256 `6c771b5b58c099e42ca99048fb3494b398cb9e0a0975e0c5c18204160f83d639`).

## Evidência reproduzida

- CRC do ZIP PASS; SHA-256 **56/56** do manifesto interno PASS, incluindo digest do próprio arquivo de hashes.
- **16/16** ficheiros originais idênticos aos da Bíblia 0038, conferidos diretamente por bytes.
- **6/6 patches** reaplicados sobre os originais em diretório temporário e ficheiros resultantes byte a byte idênticos às seis versões corrigidas.
- A bateria Perplexity declara **123/123 PASS** em Linux Python 3.12.15. Numa execução independente com **Python 3.13.5/Linux**, obtivemos **119 PASS, 0 FAIL, 0 ERROR, 4 SKIP**. Os quatro SKIP exigem `dp_accounting` (oráculo numérico externo), indisponível no ambiente de revisão. **Não declarar 123/123 independentemente confirmados.**
- Cinco testes adicionais independentes PASS (alinhamento, validação de janela, recusa CKKS não implementada, recusa de `dt` inválido e contagem de ciclos ECOLOGIA).

## Estado das 17 observações

- **5 FIXED_VERIFIED**: OH01, OH02, OE01, EC01, EC03.
- **2 FIXED_FAIL_SAFE_CAPABILITY_BLOCKED**: SY03, OE02 (as funções inseguras passam a recusar; CKKS e ZKP continuam inexistentes).
- **2 FIXED_SCOPE_GUARDED**: NX01, EC02.
- **6 PARTIAL_MITIGATION**: GA02, GA03, SY02, SY04, SY05, OE03.
- **2 BLOCKED_CAPABILITY_WITH_MITIGATION**: GA01, SY01.

As melhorias não provam ZKP, CKKS, threshold cryptography, privacidade diferencial operacional, imutabilidade custodiada, causalidade ou validação clínica. O catálogo contém funções sintéticas auditáveis, não motores cientificamente homologados.

## Gating e continuidade

A aceitação local do patch é **condicional**. É necessário repetir os quatro testes dependentes de `dp_accounting`, confirmar 123/123 no Windows/Python 3.12 e testar os seis patches nos adaptadores da macrofase G5.2–G5.4 antes de qualquer registo operacional.

Um pacote consolidado privado, **`DECREIA_G5_9_REVISADO_AUDITORIA_WINDOWS_BIBLIA_0039.zip`**, foi criado com os originais, patches e um lançador Windows que verifica integridade sem instalar pacotes. SHA-256: `04c55e88d9edb6f9f6f0129edae76a0e4624f71e3e0893e8f3f5f5b09d01fd32`.

**PRODUÇÃO: NÃO PROMOVIDA. VALIDAÇÃO CIENTÍFICA: NÃO DEMONSTRADA. USO CLÍNICO: NÃO APROVADO. CÓDIGO-FONTE PRIVADO: NÃO PUBLICADO.**
