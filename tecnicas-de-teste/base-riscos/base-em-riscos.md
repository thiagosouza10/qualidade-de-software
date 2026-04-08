# Com base em riscos

## Conceitos básicos

O conceito de risco envolve a probabilidade de ocorrer algo tanto positivo quanto negativo. Nos testes, concentramos nossa atenção exclusivamente na identificação dos possíveis contratempos.

A abordagem consiste em identificar o maior número possível de riscos associados ao software e, em seguida, implementar estratégias de mitigação. A mitigação tem como objetivo evitar que os riscos se transformem em potenciais problemas.

## Identificando riscos

A identificação de riscos é uma etapa essencial para garantir a qualidade e a segurança de um projeto. Riscos são eventos que, caso ocorram, podem impactar negativamente o funcionamento do sistema, a experiência do usuário ou até mesmo a continuidade do negócio. Para mitigá-los, é fundamental identificá-los antecipadamente e tomar medidas preventivas.

Para identificar riscos de forma eficiente, é necessário seguir um processo estruturado, analisando diferentes aspectos da funcionalidade.

### Compreenda o contexto do card

Compreenda o card que será testado, seja um bug, nova funcionalidade ou melhoria.

> 🔎 **Dica:** Sempre pense "o que pode dar errado?" antes de testar um card. Isso ajudará a identificar riscos antes que cheguem ao usuário final. 🚀

### Algumas perguntas que podem ajudar

- O que a funcionalidade faz?
- Quem usa essa funcionalidade? – Qual o perfil do usuário?
- Onde ela será usada? – Web, mobile, API, sistema legado?
- Quais sistemas ou fluxos são impactados?
- O que pode dar errado ao usar essa funcionalidade?
- O que acontece se um usuário inserir dados incorretos ou inesperados?
- A funcionalidade lida bem com erros ou falhas?
- E se houver um grande volume de acessos simultâneos?
- O card afeta outra funcionalidade?
- Há dependências de API, banco de dados ou serviços externos?
- Há vazamento de dados sensíveis?
- O tempo de resposta está aceitável?
- Pode gerar sobrecarga no banco ou API?

### Identificação em equipe

A identificação dos riscos do produto pode ser realizada individualmente ou em grupo.

### Cenário de exemplo

Vamos imaginar que estamos com um card de melhoria na funcionalidade de disponibilidade do provedor TREND, onde API de disponibilidade do provedor será atualizada para a nova versão, e com essa mudança também será necessário uma alteração no banco de dados, tabela `solicitacaoLocacao` coluna Local de Retirada e Local de devolução, aumentando a quantidade de caracteres permitido.

A alteração no banco de dados foi realizada, expandindo o campo de 50 caracteres para `VARCHAR(MAX)`. Essa mudança foi necessária porque, de acordo com o provedor, alguns endereços podem ultrapassar 200 caracteres, exigindo maior flexibilidade no armazenamento.

Com base no cenário de exemplo, vamos identificar e analisar alguns possíveis riscos:

- **RISCO 1:** Campo Local de Retirada e Devolução impactar na API Soap, endpoint `recuperarSolicitacao`, retornando uma descrição maior que API pode suportar.
- **RISCO 2:** Campo Local de Retirada e Devolução impactar na API Rest, retornando uma descrição maior que API pode suportar.
- **RISCO 3:** Campo Local de Retirada e Devolução impactar na extração de relatórios, causando erro na extração ou no preenchimento.
- **RISCO 4:** Campo Local de Retirada e Devolução impactar na integração AIR
- **RISCO 5:** Campo Local de Retirada e Devolução impactar na integração Stur

Como podemos descrever um risco de maneira a avaliar sua gravidade? Existem métodos eficazes para determinar se um risco é mais ou menos grave.

## Classificando riscos

Após a identificação dos riscos, procedemos à classificação deles. Esse processo envolve a atribuição de valores de 1 a 5, sendo 1 indicativo de um nível baixíssimo e 5 representando um nível altíssimo. O impacto está associado ao potencial prejuízo, enquanto a probabilidade está vinculada à chance de o problema ocorrer.

### Classificando

**RISCO 1:** Campo Local de Retirada e Devolução impactar na API Soap, endpoint `recuperarSolicitacao`, retornando uma descrição maior que API pode suportar.

- **Probabilidade:** 4
- **Impacto:** 4

**RISCO 2:** Campo Local de Retirada e Devolução impactar na API Rest, retornando uma descrição maior que API pode suportar.

- **Probabilidade:** 3
- **Impacto:** 4

**RISCO 3:** Campo Local de Retirada e Devolução impactar na extração de relatórios, causando erro na extração ou no preenchimento.

- **Probabilidade:** 2
- **Impacto:** 4

**RISCO 4:** Campo Local de Retirada e Devolução impactar na integração AIR

- **Probabilidade:** 5
- **Impacto:** 5

**RISCO 5:** Campo Local de Retirada e Devolução impactar na integração Stur

- **Probabilidade:** 5
- **Impacto:** 5

### Nível do risco

A etapa final consiste em determinar o nível de risco por meio da avaliação do impacto em relação à probabilidade. Essa avaliação nos permite discernir e priorizar os riscos mais significativos, proporcionando uma abordagem mais eficaz na gestão dos mesmos.

**Fórmula do nível:** Probabilidade * Impacto = Nível

**RISCO 1:** Campo Local de Retirada e Devolução impactar na API Soap, endpoint `recuperarSolicitacao`, retornando uma descrição maior que API pode suportar.

