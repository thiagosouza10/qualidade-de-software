---
name: estimate-jira-tres-pontos
description: Calcular estimativas de tres pontos usando cenarios otimista, mais provavel e pessimista em horas, aplicar a formula PERT `(O + 4*M + P) / 6`, validar os valores recebidos e converter o resultado para horas e minutos.
---

# Estimar Issues do Jira

## Fluxo

1. Coletar tres valores em horas.
- Solicitar `otimista`, `mais provavel` e `pessimista`.
- Aceitar horas inteiras ou decimais.
- Aceitar virgula decimal e tratar `1,5` como `1.5`.
- Se algum valor estiver faltando, pedir apenas o que falta.

2. Validar os valores antes de calcular.
- Confirmar que os tres valores sao numericos.
- Confirmar que todos sao maiores ou iguais a zero.
- Confirmar a ordem `otimista <= mais provavel <= pessimista`.
- Se a ordem estiver inconsistente, nao reordenar sozinho; pedir correcao ou confirmacao.

3. Calcular a estimativa PERT.
- Executar a formula `(O + 4*M + P) / 6` usando os valores recebidos.

4. Responder de forma transparente.
- Mostrar os tres valores recebidos.
- Mostrar a formula substituida pelos numeros.
- Informar que a conversao para minutos usa arredondamento para o minuto mais proximo
- Informar o resultado em horas decimais e em horas/minutos.

## Formato de resposta

Responder em linguagem direta e sem esconder o calculo.

Modelo:

```text
Otimista: 2h
Mais provavel: 3,5h
Pessimista: 6h
Calculo PERT: (2 + 4 x 3,5 + 6) / 6 = 3,67h
Resultado: 3h 40min
```