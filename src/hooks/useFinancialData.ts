import { useMemo } from 'react';
import { FormData } from '../types/form';
import { ChartSummary } from '../types/chart';
import { 
  calculateFinancialData,
  getBreakevenPoint,
  calculateChartSummary
} from '../lib/calculations/financialCalculations';

/**
 * Hook qui calcule et renvoie toutes les données financières nécessaires pour les graphiques
 * Utilise la mémorisation pour éviter des recalculs inutiles
 * 
 * @param formData - Données du formulaire utilisateur
 * @returns Données financières, points de rentabilité et métriques
 */
export function useFinancialData(formData: FormData) {
  // Calcul et mémorisation des données du graphique
  const chartData = useMemo(() => calculateFinancialData(formData), [formData]);

  // Calcul et mémorisation du récapitulatif
  const {
    breakevenWithoutWakastart,
    breakevenWithWakastart,
    financialBenefit,
    timeGain,
    lastQuarterData
  } = useMemo(() => calculateChartSummary(chartData), [chartData]);

  return {
    chartData,
    breakevenWithoutWakastart,
    breakevenWithWakastart,
    financialBenefit,
    timeGain,
    lastQuarterData
  };
}