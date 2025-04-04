export interface DataPoint {
  name: string;
  quarter: number;
  
  // Données trimestrielles sans Wakastart
  revenue: number;
  costs: number;
  profitLoss: number;
  
  // Données cumulatives sans Wakastart
  cumulativeRevenue: number;
  cumulativeCosts: number;
  cumulativeProfitLoss: number;
  
  // Données trimestrielles avec Wakastart
  revenueWithWakastart: number;
  costsWithWakastart: number;
  profitLossWithWakastart: number;
  
  // Données cumulatives avec Wakastart
  cumulativeRevenueWithWakastart: number;
  cumulativeCostsWithWakastart: number;
  cumulativeProfitLossWithWakastart: number;
}

export interface ChartSummary {
  breakevenPoint: number | null;
  financialBenefit: number;
  timeGain: number;
  lastQuarterData: DataPoint | null;
}