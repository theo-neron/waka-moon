import React from 'react';
import { formatEuro } from '@/lib/utils/formatting';

interface MetricCardProps {
  label: string;
  value: number | string;
  formatter?: (value: number) => string;
  unit?: string;
}

/**
 * Carte d'affichage de métrique avec formatage configurable
 */
export function MetricCard({ 
  label, 
  value, 
  formatter = formatEuro, 
  unit = '' 
}: MetricCardProps) {
  const formattedValue = typeof value === 'number' ? formatter(value) : value;
  
  return (
    <div className="px-4 py-2 bg-slate-900/60 rounded-lg border border-indigo-900/30 w-full">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{formattedValue}{unit}</div>
    </div>
  );
}