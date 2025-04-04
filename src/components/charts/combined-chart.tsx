import React from 'react';
import { DataPoint } from '../../types/chart';
import { formatEuro } from '../../lib/financial';
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
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis tickFormatter={(value) => `${Math.abs(value / 1000)}k €`} stroke="#94a3b8" />
          <Tooltip 
            formatter={(value) => formatEuro(Number(value))}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '0.375rem' }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            itemStyle={{ padding: '4px 0' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          
          {/* Lignes de revenus */}
          <Line 
            type="monotone" 
            dataKey="cumulativeRevenue" 
            name="Revenus sans Wakastart" 
            stroke="#06b6d4" 
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: '#06b6d4' }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeRevenueWithWakastart" 
            name="Revenus avec Wakastart" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: '#6366f1' }} 
            activeDot={{ r: 6 }}
          />
          
          {/* Lignes de coûts */}
          <Line 
            type="monotone" 
            dataKey="cumulativeCosts" 
            name="Coûts sans Wakastart" 
            stroke="#e11d48" 
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: '#e11d48' }} 
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeCostsWithWakastart" 
            name="Coûts avec Wakastart" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 1, fill: '#f59e0b' }} 
          />
          
          {/* Lignes de rentabilité */}
          {breakevenWithoutWakastart && (
            <ReferenceLine 
              x={`T${breakevenWithoutWakastart}`} 
              stroke="#e11d48"
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité sans Wakastart', 
                position: 'top', 
                fill: '#e11d48', 
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
              stroke="#6366f1"
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité avec Wakastart', 
                position: 'insideBottomRight', 
                fill: '#6366f1', 
                fontSize: 12,
                fontWeight: 'bold',
                offset: 10
              }} 
              strokeDasharray="3 3" 
            />
          )}
          
          <ReferenceLine y={0} stroke="#4b5563" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}