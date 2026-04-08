/**
 * Módulo responsável por gerar análises e pontos de atenção
 */

// Valores de metas (pode ser importado de constants.js se disponível)
const METAS = {
    taxaEscape: 5,
    mttr: 16,
    taxaAutomacao: 70,
    taxaAcerto: 85,
    taxaSucessoTestes: 95,
    aceitacaoHistorias: 90
};

// Função para formatar valores igual ao gráfico Comparação Métricas VS Metas
function formatMetricValue(value) {
    let formattedValue = value.toFixed(2);
    // Remove zeros desnecessários no final
    formattedValue = parseFloat(formattedValue).toString();
    // Garante pelo menos uma casa decimal quando for inteiro
    if (!formattedValue.includes('.')) {
        formattedValue = value.toFixed(1);
    }
    return formattedValue;
}

class AnalysisGenerator {
    /**
     * Gera pontos positivos baseados nas métricas
     */
    static generatePositivePoints(metricas) {
        const pontos = [];

        if (metricas.taxaEscape <= METAS.taxaEscape) {
            pontos.push('Taxa de escape dentro da meta');
        }
        if (metricas.mttr <= METAS.mttr) {
            pontos.push('MTTR dentro do esperado');
        }
        if (metricas.taxaAcerto >= METAS.taxaAcerto) {
            pontos.push('Excelente taxa de acerto');
        }
        if (metricas.taxaSucessoTestes >= METAS.taxaSucessoTestes) {
            pontos.push(`Taxa de sucesso dos testes: EXCELENTE (${formatMetricValue(metricas.taxaSucessoTestes)}%)`);
        } else if (metricas.taxaSucessoTestes >= 85) {
            pontos.push(`Taxa de sucesso dos testes: BOM (${formatMetricValue(metricas.taxaSucessoTestes)}%)`);
        }
        if (metricas.falhaProducao === 0) {
            pontos.push('Nenhuma falha em produção');
        }
        if (metricas.totalFalhas > 0 && metricas.falhaProducao === 0) {
            pontos.push('Todas as falhas identificadas antes da produção');
        }
        if (metricas.aceitacaoHistorias >= 90) {
            pontos.push('Excelente aceitação de histórias de usuário');
        } else if (metricas.aceitacaoHistorias >= 80) {
            pontos.push('Boa aceitação de histórias de usuário');
        }

        return pontos.length > 0 ? pontos : ['Métricas em análise'];
    }

    /**
     * Gera pontos de atenção baseados nas métricas
     */
    static generateAttentionPoints(metricas) {
        const pontos = [];

        if (metricas.taxaEscape > METAS.taxaEscape) {
            pontos.push('Taxa de escape acima da meta');
        }
        if (metricas.mttr > METAS.mttr) {
            pontos.push('MTTR acima do esperado');
        }
        if (metricas.taxaAcerto < METAS.taxaAcerto) {
            pontos.push('Taxa de acerto abaixo da meta');
        }
        if (metricas.taxaSucessoTestes < METAS.taxaSucessoTestes) {
            pontos.push('Taxa de sucesso dos testes abaixo da meta');
        }
        if (metricas.falhaProducao > 0) {
            pontos.push(`Falhas em produção detectadas: ${metricas.falhaProducao}`);
        }
        if (metricas.falhaRequisito > 0) {
            pontos.push(`Falhas de requisito detectadas: ${metricas.falhaRequisito}`);
        }
        if (metricas.bugsAbertos > 0) {
            pontos.push(`Bugs abertos em produção: ${metricas.bugsAbertos}`);
        }
        if (metricas.bugsFechados <= metricas.bugsAbertos && 
            (metricas.bugsAbertos > 0 || metricas.bugsFechados > 0)) {
            pontos.push(`Bugs em produção: fechados (${metricas.bugsFechados}) não superam abertos (${metricas.bugsAbertos})`);
        }
        if (metricas.aceitacaoHistorias < 90) {
            if (metricas.aceitacaoHistorias < 70) {
                pontos.push(`Aceitação de histórias crítica: ${formatMetricValue(metricas.aceitacaoHistorias)}%`);
            } else if (metricas.aceitacaoHistorias < 80) {
                pontos.push(`Aceitação de histórias requer atenção: ${formatMetricValue(metricas.aceitacaoHistorias)}%`);
            } else {
                pontos.push(`Aceitação de histórias abaixo do excelente: ${formatMetricValue(metricas.aceitacaoHistorias)}%`);
            }
        }
        
        // Taxa de Sucesso dos Testes - análise detalhada
        if (metricas.taxaSucessoTestes < METAS.taxaSucessoTestes) {
            const taxaSucesso = metricas.taxaSucessoTestes || 0;
            if (taxaSucesso < 75) {
                pontos.push(`Taxa de sucesso dos testes: ALERTA (${formatMetricValue(taxaSucesso)}%)`);
            } else if (taxaSucesso < 85) {
                pontos.push(`Taxa de sucesso dos testes: MONITORAR (${formatMetricValue(taxaSucesso)}%)`);
            } else {
                pontos.push(`Taxa de sucesso dos testes: BOM (${formatMetricValue(taxaSucesso)}%)`);
            }
        }

        return pontos.length > 0 ? pontos : ['Todas as métricas dentro das metas'];
    }

    /**
     * Gera avisos sobre falhas
     */
    static generateFailureAlerts(metricas) {
        const avisos = [];
        const limiteAlto = 2;

        const { falhaManualRelease, falhaAutomatizadaRelease, falhaProducao } = metricas;

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

        return avisos;
    }

    /**
     * Gera mensagens de parabéns sobre falhas detectadas cedo
     */
    static generateSuccessMessages(metricas) {
        const parabens = [];
        const limiteAlto = 2;

        const { falhaRequisito, falhaManualPreRelease, falhaAutomatizadaPreRelease } = metricas;

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

        return parabens;
    }
}

// Export para ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalysisGenerator };
}

// Disponibilizar globalmente para compatibilidade
if (typeof window !== 'undefined') {
    window.AnalysisGenerator = AnalysisGenerator;
}

// Export para ES6 modules
export { AnalysisGenerator };

