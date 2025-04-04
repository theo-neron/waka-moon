import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';
import { FormData } from '../App';

interface FinancialChartProps {
  formData: FormData;
}

interface DataPoint {
  name: string;
  revenue: number;
  costs: number;
  profitLoss: number;
  revenueWithWakastart: number;
  costsWithWakastart: number;
  profitLossWithWakastart: number;
  quarter: number;
  cumulativeRevenue: number;
  cumulativeCosts: number;
  cumulativeProfitLoss: number;
  cumulativeRevenueWithWakastart: number;
  cumulativeCostsWithWakastart: number;
  cumulativeProfitLossWithWakastart: number;
}

const FinancialChart: React.FC<FinancialChartProps> = ({ formData }) => {
  const [showCombined, setShowCombined] = useState<boolean>(false);

  const chartData = useMemo(() => {
    // Vérifier si nous avons les valeurs nécessaires pour le calcul
    const canCalculate = formData.averagePrice > 0 && 
                        formData.monthlyBudget > 0 && 
                        formData.cac > 0 && 
                        formData.clientTarget12m > 0;
    
    // Si les champs essentiels sont manquants, utiliser des valeurs par défaut pour afficher un graphique de base
    const valuesForCalculation = canCalculate ? formData : {
      ...formData,
      averagePrice: formData.averagePrice || 69,
      monthlyBudget: formData.monthlyBudget || 12000,
      capital: formData.capital || 120000,
      cac: formData.cac || 750,
      churnRate: formData.churnRate || 3.5,
      salesCycle: formData.salesCycle || 45,
      clientTarget12m: formData.clientTarget12m || 250,
      mrrTarget12m: formData.mrrTarget12m || 25000
    };

    // Paramètres d'amélioration avec Wakastart
    const wakaStartImprovements = {
      cacReduction: 0.30, // Réduction de 30% du CAC avec Wakastart
      churnReduction: 0.25, // Réduction de 25% du taux de churn
      salesCycleReduction: 0.20, // Réduction de 20% du cycle de vente
      wakaStartMonthlyCost: valuesForCalculation.monthlyBudget * 0.15, // Coût mensuel de Wakastart (15% du budget)
      clientAcquisitionImprovement: 0.25 // 25% de clients en plus avec Wakastart
    };

    // Calculs pour 8 trimestres (2 ans)
    const data: DataPoint[] = [];
    
    // Variables pour les calculs sans Wakastart
    let cumulativeRevenue = 0;
    let cumulativeCosts = valuesForCalculation.monthlyBudget * 3; // Budget initial pour le premier trimestre
    let currentClients = 0;
    
    // Variables pour les calculs avec Wakastart
    let cumulativeRevenueWaka = 0;
    let cumulativeCostsWaka = valuesForCalculation.monthlyBudget * 3 + wakaStartImprovements.wakaStartMonthlyCost * 3; // Budget + coût Wakastart
    let currentClientsWaka = 0;

    for (let quarter = 1; quarter <= 8; quarter++) {
      // Acquisition de clients - sans Wakastart
      const quarterlyNewClients = Math.ceil(
        (valuesForCalculation.clientTarget12m / 4) * (quarter <= 4 ? quarter/4 : 1)
      );
      currentClients += quarterlyNewClients;
      currentClients = currentClients * (1 - (valuesForCalculation.churnRate / 100) * 3); // Churn trimestriel
      
      // Acquisition de clients - avec Wakastart
      const quarterlyNewClientsWaka = Math.ceil(
        quarterlyNewClients * (1 + wakaStartImprovements.clientAcquisitionImprovement)
      );
      currentClientsWaka += quarterlyNewClientsWaka;
      currentClientsWaka = currentClientsWaka * (1 - (valuesForCalculation.churnRate / 100 * (1 - wakaStartImprovements.churnReduction)) * 3); // Churn réduit
      
      // Revenus - sans Wakastart
      const quarterlyRevenue = currentClients * valuesForCalculation.averagePrice * 3; // Revenu mensuel * 3 mois
      cumulativeRevenue += quarterlyRevenue;
      
      // Coûts - sans Wakastart
      const acquisitionCost = quarterlyNewClients * valuesForCalculation.cac;
      const operationalCost = valuesForCalculation.monthlyBudget * 3;
      const quarterlyCosts = acquisitionCost + operationalCost;
      cumulativeCosts += quarterlyCosts;
      
      // Revenus - avec Wakastart
      const quarterlyRevenueWaka = currentClientsWaka * valuesForCalculation.averagePrice * 3; // Revenu mensuel * 3 mois
      cumulativeRevenueWaka += quarterlyRevenueWaka;
      
      // Coûts - avec Wakastart
      const acquisitionCostWaka = quarterlyNewClientsWaka * (valuesForCalculation.cac * (1 - wakaStartImprovements.cacReduction));
      const operationalCostWaka = valuesForCalculation.monthlyBudget * 3;
      const wakaStartCost = wakaStartImprovements.wakaStartMonthlyCost * 3;
      const quarterlyCostsWaka = acquisitionCostWaka + operationalCostWaka + wakaStartCost;
      cumulativeCostsWaka += quarterlyCostsWaka;
      
      // Calcul du profit/perte
      const quarterlyProfitLoss = quarterlyRevenue - quarterlyCosts;
      const quarterlyProfitLossWaka = quarterlyRevenueWaka - quarterlyCostsWaka;

      // Calcul des valeurs cumulatives
      const cumulativeProfitLoss = cumulativeRevenue - cumulativeCosts;
      const cumulativeProfitLossWaka = cumulativeRevenueWaka - cumulativeCostsWaka;
      
      // Ajout à notre dataset
      data.push({
        name: `T${quarter}`,
        quarter: quarter,
        revenue: quarterlyRevenue,
        costs: quarterlyCosts,
        profitLoss: quarterlyProfitLoss,
        revenueWithWakastart: quarterlyRevenueWaka,
        costsWithWakastart: quarterlyCostsWaka,
        profitLossWithWakastart: quarterlyProfitLossWaka,
        cumulativeRevenue: cumulativeRevenue,
        cumulativeCosts: cumulativeCosts,
        cumulativeProfitLoss: cumulativeProfitLoss,
        cumulativeRevenueWithWakastart: cumulativeRevenueWaka,
        cumulativeCostsWithWakastart: cumulativeCostsWaka,
        cumulativeProfitLossWithWakastart: cumulativeProfitLossWaka
      });
    }
    
    return data;
  }, [formData]);

  // Calcul du point de rentabilité
  const getBreakevenPoint = (data: DataPoint[], withWakastart: boolean = false) => {
    let breakeven = null;
    
    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      const profitLoss = withWakastart ? current.cumulativeProfitLossWithWakastart : current.cumulativeProfitLoss;
      
      if (profitLoss > 0) {
        breakeven = current.quarter;
        break;
      }
    }
    
    return breakeven;
  };

  const breakevenWithoutWakastart = getBreakevenPoint(chartData);
  const breakevenWithWakastart = getBreakevenPoint(chartData, true);

  const formatEuro = (value: number) => {
    return `${value.toLocaleString('fr-FR')} €`;
  };

  // Calculer le gain financier avec Wakastart
  const financialBenefit = chartData.length > 0 
    ? chartData[chartData.length - 1].cumulativeProfitLossWithWakastart - 
      chartData[chartData.length - 1].cumulativeProfitLoss
    : 0;

  // Calculer le gain de temps en trimestres pour atteindre la rentabilité
  const timeGain = breakevenWithoutWakastart && breakevenWithWakastart 
    ? breakevenWithoutWakastart - breakevenWithWakastart 
    : 0;

  const handleToggleView = () => {
    setShowCombined(!showCombined);
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Projections financières sur 8 trimestres</h3>
        <p className="text-slate-400 text-sm mb-4">
          Ce graphique montre l'évolution de vos revenus et coûts sur 8 trimestres, avec et sans utilisation de Wakastart.
        </p>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="px-4 py-2 bg-slate-900/60 rounded-lg border border-indigo-900/30">
            <div className="text-sm text-slate-400 mb-1">CAC actuel</div>
            <div className="text-lg font-bold text-white">{formatEuro(formData.cac)}</div>
          </div>
          <div className="px-4 py-2 bg-slate-900/60 rounded-lg border border-indigo-900/30">
            <div className="text-sm text-slate-400 mb-1">Prix moyen</div>
            <div className="text-lg font-bold text-white">{formatEuro(formData.averagePrice)}</div>
          </div>
          <div className="px-4 py-2 bg-slate-900/60 rounded-lg border border-indigo-900/30">
            <div className="text-sm text-slate-400 mb-1">Objectif clients</div>
            <div className="text-lg font-bold text-white">{formData.clientTarget12m}</div>
          </div>
          <div className="px-4 py-2 bg-slate-900/60 rounded-lg border border-indigo-900/30">
            <div className="text-sm text-slate-400 mb-1">Churn mensuel</div>
            <div className="text-lg font-bold text-white">{formData.churnRate}%</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
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
          <button 
            onClick={handleToggleView} 
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm transition-colors"
          >
            {showCombined ? "Voir les graphiques séparés" : "Voir le graphique combiné"}
          </button>
        </div>
      </div>

      {showCombined ? (
        <div className="h-[400px] bg-slate-900/60 p-4 rounded-lg border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Graphique Sans Wakastart */}
          <div className="h-[350px] bg-slate-900/60 p-4 rounded-lg border border-slate-800 relative">
            <div className="absolute top-2 left-2 p-1.5 bg-slate-900/80 rounded-lg z-10">
              <span className="font-bold text-white text-sm">Sans Wakastart</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
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
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <Area 
                  type="monotone" 
                  dataKey="cumulativeRevenue" 
                  name="Revenus" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fill="url(#revenueGradient)" 
                  dot={{ r: 3, strokeWidth: 1, fill: '#06b6d4' }} 
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCosts" 
                  name="Coûts" 
                  stroke="#e11d48" 
                  strokeWidth={3}
                  fill="url(#costGradient)" 
                  dot={{ r: 3, strokeWidth: 1, fill: '#e11d48' }}
                />
                
                {breakevenWithoutWakastart && (
                  <ReferenceLine 
                    x={`T${breakevenWithoutWakastart}`} 
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
          
          {/* Graphique Avec Wakastart */}
          <div className="h-[350px] bg-slate-900/60 p-4 rounded-lg border border-slate-800 relative">
            <div className="absolute top-2 left-2 p-1.5 bg-indigo-900/80 rounded-lg z-10">
              <span className="font-bold text-white text-sm">Avec Wakastart</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
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
                  <linearGradient id="revenueWakaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="costWakaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <Area 
                  type="monotone" 
                  dataKey="cumulativeRevenueWithWakastart" 
                  name="Revenus" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fill="url(#revenueWakaGradient)" 
                  dot={{ r: 3, strokeWidth: 1, fill: '#6366f1' }} 
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCostsWithWakastart" 
                  name="Coûts" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  fill="url(#costWakaGradient)" 
                  dot={{ r: 3, strokeWidth: 1, fill: '#f59e0b' }}
                />
                
                {breakevenWithWakastart && (
                  <ReferenceLine 
                    x={`T${breakevenWithWakastart}`} 
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
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="rounded-md border border-slate-700 bg-slate-900/60 p-4 shadow-md">
          <h4 className="font-semibold mb-4 text-white flex items-center">
            <span className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></span>
            Sans Wakastart
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Point de rentabilité :</span>
              <span className="font-medium text-white">{breakevenWithoutWakastart ? `Trimestre ${breakevenWithoutWakastart}` : 'Non atteint'}</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Revenus cumulés à 24 mois :</span>
              <span className="font-medium text-white">{chartData.length > 0 ? formatEuro(chartData[chartData.length - 1].cumulativeRevenue) : '0 €'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-400">Profit/Perte cumulés à 24 mois :</span>
              <span className={`font-medium ${chartData.length > 0 && chartData[chartData.length - 1].cumulativeProfitLoss > 0 ? 'text-green-400' : 'text-rose-400'}`}>
                {chartData.length > 0 ? formatEuro(chartData[chartData.length - 1].cumulativeProfitLoss) : '0 €'}
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-md border border-slate-700 bg-slate-900/60 p-4 shadow-md">
          <h4 className="font-semibold mb-4 text-white flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
            Avec Wakastart
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Point de rentabilité :</span>
              <span className="font-medium text-white">{breakevenWithWakastart ? `Trimestre ${breakevenWithWakastart}` : 'Non atteint'}</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Revenus cumulés à 24 mois :</span>
              <span className="font-medium text-white">{chartData.length > 0 ? formatEuro(chartData[chartData.length - 1].cumulativeRevenueWithWakastart) : '0 €'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-400">Profit/Perte cumulés à 24 mois :</span>
              <span className={`font-medium ${chartData.length > 0 && chartData[chartData.length - 1].cumulativeProfitLossWithWakastart > 0 ? 'text-green-400' : 'text-rose-400'}`}>
                {chartData.length > 0 ? formatEuro(chartData[chartData.length - 1].cumulativeProfitLossWithWakastart) : '0 €'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 p-6 rounded-lg mt-6 border border-indigo-900/30">
        <h4 className="font-semibold text-white mb-3 text-lg">Avantages avec Wakastart</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-800/30">
            <div className="text-lg font-bold text-cyan-400 mb-1">
              {timeGain > 0 ? `Rentabilité ${timeGain} trimestre${timeGain > 1 ? 's' : ''} plus tôt` : 'Rentabilité accélérée'}
            </div>
            <p className="text-slate-300 text-sm">
              Atteignez la rentabilité plus rapidement en optimisant vos coûts d'acquisition et en réduisant votre taux de churn.
            </p>
          </div>
          
          <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-800/30">
            <div className="text-lg font-bold text-cyan-400 mb-1">
              {formatEuro(financialBenefit)} de profit supplémentaire
            </div>
            <p className="text-slate-300 text-sm">
              Optimisez votre investissement et maximisez votre retour sur investissement sur une période de 24 mois.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start">
            <div className="rounded-full bg-indigo-900/40 p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-300">Réduction du CAC de 30%</span>
          </div>
          <div className="flex items-start">
            <div className="rounded-full bg-indigo-900/40 p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-300">Réduction du taux de churn de 25%</span>
          </div>
          <div className="flex items-start">
            <div className="rounded-full bg-indigo-900/40 p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-300">Augmentation de l'acquisition clients de 25%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialChart;