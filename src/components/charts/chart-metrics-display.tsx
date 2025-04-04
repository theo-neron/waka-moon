import React from 'react';
import { FormData } from '../../types/form';
import { MetricCard } from '../ui/metric-card';
import { formatEuro } from '../../lib/financial';

interface ChartMetricsDisplayProps {
  formData: FormData;
}

export function ChartMetricsDisplay({ formData }: ChartMetricsDisplayProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <MetricCard 
        label="CAC actuel" 
        value={formData.cac} 
      />
      <MetricCard 
        label="Prix moyen" 
        value={formData.averagePrice} 
      />
      <MetricCard 
        label="Objectif clients" 
        value={formData.clientTarget12m} 
        formatter={(v) => v.toString()}
        unit=""
      />
      <MetricCard 
        label="Churn mensuel" 
        value={formData.churnRate} 
        formatter={(v) => v.toString()}
        unit="%"
      />
    </div>
  );
}