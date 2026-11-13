# NOVAMATRA C4 — V0.1 (laboratório computacional)

**C4 = Coordinated Four-Corner Active Suspension.** Projeto NOVAMATRA de mobilidade automóvel; investigação interna, sem validação em veículo, homologação, reivindicação de patente ou produto comercial disponível.

## Objetivo

Investigar se um controlador coordenado de quatro atuadores consegue reduzir movimentos verticais, rolagem e arfagem de uma carroçaria relativamente a um sistema passivo, sem sacrificar estabilidade, curso ou eficiência energética. Os parâmetros de referência são **hipóteses de simulação**, não dados recolhidos de um automóvel real.

## Arquitetura experimental V0.1

- Modelo linear vertical de 7 graus de liberdade: massa suspensa (z, rolagem, arfagem) + quatro massas não suspensas.
- Cenário de duas lombas suaves em faixas diferentes, atraso geométrico entre os eixos de um carro em movimento.
- Comparador passivo e controlo ativo proporcional-derivativo sobre coordenadas da carroçaria, com alocação de esforços, saturação e limitação da taxa de mudança.
- Métricas instrumentadas: RMS de aceleração vertical, RMS de rolagem e arfagem, força máxima de atuação, variação máxima de força no pneu e trabalho mecânico absoluto dos atuadores.
- Integração numérica determinística e testes automatizados.

**Limitações:** não modela perda de contacto do pneu, transferência de carga real, dinâmica lateral/longitudinal, curso máximo de cada suspensão, atraso/sensores, calor, eletrónica, consumo elétrico nem falhas de atuador. O indicador de trabalho mecânico NÃO é consumo de bateria. Nenhum resultado é evidência de aptidão para estrada.

## Execução (Python 3.10+, sem dependências externas)

Executar a partir de research/c4:

    python -m unittest discover -s tests -v
    python -m c4.model

Outputs: outputs/metrics.json, outputs/passive.csv, outputs/c4.csv. Executar sempre os dois sistemas com exatamente os mesmos parâmetros, perfil e passo temporal.

## Critérios de progressão

1. Confirmar modelo 7-DOF e unidades pela revisão independente; comparar com solução analítica simples e convergência temporal.
2. Implementar referência semiativa e skyhook, adicionar balanço de forças e contacto pneu/solo.
3. Acrescentar limites de curso, atuadores realistas, eficiência e falhas seguras.
4. Ensaios de várias estradas, velocidades, cargas e robustez; só aceitar vantagem com métricas e intervalos definidos previamente.
5. Rever patentes e confidencialidade **antes de revelar qualquer invenção própria**.
6. Após validação computacional, construir bancada de 1 roda e depois bancada de 4 rodas. Sem testes em estrada antes de avaliação de segurança apropriada.

## Produto e direitos

Possíveis saídas: licença de algoritmo de controlo, sistema de controlo e integração ou conjunto completo, **apenas se** houver diferença mensurável face ao estado da técnica e direitos de exploração confirmados. Nenhum contacto externo autorizado nesta fase.
