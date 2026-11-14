# DECREIA G4.7 — Fecho forense do gestor V01

**Data:** 2026-11-14 · **Bíblia:** 0035 · **Origem:** arquivo G4.7 fornecido pelo utilizador, não publicado.

## Identidade e integridade
- `gestor.py` recuperado, tamanho 16.102 bytes, SHA-256 `9b1efedfa457f46eff467b9f960dbd9d43bc869ff8f27d3a1a6ca67f70fbff9a`: confirmado por cálculo independente.
- CRC, SHA-256 dos recibos e AST: PASS.
- **22/22 verificações técnicas locais PASS**, abrangendo integridade, sintaxe, registo de metadados, SQLite temporário, ingestão artificial, quarentena e imutabilidade da fonte. Não representam validação científica.
- Cópia do código executada apenas em diretório temporário; **original e dados do Windows não alterados**.

## O que a fonte realmente faz
O `gestor.py` V01 é um **catálogo SQLite e controlo da qualidade de dados de saúde populacional**. As suas funções são `init`, `register_engine`, `ingest`, `report` e utilitários. A função `register_engine` apenas insere metadados em `motores`; não valida hash de motor nem cria/aciona adaptador.

Teste isolado: após `register_engine('GENOMICA','DNA_ATLAS','2.0.0-research',...)`, `g1=g2=g3=NAO_TESTADO` e `execucoes=0`. A importação de uma linha artificial gerou `VALIDADO_SINTETICO` e continuou com **zero execuções de motores**.

## Diferença estrutural comprovada
- `gestor.py` V01, hash `9b1efedf…f70fbff9a`: catálogo e proveniência, sem despacho.
- `core/omni25.py` G3.5, hash `86db03db…50688fa`: gestor de `registry.json`, resolução de adaptadores por SHA e `subprocess.run` de adaptadores registados, testado até agora só em SHADOW.

Não existem provas de que qualquer um esteja **ativo em produção**.

**Decisão:** não promover GENOMICA e não criar contagem adicional de motores. `DNA_ATLAS / DERKEIA 2.0.0-research` é o núcleo original; `GENOMICA` é alias arquitetural proposto. Propor G4.8 como ligação isolada e verificável entre orquestração G3.5 e catálogo V01, sem fusão de fontes e sem registo produtivo.

**Validacao científica externa:** NÃO DEMONSTRADA. **Uso clínico:** NÃO APROVADO. **Integração OMNI-25 de produção:** NOT_PROMOTED.

O pacote técnico privado `DECREIA_G4_7_FECHO_FORENSE_BIBLIA_0035.zip` contém o relatório integral, a Bíblia, a prova estruturada, o comparativo e o verificador reproduzível; não contém o original `gestor.py`.
