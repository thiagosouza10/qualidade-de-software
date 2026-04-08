/**
 * Dashboard de Métricas QA - Nova Versão - JavaScript Principal
 * Funcionalidades para entrada de dados, cálculo de métricas e geração de relatórios
 */

// Usar módulos globais se disponíveis (carregados via script tags)
// Os módulos se disponibilizam globalmente via window.DataCollector, etc.
const DataCollector = window.DataCollector;
const MetricsCalculator = window.MetricsCalculator;
const AnalysisGenerator = window.AnalysisGenerator;

class QADashboardNova {
    constructor() {
        this.metricas = {};
        this.charts = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCharts();
        this.updateDateTime();
    }

    bindEvents() {
        // Botão calcular métricas
        document.getElementById('calcular-metricas').addEventListener('click', () => {
            this.calcularMetricas();
        });

        // Botão limpar dados
        document.getElementById('limpar-dados').addEventListener('click', () => {
            this.limparDados();
        });

        // Botões de geração de relatório
        document.getElementById('gerar-pdf').addEventListener('click', () => {
            this.gerarPDF();
        });

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    calcularMetricas() {
        // Coletar dados do formulário usando DataCollector se disponível, senão usar implementação inline
        if (DataCollector && typeof DataCollector.collectFormData === 'function') {
            this.metricas = DataCollector.collectFormData();
        } else {
            // Fallback: implementação inline original
            this.metricas = {
                falhaRequisito: parseInt(document.getElementById('falha-requisito').value) || 0,
                falhaManualPreRelease: parseInt(document.getElementById('falha-manual-pre-release').value) || 0,
                falhaAutomatizadaPreRelease: parseInt(document.getElementById('falha-automatizada-pre-release').value) || 0,
                falhaManualRelease: parseInt(document.getElementById('falha-manual-release').value) || 0,
                falhaAutomatizadaRelease: parseInt(document.getElementById('falha-automatizada-release').value) || 0,
                falhaProducao: parseInt(document.getElementById('falha-producao').value) || 0,
                taxaEscape: parseFloat(document.getElementById('taxa-escape').value) || 0,
                mttr: parseFloat(document.getElementById('mttr').value) || 0,
                historiasTotais: parseInt(document.getElementById('historias-totais').value) || 0,
                historiasAceitas: parseInt(document.getElementById('historias-aceitas').value) || 0,
                taxaAutomacao: parseFloat(document.getElementById('taxa-automacao').value) || 0,
                taxaAcerto: parseFloat(document.getElementById('taxa-acerto').value) || 0,
                defectsAbertos: parseInt(document.getElementById('defeitos-abertos').value) || 0,
                defectsFechados: parseInt(document.getElementById('defeitos-fechados').value) || 0,
                bugsAbertos: parseInt(document.getElementById('bugs-abertos').value) || 0,
                bugsFechados: parseInt(document.getElementById('bugs-fechados').value) || 0,
                falhaPrioridadeTrivial: parseInt(document.getElementById('falha-prioridade-trivial').value) || 0,
                falhaPrioridadeMedia: parseInt(document.getElementById('falha-prioridade-media').value) || 0,
                falhaPrioridadeGravissima: parseInt(document.getElementById('falha-prioridade-gravissima').value) || 0,
                falhaPrioridadeCritica: parseInt(document.getElementById('falha-prioridade-critica').value) || 0,
                bugPrioridadeTrivial: parseInt(document.getElementById('bug-prioridade-trivial').value) || 0,
                bugPrioridadeMedia: parseInt(document.getElementById('bug-prioridade-media').value) || 0,
                bugPrioridadeGravissima: parseInt(document.getElementById('bug-prioridade-gravissima').value) || 0,
                bugPrioridadeCritica: parseInt(document.getElementById('bug-prioridade-critica').value) || 0,
                testesCriados: parseInt(document.getElementById('testes-criados').value) || 0,
                testesExecutados: parseInt(document.getElementById('testes-executados').value) || 0,
                testesPassaram: parseInt(document.getElementById('testes-passaram').value) || 0,
                testesAutomatizados: parseInt(document.getElementById('testes-automatizados').value) || 0,
                equipeResponsavel: document.getElementById('equipe-responsavel')?.value || 'Time QA',
                periodoAnalise: document.getElementById('periodo-analise')?.value || 'Últimos 30 dias',
                observacoes: document.getElementById('observacoes')?.value || '',
                dataGeracao: new Date().toLocaleString('pt-BR')
            };
        }

        // Calcular métricas derivadas
        this.calcularMetricasDerivadas();

        // Atualizar dashboard
        this.atualizarDashboard();

        // Mostrar dashboard
        this.mostrarDashboard();

        // Scroll para dashboard
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    }

    calcularMetricasDerivadas() {
        // Usar MetricsCalculator se disponível, senão usar implementação inline
        if (MetricsCalculator && typeof MetricsCalculator.calculateDerivedMetrics === 'function') {
            this.metricas = MetricsCalculator.calculateDerivedMetrics(this.metricas);
            this.metricas.statusAceitacaoHistorias = MetricsCalculator.classifyAceitacaoHistorias(this.metricas.aceitacaoHistorias);
            this.metricas.statusTaxaSucessoTestes = MetricsCalculator.classifyTaxaSucessoTestes(this.metricas.taxaSucessoTestes);
            this.metricas.statusGeral = MetricsCalculator.classifyStatus(MetricsCalculator.calculateScore(this.metricas));
        } else {
            // Fallback: implementação inline original
            this.metricas.totalFalhas = 
                this.metricas.falhaRequisito +
                this.metricas.falhaManualPreRelease +
                this.metricas.falhaAutomatizadaPreRelease +
                this.metricas.falhaManualRelease +
                this.metricas.falhaAutomatizadaRelease +
                this.metricas.falhaProducao;

            const { bugsAbertos, bugsFechados, defectsAbertos, defectsFechados } = this.metricas;
            const totalBugs = bugsAbertos + bugsFechados;
            const totalDefects = defectsAbertos + defectsFechados;

            this.metricas.taxaCorrecaoBugs = totalBugs > 0 ? (bugsFechados / totalBugs) * 100 : 0;
            this.metricas.taxaCorrecaoDefects = totalDefects > 0 ? (defectsFechados / totalDefects) * 100 : 0;

            const { historiasTotais, historiasAceitas } = this.metricas;
            this.metricas.aceitacaoHistorias = historiasTotais > 0 ? (historiasAceitas / historiasTotais) * 100 : 0;
            this.metricas.statusAceitacaoHistorias = this.classificarAceitacaoHistorias(this.metricas.aceitacaoHistorias);

            const { testesExecutados, testesPassaram } = this.metricas;
            this.metricas.taxaSucessoTestes = testesExecutados > 0 ? (testesPassaram / testesExecutados) * 100 : 0;
            this.metricas.statusTaxaSucessoTestes = this.classificarTaxaSucessoTestes(this.metricas.taxaSucessoTestes);

            this.metricas.statusGeral = this.calcularStatusGeral();
        }

        // Pontos positivos e de atenção usando AnalysisGenerator se disponível
        if (AnalysisGenerator && typeof AnalysisGenerator.generatePositivePoints === 'function') {
            this.metricas.pontosPositivos = AnalysisGenerator.generatePositivePoints(this.metricas);
            this.metricas.pontosAtencao = AnalysisGenerator.generateAttentionPoints(this.metricas);
        } else {
            // Fallback: implementação inline original
            this.metricas.pontosPositivos = this.gerarPontosPositivos();
            this.metricas.pontosAtencao = this.gerarPontosAtencao();
        }
    }

    calcularStatusGeral() {
        // Usar MetricsCalculator se disponível
        if (MetricsCalculator && typeof MetricsCalculator.calculateScore === 'function') {
            const score = MetricsCalculator.calculateScore(this.metricas);
            return MetricsCalculator.classifyStatus(score);
        }
        
        // Fallback: implementação inline original
        const score = this.calcularScoreAtual();
        if (score >= 5) return 'EXCELENTE';
        if (score >= 3) return 'BOM';
        if (score >= 2) return 'ATENCAO';
        return 'CRITICO';
    }

    calcularScoreAtual() {
        // Usar MetricsCalculator se disponível
        if (MetricsCalculator && typeof MetricsCalculator.calculateScore === 'function') {
            return MetricsCalculator.calculateScore(this.metricas);
        }
        
        // Fallback: implementação inline original
        let score = 0;
        const metas = {
            taxaEscape: 5,
            mttr: 16,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 95
        };

        if (this.metricas.taxaEscape <= metas.taxaEscape) score += 1;
        if (this.metricas.mttr <= metas.mttr) score += 1;
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) score += 1;
        if (this.metricas.taxaSucessoTestes >= metas.taxaSucessoTestes) score += 1;
        if (this.metricas.bugsFechados > this.metricas.bugsAbertos) score += 1;
        if (this.metricas.aceitacaoHistorias >= 90) score += 1;

        return score;
    }

