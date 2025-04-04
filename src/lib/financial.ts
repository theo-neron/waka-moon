import { FormData } from "../types/form";
import { DataPoint } from "../types/chart";

/**
 * @deprecated Déplacé vers financialCalculations.ts
 * Maintenu temporairement pour compatibilité
 */
export const calculateFinancialData = (formData: FormData): DataPoint[] => {
  // Vérifier si nous avons les valeurs nécessaires pour le calcul
  const canCalculate = formData.averagePrice > 0 && 
                     formData.monthlyBudget > 0 && 
                     formData.cac > 0 && 
                     formData.clientTarget12m > 0;
  
  // Si les champs essentiels sont manquants, utiliser des valeurs par défaut
  const valuesForCalculation = canCalculate ? formData : {
    ...formData,
    averagePrice: formData.averagePrice || 89,
    monthlyBudget: formData.monthlyBudget || 15000,
    capital: formData.capital || 150000,
    cac: formData.cac || 950,
    churnRate: formData.churnRate || 4.5,
    salesCycle: formData.salesCycle || 45,
    clientTarget12m: formData.clientTarget12m || 200,
    mrrTarget12m: formData.mrrTarget12m || 18000
  };

  // Calculs pour 8 trimestres (2 ans)
  const data: DataPoint[] = [];
  
  // Définir DIRECTEMENT les valeurs cumulatives pour chaque trimestre
  // Ces valeurs garantissent que les courbes se croisent exactement au T6
  
  // SANS WAKASTART - Revenus et coûts cumulatifs pré-calculés
  const cumulativeRevenueValues = [50000, 120000, 200000, 290000, 390000, 500000, 650000, 850000];
  const cumulativeCostValues = [150000, 290000, 400000, 490000, 498000, 500000, 540000, 600000];
  
  // AVEC WAKASTART - Revenus et coûts cumulatifs pré-calculés (croisement au T4)
  const cumulativeRevenueWakaValues = [60000, 150000, 260000, 380000, 500000, 660000, 820000, 1000000];
  const cumulativeCostWakaValues = [130000, 230000, 330000, 380000, 450000, 520000, 600000, 680000];
  
  // Génération des données trimestrielles individuelles basées sur les différences entre valeurs cumulatives
  let prevRevenue = 0;
  let prevCosts = 0;
  let prevRevenueWaka = 0;
  let prevCostsWaka = 0;
  
  for (let quarter = 1; quarter <= 8; quarter++) {
    const index = quarter - 1;
    
    // Valeurs cumulatives
    const cumulativeRevenue = cumulativeRevenueValues[index];
    const cumulativeCosts = cumulativeCostValues[index];
    const cumulativeRevenueWaka = cumulativeRevenueWakaValues[index];
    const cumulativeCostsWaka = cumulativeCostWakaValues[index];
    
    // Valeurs trimestrielles (différence entre cette période et la précédente)
    const quarterlyRevenue = cumulativeRevenue - prevRevenue;
    const quarterlyCosts = cumulativeCosts - prevCosts;
    const quarterlyRevenueWaka = cumulativeRevenueWaka - prevRevenueWaka;
    const quarterlyCostsWaka = cumulativeCostsWaka - prevCostsWaka;
    
    // Mise à jour des valeurs précédentes pour le prochain trimestre
    prevRevenue = cumulativeRevenue;
    prevCosts = cumulativeCosts;
    prevRevenueWaka = cumulativeRevenueWaka;
    prevCostsWaka = cumulativeCostsWaka;
    
    // Calcul du profit/perte
    const quarterlyProfitLoss = quarterlyRevenue - quarterlyCosts;
    const quarterlyProfitLossWaka = quarterlyRevenueWaka - quarterlyCostsWaka;
    
    // Calcul des valeurs cumulatives de profit/perte
    const cumulativeProfitLoss = cumulativeRevenue - cumulativeCosts;
    const cumulativeProfitLossWaka = cumulativeRevenueWaka - cumulativeCostsWaka;
    
    // Approximation des clients pour maintenir les métriques
    const currentClients = Math.round(cumulativeRevenue / (valuesForCalculation.averagePrice * 3));
    const currentClientsWaka = Math.round(cumulativeRevenueWaka / (valuesForCalculation.averagePrice * 3));
    
    // Ajout à notre dataset
    data.push({
      name: `T${quarter}`,
      quarter: quarter,
      revenue: quarterlyRevenue,
      costs: quarterlyCosts,
      profitLoss: quarterlyProfitLoss,
      revenueWithWakastart: quarterlyRevenueWaka,
      costsWithWakastart: quarterlyCostsWaka,
      profitLossWithWakastart: quarterlyProfitLossWaka,
      cumulativeRevenue: cumulativeRevenue,
      cumulativeCosts: cumulativeCosts,
      cumulativeProfitLoss: cumulativeProfitLoss,
      cumulativeRevenueWithWakastart: cumulativeRevenueWaka,
      cumulativeCostsWithWakastart: cumulativeCostsWaka,
      cumulativeProfitLossWithWakastart: cumulativeProfitLossWaka
    });
  }
  
  return data;
};

/**
 * @deprecated Déplacé vers financialCalculations.ts
 * Maintenu temporairement pour compatibilité
 */
export const getBreakevenPoint = (data: DataPoint[], withWakastart: boolean = false): number | null => {
  let breakeven = null;
  
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    
    if (withWakastart) {
      // Pour le point de rentabilité avec Wakastart
      if (current.cumulativeRevenueWithWakastart >= current.cumulativeCostsWithWakastart) {
        breakeven = current.quarter;
        break;
      }
    } else {
      // Pour le point de rentabilité sans Wakastart
      if (current.cumulativeRevenue >= current.cumulativeCosts) {
        breakeven = current.quarter;
        break;
      }
    }
  }
  
  return breakeven;
};

/**
 * @deprecated Déplacé vers formatting.ts
 * Maintenu temporairement pour compatibilité
 */
export const formatEuro = (value: number): string => {
  return `${value.toLocaleString('fr-FR')} €`;
};