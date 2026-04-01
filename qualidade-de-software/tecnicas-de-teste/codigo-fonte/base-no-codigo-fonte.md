# Base no código-fonte

## Conceitos básicos

Existem várias abordagens para determinar o que deve ser testado. Neste momento, abordaremos a identificação com base no código fonte da aplicação. Isso implica analisar pequenos trechos de código e definir quais testes são necessários para abranger de forma adequada cada trecho.

Os testes de código desempenham o papel de contratos, destinados a assegurar a validação contínua de que um trecho de código mantenha seu funcionamento conforme previsto desde o momento em que o teste foi concebido. Esse tipo de teste é de responsabilidade dos desenvolvedores, mas podemos auxiliá-los na identificação dos pontos a serem testados.

## Como são escritos

Analisamos a parte específica do código que desejamos abranger, geralmente um método, e elaboramos testes para garantir sua cobertura. A intenção é exercitar todas as linhas do método com a menor quantidade de testes necessários.

Neste contexto, é crucial focarmos na cobertura, deixando de lado a análise detalhada do comportamento.

### Exemplo 1

**Método:** `multiplicarNumeroPorDois`

```Java
public int multiplicarNumeroPorDois(int numero) {
      return numero * 2
}
```

Teste de unidade (JUnit ferramenta de automação)

```Java
@Test
public void testMultiplicarNumeroPorDois() {
      int resultado = multiplicarNumeroPorDois(2000);
      assertEquals(4000, resultado);
}
```

Assim que o teste automatizado é bem-sucedido, ele estabelece um contrato. Portanto, ao realizar qualquer modificação no método, executamos os testes para garantir que o método não tenha sido comprometido.

## Como identificar o que testar

### Cobertura de sentença

Em testes de software refere-se a uma métrica usada para avaliar o quão bem as sentenças (linhas de código) de um programa foram executadas durante a execução de testes. Essa cobertura geralmente é medida em termos percentuais e indica a porcentagem de sentenças que foram exercitadas durante a execução de casos de teste.

A ideia por trás da cobertura de sentença é garantir que todas as instruções no código-fonte sejam testadas pelo menos uma vez.

#### Exemplo 1

A cobertura de sentença refere-se à abrangência das linhas de um método. Ao analisarmos um método composto por 5 linhas de código, o objetivo é executar todas essas linhas com a menor quantidade possível de testes.

Se, por exemplo, realizarmos um teste que cobre apenas 3 linhas, teremos uma cobertura de 60%. Esse percentual é calculado em relação ao total de linhas no método.

A questão que surge é: quais testes precisamos executar para garantir a cobertura de todas as linhas do código?

```Java
public boolean maiorDeIdade (int idade) {
    boolean _idade = false;
    if (idade > 17) {
       _idade = true;
    }
    return _idade;
}
```

```Java
@Test
public void testMaiorDeIdade () {
    boolean resultado = maiorDeIdade(18);
    assertTrue(resultado);
}
```

#### Exemplo 2

Quais testes precisamos executar para garantir a cobertura de todas as linhas do código?

```Java
public boolean valorValido (int valor) {
    if (valor > 0) {
       if (valor <= 7000) {
          return true;
       }
    }
    throw new Exception("Valores abaixo de 0,01 são proibidos");
}
```

```Java
@Test
public void testValorValido() {
    boolean resultado = valorValido(0,00);
    assertTrue("Valores abaixo de 0,01 são proibidos");
}
```

```Java
@Test
public void testValorValido() {
    boolean resultado = valorValido(7000);
    assertTrue(resultado);
}
```

### Cobertura de decisão

A técnica de cobertura de decisão, é uma abordagem utilizada em testes de software para avaliar se todas as decisões lógicas do código foram exercitadas durante a execução dos testes. Uma decisão lógica geralmente ocorre em estruturas condicionais, como instruções "if" e "switch" em linguagens de programação.

A ideia por trás da cobertura de decisão é garantir que todas as ramificações possíveis em estruturas condicionais tenham sido testadas. Isso inclui a execução tanto do bloco de código dentro de uma condição "verdadeira" quanto do bloco dentro de uma condição "falsa".

#### Exemplo 1

A ideia é exercitar as condicionais validando a condicional do if (), validando quando for verdadeiro e quando for falso.

Para esse cenário vamos criar 2 testes, o primeiro para exercitar o valor true da condicional if, passando o valor

```Java
public boolean maiorDeIdade (int idade) {
    boolean _idade = false;
    if (idade > 17) {
       _idade = true;
    }
    return _idade;
}
```

Para esse cenário vamos criar 2 testes, o primeiro para exercitar o valor true da condicional if, passando o valor 18, dessa forma a condição é verdadeira e vai entrar dentro do if.

```Java
@Test
public void testMaiorDeIdade () {
    boolean resultado = maiorDeIdade(18);
    assertTrue(resultado);
}
```

O segundo teste vai exercitar o valor false, passando o valor 17, dessa forma a condição é falsa 17 > 17, e dessa forma conseguimos validar a cobertura de decisão true e false.

```Java
@Test
public void testMaiorDeIdade () {
    boolean resultado = maiorDeIdade(17);
    assertFalse(resultado);
}
```

#### Exemplo 2

```Java
public boolean valorValido (int valor) {
    if (valor > 0) {
       if (valor <= 7000) {
          return true;
       }
    }
    throw new Exception("Valores abaixo de 0,01 são proibidos");
}
```

Sugestão, começar a validar sempre pelo último if quando o código estiver if sobre if, validando como true o segundo if. Automaticamente já validamos como true também o primeiro if.

```Java
@Test
public void testValorValido() {
    boolean resultado = valorValido(7000);
    assertTrue(resultado);
}
```

Validando o segundo condicional if () como false

```Java
@Test
public void testValorValido() {
    boolean resultado = valorValido(7000,01);
    assertFalse("Valores abaixo de 0,01 são proibidos");
}
```

Validando o primeiro condicional if () como false

```Java
@Test
public void testValorValido() {
    boolean resultado = valorValido(0,00);
    assertFalse("Valores abaixo de 0,01 são proibidos");
}
```
