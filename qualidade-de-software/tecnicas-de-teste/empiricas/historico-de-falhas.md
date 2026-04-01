# Abordagem empírica

A abordagem empírica de testes exploratórios se baseia na experiência, intuição e habilidades do testador para encontrar defeitos e avaliar a qualidade do software. Diferente dos testes com abordagem sistemática, o teste exploratório permite que o testador descubra problemas conforme interage com o sistema, ajustando dinamicamente suas estratégias de teste.

## Testes exploratórios — Histórico de falhas

Os testes exploratórios com base no histórico de falhas utilizam registros de defeitos passados para guiar e priorizar a exploração do sistema. Essa abordagem se baseia na ideia de que erros tendem a se repetir ou surgir em áreas que já apresentaram problemas antes.

Durante o ciclo de vida de um software ele passa por diversas falhas, onde essas são registradas como inconsistências para que sejam corrigidas. Esses registros são uma fonte rica de experiência que podem ser utilizadas para inspirar novos testes.

### Como funciona?

**Análise do histórico de defeitos**

- Revisar bugs reportados anteriormente (tickets no Jira, logs de erros, etc.).
- Identificar padrões, como módulos ou funcionalidades que frequentemente apresentaram problemas.

**Definição das áreas críticas**

- Funcionalidades que tiveram muitas correções.
- Partes do sistema que sofreram mudanças recentes.
- Áreas que tiveram falhas críticas no passado.

**Execução dos testes exploratórios**

- Focar a exploração nessas áreas, tentando reproduzir erros passados.
- Variar os cenários, alterando entradas, sequências de ações e fluxos alternativos.
- Observar se problemas antigos reaparecem ou se surgem novas falhas relacionadas.

### `Exemplo 1`

- **Cenário:** Cadastro de Centro de Custo
- **Histórico de falhas:** Relatos de cards passados é que estava sendo possível cadastrar um centro de custo sem a informação do campo código.
- **Hipótese:** O erro pode ocorrer ao pressionar o botão de salvar várias vezes rapidamente.
- **Ação:** O testador realiza a inclusão do centro de custo clicando no botão repetidamente e verifica se o cadastro será realizado sem o campo código.
- **Resultado:** Se ocorrer o cadastro, a falha persiste e deve ser corrigida. Caso contrário, o sistema pode ter sido ajustado corretamente.

### `Exemplo 2`

- **Cenário:** Disponibilidade de Hotel
- **Histórico de falhas:** Após efetuar uma disponibilidade de hospedagem, o popup com a mensagem “Pesquisando as melhores opções de hotéis nos provedores“ não é exibida quando utilizamos o browser Firefox.
- **Hipótese:** O erro pode ocorrer em uma versão específica do browser.
- **Ação 1:** Após efetuar uma disponibilidade com usuário solicitante do cliente pelo browser Firefox, foi identificado que o popup não está sendo apresentado.
- **Ação 2:** Foi validado também com usuário consultor da agência, e com esse, o popup foi apresentado conforme esperado.
- **Ação 3:** Foi validado também no browser Google Chrome, e com todos os usuários o popup foi apresentado conforme esperado.
- **Resultado:**
  - Firefox: V1
  - Chrome: V2
  - Foi aberta a inconsistência para o time avaliar o cenário com usuário solicitante pelo browser Firefox..
