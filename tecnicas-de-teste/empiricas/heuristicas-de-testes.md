# Abordagem empírica

A abordagem empírica de testes exploratórios se baseia na experiência, intuição e habilidades do testador para encontrar defeitos e avaliar a qualidade do software. Diferente dos testes com abordagem sistemática, o teste exploratório permite que o testador descubra problemas conforme interage com o sistema, ajustando dinamicamente suas estratégias de teste.

## Testes exploratórios — Heurísticas de teste

Os testes exploratórios com heurísticas utilizam diretrizes e princípios gerais para guiar a exploração do sistema, ajudando os testadores a identificar possíveis falhas de forma mais estruturada. As heurísticas são atalhos mentais baseados em experiências passadas que ajudam a prever onde os defeitos podem ocorrer.

Se eu pedisse a você para testar uma aplicação que você nunca usou, como planejaria seus testes?

Bem provável que você iria elencar algumas categorias de ações genéricas que podem ser testadas, como por exemplo:

- Campos obrigatórios
- Habilitar / Desabilitar formulários
- Interrupção de ação
- Quebra de fluxos
- Usabilidade de menus
- Estouro de campos

### O que são as heurísticas de testes?

Heurísticas são processos que ocorrem naturalmente na mente do ser humano. Elas ajudam a solucionar problemas e tomar decisões em condições de incerteza, substituindo a forma complexa de fazer algo, por outra mais simples e ainda assim trazendo resultados satisfatórios.

Funcionam como um guia que auxiliam o testador a não esquecer de pontos-chave que precisam ser exercitados.

### `Heurística CHIQUE`

As heurísticas geralmente são construídas através de mnemônicos, como no exemplo a seguir, da heurística CHIQUE criada pelo Julio de Lima.

#### Significado do acrônimo CHIQUE

- **C – Campos obrigatórios:** Verificar se os campos obrigatórios estão devidamente identificados e impedem o envio de dados quando não preenchidos.
- **H – Habilitar / Desabilitar formulários:** Testar se botões, campos e opções são ativados ou desativados corretamente conforme as regras do sistema.
- **I – Interrupção de ação:** Simular ações interrompidas (fechar a página, atualizar, perder conexão) para verificar se o sistema mantém a integridade dos dados.
- **Q – Quebra de fluxos:** Realizar interações inesperadas, como voltar uma etapa, inserir dados inválidos ou fechar o modal antes de concluir uma ação.
- **U – Usabilidade de menus:** Avaliar se os menus e botões são intuitivos, acessíveis e se possuem comportamento esperado.
- **E – Estouro de campos:** Testar limites de caracteres e entradas longas para garantir que os campos aceitam apenas os dados permitidos sem falhas.

Podemos utilizar um dos princípios por ex: Campos obrigatórios, e separar um tempo 30 a 60 minutos para explorar parte da aplicação a ser definida.

### `Heurística CRUD`

Heurística: CRUD de James Martins, verifica a consistência dos dados, ex: cadastro de centro de custo.

#### Significado do acrônimo CRUD

- **C – Create (Criar - POST):** Testa a capacidade do sistema de criar novos registros corretamente, garantindo que os dados são inseridos no banco e refletidos na interface.
- **R – Read (Ler - GET):** Avalia se o sistema exibe corretamente os dados armazenados, garantindo que os filtros, buscas e paginação funcionam conforme esperado.
- **U – Update (Atualizar - PUT ou PATCH):** Verifica se o sistema permite modificar registros existentes sem perder ou corromper dados. Testes incluem validação de campos e regras de negócio.
- **D – Delete (Excluir - DELETE):** Testa a remoção de registros, assegurando que dados deletados não reaparecem e que o sistema lida corretamente com tentativas de acesso a registros excluídos.

### `Heurística VADER`

Heurística: VADER de Stuart Ashman, utilizada para testes de API.

Link: VADER: Heurística para teste de API na prática

#### Significado do acrônimo VADER

- **V – Verbos:** Verificar se a API retorna os valores corretos para diferentes entradas, incluindo códigos de status HTTP, headers e corpo da resposta.
- **A – Autenticação & Autorização:** Testar se a API exige credenciais corretas e se controla corretamente os acessos dos usuários.
- **D – Dados:** Avaliar se os dados retornados pela API estão corretos, completos e formatados de acordo com o esperado (JSON, XML, etc.).
- **E – Erros:** Testar como a API responde a entradas inválidas, falhas no servidor, timeouts e outros cenários de erro.
- **R – Responsividade:** Verificar como a API lida com alta carga, falhas de rede e degradação de serviços dependentes.

### `Heurística GOLDILOCKS`

Heurística: GOLDILOCKS de Elizabeth Hendrickson, foca em testes de campos da aplicação utilizando o conceito de:

#### Significado da heurística GOLDILOCKS

A ideia é testar um sistema com três tipos de entrada para verificar seu comportamento:

- **Pequeno demais** – Testa o sistema com valores mínimos ou vazios.
- **Grande demais** – Envia valores muito grandes para verificar limites.
- **No tamanho certo** – Usa valores dentro dos padrões esperados para garantir funcionamento correto.

### Heurística T-PAIN

#### Significado da heurística T-PAIN

Ela é composta por 5 características: Rotação, Permissões, Modo Avião, Interrupções e Conexões.

Mais detalhes Clique Aqui

#### Ro[T]ação (RoTation)

- Preencha informações na tela e rotacione o dispositivo:
  - As informações persistem?
  - Há sobreposição?
- Inicie um fluxo e rotacione o dispositivo:
  - O que acontece ao rotacionar no meio de uma requisição a um serviço web?
  - A aplicação se perde ao ser rotacionada?

#### [P]ermissões (App Permissions)

- Como o aplicativo se comporta ao não ter todas as permissões?
- O que acontece se ela perder as permissões durante o uso?
- As permissões solicitadas fazem sentido?

#### Modo [A]vião (Airplane Mode)

- O quão dependente o aplicativo está de conexões com a rede?
- Como a app se gerencia offline?

#### [I]nterrupções (Interruptions)

**Terceiras (Third-party):**

- Como o aplicativo se comporta quando o sistema escalona outras aplicações por cima da atual?
- E quando recebe uma chamada?
- E quando exibe uma notificação de prioridade 0?

**Sistêmicas (System-calls):**

- O que acontece quando o Android mata processos em background?
- Forçar parada com a aplicação em uso faz o quê com os processos?
- É possível reutilizar a app após removê-la da memória?
- O que acontece ao remover a cache com a aplicação em uso?

#### Co[N]exões (CoNnections)

- Como a app lida com um ping alto?
- E quando é uma conexão 2G ou 3G?
- Como o aplicativo reage a timeouts?

> **Nota:** Existem diversas outras heurísticas para explorar.
