import React from 'react';
import { DataPoint } from '../../types/chart';
import { formatEuro } from '../../lib/financial';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

interface AreaChartComponentProps {
  title: string;
  data: DataPoint[];
  breakeven: number | null;
  bgColor: string;
  revenueKey: string;
  costsKey: string;
  revenueGradientId: string;
  costGradientId: string;
  revenueColor: string;
  costColor: string;
}

export function AreaChartComponent({
  title,
  data,
  breakeven,
  bgColor,
  revenueKey,
  costsKey,
  revenueGradientId,
  costGradientId,
  revenueColor,
  costColor
}: AreaChartComponentProps) {
  return (
    <div className="h-[350px] bg-slate-900/60 p-4 rounded-lg border border-slate-800 relative">
      <div className={`absolute top-2 left-2 p-1.5 ${bgColor} rounded-lg z-10`}>
        <span className="font-bold text-white text-sm">{title}</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis tickFormatter={(value) => `${Math.abs(value / 1000)}k`} stroke="#94a3b8" />
          <Tooltip 
            formatter={(value) => formatEuro(Number(value))}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '0.375rem' }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            itemStyle={{ padding: '4px 0' }}
          />
          
          <defs>
            <linearGradient id={revenueGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={revenueColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={revenueColor} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id={costGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={costColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={costColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <Area 
            type="monotone" 
            dataKey={revenueKey} 
            name="Revenus" 
            stroke={revenueColor} 
            strokeWidth={3}
            fill={`url(#${revenueGradientId})`} 
            dot={{ r: 3, strokeWidth: 1, fill: revenueColor }} 
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            dataKey={costsKey} 
            name="Coûts" 
            stroke={costColor} 
            strokeWidth={3}
            fill={`url(#${costGradientId})`} 
            dot={{ r: 3, strokeWidth: 1, fill: costColor }}
          />
          
          {breakeven && (
            <ReferenceLine 
              x={`T${breakeven}`} 
              stroke="#ffffff"
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité', 
                position: 'insideTopRight', 
                fill: '#ffffff', 
                fontSize: 11,
                fontWeight: 'bold',
                offset: -10
              }} 
              strokeDasharray="3 3" 
            />
          )}
          
          <ReferenceLine y={0} stroke="#4b5563" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}