    classificarAceitacaoHistorias(percentual) {
        if (percentual >= 90) return 'EXCELENTE';
        if (percentual >= 80) return 'BOM';
        if (percentual >= 70) return 'ATENCAO';
        return 'CRITICO';
    }

    classificarTaxaSucessoTestes(percentual) {
        if (percentual >= 95) return 'EXCELENTE';
        if (percentual >= 85) return 'BOM';
        if (percentual >= 75) return 'MONITORAR';
        return 'ALERTA';
    }

    gerarPontosPositivos() {
        // Usar AnalysisGenerator se disponível
        if (AnalysisGenerator && typeof AnalysisGenerator.generatePositivePoints === 'function') {
            return AnalysisGenerator.generatePositivePoints(this.metricas);
        }
        
        // Fallback: implementação inline original
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 16,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 95
        };

        if (this.metricas.taxaEscape <= metas.taxaEscape) {
            pontos.push('Taxa de escape dentro da meta');
        }
        if (this.metricas.mttr <= metas.mttr) {
            pontos.push('MTTR dentro do esperado');
        }
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) {
            pontos.push('Excelente taxa de acerto');
        }
        if (this.metricas.taxaSucessoTestes >= metas.taxaSucessoTestes) {
            pontos.push('Taxa de sucesso dos testes dentro da meta');
        }
        if (this.metricas.falhaProducao === 0) {
            pontos.push('Nenhuma falha em produção');
        }
        if (this.metricas.totalFalhas > 0 && this.metricas.falhaProducao === 0) {
            pontos.push('Todas as falhas identificadas antes da produção');
        }
        if (this.metricas.aceitacaoHistorias >= 90) {
            pontos.push('Excelente aceitação de histórias de usuário');
        } else if (this.metricas.aceitacaoHistorias >= 80) {
            pontos.push('Boa aceitação de histórias de usuário');
        }

        return pontos.length > 0 ? pontos : ['Métricas em análise'];
    }

    gerarPontosAtencao() {
        // Usar AnalysisGenerator se disponível
        if (AnalysisGenerator && typeof AnalysisGenerator.generateAttentionPoints === 'function') {
            return AnalysisGenerator.generateAttentionPoints(this.metricas);
        }
        
        // Fallback: implementação inline original
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 16,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 95
        };

        if (this.metricas.taxaEscape > metas.taxaEscape) {
            pontos.push('Taxa de escape acima da meta');
        }
        if (this.metricas.mttr > metas.mttr) {
            pontos.push('MTTR acima do esperado');
        }
        if (this.metricas.taxaAcerto < metas.taxaAcerto) {
            pontos.push('Taxa de acerto abaixo da meta');
        }
        if (this.metricas.taxaSucessoTestes < metas.taxaSucessoTestes) {
            pontos.push('Taxa de sucesso dos testes abaixo da meta');
        }
        if (this.metricas.falhaProducao > 0) {
            pontos.push(`Falhas em produção detectadas: ${this.metricas.falhaProducao}`);
        }
        if (this.metricas.falhaRequisito > 0) {
            pontos.push(`Falhas de requisito detectadas: ${this.metricas.falhaRequisito}`);
        }
        if (this.metricas.bugsAbertos > 0) {
            pontos.push(`Bugs abertos em produção: ${this.metricas.bugsAbertos}`);
        }
        if (this.metricas.bugsFechados <= this.metricas.bugsAbertos && (this.metricas.bugsAbertos > 0 || this.metricas.bugsFechados > 0)) {
            pontos.push(`Bugs em produção: fechados (${this.metricas.bugsFechados}) não superam abertos (${this.metricas.bugsAbertos})`);
        }
        // Função para formatar valores igual ao gráfico Comparação Métricas VS Metas
        const formatMetricValue = (value) => {
            let formattedValue = value.toFixed(2);
            // Remove zeros desnecessários no final
            formattedValue = parseFloat(formattedValue).toString();
            // Garante pelo menos uma casa decimal quando for inteiro
            if (!formattedValue.includes('.')) {
                formattedValue = value.toFixed(1);
            }
            return formattedValue;
        };

        if (this.metricas.aceitacaoHistorias < 90) {
            if (this.metricas.aceitacaoHistorias < 70) {
                pontos.push(`Aceitação de histórias crítica: ${formatMetricValue(this.metricas.aceitacaoHistorias)}%`);
            } else if (this.metricas.aceitacaoHistorias < 80) {
                pontos.push(`Aceitação de histórias requer atenção: ${formatMetricValue(this.metricas.aceitacaoHistorias)}%`);
            } else {
                pontos.push(`Aceitação de histórias abaixo do excelente: ${formatMetricValue(this.metricas.aceitacaoHistorias)}%`);
            }
        }

        return pontos.length > 0 ? pontos : ['Todas as métricas dentro das metas'];
    }

    atualizarDashboard() {
        // Atualizar avisos e parabéns para falhas
        this.atualizarAvisosFalhas();

        // Taxa de Escape
        document.getElementById('taxa-escape-valor').textContent = `${this.metricas.taxaEscape}%`;
        
        // MTTR
        document.getElementById('mttr-valor').textContent = `${this.metricas.mttr}h`;
        
        // Aceitação de História de Usuário
        const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
        document.getElementById('aceitacao-historias-valor').textContent = `${aceitacaoHistorias.toFixed(1)}%`;
        const statusAceitacao = this.metricas.statusAceitacaoHistorias || 'BOM';
        const statusElementAceitacao = document.getElementById('aceitacao-historias-status');
        if (statusElementAceitacao) {
            statusElementAceitacao.innerHTML = `<span class="badge badge-status ${this.getStatusClass(statusAceitacao)}">${statusAceitacao}</span>`;
        }
        // Atualizar classe do valor baseado no status
        const valorElementAceitacao = document.getElementById('aceitacao-historias-valor');
        valorElementAceitacao.className = `metric-value ${this.getStatusClassMetric(statusAceitacao)}`;
        
        // Taxa de Automação
        document.getElementById('automacao-valor').textContent = `${this.metricas.taxaAutomacao}%`;
        
        // Taxa de Acerto
        document.getElementById('acerto-valor').textContent = `${this.metricas.taxaAcerto}%`;

        // Defects vs Bugs
        document.getElementById('defects-fechados-valor').textContent = this.metricas.defectsFechados;
        document.getElementById('defects-abertos-valor').textContent = this.metricas.defectsAbertos;
        document.getElementById('bugs-fechados-valor').textContent = this.metricas.bugsFechados;
        document.getElementById('bugs-abertos-valor').textContent = this.metricas.bugsAbertos;


        // Métricas de Testes
        document.getElementById('testes-criados-valor').textContent = this.metricas.testesCriados;
        document.getElementById('testes-executados-valor').textContent = this.metricas.testesExecutados;
        document.getElementById('testes-passaram-valor').textContent = this.metricas.testesPassaram;
        document.getElementById('testes-automatizados-valor').textContent = this.metricas.testesAutomatizados;
        document.getElementById('taxa-sucesso-testes-valor').textContent = `${this.metricas.taxaSucessoTestes.toFixed(1)}%`;
        
        // Atualizar status da Taxa de Sucesso dos Testes
        const statusTaxaSucesso = this.metricas.statusTaxaSucessoTestes || 'BOM';
        const statusElementTaxaSucesso = document.getElementById('taxa-sucesso-testes-status');
        if (statusElementTaxaSucesso) {
            const statusLabels = {
                'EXCELENTE': 'EXCELENTE',
                'BOM': 'BOM',
                'MONITORAR': 'MONITORAR',
                'ALERTA': 'ALERTA'
            };
            const statusColors = {
                'EXCELENTE': 'bg-success',
                'BOM': 'bg-primary',
                'MONITORAR': 'bg-warning',
                'ALERTA': 'bg-danger'
            };
            statusElementTaxaSucesso.innerHTML = `<span class="badge badge-status ${statusColors[statusTaxaSucesso] || 'bg-secondary'}">${statusLabels[statusTaxaSucesso] || statusTaxaSucesso}</span>`;
        }

        // Atualizar status geral
        const statusElement = document.getElementById('status-geral');
        
        if (statusElement) {
        statusElement.textContent = this.metricas.statusGeral;
            // Remover todas as classes de status
            statusElement.className = 'score-badge';
            // Adicionar classe baseada no status
            const statusLower = this.metricas.statusGeral.toLowerCase();
            if (statusLower === 'excelente') {
                statusElement.classList.add('excelente');
            } else if (statusLower === 'bom') {
                statusElement.classList.add('bom');
            } else if (statusLower === 'atencao' || statusLower === 'atenção') {
                statusElement.classList.add('atencao');
            } else if (statusLower === 'critico' || statusLower === 'crítico') {
                statusElement.classList.add('critico');
            }
        }

        // Atualizar data de geração
        document.getElementById('data-geracao').textContent = this.metricas.dataGeracao;

        // Atualizar progress bars
        this.atualizarProgressBars();

        // Atualizar pontos positivos e de atenção
        this.atualizarPontos();

        // Atualizar gráficos
        this.atualizarGraficos();
    }

    getStatusClass(status) {
        switch (status) {
            case 'EXCELENTE': return 'bg-success';
            case 'BOM': return 'bg-primary';
            case 'ATENCAO': return 'bg-warning';
            case 'CRITICO': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    atualizarProgressBars() {
        // Taxa de Escape (invertido - menor é melhor)
        const taxaEscapeProgress = (100 - this.metricas.taxaEscape) / 100 * 100;
        document.getElementById('taxa-escape-progress').style.width = `${Math.min(taxaEscapeProgress, 100)}%`;

        // MTTR (invertido - menor é melhor)
        const mttrProgress = (16 - this.metricas.mttr) / 16 * 100;
        document.getElementById('mttr-progress').style.width = `${Math.max(mttrProgress, 0)}%`;

        // Taxa de Automação
        document.getElementById('automacao-progress').style.width = `${this.metricas.taxaAutomacao}%`;

        // Taxa de Acerto
        document.getElementById('acerto-progress').style.width = `${this.metricas.taxaAcerto}%`;

        // Aceitação de História de Usuário
        const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
        const progressBarAceitacao = document.getElementById('aceitacao-historias-progress');
        progressBarAceitacao.style.width = `${Math.min(aceitacaoHistorias, 100)}%`;
        
        // Atualizar cor baseada no status
        const statusAceitacao = this.metricas.statusAceitacaoHistorias || 'BOM';
        progressBarAceitacao.className = 'progress-bar';
        if (statusAceitacao === 'EXCELENTE') {
            progressBarAceitacao.classList.add('bg-success');
        } else if (statusAceitacao === 'BOM') {
            progressBarAceitacao.classList.add('bg-primary');
        } else if (statusAceitacao === 'ATENCAO') {
            progressBarAceitacao.classList.add('bg-warning');
        } else {
            progressBarAceitacao.classList.add('bg-danger');
        }
    }

    getStatusClassMetric(status) {
        switch (status) {
            case 'EXCELENTE': return 'status-excelente';
            case 'BOM': return 'status-bom';
            case 'ATENCAO': return 'status-atencao';
            case 'CRITICO': return 'status-critico';
            default: return 'status-bom';
        }
    }

    atualizarPontos() {
        const pontosPositivos = document.getElementById('pontos-positivos');
        const pontosAtencao = document.getElementById('pontos-atencao');

        pontosPositivos.innerHTML = this.metricas.pontosPositivos.map(ponto => 
            `<li><i class="bi bi-check-circle text-success"></i> ${ponto}</li>`
        ).join('');

        pontosAtencao.innerHTML = this.metricas.pontosAtencao.map(ponto => 
            `<li><i class="bi bi-exclamation-triangle text-warning"></i> ${ponto}</li>`
        ).join('');
    }

    atualizarAvisosFalhas() {
        const avisosContainer = document.getElementById('avisos-falhas');
        if (!avisosContainer) return;

        avisosContainer.innerHTML = '';

        // Usar AnalysisGenerator se disponível
        let avisos = [];
        let parabens = [];
        
        if (AnalysisGenerator && typeof AnalysisGenerator.generateFailureAlerts === 'function') {
            avisos = AnalysisGenerator.generateFailureAlerts(this.metricas);
            parabens = AnalysisGenerator.generateSuccessMessages(this.metricas);
        } else {
            // Fallback: implementação inline original
            const {
                falhaRequisito,
                falhaManualPreRelease,
                falhaAutomatizadaPreRelease,
                falhaManualRelease,
                falhaAutomatizadaRelease,
                falhaProducao
            } = this.metricas;

            const limiteAlto = 2;

            if (falhaManualRelease >= limiteAlto) {
                avisos.push({
                    tipo: 'atencao',
                    mensagem: `⚠️ Atenção: ${falhaManualRelease} falha(s) manual(is) detectada(s) durante os testes da Release. É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release.`
                });
            }
            if (falhaAutomatizadaRelease >= limiteAlto) {
                avisos.push({
                    tipo: 'atencao',
                    mensagem: `⚠️ Atenção: ${falhaAutomatizadaRelease} falha(s) automatizada(s) detectada(s) durante os testes da Release. É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release.`
                });
            }
            if (falhaProducao >= limiteAlto) {
                avisos.push({
                    tipo: 'atencao',
                    mensagem: `🚨 Atenção Crítica: ${falhaProducao} falha(s) detectada(s) em Produção. Ação imediata necessária! É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release e Release.`
                });
            } else if (falhaProducao > 0) {
                avisos.push({
                    tipo: 'atencao',
                    mensagem: `⚠️ Atenção: ${falhaProducao} falha(s) detectada(s) em Produção. Revise todo o processo para verificar onde essas falhas poderiam ser evitadas.`
                });
            }

            if (falhaRequisito >= limiteAlto) {
                parabens.push({
                    tipo: 'sucesso',
                    mensagem: `✅ Parabéns! ${falhaRequisito} falha(s) de requisito detectada(s) cedo. O time está identificando inconsistências antes do desenvolvimento!`
                });
            }
            if (falhaManualPreRelease >= limiteAlto) {
                parabens.push({
                    tipo: 'sucesso',
                    mensagem: `✅ Parabéns! ${falhaManualPreRelease} falha(s) manual(is) detectada(s) em Pré-Release. Os testes manuais estão funcionando bem!`
                });
            }
            if (falhaAutomatizadaPreRelease >= limiteAlto) {
                parabens.push({
                    tipo: 'sucesso',
                    mensagem: `✅ Parabéns! ${falhaAutomatizadaPreRelease} falha(s) automatizada(s) detectada(s) em Pré-Release. A automação está capturando problemas cedo!`
                });
            }
        }

        // Exibir parabéns primeiro (positivo)
        parabens.forEach(item => {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${item.tipo === 'sucesso' ? 'success' : 'warning'} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                ${item.mensagem}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            avisosContainer.appendChild(alertDiv);
        });

        // Exibir avisos depois (atenção)
        avisos.forEach(item => {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${item.tipo === 'atencao' ? 'warning' : 'danger'} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                ${item.mensagem}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            avisosContainer.appendChild(alertDiv);
        });
    }

    setupCharts() {
        // Gráfico de Falhas durante o ciclo de Desenvolvimento
        const ctxFalhas = document.getElementById('falhasChart');
        if (ctxFalhas) {
            // Criar gradientes para as barras
            const createGradient = (ctx, color1, color2) => {
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);
                return gradient;
            };

            const ctx = ctxFalhas.getContext('2d');
            const gradients = [
                createGradient(ctx, '#ffeb3b', '#ffc107'), // Falha de Requisito - Amarelo mais claro
                createGradient(ctx, '#f39c12', '#e67e22'), // Falha Manual Pré-Release - Amarelo mais escuro
                createGradient(ctx, '#e67e22', '#f39c12'), // Falha Automatizada Pré-Release - Amarelo mais escuro
                createGradient(ctx, '#ff6b6b', '#ee5a6f'), // Falha Manual Release - Vermelho mais claro
                createGradient(ctx, '#ee5a6f', '#ff6b6b'), // Falha Automatizada Release - Vermelho mais claro
                createGradient(ctx, '#c0392b', '#a93226')  // Falha em Produção - Vermelho forte
            ];

            // Verificar se o plugin ChartDataLabels está disponível
            const plugins = [];
            if (typeof ChartDataLabels !== 'undefined') {
                plugins.push(ChartDataLabels);
            }

            this.charts.falhas = new Chart(ctxFalhas, {
                type: 'bar',
                plugins: plugins.length > 0 ? plugins : undefined,
                data: {
                    labels: [
                        'Falha de Requisito',
                        'Falha Manual Pré-Release',
                        'Falha Automatizada Pré-Release',
                        'Falha Manual Release',
                        'Falha Automatizada Release',
                        'Falha em Produção'
                    ],
                    datasets: [{
                        label: 'Quantidade de Falhas',
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: gradients,
                        borderColor: [
                            '#ffc107',  // Falha de Requisito - Amarelo mais claro
                            '#e67e22',  // Falha Manual Pré-Release - Amarelo mais escuro
                            '#f39c12',  // Falha Automatizada Pré-Release - Amarelo mais escuro
                            '#ee5a6f',  // Falha Manual Release - Vermelho mais claro
                            '#ff6b6b',  // Falha Automatizada Release - Vermelho mais claro
                            '#a93226'   // Falha em Produção - Vermelho forte
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 'flex',
                        maxBarThickness: 60
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutQuart'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Falhas durante o Ciclo de Desenvolvimento',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            padding: {
                                top: 30,
                                bottom: 40
                            },
                            color: '#2c3e50'
                        },
                        tooltip: {
                            backgroundColor: 'rgba(44, 62, 80, 0.95)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            borderColor: '#3498db',
                            borderWidth: 2,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y} falha(s)`;
                                }
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: '#2c3e50',
                            font: {
                                size: 13,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value) {
                                return value > 0 ? value : '';
                            },
                            padding: {
                                top: 5
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                },
                                color: '#6c757d',
                                maxRotation: 45,
                                minRotation: 0
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(108, 117, 125, 0.1)',
                                lineWidth: 1
                            },
                            ticks: {
                                stepSize: 1,
                                font: {
                                    size: 11,
                                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                },
                                color: '#6c757d',
                                padding: 8
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10
                        }
                    }
                }
            });
        }

        // Gráfico de Defects vs Bugs
        const ctxDefectsBugs = document.getElementById('defectsBugsChart');
        if (ctxDefectsBugs) {
            const pluginsDefectsBugs = [];
            if (typeof ChartDataLabels !== 'undefined') {
                pluginsDefectsBugs.push(ChartDataLabels);
            }

            this.charts.defectsBugs = new Chart(ctxDefectsBugs, {
                type: 'doughnut',
                plugins: pluginsDefectsBugs.length > 0 ? pluginsDefectsBugs : undefined,
                data: {
                    labels: ['Defeitos (Dev)', 'Bugs (Prod)'],
                    datasets: [{
                        data: [23, 5],
                        backgroundColor: ['#f39c12', '#e74c3c'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value) {
                                return value > 0 ? value : '';
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de Comparação com Metas
        const ctxMetas = document.getElementById('metasChart');
        if (ctxMetas) {
            const pluginsMetas = [];
            if (typeof ChartDataLabels !== 'undefined') {
                pluginsMetas.push(ChartDataLabels);
            }

            this.charts.metas = new Chart(ctxMetas, {
                type: 'bar',
                plugins: pluginsMetas.length > 0 ? pluginsMetas : undefined,
                data: {
                    labels: ['Taxa Escape', 'MTTR', 'Acerto', 'Aceitação de Histórias', 'Sucesso Testes'],
                    datasets: [{
                        label: 'Atual',
                        data: [3.2, 6.2, 85.7, 90, 90.5],
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }, {
                        label: 'Meta',
                        data: [5, 16, 85, 90, 90],
                        backgroundColor: '#95a5a6',
                        borderColor: '#7f8c8d',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 10,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                padding: 10,
                                stepSize: 20
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            ticks: {
                                padding: 15
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            padding: {
                                top: 0,
                                bottom: 50
                            },
                            labels: {
                                boxWidth: 12,
                                padding: 15
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: '#2c3e50',
                            font: {
                                size: 11,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value, context) {
                                if (value <= 0) return '';
                                const label = context.chart.data.labels[context.dataIndex];
                                let formattedValue = value.toFixed(2);
                                // Remove zeros desnecessários no final
                                formattedValue = parseFloat(formattedValue).toString();
                                if (label === 'MTTR') {
                                    return formattedValue + 'h';
                                }
                                return formattedValue + '%';
                            },
                            padding: {
                                top: 5
                            }
                        }
                    }
                }
            });
        }

        // Plugin customizado para mostrar total no centro - Falhas
        const centerTextPluginFalhas = {
            id: 'centerTextFalhas',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a, b) => a + b, 0);
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#2c3e50';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Total', centerX, centerY - 10);
                
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#3498db';
                ctx.fillText(total.toString(), centerX, centerY + 20);
                ctx.restore();
            }
        };

        // Gráfico de Falhas Por Prioridade
        const ctxFalhasPrioridade = document.getElementById('falhasPrioridadeChart');
        if (ctxFalhasPrioridade) {
            const pluginsFalhasPrioridade = [centerTextPluginFalhas];
            if (typeof ChartDataLabels !== 'undefined') {
                pluginsFalhasPrioridade.push(ChartDataLabels);
            }

            this.charts.falhasPrioridade = new Chart(ctxFalhasPrioridade, {
                type: 'doughnut',
                plugins: pluginsFalhasPrioridade,
                data: {
                    labels: ['Trivial', 'Média', 'Gravíssima', 'Crítica'],
                    datasets: [{
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#95a5a6',  // Trivial - Cinza
                            '#3498db',  // Média - Azul
                            '#f39c12',  // Gravíssima - Laranja
                            '#e74c3c'   // Crítica - Vermelho
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Falhas por Prioridade'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                                }
                            }
                        },
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                size: 13,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value) {
                                return value > 0 ? value : '';
                            }
                        }
                    }
                }
            });
        }

        // Plugin customizado para mostrar total no centro - Bugs
        const centerTextPluginBugs = {
            id: 'centerTextBugs',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a, b) => a + b, 0);
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#2c3e50';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Total', centerX, centerY - 10);
                
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#e74c3c';
                ctx.fillText(total.toString(), centerX, centerY + 20);
                ctx.restore();
            }
        };

        // Gráfico de Bugs Por Prioridade
        const ctxBugsPrioridade = document.getElementById('bugsPrioridadeChart');
        if (ctxBugsPrioridade) {
            const pluginsBugsPrioridade = [centerTextPluginBugs];
            if (typeof ChartDataLabels !== 'undefined') {
                pluginsBugsPrioridade.push(ChartDataLabels);
            }

            this.charts.bugsPrioridade = new Chart(ctxBugsPrioridade, {
                type: 'doughnut',
                plugins: pluginsBugsPrioridade,
                data: {
                    labels: ['Trivial', 'Média', 'Gravíssima', 'Crítica'],
                    datasets: [{
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#95a5a6',  // Trivial - Cinza
                            '#3498db',  // Média - Azul
                            '#f39c12',  // Gravíssima - Laranja
                            '#e74c3c'   // Crítica - Vermelho
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Bugs por Prioridade'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                                }
                            }
                        },
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                size: 13,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value) {
                                return value > 0 ? value : '';
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de Status dos Testes
        const ctxTestes = document.getElementById('testesChart');
        if (ctxTestes) {
            const pluginsTestes = [];
            if (typeof ChartDataLabels !== 'undefined') {
                pluginsTestes.push(ChartDataLabels);
            }

            this.charts.testes = new Chart(ctxTestes, {
                type: 'doughnut',
                plugins: pluginsTestes.length > 0 ? pluginsTestes : undefined,
                data: {
                    labels: ['Passaram', 'Falharam'],
                    datasets: [{
                        data: [0, 0],
                        backgroundColor: ['#27ae60', '#e74c3c'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            formatter: function(value) {
                                return value > 0 ? value : '';
                            }
                        }
                    }
                }
            });
        }
    }

    atualizarGraficos() {
        // Atualizar gráfico de Falhas
        if (this.charts.falhas) {
            // Recriar gradientes para garantir que funcionem após atualização
            const ctx = this.charts.falhas.canvas.getContext('2d');
            const createGradient = (ctx, color1, color2) => {
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);
                return gradient;
            };
            
            const gradients = [
                createGradient(ctx, '#ffeb3b', '#ffc107'), // Falha de Requisito - Amarelo mais claro
                createGradient(ctx, '#f39c12', '#e67e22'), // Falha Manual Pré-Release - Amarelo mais escuro
                createGradient(ctx, '#e67e22', '#f39c12'), // Falha Automatizada Pré-Release - Amarelo mais escuro
                createGradient(ctx, '#ff6b6b', '#ee5a6f'), // Falha Manual Release - Vermelho mais claro
                createGradient(ctx, '#ee5a6f', '#ff6b6b'), // Falha Automatizada Release - Vermelho mais claro
                createGradient(ctx, '#c0392b', '#a93226')  // Falha em Produção - Vermelho forte
            ];
            
            this.charts.falhas.data.datasets[0].data = [
                this.metricas.falhaRequisito,
                this.metricas.falhaManualPreRelease,
                this.metricas.falhaAutomatizadaPreRelease,
                this.metricas.falhaManualRelease,
                this.metricas.falhaAutomatizadaRelease,
                this.metricas.falhaProducao
            ];
            this.charts.falhas.data.datasets[0].backgroundColor = gradients;
            this.charts.falhas.update('active');
        }

        // Atualizar gráfico Defects vs Bugs
        if (this.charts.defectsBugs) {
            const totalDefects = this.metricas.defectsAbertos + this.metricas.defectsFechados;
            const totalBugs = this.metricas.bugsAbertos + this.metricas.bugsFechados;
            this.charts.defectsBugs.data.datasets[0].data = [totalDefects, totalBugs];
            this.charts.defectsBugs.update();
        }

        // Atualizar dados dos gráficos com as métricas calculadas
        if (this.charts.metas) {
            const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
            const taxaSucessoTestes = this.metricas.taxaSucessoTestes || 0;
            this.charts.metas.data.datasets[0].data = [
                this.metricas.taxaEscape,
                this.metricas.mttr,
                this.metricas.taxaAcerto,
                aceitacaoHistorias,
                taxaSucessoTestes
            ];
            // Atualizar também as metas (incluindo a meta de aceitação que é 90%)
            this.charts.metas.data.datasets[1].data = [
                5,  // Taxa Escape meta
                16,  // MTTR meta
                85, // Acerto meta
                90, // Aceitação meta
                95  // Sucesso Testes meta
            ];
            
            // Calcular o máximo dinamicamente baseado nos dados
            const allValues = [
                ...this.charts.metas.data.datasets[0].data,
                ...this.charts.metas.data.datasets[1].data
            ];
            const maxValue = Math.max(...allValues);
            
            // Calcular o máximo do eixo Y: adicionar 10% de margem e arredondar
            let maxY;
            if (maxValue <= 100) {
                maxY = 100;
            } else {
                // Adicionar 10% de margem e arredondar para o próximo múltiplo de 10
                maxY = Math.ceil((maxValue * 1.1) / 10) * 10;
            }
            
            // Calcular stepSize dinamicamente (aproximadamente 5 divisões principais)
            const stepSize = maxY <= 100 ? 20 : Math.ceil(maxY / 5 / 10) * 10;
            
            // Atualizar o máximo e stepSize do eixo Y
            this.charts.metas.options.scales.y.max = maxY;
            this.charts.metas.options.scales.y.ticks.stepSize = stepSize;
            
            this.charts.metas.update();
        }

        // Atualizar gráfico de Falhas Por Prioridade
        if (this.charts.falhasPrioridade) {
            this.charts.falhasPrioridade.data.datasets[0].data = [
                this.metricas.falhaPrioridadeTrivial,
                this.metricas.falhaPrioridadeMedia,
                this.metricas.falhaPrioridadeGravissima,
                this.metricas.falhaPrioridadeCritica
            ];
            this.charts.falhasPrioridade.update();
        }

        // Atualizar gráfico de Bugs Por Prioridade
        if (this.charts.bugsPrioridade) {
            this.charts.bugsPrioridade.data.datasets[0].data = [
                this.metricas.bugPrioridadeTrivial,
                this.metricas.bugPrioridadeMedia,
                this.metricas.bugPrioridadeGravissima,
                this.metricas.bugPrioridadeCritica
            ];
            this.charts.bugsPrioridade.update();
        }

        // Atualizar gráfico de testes
        if (this.charts.testes) {
            const testesFalharam = this.metricas.testesExecutados - this.metricas.testesPassaram;
            this.charts.testes.data.datasets[0].data = [this.metricas.testesPassaram, testesFalharam];
            this.charts.testes.update();
        }
    }

    mostrarDashboard() {
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('relatorio').classList.remove('hidden');
    }

    limparDados() {
        // Usar DataCollector se disponível
        if (DataCollector && typeof DataCollector.clearForm === 'function') {
            DataCollector.clearForm();
        } else {
            // Fallback: implementação inline original
            document.querySelectorAll('#entrada-dados input').forEach(input => {
                input.value = '';
            });
            const observacoes = document.getElementById('observacoes');
            if (observacoes) observacoes.value = '';
        }

        // Esconder dashboard
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('relatorio').classList.add('hidden');

        // Resetar métricas
        this.metricas = {};
    }

    async gerarPDF() {
        try {
            // Verificar bibliotecas
            if (typeof window.jspdf === 'undefined') {
                alert('❌ Erro: Biblioteca jsPDF não carregada.');
                return;
            }
            
            if (typeof html2canvas === 'undefined') {
                alert('❌ Erro: Biblioteca html2canvas não carregada.');
                return;
            }

            // Verificar se o dashboard está visível
            const dashboardElement = document.getElementById('dashboard');
            if (!dashboardElement || dashboardElement.classList.contains('hidden')) {
                alert('⚠️ Por favor, calcule as métricas primeiro antes de gerar o PDF.');
                return;
            }

            // Mostrar loading
            const btnPdf = document.getElementById('gerar-pdf');
            const originalText = btnPdf.innerHTML;
            btnPdf.innerHTML = '<i class="bi bi-hourglass-split"></i> Gerando PDF...';
            btnPdf.disabled = true;

            // Atualizar valores dos campos de relatório antes de gerar o PDF
            this.metricas.equipeResponsavel = document.getElementById('equipe-responsavel').value || 'Time QA';
            this.metricas.periodoAnalise = document.getElementById('periodo-analise').value || 'Últimos 30 dias';
            this.metricas.observacoes = document.getElementById('observacoes').value || '';
            this.metricas.dataGeracao = new Date().toLocaleString('pt-BR');

            // Atualizar todos os gráficos antes de capturar
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.update === 'function') {
                    chart.update('none');
                }
            });

            // Aguardar renderização dos gráficos
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { jsPDF } = window.jsPDF || window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Configurações do documento
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 10;
            const availableWidth = pageWidth - (margin * 2);
            let pageNumber = 1;
            const footerHeight = 15;

            // Função para obter cor do status
            const getStatusColor = (status) => {
                const statusUpper = (status || 'BOM').toUpperCase();
                switch(statusUpper) {
                    case 'EXCELENTE': return [39, 174, 96]; // Verde
                    case 'BOM': return [52, 144, 219]; // Azul
                    case 'ATENCAO': case 'ATENÇÃO': return [243, 156, 18]; // Amarelo
                    case 'CRITICO': case 'CRÍTICO': return [231, 76, 60]; // Vermelho
                    default: return [52, 144, 219]; // Azul padrão
                }
            };

            // Função para adicionar cabeçalho do dashboard similar à tela
            const addDashboardHeader = (yPosition = 10) => {
                const headerHeight = 35;
                const headerY = yPosition;
                
                // Fundo cinza escuro do header
                doc.setFillColor(108, 117, 125);
                doc.rect(margin, headerY, availableWidth, headerHeight, 'F');
                
                // Título à esquerda
            doc.setTextColor(255, 255, 255);
                doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
                doc.text('Dashboard de Métricas QA', margin + 5, headerY + 12);
                
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(255, 255, 255);
                doc.text('Métricas essenciais para evolução das squads', margin + 5, headerY + 20);
                
                // Score card à direita
                const scoreCardX = pageWidth - margin - 70;
                const scoreCardY = headerY + 5;
                const scoreCardWidth = 65;
                const scoreCardHeight = 25;
                
                // Fundo do score card (cinza claro)
                doc.setFillColor(240, 240, 240);
                doc.rect(scoreCardX, scoreCardY, scoreCardWidth, scoreCardHeight, 'F');
                
                // Borda do score card
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.5);
                doc.rect(scoreCardX, scoreCardY, scoreCardWidth, scoreCardHeight, 'S');
                
                // Texto "SCORE GERAL"
                doc.setFontSize(7);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(100, 100, 100);
                doc.text('SCORE GERAL', scoreCardX + scoreCardWidth / 2, scoreCardY + 6, { align: 'center' });
                
                // Badge do status
                const statusGeral = this.metricas.statusGeral || 'BOM';
                const statusColor = getStatusColor(statusGeral);
                const badgeY = scoreCardY + 12;
                const badgeWidth = 40;
                const badgeHeight = 8;
                
                doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
                doc.rect(scoreCardX + (scoreCardWidth - badgeWidth) / 2, badgeY, badgeWidth, badgeHeight, 'F');
                
                    doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 255, 255);
                doc.text(statusGeral.toUpperCase(), scoreCardX + scoreCardWidth / 2, badgeY + 5.5, { align: 'center' });
                
                // Data
                doc.setFontSize(6);
            doc.setFont('helvetica', 'normal');
                doc.setTextColor(120, 120, 120);
                doc.text(this.metricas.dataGeracao || new Date().toLocaleString('pt-BR'), scoreCardX + scoreCardWidth / 2, scoreCardY + 22, { align: 'center' });
                
                return headerY + headerHeight + 10;
            };

            // Função para adicionar página de informações do relatório
            const addRelatorioInfoPage = () => {
                // Adicionar cabeçalho apenas na primeira página
                let currentY = addDashboardHeader(10);
                currentY += 5; // Espaçamento após cabeçalho
                
                // Título da seção com estilo mais elegante
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text('Informações do Relatório', margin, currentY);
                currentY += 8;
                
                // Linha divisória mais sutil
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.3);
                doc.line(margin, currentY, pageWidth - margin, currentY);
                currentY += 10;
                
                // Card para Equipe Responsável
                const cardHeight = 12;
                doc.setFillColor(248, 249, 250);
                doc.rect(margin, currentY, availableWidth, cardHeight, 'F');
                doc.setDrawColor(230, 230, 230);
                doc.setLineWidth(0.3);
                doc.rect(margin, currentY, availableWidth, cardHeight, 'S');
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(108, 117, 125);
                doc.text('Equipe Responsável', margin + 5, currentY + 5);
                
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const equipeText = this.metricas.equipeResponsavel || 'Não informado';
                doc.text(equipeText, margin + 5, currentY + 9);
                currentY += cardHeight + 8;
                
                // Card para Período de Análise
                doc.setFillColor(248, 249, 250);
                doc.rect(margin, currentY, availableWidth, cardHeight, 'F');
                doc.setDrawColor(230, 230, 230);
                doc.setLineWidth(0.3);
                doc.rect(margin, currentY, availableWidth, cardHeight, 'S');
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(108, 117, 125);
                doc.text('Período de Análise', margin + 5, currentY + 5);
                
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const periodoText = this.metricas.periodoAnalise || 'Não informado';
                doc.text(periodoText, margin + 5, currentY + 9);
                currentY += cardHeight + 8;
                
                // Card para Observações
                const observacoesCardHeight = 30;
                doc.setFillColor(248, 249, 250);
                doc.rect(margin, currentY, availableWidth, observacoesCardHeight, 'F');
                doc.setDrawColor(230, 230, 230);
                doc.setLineWidth(0.3);
                doc.rect(margin, currentY, availableWidth, observacoesCardHeight, 'S');
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(108, 117, 125);
                doc.text('Observações Adicionais', margin + 5, currentY + 5);
                
                if (this.metricas.observacoes && this.metricas.observacoes.trim()) {
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    const observacoesLines = doc.splitTextToSize(this.metricas.observacoes, availableWidth - 15);
                    let textY = currentY + 10;
                    observacoesLines.forEach(line => {
                        if (textY > currentY + observacoesCardHeight - 3) {
                            // Se não couber, criar nova página
                            doc.addPage();
                            pageNumber++;
                            textY = 20;
                            // Redesenhar card na nova página
                            doc.setFillColor(248, 249, 250);
                            doc.rect(margin, textY - 10, availableWidth, observacoesCardHeight, 'F');
                            doc.setDrawColor(230, 230, 230);
                            doc.setLineWidth(0.3);
                            doc.rect(margin, textY - 10, availableWidth, observacoesCardHeight, 'S');
                            doc.setFontSize(9);
                            doc.setFont('helvetica', 'bold');
                            doc.setTextColor(108, 117, 125);
                            doc.text('Observações Adicionais (continuação)', margin + 5, textY - 5);
                            textY += 5;
                        }
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(0, 0, 0);
                        doc.text(line, margin + 5, textY);
                        textY += 4.5;
                    });
                } else {
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'italic');
                    doc.setTextColor(150, 150, 150);
                    doc.text('Nenhuma observação adicional informada.', margin + 5, currentY + 10);
                }
                
                // Rodapé
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Página ${pageNumber}`, pageWidth - margin - 10, pageHeight - 5);
            };

            // Função para capturar uma seção específica
            const captureSection = async (sectionElement) => {
                if (!sectionElement) return null;

                try {
                    // Temporariamente ocultar outras seções e o header do dashboard
                    const allSections = dashboardElement.querySelectorAll('.dashboard-topic-section');
                    const dashboardHeader = dashboardElement.querySelector('.dashboard-header');
                    const hiddenElements = [];
                    
                    // Ocultar outras seções
                    allSections.forEach(section => {
                        if (section !== sectionElement) {
                            const originalDisplay = section.style.display;
                            section.style.display = 'none';
                            hiddenElements.push({ element: section, display: originalDisplay });
                        }
                    });

                    // Ocultar header do dashboard para não aparecer em cada página
                    if (dashboardHeader) {
                        const originalDisplay = dashboardHeader.style.display;
                        dashboardHeader.style.display = 'none';
                        hiddenElements.push({ element: dashboardHeader, display: originalDisplay });
                    }

                    // Aguardar renderização inicial
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Forçar atualização dos gráficos dentro desta seção
                    const chartsInSection = sectionElement.querySelectorAll('canvas');
                    for (const canvas of chartsInSection) {
                        // Encontrar o gráfico correspondente
                        for (const [key, chart] of Object.entries(this.charts)) {
                            if (chart && chart.canvas === canvas) {
                                chart.update('none');
                                // Aguardar renderização individual
                                await new Promise(resolve => setTimeout(resolve, 200));
                                break;
                            }
                        }
                    }

                    // Aguardar renderização final dos gráficos
                    await new Promise(resolve => setTimeout(resolve, 800));

                    // Capturar a seção com qualidade otimizada para PDF pequeno
                    const canvas = await html2canvas(sectionElement, {
                        backgroundColor: '#ffffff',
                        scale: 1.5, // Reduzido de 3 para 1.5 para reduzir tamanho
                        useCORS: true,
                        logging: false,
                        allowTaint: true,
                        windowWidth: sectionElement.scrollWidth,
                        windowHeight: sectionElement.scrollHeight,
                        width: sectionElement.scrollWidth,
                        height: sectionElement.scrollHeight,
                        pixelRatio: 1, // Reduzido de 2 para 1 para reduzir tamanho
                        letterRendering: true,
                        onclone: (clonedDoc) => {
                            // Garantir que os estilos CSS sejam aplicados no clone
                            const style = clonedDoc.createElement('style');
                            style.textContent = `
                                .dashboard-topic-header {
                                    background: #e9ecef !important;
                                    color: #2c3e50 !important;
                                    border: 3px solid #667eea !important;
                                }
                                .dashboard-topic-header.falhas,
                                .dashboard-topic-header.criticas {
                                    background: #e9ecef !important;
                                    color: #2c3e50 !important;
                                    border-color: #dc3545 !important;
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                                }
                                .dashboard-topic-header.eficiencia,
                                .dashboard-topic-header.testes {
                                    background: #e9ecef !important;
                                    color: #2c3e50 !important;
                                    border-color: #198754 !important;
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                                }
                                .dashboard-topic-header.comparacao {
                                    background: #e9ecef !important;
                                    color: #2c3e50 !important;
                                    border-color: #ffc107 !important;
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                                }
                                .dashboard-topic-header.resumo {
                                    background: #e9ecef !important;
                                    color: #2c3e50 !important;
                                    border-color: #3498db !important;
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                                }
                                .dashboard-topic-header h4 {
                                    color: #2c3e50 !important;
                                }
                                .dashboard-header {
                                    display: none !important;
                                }
                            `;
                            clonedDoc.head.appendChild(style);
                            
                            // Aplicar estilos inline nos headers para garantir renderização
                            const headers = clonedDoc.querySelectorAll('.dashboard-topic-header');
                            headers.forEach(header => {
                                header.style.background = '#e9ecef';
                                header.style.color = '#2c3e50';
                                header.style.border = '3px solid';
                                
                                if (header.classList.contains('resumo')) {
                                    header.style.borderColor = '#3498db';
                                } else if (header.classList.contains('falhas') || header.classList.contains('criticas')) {
                                    header.style.borderColor = '#dc3545';
                                } else if (header.classList.contains('eficiencia') || header.classList.contains('testes')) {
                                    header.style.borderColor = '#198754';
                                } else if (header.classList.contains('comparacao')) {
                                    header.style.borderColor = '#ffc107';
                                } else {
                                    header.style.borderColor = '#667eea';
                                }
                                
                                const h4 = header.querySelector('h4');
                                if (h4) {
                                    h4.style.color = '#2c3e50';
                                }
                            });
                        }
                    });

                    // Restaurar visibilidade
                    hiddenElements.forEach(({ element, display }) => {
                        element.style.display = display || '';
                    });

                    return canvas;
                } catch (error) {
                    console.error('Erro ao capturar seção:', error);
                    return null;
                }
            };

            // Função para adicionar uma seção ao PDF
            const addSectionToPDF = async (sectionElement, startY = 50) => {
                if (!sectionElement) return false;

                const canvas = await captureSection(sectionElement);
                if (!canvas || canvas.width === 0 || canvas.height === 0) {
                    console.warn('Canvas vazio para seção:', sectionElement);
                    return false;
                }

                // Comprimir imagem usando JPEG com qualidade otimizada
                const imgData = canvas.toDataURL('image/jpeg', 0.75); // JPEG com 75% de qualidade para reduzir tamanho
                const imgWidth = availableWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Posição Y inicial (após o cabeçalho do dashboard)
                let currentY = startY;
                const availableHeight = pageHeight - currentY - footerHeight;

                // Adicionar imagem mantendo proporção
                try {
                    if (imgHeight <= availableHeight) {
                        // Cabe perfeitamente
                        doc.addImage(imgData, 'JPEG', margin, currentY, imgWidth, imgHeight);
                    } else {
                        // Se não couber, ajustar para caber mantendo proporção
                        const scale = availableHeight / imgHeight;
                        const scaledHeight = imgHeight * scale;
                        const scaledWidth = imgWidth * scale;
                        // Centralizar horizontalmente se necessário
                        const xOffset = (pageWidth - scaledWidth) / 2;
                        doc.addImage(imgData, 'JPEG', xOffset, currentY, scaledWidth, scaledHeight);
                    }
                } catch (error) {
                    console.error('Erro ao adicionar imagem ao PDF:', error);
                    return false;
                }

                // Adicionar rodapé
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Página ${pageNumber}`, pageWidth - margin - 10, pageHeight - 5);
                
                return true;
            };

            try {
                // Adicionar página de informações do relatório na primeira página
                addRelatorioInfoPage();

                // Capturar cada seção do dashboard
                const sections = dashboardElement.querySelectorAll('.dashboard-topic-section');
                
                if (sections.length === 0) {
                    throw new Error('Nenhuma seção encontrada no dashboard');
                }
                
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const nextSection = i < sections.length - 1 ? sections[i + 1] : null;
                    
                    // Verificar se é a seção de Comparação e a próxima é Resumo
                    const isComparacao = section.querySelector('.dashboard-topic-header.comparacao');
                    const isResumo = nextSection && nextSection.querySelector('.dashboard-topic-header.resumo');
                    
                    if (isComparacao && isResumo) {
                        // Combinar Comparação e Resumo na mesma página
                        doc.addPage();
                        pageNumber++;
                        
                        // Adicionar seção de Comparação
                        let currentY = 10;
                        const comparacaoCanvas = await captureSection(section);
                        if (comparacaoCanvas && comparacaoCanvas.width > 0 && comparacaoCanvas.height > 0) {
                            const comparacaoImgData = comparacaoCanvas.toDataURL('image/jpeg', 0.75);
                            const comparacaoImgWidth = availableWidth;
                            const comparacaoImgHeight = (comparacaoCanvas.height * comparacaoImgWidth) / comparacaoCanvas.width;
                            
                            // Ajustar altura se necessário para caber na metade superior
                            const maxComparacaoHeight = (pageHeight - currentY - footerHeight) * 0.5;
                            let finalComparacaoHeight = comparacaoImgHeight;
                            let finalComparacaoWidth = comparacaoImgWidth;
                            
                            if (comparacaoImgHeight > maxComparacaoHeight) {
                                const scale = maxComparacaoHeight / comparacaoImgHeight;
                                finalComparacaoHeight = comparacaoImgHeight * scale;
                                finalComparacaoWidth = comparacaoImgWidth * scale;
                            }
                            
                            doc.addImage(comparacaoImgData, 'JPEG', margin, currentY, finalComparacaoWidth, finalComparacaoHeight);
                            currentY += finalComparacaoHeight + 10;
                        }
                        
                        // Adicionar seção de Resumo na mesma página
                        const resumoCanvas = await captureSection(nextSection);
                        if (resumoCanvas && resumoCanvas.width > 0 && resumoCanvas.height > 0) {
                            const resumoImgData = resumoCanvas.toDataURL('image/jpeg', 0.75);
                            const resumoImgWidth = availableWidth;
                            const resumoImgHeight = (resumoCanvas.height * resumoImgWidth) / resumoCanvas.width;
                            
                            const availableHeight = pageHeight - currentY - footerHeight;
                            let finalResumoHeight = resumoImgHeight;
                            let finalResumoWidth = resumoImgWidth;
                            
                            if (resumoImgHeight > availableHeight) {
                                const scale = availableHeight / resumoImgHeight;
                                finalResumoHeight = resumoImgHeight * scale;
                                finalResumoWidth = resumoImgWidth * scale;
                            }
                            
                            doc.addImage(resumoImgData, 'JPEG', margin, currentY, finalResumoWidth, finalResumoHeight);
                        }
                        
                        // Pular a próxima seção (Resumo) pois já foi adicionada
                        i++;
                    } else {
                        // Adicionar nova página para cada seção (sem cabeçalho)
                        doc.addPage();
                        pageNumber++;
                        
                        // Adicionar seção começando do topo (sem cabeçalho)
                        await addSectionToPDF(section, 10);
                    }
                }
                
                // Função auxiliar para coletar elementos de um tópico
                const collectTopicElements = (topicTitleText) => {
                    let topicTitleRow = null;
                    let allContent = [];
                    
                    if (topicTitleText === 'Resumo de Análise') {
                        // Para o resumo, buscar pela card com o título
                        // Buscar todas as rows (filhos diretos do dashboard)
                        const allRows = Array.from(dashboardElement.children).filter(child => 
                            child.nodeType === 1 && child.classList && child.classList.contains('row')
                        );
                        for (let row of allRows) {
                            const cardTitle = row.querySelector('h5.card-title');
                            if (cardTitle && cardTitle.textContent.trim() === 'Resumo de Análise') {
                                topicTitleRow = row;
                                allContent = [row];
                                break;
                            }
                        }
                    } else {
                        // Para os outros tópicos, buscar por h4.text-primary
                        // Buscar todas as rows (filhos diretos do dashboard)
                        const allRows = Array.from(dashboardElement.children).filter(child => 
                            child.nodeType === 1 && child.classList && child.classList.contains('row')
                        );
                        
                        for (let i = 0; i < allRows.length; i++) {
                            const h4 = allRows[i].querySelector('h4.text-primary');
                            if (h4 && h4.textContent.includes(topicTitleText)) {
                                topicTitleRow = allRows[i];
                                
                                // Coletar todo o conteúdo do tópico até o próximo título
                                allContent = [topicTitleRow]; // Incluir o título
                                
                                // Continuar coletando as próximas rows até encontrar o próximo tópico
                                for (let j = i + 1; j < allRows.length; j++) {
                                    const nextRow = allRows[j];
                                    
                                    // Verificar se é o próximo tópico (tem h4.text-primary)
                                    const nextTitle = nextRow.querySelector('h4.text-primary');
                                    if (nextTitle) break; // Encontrou próximo tópico, parar
                                    
                                    // Verificar se é o Resumo de Análise (tem h5.card-title com "Resumo de Análise")
                                    const cardTitle = nextRow.querySelector('h5.card-title');
                                    if (cardTitle && cardTitle.textContent.includes('Resumo de Análise')) {
                                        break; // Encontrou Resumo de Análise, parar para não incluí-lo
                                    }
                                    
                                    // Adicionar esta row ao conteúdo (mesmo que não tenha mb-4)
                                    allContent.push(nextRow);
                                }
                                break;
                            }
                        }
                    }
                    
                    return allContent;
                };
                
                // Calcular total de páginas dinamicamente (após definir collectTopicElements)
                let totalPages = 3; // Base: Falhas, Métricas Críticas, Métricas Eficiência + Comparação
                // Verificar se há Resumo de Análise
                const resumoCheck = collectTopicElements('Resumo de Análise');
                if (resumoCheck && resumoCheck.length > 0) {
                    totalPages++; // Adicionar página do Resumo de Análise
                }
                // Verificar se há observações
                if (this.metricas.observacoes && this.metricas.observacoes.trim()) {
                    totalPages++; // Adicionar página de Observações
                }
                
                // Função auxiliar para adicionar elementos em uma página
                const addElementsToPage = async (elements) => {
                    if (!elements || elements.length === 0) {
                        console.warn('Nenhum elemento para adicionar à página');
                        return false;
                    }
                    
                    // Criar nova página (exceto para a primeira)
                    if (pageNumber > 1) {
            doc.addPage();
                    }
                    
                    // Adicionar cabeçalho do relatório na primeira página
                    if (pageNumber === 1) {
                        doc.setFillColor(108, 117, 125);
                        doc.rect(0, 0, pageWidth, 35, 'F');
                        doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
                        doc.text('ARGO - Métricas QA', 20, 20);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Relatório: ${this.metricas.equipeResponsavel} | ${this.metricas.periodoAnalise} | ${this.metricas.dataGeracao}`, 20, 30);
                    }
                    
                    // Ocultar todos os elementos do dashboard exceto os que queremos
                    // Buscar todos os filhos diretos do dashboard que são rows
                    const allRows = Array.from(dashboardElement.children).filter(child => 
                        child.nodeType === 1 && child.classList && child.classList.contains('row')
                    );
                    const hiddenElements = [];
                    
                    // Criar conjunto de elementos a mostrar (incluindo os elementos e suas rows pai)
                    const elementsToShow = new Set();
                    elements.forEach(el => {
                        elementsToShow.add(el);
                        // Se o elemento não é uma row, encontrar sua row pai
                        if (!el.classList || !el.classList.contains('row')) {
                            let parent = el.parentElement;
                            while (parent && parent !== dashboardElement) {
                                if (parent.classList && parent.classList.contains('row')) {
                                    elementsToShow.add(parent);
                                    break;
                                }
                                parent = parent.parentElement;
                            }
                        }
                    });
                    
                    allRows.forEach(row => {
                        let shouldShow = false;
                        
                        // Verificar se esta row está na lista de elementos a mostrar
                        if (elementsToShow.has(row)) {
                            shouldShow = true;
                        } else {
                            // Verificar se algum elemento da lista está dentro desta row
                            for (let targetElement of elements) {
                                if (row.contains(targetElement)) {
                                    shouldShow = true;
                                    break;
                                }
                            }
                        }
                        
                        if (!shouldShow) {
                            const originalDisplay = row.style.display;
                            row.style.display = 'none';
                            hiddenElements.push({ element: row, display: originalDisplay });
                        }
                    });
                    
                    // Aguardar para garantir que a ocultação seja aplicada e gráficos renderizados
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Forçar atualização dos gráficos antes de capturar
                    try {
                        if (this.charts.falhasPrioridade) {
                            this.charts.falhasPrioridade.update('none');
                        }
                        if (this.charts.bugsPrioridade) {
                            this.charts.bugsPrioridade.update('none');
                        }
                        // Aguardar renderização
                        await new Promise(resolve => setTimeout(resolve, 300));
                    } catch (e) {
                        console.warn('Erro ao atualizar gráficos:', e);
                    }
                    
                    // Verificar se há elementos visíveis antes de capturar
                    const visibleRows = allRows.filter(row => {
                        const style = window.getComputedStyle(row);
                        return style.display !== 'none' && style.visibility !== 'hidden';
                    });
                    
                    if (visibleRows.length === 0) {
                        console.error('Nenhum elemento visível para capturar');
                        // Restaurar visibilidade antes de lançar erro
                        hiddenElements.forEach(({ element, display }) => {
                            element.style.display = display || '';
                        });
                        throw new Error('Nenhum conteúdo visível encontrado para capturar');
                    }
                    
                    // Verificar se o dashboard tem altura mínima
                    const dashboardHeight = dashboardElement.offsetHeight || dashboardElement.scrollHeight;
                    if (dashboardHeight < 50) {
                        console.warn('Dashboard muito pequeno, pode estar vazio');
                    }
                    
                    // Capturar o dashboard (apenas elementos visíveis serão capturados)
                    let canvas;
                    try {
                        canvas = await html2canvas(dashboardElement, {
                            backgroundColor: '#ffffff',
                            scale: 1.2, // Mantido baixo para reduzir tamanho
                            useCORS: true,
                            logging: false,
                            allowTaint: true,
                            timeout: 30000,
                            imageTimeout: 15000,
                            width: dashboardElement.scrollWidth || dashboardElement.offsetWidth,
                            height: dashboardElement.scrollHeight || dashboardElement.offsetHeight,
                            pixelRatio: 1 // Reduzido para 1 para reduzir tamanho
                        });
                        
                        if (!canvas || canvas.width === 0 || canvas.height === 0) {
                            throw new Error('Canvas capturado está vazio');
                        }
                    } catch (canvasError) {
                        console.error('Erro ao capturar canvas:', canvasError);
                        // Restaurar visibilidade antes de lançar erro
                        hiddenElements.forEach(({ element, display }) => {
                            element.style.display = display || '';
                        });
                        throw new Error('Falha ao capturar a imagem do dashboard: ' + (canvasError.message || 'Erro desconhecido'));
                    }
                    
                    // Restaurar visibilidade de todos os elementos
                    hiddenElements.forEach(({ element, display }) => {
                        element.style.display = display || '';
                    });
                    
                    // Validar se o canvas tem conteúdo
                    if (!canvas || canvas.width === 0 || canvas.height === 0) {
                        console.error('Canvas vazio ou inválido');
                        throw new Error('Canvas não pôde ser capturado corretamente');
                    }
                    
                    // Comprimir imagem usando JPEG com qualidade otimizada
                    const imgData = canvas.toDataURL('image/jpeg', 0.75); // JPEG com 75% de qualidade para reduzir tamanho
                    
                    // Validar se a imagem foi gerada
                    if (!imgData || imgData === 'data:,') {
                        console.error('Imagem não foi gerada do canvas');
                        throw new Error('Falha ao gerar imagem do canvas');
                    }
                    
                    const imgWidth = availableWidth;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    // Validar dimensões
                    if (imgHeight <= 0 || imgWidth <= 0) {
                        console.error('Dimensões inválidas da imagem:', { imgWidth, imgHeight, canvasWidth: canvas.width, canvasHeight: canvas.height });
                        throw new Error('Dimensões inválidas da imagem capturada');
                    }
                    
                    // Calcular posição Y inicial
                    let startY = pageNumber === 1 ? 45 : 10;
                    const availableHeight = pageHeight - startY - footerHeight;
                    
                    // Ajustar altura se necessário
                    let finalHeight = imgHeight;
                    if (imgHeight > availableHeight) {
                        finalHeight = availableHeight;
                    }
                    
                    // Adicionar imagem na página
                    try {
                        doc.addImage(imgData, 'JPEG', margin, startY, imgWidth, finalHeight);
                    } catch (addImageError) {
                        console.error('Erro ao adicionar imagem ao PDF:', addImageError);
                        throw new Error('Falha ao adicionar imagem ao PDF: ' + addImageError.message);
                    }
                    
                    // Adicionar rodapé
                    doc.setFontSize(8);
                    doc.setTextColor(128, 128, 128);
                    doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - 40, pageHeight - 10);
                    
                    pageNumber++;
                    return true;
                };
                
            } catch (error) {
                console.error('Erro ao capturar dashboard:', error);
                // Fallback: adicionar página com mensagem de erro
                try {
                    if (pageNumber === 1) {
                        addDashboardHeader(10);
                    } else {
                        doc.addPage();
                        pageNumber++;
                        addDashboardHeader(10);
                    }
                    let errorY = 60;
                    doc.setFontSize(12);
                    doc.setTextColor(231, 76, 60);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Erro ao capturar dashboard', margin, errorY);
                    errorY += 10;
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    doc.text('Ocorreu um erro ao gerar o PDF. Detalhes:', margin, errorY);
                    errorY += 8;
                    const errorText = doc.splitTextToSize(error.message || 'Erro desconhecido', availableWidth);
                    doc.text(errorText, margin, errorY);
                    errorY += errorText.length * 5 + 5;
                    doc.text('Por favor, tente novamente ou entre em contato com o suporte.', margin, errorY);
                } catch (fallbackError) {
                    console.error('Erro no fallback:', fallbackError);
                }
            }

            // Gerar nome do arquivo com horário local
            const agora = new Date();
            const ano = agora.getFullYear();
            const mes = String(agora.getMonth() + 1).padStart(2, '0');
            const dia = String(agora.getDate()).padStart(2, '0');
            const horas = String(agora.getHours()).padStart(2, '0');
            const minutos = String(agora.getMinutes()).padStart(2, '0');
            const segundos = String(agora.getSeconds()).padStart(2, '0');
            const dataHora = `${ano}-${mes}-${dia}_${horas}-${minutos}-${segundos}`;
            const nomeArquivo = `${this.metricas.equipeResponsavel}-${dataHora}.pdf`;

            // Download do PDF
            doc.save(nomeArquivo);
            
            // Restaurar botão
            btnPdf.innerHTML = originalText;
            btnPdf.disabled = false;
            
            alert('✅ PDF gerado com sucesso!');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('❌ Erro ao gerar PDF: ' + error.message);
            
            // Restaurar botão em caso de erro
            const btnPdf = document.getElementById('gerar-pdf');
            btnPdf.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> Gerar PDF';
            btnPdf.disabled = false;
        }
    }

    async captureChartAsImage(canvas) {
        return new Promise((resolve) => {
            html2canvas(canvas, {
                backgroundColor: '#ffffff',
                scale: 1.5, // Reduzido de 3 para 1.5 para reduzir tamanho
                useCORS: true,
                logging: false,
                width: canvas.width,
                height: canvas.height,
                pixelRatio: 1 // Reduzido para 1 para reduzir tamanho
            }).then(canvas => {
                // Usar JPEG com compressão para reduzir tamanho
                const imgData = canvas.toDataURL('image/jpeg', 0.75);
                resolve(imgData);
            }).catch((error) => {
                console.log('Erro ao capturar gráfico:', error);
                // Fallback: criar imagem simples
                const fallbackCanvas = document.createElement('canvas');
                fallbackCanvas.width = 400;
                fallbackCanvas.height = 300;
                const ctx = fallbackCanvas.getContext('2d');
                ctx.fillStyle = '#f8f9fa';
                ctx.fillRect(0, 0, 400, 300);
                ctx.fillStyle = '#6c757d';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Gráfico não disponível', 200, 150);
                resolve(fallbackCanvas.toDataURL('image/jpeg', 0.75));
            });
        });
    }

    drawMetricCardPDF(doc, x, y, title, value, meta, color) {
        // Card background
        doc.setFillColor(248, 249, 250);
        doc.rect(x, y, 80, 38, 'F');
        
        // Border com cor sutil
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.rect(x, y, 80, 38, 'S');
        
        // Title
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        // Quebrar título longo em duas linhas se necessário
        const titleLines = doc.splitTextToSize(title, 70);
        doc.text(titleLines, x + 5, y + 8);
        
        // Value
        doc.setFontSize(20);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont('helvetica', 'bold');
        const titleHeight = titleLines.length * 4;
        doc.text(value, x + 5, y + 18 + titleHeight);
        
        // Meta
        if (meta) {
            doc.setFontSize(7);
            doc.setTextColor(108, 117, 125);
            doc.setFont('helvetica', 'normal');
            doc.text(meta, x + 5, y + 32);
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'EXCELENTE': return [39, 174, 96]; // Verde
            case 'BOM': return [52, 144, 219]; // Azul
            case 'ATENCAO': return [243, 156, 18]; // Amarelo
            case 'CRITICO': return [231, 76, 60]; // Vermelho
            default: return [149, 165, 166]; // Cinza
        }
    }

    exportarJSON() {
        const dados = {
            ...this.metricas,
            timestamp: new Date().toISOString(),
            versao: '2.0.0'
        };

        const jsonString = JSON.stringify(dados, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        const agora = new Date();
        const dataHora = agora.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const nomeArquivo = `${equipeResponsavel}-${dataHora}.json`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nomeArquivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    updateDateTime() {
        const agora = new Date();
        const dataHora = agora.toLocaleString('pt-BR');
        const dataElement = document.getElementById('data-geracao');
        if (dataElement) {
            dataElement.textContent = dataHora;
        }
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QADashboardNova();
});

