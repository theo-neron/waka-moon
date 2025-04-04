import { ChartConfig } from '../../types/chart-config';

/**
 * Configuration des couleurs pour les graphiques
 */
export const CHART_COLORS = {
  // Sans Wakastart
  revenueStandard: "#06b6d4", // Cyan
  costStandard: "#e11d48",    // Rose
  
  // Avec Wakastart
  revenueWakastart: "#6366f1", // Indigo
  costWakastart: "#f59e0b",    // Amber
  
  // Autres
  breakeven: "#ffffff",
  referenceGrid: "#334155",
  referenceLine: "#4b5563",
  axis: "#94a3b8",
};

/**
 * Configuration des gradients pour les graphiques en aires
 */
export const CHART_GRADIENTS = {
  revenueStandard: "revenueGradient",
  costStandard: "costGradient",
  revenueWakastart: "revenueWakaGradient",
  costWakastart: "costWakaGradient",
};

/**
 * Configuration des tooltips pour les graphiques
 */
export const TOOLTIP_STYLE = {
  contentStyle: { 
    backgroundColor: '#1e293b', 
    borderColor: '#334155', 
    color: '#fff', 
    borderRadius: '0.375rem' 
  },
  labelStyle: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  itemStyle: { 
    padding: '4px 0' 
  }
};

/**
 * Configuration des marges pour les graphiques
 */
export const CHART_MARGINS = {
  areaChart: {
    top: 30,
    right: 10,
    left: 0,
    bottom: 5,
  },
  composedChart: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 5,
  }
};