# 📊 Dashboard ARGO - Métricas QA

Solução **HTML5 + CSS3 + Bootstrap 5 + JavaScript** para métricas essenciais de QA, com foco em rastreamento detalhado de falhas durante o ciclo completo de desenvolvimento.

## 🌐 Acesso

- **Dashboard Online**: [https://thiagosouza10.github.io/qa-metricas/dashboard.html](https://thiagosouza10.github.io/qa-metricas/dashboard.html)

## 🚀 Como Usar

1. **Acesse** o dashboard online ou abra `dashboard.html` localmente
2. **Preencha** os campos com as métricas do período
3. **Clique** em "Calcular Métricas"
4. **Visualize** o dashboard com gráficos e análises
5. **Gere PDF** na seção "Relatório" para apresentações

## 📊 Como Funciona o Score

O **Status Geral** é calculado através de um sistema de pontuação onde cada métrica que atinge sua meta adiciona **1 ponto** ao score total.

### Critérios de Pontuação (6 métricas)

1. **Taxa de Escape** ≤ 5%
2. **MTTR** ≤ 16 horas
3. **Taxa de Acerto** ≥ 85%
4. **Taxa de Sucesso dos Testes** ≥ 95%
5. **Bugs em Produção** (bugs fechados > bugs abertos)
6. **Aceitação de Histórias** ≥ 90%

### Classificação Final

- **EXCELENTE**: Score ≥ 5 pontos
- **BOM**: Score ≥ 3 pontos
- **ATENÇÃO**: Score ≥ 2 pontos
- **CRÍTICO**: Score < 2 pontos

## 📁 Estrutura do Projeto

```
qa-metricas/
├── dashboard.html          # Página principal
├── css/
│   └── dashboard.css      # Estilos
├── js/
│   ├── dashboard.js       # Lógica principal
│   ├── config/
│   │   └── constants.js   # Constantes
│   └── modules/
│       ├── DataCollector.js        # Coleta de dados
│       ├── MetricsCalculator.js    # Cálculos
│       └── AnalysisGenerator.js    # Análises
└── images/
    └── argo-logo.png
```

## ✨ Funcionalidades

- **Entrada Simples** - Preencha os valores das métricas
- **Cálculo Automático** - Sistema calcula métricas derivadas e score
- **Gráficos Interativos** - Visualizações com Chart.js
- **Status Visual** - EXCELENTE, BOM, ATENÇÃO, CRÍTICO
- **Análise Automática** - Pontos positivos e de atenção
- **PDF Profissional** - Relatórios prontos para apresentação

## 📊 Métricas Principais

- **Falhas durante o Ciclo** - Rastreamento por fase (Requisito, Pré-Release, Release, Bugs em Produção)
- **Taxa de Escape** - Percentual de bugs que escaparam dos testes e chegaram à produção (≤ 5%)
- **MTTR** - Tempo médio de resolução (≤ 16h)
- **Aceitação de Histórias** - Percentual aceito pelo PO (≥ 90%)
- **Taxa de Automação** - Percentual de testes automatizados
- **Taxa de Acerto** - Percentual de bugs válidos (≥ 85%)
- **Bugs em Produção** - Bugs fechados > bugs abertos (indica eficiência na correção)
- **Taxa de Sucesso dos Testes** ≥ 95% (Excelente: ≥95%, Boa: 85-95%, Monitorar: 75-85%, Alerta: <75%)
