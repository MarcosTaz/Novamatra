# Regras de integração DECREIA — NOVAMATRA

Para cada componente candidato, requerer:

1. **Identidade/proveniência:** função, classe e domínio atribuídos por leitura do código; SHA-256 da fonte; versões e dependências.
2. **Autonomia:** preservar fontes, identidade e testes próprios. Não unir MAC, MPCVG, NCLE, NEXUS nem outros núcleos.
3. **Contrato I/O isolado:** `component_id`, `request_id`, esquema de entrada, esquema de saída, timestamps, hashes, erros e motivo de abstenção.
4. **Execução real:** comprovativo de invocação do código original num ambiente controlado, com casos positivos e negativos e logs.
5. **Estado de evidência:** `DEMONSTRADO_ESCOPO_LIMITADO`, `PENDENTE`, `NAO_VALIDADO` ou `NAO_APTO_PARA_USO`. Não derivar validação clínica de testes unitários.
6. **Participação universal:** convocar todos os 24 motores candidatos para cada caso, mesmo quando a relevância é desconhecida; registar `ABSTAINED` ou `BLOCKED` com justificação em vez de forjar um resultado.
7. **Separação de funções:** Centro de Controlo é coordenador, não motor científico. Adapters, pipelines e testes não contam como motores.
8. **Não divulgação indevida:** preservar código-fonte privado e dados identificáveis fora das páginas públicas. Não efetuar contactos externos sem autorização específica.

Este documento define requisitos; não afirma que todos já estão implementados.
