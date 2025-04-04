import React from 'react';
import { DataPoint } from '@/types/chart';
import { formatEuro } from '@/lib/utils/formatting';

interface ScenarioSummaryProps {
  title: string;
  color: string;
  breakeven: number | null;
  lastQuarterData: DataPoint | null;
  withWakastart?: boolean;
}

export function ScenarioSummary({ 
  title, 
  color, 
  breakeven, 
  lastQuarterData,
  withWakastart = false 
}: ScenarioSummaryProps) {
  if (!lastQuarterData) return null;
  
  const revenue = withWakastart 
    ? lastQuarterData.cumulativeRevenueWithWakastart 
    : lastQuarterData.cumulativeRevenue;
    
  const profitLoss = withWakastart 
    ? lastQuarterData.cumulativeProfitLossWithWakastart 
    : lastQuarterData.cumulativeProfitLoss;
  
  return (
    <div className="rounded-md border border-slate-700 bg-slate-900/60 p-4 shadow-md">
      <h4 className="font-semibold mb-4 text-white flex items-center">
        <span className={`w-3 h-3 rounded-full ${color} mr-2`}></span>
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400">Point de rentabilité :</span>
          <span className="font-medium text-white">{breakeven ? `Trimestre ${breakeven}` : 'Non atteint'}</span>
        </li>
        <li className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400">Revenus cumulés à 24 mois :</span>
          <span className="font-medium text-white">{formatEuro(revenue)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-slate-400">Profit/Perte cumulés à 24 mois :</span>
          <span className={`font-medium ${profitLoss > 0 ? 'text-green-400' : 'text-rose-400'}`}>
            {formatEuro(profitLoss)}
          </span>
        </li>
      </ul>
    </div>
  );
}