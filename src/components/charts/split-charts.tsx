import React from 'react';
import { DataPoint } from '@/types/chart';
import { AreaChartComponent } from './AreaChartComponent';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <AreaChartComponent 
          title=""
          data={data}
          breakeven={breakevenWithoutWakastart}
          bgColor="bg-slate-900/80"
          revenueKey="cumulativeRevenue"
          costsKey="cumulativeCosts"
          revenueGradientId="revenueGradient"
          costGradientId="costGradient"
          revenueColor="#06b6d4"
          costColor="#e11d48"
          hideTitle={true}
        />
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <p className="text-sm text-slate-300">Revenus sans Wakastart</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <p className="text-sm text-slate-300">Coûts sans Wakastart</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <AreaChartComponent 
          title=""
          data={data}
          breakeven={breakevenWithWakastart}
          bgColor="bg-indigo-900/80"
          revenueKey="cumulativeRevenueWithWakastart"
          costsKey="cumulativeCostsWithWakastart"
          revenueGradientId="revenueWakaGradient"
          costGradientId="costWakaGradient"
          revenueColor="#6366f1"
          costColor="#f59e0b"
          hideTitle={true}
        />
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <p className="text-sm text-slate-300">Revenus avec Wakastart</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <p className="text-sm text-slate-300">Coûts avec Wakastart</p>
          </div>
        </div>
      </div>
    </div>
  );
}