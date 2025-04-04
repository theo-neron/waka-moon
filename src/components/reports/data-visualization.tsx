'use client'

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface DataVisualizationProps {
  config: Record<string, any>;
}

export function DataVisualization({ config }: DataVisualizationProps) {
  // Si pas de configuration, ne rien afficher
  if (!config || !config.type) return null;
  
  // Choisir le type de visualisation en fonction de la configuration
  switch (config.type) {
    case 'revenue-bar-chart':
      return <RevenueBarChart data={config.data} />;
    
    case 'benchmarks-radar':
      return <BenchmarksRadarChart data={config.data} />;
      
    case 'competitors-table':
      return <CompetitorsTable data={config.data} />;
      
    default:
      return null;
  }
}

// Graphique en barres pour les projections de revenus
function RevenueBarChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;
  
  // Formater les données pour le graphique
  const chartData = data.map(item => ({
    name: item.period,
    value: item.value
  }));
  
  // Déterminer l'unité
  const unit = data[0]?.unit || 'EUR';
  
  return (
    <div className="h-64 bg-slate-800/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-slate-300 mb-4">Projections de revenus</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            stroke="#94a3b8"
          />
          <Tooltip
            formatter={(value) => [
              new Intl.NumberFormat('fr-FR', { 
                style: 'currency', 
                currency: unit,
                maximumFractionDigits: 0
              }).format(Number(value)),
              'Revenu'
            ]}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Graphique radar pour les benchmarks
function BenchmarksRadarChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;
  
  return (
    <div className="h-64 bg-slate-800/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-slate-300 mb-4">Benchmarks sectoriels</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
          <PolarRadiusAxis stroke="#334155" />
          <Radar
            name="Moyennes sectorielles"
            dataKey="value"
            stroke="#e11d48"
            fill="#e11d48"
            fillOpacity={0.3}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Tableau des concurrents
function CompetitorsTable({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;
  
  return (
    <div className="overflow-x-auto bg-slate-800/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-slate-300 mb-4">Principaux concurrents</h4>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 uppercase bg-slate-800/40">
          <tr>
            <th scope="col" className="px-4 py-2 rounded-tl-lg">Nom</th>
            <th scope="col" className="px-4 py-2">Prix Min</th>
            <th scope="col" className="px-4 py-2">Prix Max</th>
            <th scope="col" className="px-4 py-2 rounded-tr-lg">Forces</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((competitor, index) => (
            <tr key={index} className="border-b border-slate-800/40 bg-slate-800/20 hover:bg-slate-800/40">
              <td className="px-4 py-3 font-medium text-white">{competitor.name}</td>
              <td className="px-4 py-3">
                {new Intl.NumberFormat('fr-FR', { 
                  style: 'currency', 
                  currency: competitor.pricing?.unit || 'EUR',
                  maximumFractionDigits: 0
                }).format(competitor.pricing?.min || 0)}
              </td>
              <td className="px-4 py-3">
                {new Intl.NumberFormat('fr-FR', { 
                  style: 'currency', 
                  currency: competitor.pricing?.unit || 'EUR',
                  maximumFractionDigits: 0
                }).format(competitor.pricing?.max || 0)}
              </td>
              <td className="px-4 py-3">
                <ul className="list-disc list-inside">
                  {competitor.strengths?.slice(0, 2).map((strength: string, i: number) => (
                    <li key={i} className="text-xs">{strength}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}