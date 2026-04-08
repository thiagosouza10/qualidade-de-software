# `Métricas de qualidade – QA`

Este conjunto de métricas tem como objetivo monitorar a efetividade dos testes, reduzir riscos em produção e garantir previsibilidade e qualidade nas entregas.

## `Taxa de escape (≤ 5%)`

**O que mede:** Percentual de defeitos que não foram identificados durante os testes e chegaram ao ambiente de produção.

**Por que é importante:** Indica a efetividade do processo de QA. Quanto menor a taxa, maior a capacidade do time de detectar problemas antes do release.

## `MTTR – Mean Time To Repair (≤ 16 horas)`

**O que mede:** Tempo médio necessário para corrigir um defeito após sua identificação.

**Por que é importante:** Avalia a agilidade do time em responder a falhas, especialmente as que impactam o usuário final.

## `Taxa de acerto (≥ 85%)`

**O que é:** Percentual de bugs reportados que são realmente bugs válidos.

**Como calcular:** (Bugs Válidos ÷ Total de Reports) × 100

**Exemplo:** 85 bugs válidos de 100 reports: 85 ÷ 100 × 100 = 85%

**Meta:** Maior que 85% — indica precisão na identificação de bugs

## `Taxa de sucesso dos testes (≥ 90%)`

**O que mede:** Percentual de testes executados que finalizam com sucesso em relação ao total de testes planejados.

**Por que é importante:** Indica a estabilidade do sistema e a maturidade do ambiente de testes.

## `Bugs em produção`

**O que mede:** A relação entre defeitos resolvidos e novos defeitos identificados em produção.

**Por que é importante:** Mostra se o time está reduzindo o passivo de problemas ou acumulando dívida técnica.

## `Aceitação de histórias (≥ 90%)`

**O que mede:** Percentual de histórias de usuário aceitas sem reprovação ou necessidade de retrabalho após validação de QA e/ou PO.

**Por que é importante:** Indica qualidade na entrega, alinhamento entre negócio, desenvolvimento e QA.
