/**
 * Módulo responsável por coletar dados do formulário
 */

// Compatibilidade: export para ES6 modules e também disponível globalmente
class DataCollector {
    /**
     * Coleta todos os dados do formulário
     */
    static collectFormData() {
        return {
            // Falhas durante o ciclo de Desenvolvimento
            falhaRequisito: parseInt(document.getElementById('falha-requisito').value) || 0,
            falhaManualPreRelease: parseInt(document.getElementById('falha-manual-pre-release').value) || 0,
            falhaAutomatizadaPreRelease: parseInt(document.getElementById('falha-automatizada-pre-release').value) || 0,
            falhaManualRelease: parseInt(document.getElementById('falha-manual-release').value) || 0,
            falhaAutomatizadaRelease: parseInt(document.getElementById('falha-automatizada-release').value) || 0,
            falhaProducao: parseInt(document.getElementById('falha-producao').value) || 0,
            
            // Taxa de Escape
            taxaEscape: parseFloat(document.getElementById('taxa-escape').value) || 0,
            
            // MTTR
            mttr: parseFloat(document.getElementById('mttr').value) || 0,
            
            // Aceitação de História de Usuário
            historiasTotais: parseInt(document.getElementById('historias-totais').value) || 0,
            historiasAceitas: parseInt(document.getElementById('historias-aceitas').value) || 0,
            
            // Taxa de Automação
            taxaAutomacao: parseFloat(document.getElementById('taxa-automacao').value) || 0,
            
            // Taxa de Acerto
            taxaAcerto: parseFloat(document.getElementById('taxa-acerto').value) || 0,
            
            // Defects vs Bugs
            defectsAbertos: parseInt(document.getElementById('defeitos-abertos').value) || 0,
            defectsFechados: parseInt(document.getElementById('defeitos-fechados').value) || 0,
            bugsAbertos: parseInt(document.getElementById('bugs-abertos').value) || 0,
            bugsFechados: parseInt(document.getElementById('bugs-fechados').value) || 0,
            
            // Falhas Por Prioridade
            falhaPrioridadeTrivial: parseInt(document.getElementById('falha-prioridade-trivial').value) || 0,
            falhaPrioridadeMedia: parseInt(document.getElementById('falha-prioridade-media').value) || 0,
            falhaPrioridadeGravissima: parseInt(document.getElementById('falha-prioridade-gravissima').value) || 0,
            falhaPrioridadeCritica: parseInt(document.getElementById('falha-prioridade-critica').value) || 0,
            
            // Bugs Por Prioridade
            bugPrioridadeTrivial: parseInt(document.getElementById('bug-prioridade-trivial').value) || 0,
            bugPrioridadeMedia: parseInt(document.getElementById('bug-prioridade-media').value) || 0,
            bugPrioridadeGravissima: parseInt(document.getElementById('bug-prioridade-gravissima').value) || 0,
            bugPrioridadeCritica: parseInt(document.getElementById('bug-prioridade-critica').value) || 0,
            
            // Métricas de Testes
            testesCriados: parseInt(document.getElementById('testes-criados').value) || 0,
            testesExecutados: parseInt(document.getElementById('testes-executados').value) || 0,
            testesPassaram: parseInt(document.getElementById('testes-passaram').value) || 0,
            testesAutomatizados: parseInt(document.getElementById('testes-automatizados').value) || 0,
            
            // Informações adicionais
            equipeResponsavel: document.getElementById('equipe-responsavel')?.value || 'Time QA',
            periodoAnalise: document.getElementById('periodo-analise')?.value || 'Últimos 30 dias',
            observacoes: document.getElementById('observacoes')?.value || '',
            dataGeracao: new Date().toLocaleString('pt-BR')
        };
    }

    /**
     * Limpa todos os campos do formulário
     */
    static clearForm() {
        document.querySelectorAll('#entrada-dados input').forEach(input => {
            input.value = '';
        });
        const observacoes = document.getElementById('observacoes');
        if (observacoes) observacoes.value = '';
    }
}

// Export para ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataCollector };
}

// Disponibilizar globalmente para compatibilidade
if (typeof window !== 'undefined') {
    window.DataCollector = DataCollector;
}

// Export para ES6 modules
export { DataCollector };

