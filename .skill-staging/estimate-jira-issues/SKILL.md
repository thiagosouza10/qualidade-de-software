---
name: estimate-jira-issues
description: Calcular estimativas de tres pontos para issues do Jira usando cenarios otimista, mais provavel e pessimista em horas, aplicar a formula PERT `(O + 4M + P) / 6`, validar os valores recebidos e converter o resultado para horas e minutos. Use quando Codex precisar estimar historias, tarefas, bugs ou outros itens do Jira, coletar tres cenarios de esforco, ou explicar o calculo PERT de forma transparente ao usuario.
---

# Estimar Issues do Jira

## Fluxo

1. Identificar a issue do Jira.
- Extrair a chave da issue do pedido quando ela ja estiver explicita.
- Pedir a chave somente se ela estiver ausente.
- Se o usuario nao tiver a chave, pedir um rotulo curto e informar que a estimativa nao esta vinculada a uma issue real.

2. Coletar tres valores em horas.
- Solicitar `otimista`, `mais provavel` e `pessimista`.
- Aceitar horas inteiras ou decimais.
- Aceitar virgula decimal e tratar `1,5` como `1.5`.
- Se algum valor estiver faltando, pedir apenas o que falta.

3. Validar os valores antes de calcular.
- Confirmar que os tres valores sao numericos.
- Confirmar que todos sao maiores ou iguais a zero.
- Confirmar a ordem `otimista <= mais provavel <= pessimista`.
- Se a ordem estiver inconsistente, nao reordenar sozinho; pedir correcao ou confirmacao.

4. Calcular a estimativa PERT.
- Executar `python scripts/calculate_pert.py --optimistic <O> --most-likely <M> --pessimistic <P>`.
- Adicionar `--issue <ISSUE>` quando houver uma chave ou rotulo da issue.
- Preferir o script sempre que os valores ja estiverem disponiveis para manter o calculo deterministico.

5. Converter o resultado para horas e minutos.
- Usar o valor retornado pelo script.
- Informar que a conversao para minutos usa arredondamento para o minuto mais proximo.

6. Responder de forma transparente.
- Repetir a issue identificada.
- Mostrar os tres valores recebidos.
- Mostrar a formula substituida pelos numeros.
- Informar o resultado em horas decimais e em horas/minutos.

## Script

Usar `scripts/calculate_pert.py` para evitar erros de arredondamento e padronizar a saida.

Exemplo:

```bash
python scripts/calculate_pert.py --issue ABC-123 --optimistic 2 --most-likely 3.5 --pessimistic 6
```

O script retorna JSON com:

- `issue`
- `optimistic_hours`
- `most_likely_hours`
- `pessimistic_hours`
- `formula`
- `calculation`
- `pert_hours`
- `pert_hours_display`
- `total_minutes`
- `formatted_duration`

## Formato de resposta

Responder em linguagem direta e sem esconder o calculo.

Modelo:

```text
Issue: ABC-123
Otimista: 2h
Mais provavel: 3,5h
Pessimista: 6h
Calculo PERT: (2 + 4 x 3,5 + 6) / 6 = 3,67h
Resultado convertido: 3h 40min
```

## Limites

- Nao inventar chave de Jira.
- Nao consultar Jira automaticamente sem uma integracao local explicita.
- Nao arredondar as horas decimais antes de converter para minutos; usar o valor PERT completo retornado pelo script.