- **Probabilidade:** 4
- **Impacto:** 4
- **Nível:** 16

**RISCO 2:** Campo Local de Retirada e Devolução impactar na API Rest, retornando uma descrição maior que API pode suportar.

- **Probabilidade:** 3
- **Impacto:** 4
- **Nível:** 12

**RISCO 3:** Campo Local de Retirada e Devolução impactar na extração de relatórios, causando erro na extração ou no preenchimento.

- **Probabilidade:** 2
- **Impacto:** 4
- **Nível:** 8

**RISCO 4:** Campo Local de Retirada e Devolução impactar na integração AIR

- **Probabilidade:** 5
- **Impacto:** 5
- **Nível:** 25

**RISCO 5:** Campo Local de Retirada e Devolução impactar na integração Stur

- **Probabilidade:** 5
- **Impacto:** 5
- **Nível:** 25

## Priorizando riscos

Finalmente, é essencial priorizá-los considerando o nível de risco associado a cada um, ordenando em ordem decrescente.

É crucial dar prioridade à gestão de riscos, começando sempre pelos que apresentam um nível mais elevado. Isso se justifica pelo fato de que, em fases avançadas de uma sprint ou projeto, o tempo disponível para lidar com todos os riscos pode ser limitado. É muito importante comunicar essa situação ao time, avaliando se é necessário tomar medidas adicionais para mitigar os riscos pendentes.

Ordem sugerida (do maior para o menor nível):

1. **RISCO 4:** Campo Local de Retirada e Devolução impactar na integração AIR — Probabilidade: 5, Impacto: 5, **Nível: 25**
2. **RISCO 5:** Campo Local de Retirada e Devolução impactar na integração Stur — Probabilidade: 5, Impacto: 5, **Nível: 25**
3. **RISCO 1:** Campo Local de Retirada e Devolução impactar na API Soap, endpoint `recuperarSolicitacao`, retornando uma descrição maior que API pode suportar. — Probabilidade: 4, Impacto: 4, **Nível: 16**
4. **RISCO 2:** Campo Local de Retirada e Devolução impactar na API Rest, retornando uma descrição maior que API pode suportar. — Probabilidade: 3, Impacto: 4, **Nível: 12**
5. **RISCO 3:** Campo Local de Retirada e Devolução impactar na extração de relatórios, causando erro na extração ou no preenchimento. — Probabilidade: 2, Impacto: 4, **Nível: 8**

## Mitigando riscos

Depois de identificar e classificar os riscos, é necessário definir estratégias para minimizá-los:

### RISCO 4

**RISCO 4:** Campo Local de Retirada e Devolução impactar na integração AIR

**Classificação**

- **Probabilidade:** 5
- **Impacto:** 5
- **Nível:** 25

**Mitigação**

- **Caso de Teste 1:** Deve gerar integração AIR com OS de locação online gerando as chaves de local de retirada e devolução com quantidade de caracteres acima de 200.

### RISCO 5

**RISCO 5:** Campo Local de Retirada e Devolução impactar na integração Stur

**Classificação**

- **Probabilidade:** 5
- **Impacto:** 5
- **Nível:** 25

**Mitigação**

- **Caso de Teste:** Deve gerar integração STUR com OS de locação online local de retirada e devolução com quantidade de caracteres acima de 200.

### RISCO 1

**RISCO 1:** Campo Local de Retirada e Devolução impactar na API Soap, endpoint `recuperarSolicitacao`, retornando uma descrição maior que API pode suportar.

**Classificação**

- **Probabilidade:** 4
- **Impacto:** 4
- **Nível:** 16

**Mitigação**

- **Caso de Teste 1:** Deve recuperar OS de locação online método `recuperarSolicitacao` interface 3 local de retirada e devolução com quantidade de caracteres acima de 200.
- **Caso de Teste 2:** Deve recuperar OS de locação online método `recuperarSolicitacao` interface 4 local de retirada e devolução com quantidade de caracteres acima de 200.
- **Caso de Teste 3:** Deve recuperar OS de locação online método `recuperarSolicitacao2` interface 3 local de retirada e devolução com quantidade de caracteres acima de 200.
- **Caso de Teste 4:** Deve recuperar OS de locação online método `recuperarSolicitacao2` interface 4 local de retirada e devolução com quantidade de caracteres acima de 200.

### RISCO 2

**RISCO 2:** Campo Local de Retirada e Devolução impactar na API Rest, retornando uma descrição maior que API pode suportar.

**Classificação**

- **Probabilidade:** 3
- **Impacto:** 4
- **Nível:** 12

**Mitigação**

- **Caso de Teste 1:** Deve recuperar OS de locação online endpoint requests API REST com local de retirada e devolução com quantidade de caracteres acima de 200.

### RISCO 3

**RISCO 3:** Campo Local de Retirada e Devolução impactar na extração de relatórios, causando erro na extração ou no preenchimento.

**Classificação**

- **Probabilidade:** 2
- **Impacto:** 4
- **Nível:** 8

**Mitigação**

- **Caso de Teste:** Deve extrair relatório padrão Locação de Veículo com informações do local de retirada e devolução.

## Conclusão

A identificação de riscos é uma prática muito importante para garantir um software de qualidade. Seguindo um processo estruturado e analisando diferentes aspectos da funcionalidade, é possível prevenir falhas antes que impactem o usuário final. Ao classificar os riscos por impacto e probabilidade, as equipes podem priorizar correções de forma eficiente, reduzindo custos e melhorando a experiência do usuário.
