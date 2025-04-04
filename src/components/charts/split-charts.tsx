import React from 'react';
import { DataPoint } from '../../types/chart';
import { AreaChartComponent } from './area-chart-component';

interface SplitChartsProps {
  data: DataPoint[];
  breakevenWithoutWakastart: number | null;
  breakevenWithWakastart: number | null;
}

export function SplitCharts({ 
  data, 
  breakevenWithoutWakastart, 
  breakevenWithWakastart 
}: SplitChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Graphique Sans Wakastart */}
      <AreaChartComponent 
        title="Sans Wakastart"
        data={data}
        breakeven={breakevenWithoutWakastart}
        bgColor="bg-slate-900/80"
        revenueKey="cumulativeRevenue"
        costsKey="cumulativeCosts"
        revenueGradientId="revenueGradient"
        costGradientId="costGradient"
        revenueColor="#06b6d4"
        costColor="#e11d48"
      />
      
      {/* Graphique Avec Wakastart */}
      <AreaChartComponent 
        title="Avec Wakastart"
        data={data}
        breakeven={breakevenWithWakastart}
        bgColor="bg-indigo-900/80"
        revenueKey="cumulativeRevenueWithWakastart"
        costsKey="cumulativeCostsWithWakastart"
        revenueGradientId="revenueWakaGradient"
        costGradientId="costWakaGradient"
        revenueColor="#6366f1"
        costColor="#f59e0b"
      />
    </div>
  );
}