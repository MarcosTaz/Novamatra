# DECREIA G4.8–G5.1 — Macrofase de engenharia (Bíblia 0036)

**Data:** 14 novembro 2026 · **Estado:** DEMONSTRADO EM DESENVOLVIMENTO; ACEITAÇÃO WINDOWS PENDENTE; PRODUÇÃO NÃO PROMOVIDA.

Quatro fases foram implementadas e testadas num único executor de **staging SHADOW**:

| Etapa | Evidência real de desenvolvimento |
|---|---|
| G4.8 | Contrato externo entre o despachante G3.5 `core/omni25.py` e o catálogo independente V01 `gestor.py`. Ambos os originais preservados por SHA-256. |
| G4.9 | Quatro rotas técnicas `MAC`, `MPCVG`, `NCLE`, `GENOMICA→DNA_ATLAS` executaram; 21 entradas do catálogo permaneceram `BLOCKED`. Nenhum componente sem adaptador real foi ativado. |
| G5.0 | SQLite isolado V01: 4 linhas de metadados em `motores` e 4 recibos de execução **técnica sintética** em `execucoes`; `g1/g2/g3` mantidos `NAO_TESTADO`. |
| G5.1 | 7 controlos negativos PASS, abstenção (3 EXECUTED + 1 ABSTAINED + 21 BLOCKED), matriz de 25 posições e conciliação documental de 22 candidatos SHA-256 da G3.8. |

**Testes locais do pacote:** **40/40 PASS**, incluindo execução de ponta a ponta, verificação de arquivo de resultados por programa independente, integridade de fontes e base SQLite e recusas de adulteração.

### Verdade do inventário

25 entradas arquiteturais = **23 posições candidatas a motor científico + 1 coordenador + 1 gateway FONTES_GLOBAIS**. O alias GENOMICA aponta para DNA_ATLAS (DERKEIA 2.0.0-research), sem criar outra identidade científica. Há seis candidatos com código identificado mas integração ainda não demonstrada, e os restantes continuam por resolver. As 22 ocorrências forenses G3.8 não são 22 motores verificados.

### Fronteiras

- **Sem código-fonte científico no repositório público**; o pacote privado entregue ao utilizador mantém o código original.
- **Sem alterações ao registo ativo**, sem dados de doentes, sem fusão de motores.
- Ensaios com inputs **inteiramente sintéticos**, nenhum resultado clinicamente válido inferido.
- A pasta Windows planeada é `C:\DECREIA\OMNI_STAGING\OMNI_MACRO_G48_G51\RUN_...`, sempre um novo diretório.
- **Aceitação Windows e auditoria dos seus recibos ainda PENDENTES**.
- O despachante G3.5 usa subprocessos, mas não implementa uma sandbox de segurança do sistema operativo; executar apenas fontes conhecidas e verificadas.

**Próxima fase G5.2 (não iniciada):** auditoria individual das fontes completas dos seis motores identificados, sem stubs, aprovação automática ou alteração de governança.
