/**
 * Módulo responsável pelos cálculos de métricas
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

const ESCAPE_MINIMO_AMOSTRA = 20;

class MetricsCalculator {
    /**
     * Taxa de Escape (%): Bugs em produção / (Total falhas QA + Total bugs em produção) × 100
     */
    static computeTaxaEscape(bugsEmProducao, totalFalhasQa, totalBugsProducao) {
        const b = bugsEmProducao || 0;
        const denom = (totalFalhasQa || 0) + (totalBugsProducao || 0);
        if (denom < ESCAPE_MINIMO_AMOSTRA) return null;
        return Math.round((b / denom) * 1000) / 10;
    }

    /**
     * Taxa de Automação (%): Testes Automatizados ÷ Testes Criados × 100 (Métricas de Testes)
     */
    static computeTaxaAutomacao(testesAutomatizados, testesCriados) {
        const auto = testesAutomatizados || 0;
        const criados = testesCriados || 0;
        if (criados <= 0) return 0;
        return Math.round((auto / criados) * 1000) / 10;
    }

    /**
     * Taxa de Acerto (%): Bugs válidos ÷ total de reports × 100 (total de bugs/reports no denominador).
     */
    static computeTaxaAcerto(bugsValidos, totalReports) {
        const v = bugsValidos || 0;
        const t = totalReports || 0;
        if (t <= 0) return 0;
        return Math.round((v / t) * 1000) / 10;
    }

    /**
     * Calcula métricas derivadas a partir dos dados coletados
     */
    static calculateDerivedMetrics(metricas) {
        const { bugsAbertos, bugsFechados, defectsAbertos, defectsFechados, 
                historiasTotais, historiasAceitas, testesExecutados, testesPassaram,
                testesCriados, testesAutomatizados,
                falhaRequisito, falhaManualPreRelease, falhaAutomatizadaPreRelease,
                falhaManualRelease, falhaAutomatizadaRelease, falhaProducao,
                escapeBugsProducao, escapeTotalFalhasQa, escapeTotalBugsProducao,
                acertoBugsValidos, acertoTotalBugs } = metricas;

        // Total de falhas
        const totalFalhas = falhaRequisito + falhaManualPreRelease + 
                           falhaAutomatizadaPreRelease + falhaManualRelease + 
                           falhaAutomatizadaRelease + falhaProducao;

        // Taxa de correção de bugs (produção)
        const totalBugs = bugsAbertos + bugsFechados;
        const taxaCorrecaoBugs = totalBugs > 0 ? (bugsFechados / totalBugs) * 100 : 0;

        // Taxa de correção de defects (desenvolvimento)
        const totalDefects = defectsAbertos + defectsFechados;
        const taxaCorrecaoDefects = totalDefects > 0 ? (defectsFechados / totalDefects) * 100 : 0;

        // Aceitação de História de Usuário
        const aceitacaoHistorias = historiasTotais > 0 ? (historiasAceitas / historiasTotais) * 100 : 0;

        // Taxa de sucesso dos testes
        const taxaSucessoTestes = testesExecutados > 0 ? (testesPassaram / testesExecutados) * 100 : 0;

        const taxaEscape = MetricsCalculator.computeTaxaEscape(
            escapeBugsProducao,
            escapeTotalFalhasQa,
            escapeTotalBugsProducao
        );
        const escapeTotalBase = (escapeTotalFalhasQa || 0) + (escapeTotalBugsProducao || 0);
        const escapeAmostraValida = escapeTotalBase >= ESCAPE_MINIMO_AMOSTRA;

        const taxaAutomacao = MetricsCalculator.computeTaxaAutomacao(testesAutomatizados, testesCriados);

        const taxaAcerto = MetricsCalculator.computeTaxaAcerto(acertoBugsValidos, acertoTotalBugs);

        return {
            ...metricas,
            totalFalhas,
            taxaEscape,
            escapeTotalBase,
            escapeAmostraValida,
            taxaAutomacao,
            taxaAcerto,
            taxaCorrecaoBugs,
            taxaCorrecaoDefects,
            aceitacaoHistorias,
            taxaSucessoTestes
        };
    }

    /**
     * Calcula o score atual baseado nas métricas
     */
    static calculateScore(metricas) {
        let score = 0;

        // Taxa de Escape (menor é melhor)
        if (metricas.escapeAmostraValida && metricas.taxaEscape <= METAS.taxaEscape) score += 1;

        // MTTR (menor é melhor)
        if (metricas.mttr <= METAS.mttr) score += 1;

        // Taxa de Acerto (maior é melhor)
        if (metricas.taxaAcerto >= METAS.taxaAcerto) score += 1;

        // Taxa de Sucesso dos Testes (maior é melhor)
        if (metricas.taxaSucessoTestes >= METAS.taxaSucessoTestes) score += 1;

        // Bugs em produção (bugs fechados maior que bugs abertos)
        if (metricas.bugsFechados > metricas.bugsAbertos) score += 1;

        // Aceitação de História de Usuário (maior é melhor, >= 90%)
        if (metricas.aceitacaoHistorias >= METAS.aceitacaoHistorias) score += 1;

        return score;
    }

    /**
     * Classifica o status geral baseado no score
     */
    static classifyStatus(score) {
        if (score >= 5) return 'EXCELENTE';
        if (score >= 3) return 'BOM';
        if (score >= 2) return 'ATENCAO';
        return 'CRITICO';
    }

    /**
     * Classifica a aceitação de histórias
     */
    static classifyAceitacaoHistorias(percentual) {
        if (percentual >= 90) return 'EXCELENTE';
        if (percentual >= 80) return 'BOM';
        if (percentual >= 70) return 'ATENCAO';
        return 'CRITICO';
    }

    /**
     * Classifica a taxa de sucesso dos testes
     */
    static classifyTaxaSucessoTestes(percentual) {
        if (percentual >= 95) return 'EXCELENTE';
        if (percentual >= 85) return 'BOM';
        if (percentual >= 75) return 'MONITORAR';
        return 'ALERTA';
    }
}

// Export para ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MetricsCalculator };
}

// Disponibilizar globalmente para compatibilidade
if (typeof window !== 'undefined') {
    window.MetricsCalculator = MetricsCalculator;
}

// Export para ES6 modules
export { MetricsCalculator };

