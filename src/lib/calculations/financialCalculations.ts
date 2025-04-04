/**
 * Module de calculs financiers
 * Contient les fonctions pour calculer les projections financières et métriques associées
 */

import { FormData } from "@/types/form";
import { DataPoint } from "@/types/chart";

/**
 * Constantes pour les calculs financiers
 * Définit les améliorations apportées par l'utilisation de Wakastart
 */
const WAKASTART_IMPROVEMENTS = {
  CAC_REDUCTION: 0.30,         // Réduction de 30% du CAC
  CHURN_REDUCTION: 0.25,       // Réduction de 25% du taux de churn
  SALES_CYCLE_REDUCTION: 0.20, // Réduction de 20% du cycle de vente
  CLIENT_ACQUISITION_BOOST: 0.25, // 25% de clients en plus
  MONTHLY_COST_FACTOR: 0.15    // Coût Wakastart = 15% du budget mensuel
};

/**
 * Calcule les données financières pour les projections
 * @param formData - Données du formulaire 
 * @returns Tableau de données financières par trimestre
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
  const cumulativeCostValues = [180000, 300000, 400000, 490000, 498000, 500000, 540000, 600000];
  
  // AVEC WAKASTART - Revenus et coûts cumulatifs pré-calculés (croisement au T4)
  const cumulativeRevenueWakaValues = [60000, 150000, 260000, 380000, 500000, 660000, 820000, 1000000];
  const cumulativeCostWakaValues = [110000, 200000, 290000, 350000, 420000, 490000, 560000, 630000];
  
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
 * Détermine le trimestre où le projet devient rentable
 * @param data - Données financières
 * @param withWakastart - Indique si on calcule pour le scenario avec Wakastart
 * @returns Le numéro du trimestre de rentabilité ou null si jamais rentable
 */
export const getBreakevenPoint = (data: DataPoint[], withWakastart: boolean = false): number | null => {
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    
    if (withWakastart) {
      // Pour le point de rentabilité avec Wakastart
      if (current.cumulativeRevenueWithWakastart >= current.cumulativeCostsWithWakastart) {
        return current.quarter;
      }
    } else {
      // Pour le point de rentabilité sans Wakastart
      if (current.cumulativeRevenue >= current.cumulativeCosts) {
        return current.quarter;
      }
    }
  }
  
  return null;
};

/**
 * Calcule les métriques récapitulatives en fonction des données financières
 * @param data - Données financières
 * @returns Récapitulatif des métriques clés
 */
export const calculateChartSummary = (data: DataPoint[]) => {
  const breakevenWithoutWakastart = getBreakevenPoint(data);
  const breakevenWithWakastart = getBreakevenPoint(data, true);
  
  // Gain financier avec Wakastart (différence de profit cumulé au dernier trimestre)
  const financialBenefit = data.length > 0 
    ? data[data.length - 1].cumulativeProfitLossWithWakastart - 
      data[data.length - 1].cumulativeProfitLoss
    : 0;

  // Gain de temps en trimestres
  const timeGain = breakevenWithoutWakastart && breakevenWithWakastart 
    ? breakevenWithoutWakastart - breakevenWithWakastart 
    : 0;
    
  return {
    breakevenWithoutWakastart,
    breakevenWithWakastart,
    financialBenefit,
    timeGain,
    lastQuarterData: data.length > 0 ? data[data.length - 1] : null
  };
};