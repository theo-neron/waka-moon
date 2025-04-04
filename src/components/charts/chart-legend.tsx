import React from 'react';

export function ChartLegend() {
  return (
    <div className="flex flex-col md:flex-row gap-3 text-sm text-slate-300">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
        <p>Revenus sans Wakastart</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
        <p>Revenus avec Wakastart</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        <p>Coûts sans Wakastart</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <p>Coûts avec Wakastart</p>
      </div>
    </div>
  );
}