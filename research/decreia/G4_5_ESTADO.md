# DECREIA G4.5 — auditoria de identidade e ligação SHADOW

**Data:** 2026-11-13. **Bíblia:** 0032. **Estado:** desenvolvimento concluído, aceitação Windows PENDENTE, produção NÃO PROMOVIDA.

## Conclusão documental
- Código original `dna_atlas` declara **DERKEIA research-only / 2.0.0-research**. **DNA_ATLAS** é a identidade documentada do núcleo algorítmico.
- No pacote G3.3, o adaptador GENOMICA existia mas estava `enabled=false`, `source_file=null`, `NOT_CONNECTED`.
- O coordenador G3.5 tinha registo apenas de três ligações `MAC`, `MPCVG`, `NCLE`.
- As 6 ocorrências GENOMICA do inventário G3.8 apontam para ficheiros do mesmo pacote DNA_ATLAS, **não para seis motores diferentes**.
- `GENOMICA` passa a ser tratado como **alias arquitetural proposto de DNA_ATLAS**. Um motor histórico independente denominado GENOMICA **não foi demonstrado**.

## Testes reais em cópia isolada do coordenador G3.5

Os bytes originais do coordenador e dos três motores históricos foram verificados com SHA-256, preservando módulos separados. Um quarto adaptador, externo ao DNA_ATLAS, executa `engine.analyze_one`, `replay.reconstruct` e `replay.digest` do **DNA_ATLAS corrigido G4.3** verificado por 6 hashes. Não existe fusão de código.

Resultado de desenvolvimento:
- **4/4 testes de integração local PASS** em fixtures sintéticas.
- Caso com parâmetros: **4 EXECUTED / 21 BLOCKED**, em 25 posições arquiteturais do relatório G3.5.
- Caso sem parâmetros GENOMICA: **3 EXECUTED / 1 ABSTAINED / 21 BLOCKED**.
- Pedidos adulterados e escopo de dados pessoais/clínicos rejeitados.
- Modificações aos originais e ao snapshot do coordenador rejeitadas antes da execução.
- O pacote Windows foi preparado para criar só `versions/G4_5_SHADOW_*`, sem modificar o registo ativo.

**Limites inalterados:** não temos recibo Windows G4.5; nem foi auditada a instalação real/versão ativa do `gestor.py` do CENTRO_CONTROLO_SAUDE_GLOBAL. A demonstração no coordenador G3.5 em cópia não prova integração produtiva. Ciência externa NÃO VALIDADA, uso clínico NÃO APROVADO.

O pacote técnico e os motores são mantidos **fora do repositório público**; apenas este relatório e um manifesto de estado são publicados.

**Próximo gate:** receber `DECREIA_G4_5_RESULTADOS_SOMBRA_*.zip`, verificar hashes e resposta do coordenador, auditar a configuração ativa e só depois submeter proposta de promoção formal, sujeita a autorização explícita.
