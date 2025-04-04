import React from 'react';
import { DataPoint } from '../../types/chart';
import { formatEuro } from '../../lib/utils/formatting';
import { CHART_COLORS, CHART_MARGINS, TOOLTIP_STYLE } from './ChartConfig';

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

interface CombinedChartProps {
  data: DataPoint[];
  breakevenWithoutWakastart: number | null;
  breakevenWithWakastart: number | null;
}

/**
 * Graphique combiné montrant les deux scénarios (avec et sans Wakastart) sur un même graphique
 */
export function CombinedChart({ 
  data, 
  breakevenWithoutWakastart, 
  breakevenWithWakastart 
}: CombinedChartProps) {
  return (
    <div className="h-[400px] bg-slate-900/60 p-4 rounded-lg border border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={CHART_MARGINS.composedChart}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.referenceGrid} />
          <XAxis dataKey="name" stroke={CHART_COLORS.axis} />
          <YAxis 
            tickFormatter={(value) => `${Math.abs(value / 1000)}k €`} 
            stroke={CHART_COLORS.axis} 
          />
          <Tooltip 
            formatter={(value) => formatEuro(Number(value))}
            contentStyle={TOOLTIP_STYLE.contentStyle}
            labelStyle={TOOLTIP_STYLE.labelStyle}
            itemStyle={TOOLTIP_STYLE.itemStyle}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          
          {/* Lignes de revenus */}
          <Line 
            type="monotone" 
            dataKey="cumulativeRevenue" 
            name="Revenus sans Wakastart" 
            stroke={CHART_COLORS.revenueStandard}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: CHART_COLORS.revenueStandard }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeRevenueWithWakastart" 
            name="Revenus avec Wakastart" 
            stroke={CHART_COLORS.revenueWakastart}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: CHART_COLORS.revenueWakastart }} 
            activeDot={{ r: 6 }}
          />
          
          {/* Lignes de coûts */}
          <Line 
            type="monotone" 
            dataKey="cumulativeCosts" 
            name="Coûts sans Wakastart" 
            stroke={CHART_COLORS.costStandard}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: CHART_COLORS.costStandard }} 
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeCostsWithWakastart" 
            name="Coûts avec Wakastart" 
            stroke={CHART_COLORS.costWakastart}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: CHART_COLORS.costWakastart }} 
          />
          
          {/* Lignes de rentabilité */}
          {breakevenWithoutWakastart && (
            <ReferenceLine 
              x={`T${breakevenWithoutWakastart}`} 
              stroke={CHART_COLORS.costStandard}
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité sans Wakastart', 
                position: 'top', 
                fill: CHART_COLORS.costStandard, 
                fontSize: 12,
                fontWeight: 'bold',
                offset: 10
              }} 
              strokeDasharray="3 3" 
            />
          )}
          
          {breakevenWithWakastart && (
            <ReferenceLine 
              x={`T${breakevenWithWakastart}`} 
              stroke={CHART_COLORS.revenueWakastart}
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité avec Wakastart', 
                position: 'insideBottomRight', 
                fill: CHART_COLORS.revenueWakastart, 
                fontSize: 12,
                fontWeight: 'bold',
                offset: 10
              }} 
              strokeDasharray="3 3" 
            />
          )}
          
          <ReferenceLine y={0} stroke={CHART_COLORS.referenceLine} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}