/**
 * Configurações e constantes do Dashboard QA
 */

export const METAS = {
    taxaEscape: 5,
    mttr: 16,
    taxaAutomacao: 70,
    taxaAcerto: 85,
    taxaSucessoTestes: 95,
    aceitacaoHistorias: 90
};

export const STATUS_CLASSIFICATION = {
    EXCELENTE: { min: 5, color: '#27ae60', class: 'excelente' },
    BOM: { min: 3, color: '#3498db', class: 'bom' },
    ATENCAO: { min: 2, color: '#f39c12', class: 'atencao' },
    CRITICO: { min: 0, color: '#e74c3c', class: 'critico' }
};

export const ACEITACAO_HISTORIAS_CLASSIFICATION = {
    EXCELENTE: { min: 90, color: '#27ae60' },
    BOM: { min: 80, color: '#3498db' },
    ATENCAO: { min: 70, color: '#f39c12' },
    CRITICO: { min: 0, color: '#e74c3c' }
};

export const TAXA_SUCESSO_TESTES_CLASSIFICATION = {
    EXCELENTE: { min: 95, color: '#27ae60', label: 'EXCELENTE' },
    BOM: { min: 85, color: '#3498db', label: 'BOM' },
    MONITORAR: { min: 75, color: '#f39c12', label: 'MONITORAR' },
    ALERTA: { min: 0, color: '#e74c3c', label: 'ALERTA' }
};

export const CHART_COLORS = {
    primary: '#3498db',
    success: '#27ae60',
    warning: '#f39c12',
    danger: '#e74c3c',
    info: '#17a2b8',
    secondary: '#95a5a6'
};

export const FALHAS_GRADIENT_COLORS = [
    { start: '#ffeb3b', end: '#ffc107' }, // Falha de Requisito
    { start: '#f39c12', end: '#e67e22' }, // Falha Manual Pré-Release
    { start: '#e67e22', end: '#f39c12' }, // Falha Automatizada Pré-Release
    { start: '#ff6b6b', end: '#ee5a6f' }, // Falha Manual Release
    { start: '#ee5a6f', end: '#ff6b6b' }, // Falha Automatizada Release
    { start: '#c0392b', end: '#a93226' }  // Falha em Produção
];

export const FALHAS_BORDER_COLORS = [
    '#ffc107',  // Falha de Requisito
    '#e67e22',  // Falha Manual Pré-Release
    '#f39c12',  // Falha Automatizada Pré-Release
    '#ee5a6f',  // Falha Manual Release
    '#ff6b6b',  // Falha Automatizada Release
    '#a93226'   // Falha em Produção
];

export const PRIORIDADE_COLORS = {
    trivial: '#95a5a6',
    media: '#3498db',
    gravissima: '#f39c12',
    critica: '#e74c3c'
};

export const PDF_CONFIG = {
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    margin: 10,
    imageQuality: 0.75,
    scale: 1.2,
    pixelRatio: 1
};

