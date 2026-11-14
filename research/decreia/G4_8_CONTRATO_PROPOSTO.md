# DECREIA — G4.8: contrato entre catálogo e orquestração (proposta, não executada)

**Estado:** DRAFT / NOT_IMPLEMENTED. Nenhuma alteração à infraestrutura produtiva autorizada.

Arquitetura em duas camadas:
1. **Orquestração em SHADOW:** G3.5 `core/omni25.py`, com adaptadores explicitamente registados, SHA-256 e I/O validado.
2. **Catálogo V01:** `gestor.py` e SQLite, apenas metadados, proveniência, execução registada após recibo, qualidade e versões; não executa motores.

Identidade: motor canónico `DNA_ATLAS`, origem `DERKEIA/2.0.0-research`, alias arquitetural `GENOMICA`. O alias não conta como novo motor.

Princípios de implementação futura: 0 fusões de código; entrada/saída com hash; rejeição de hashes divergentes; estados `EXECUTED`/`ABSTAINED`/`BLOCKED` rastreáveis; registros do catálogo não criam `EXECUTED` por si; dados sintéticos somente na fase de integração; sem dados clínicos; nenhuma modificação em produção sem autorização.

**Critérios pendentes:** construir contrato de ligação externo às duas fontes, executar regressão isolada no Windows, inventariar serviço/instância real, solicitar autorização específica para futura promoção, manter validação científica distinta.
