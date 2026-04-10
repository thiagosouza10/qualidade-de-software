# 📊 Estimativa de Três Pontos (PERT) aplicada em QA

## 📌 O que é?

A **estimativa de três pontos** é uma técnica usada para tornar previsões de esforço mais realistas, considerando incertezas.

Ela é baseada no método **PERT (Program Evaluation and Review Technique)**.

---

## 🎯 Objetivo

Evitar estimativas irreais (muito otimistas) e incluir riscos no planejamento.

---

## 🧩 Os três cenários

Para cada tarefa, você define:

* **O (Otimista)** → Se tudo der certo
* **M (Mais provável)** → Cenário normal
* **P (Pessimista)** → Se ocorrerem problemas

---

## 🧮 Fórmula

```
E = (O + 4*M + P) / 6
```

### 📍 Explicação

* O valor mais provável (**M**) tem maior peso
* Isso torna a estimativa mais equilibrada

---

## 📊 Exemplo prático em QA

### Cenário:

Testar uma funcionalidade com:

* Criação de cenários
* Automação
* Execução de testes

### Estimativa:

* O = 2 dias
* M = 4 dias
* P = 8 dias

### Cálculo:

```
E = (2 + 4×4 + 8) / 6
E ≈ 4,33 dias
```

👉 Resultado: aproximadamente **4,3 dias**

---

## ⚠️ Boas práticas

* Sempre considerar:

  * Instabilidade de ambiente
  * Dependência de dados
  * Retrabalho
  * Bugs inesperados

* Use junto com:

  * Planning Poker
  * Histórico de sprints

* Evite:

  * Estimar apenas com base no melhor cenário

---

## ✅ Vantagens

* Mais precisão nas estimativas
* Melhor gestão de riscos
* Comunicação mais clara com stakeholders
* Redução de atrasos

---

## ❌ Desvantagens

* Pode levar mais tempo para estimar
* Depende da experiência do time

---

## 🧠 Dica final

Com o tempo, compare estimativas com o tempo real gasto.

Isso ajuda o time de QA a evoluir a previsibilidade e melhorar continuamente.