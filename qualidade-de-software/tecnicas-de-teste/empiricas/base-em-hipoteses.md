# Abordagem empírica

A abordagem empírica de testes exploratórios se baseia na experiência, intuição e habilidades do testador para encontrar defeitos e avaliar a qualidade do software. Diferente dos testes com abordagem sistemática, o teste exploratório permite que o testador descubra problemas conforme interage com o sistema, ajustando dinamicamente suas estratégias de teste.

## Testes exploratórios — Com base em hipóteses

Os testes exploratórios com base em hipóteses combinam a abordagem exploratória com um direcionamento estruturado baseado em suposições sobre possíveis falhas do sistema. Essa abordagem permite que o testador foque em áreas críticas ou suspeitas, otimizando a busca por defeitos.

### Como funciona?

**Definição da hipótese** — o testador formula suposições sobre possíveis problemas no sistema, baseando-se em:

- Experiência prévia com sistemas semelhantes.
- Histórico de defeitos da aplicação.
- Conhecimento de regras de negócio.
- Padrões comuns de falha em software.

**Execução dos testes** — o testador explora a aplicação focando em validar ou refutar a hipótese. Durante esse processo, adapta seus testes conforme novas informações são descobertas.

**Análise e ajuste** — se a hipótese for confirmada (defeito encontrado), o testador aprofunda a investigação. Se nenhum problema encontrado, pode reformular a hipótese ou explorar outras possibilidades.

### `Exemplo 1`

- **Cenário:** Testando um sistema de login
- **Hipótese:** O sistema pode permitir login com senha incorreta após múltiplas tentativas.
- **Ação:** O testador tenta diferentes combinações de senha errada, seguidas de uma senha correta.
- **Resultado:** Se o sistema permitir o login incorretamente, a hipótese se confirma, e o problema precisa ser reportado.

### `Exemplo 2`

- **Cenário:** Cadastro de centro de custo no OBT Argo
- **Hipótese:** Se o usuário admin preencher os campos para cadastro do centro de custo e clicar em Salvar mais de uma única vez, o cadastro pode ser duplicado.
- **Ação 1:** Após preenchimento dos campos necessários para cadastro do centro de custo, clicar no botão salvar 2 vezes
- **Ação 2:** Após preenchimento dos campos necessários para cadastro do centro de custo, clicar no botão salvar 5 vezes..
- **Resultado:** Se o sistema permitir o cadastro do centro de custo duplicado, a hipótese se confirma, e o problema precisa ser reportado.
