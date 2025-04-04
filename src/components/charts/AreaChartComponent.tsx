'use client'

import React from 'react';
import { DataPoint } from '@/types/chart';
import { formatEuro } from '@/lib/utils/formatting';
import { CHART_COLORS, TOOLTIP_STYLE } from './ChartConfig';

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

/**
 * Props pour le composant AreaChartComponent
 */
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
  hideTitle?: boolean;
}

/**
 * Composant de graphique en aires pour visualiser revenus et coûts
 * Affiche l'évolution des revenus et coûts sur une période donnée,
 * avec indication du point de rentabilité
 */
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
  costColor,
  hideTitle = false
}: AreaChartComponentProps) {
  return (
    <div className="h-[350px] bg-slate-900/60 p-4 rounded-lg border border-slate-800 relative">
      {/* Titre en position absolue mais avec une meilleure visibilité */}
      {!hideTitle && title && (
        <div className={`absolute top-2 right-2 p-1.5 ${bgColor} rounded-lg z-10`}>
          <span className="font-bold text-white text-sm">{title}</span>
        </div>
      )}
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
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.referenceGrid} />
          <XAxis dataKey="name" stroke={CHART_COLORS.axis} />
          <YAxis 
            tickFormatter={(value) => `${Math.abs(value / 1000)}k`} 
            stroke={CHART_COLORS.axis} 
          />
          <Tooltip 
            formatter={(value) => formatEuro(Number(value))}
            contentStyle={TOOLTIP_STYLE.contentStyle}
            labelStyle={TOOLTIP_STYLE.labelStyle}
            itemStyle={TOOLTIP_STYLE.itemStyle}
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
              stroke={CHART_COLORS.breakeven}
              strokeWidth={2}
              label={{ 
                value: 'Rentabilité', 
                position: 'top', 
                fill: CHART_COLORS.breakeven, 
                fontSize: 11,
                fontWeight: 'bold',
                offset: 10
              }} 
              strokeDasharray="3 3" 
            />
          )}
          
          <ReferenceLine y={0} stroke={CHART_COLORS.referenceLine} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}