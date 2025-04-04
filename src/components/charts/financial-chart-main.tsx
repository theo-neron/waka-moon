import React, { useState } from 'react';
import { FormData } from '../../types/form';
import { useFinancialData } from '../../hooks/useFinancialData';
import { ChartMetricsDisplay } from './chart-metrics-display';
import { ChartLegend } from './chart-legend';
import { CombinedChart } from './CombinedChart';
import { SplitCharts } from './split-charts';
import { ScenarioSummary } from './scenario-summary';
import { WakastartBenefits } from './wakastart-benefits';

interface FinancialChartMainProps {
  formData: FormData;
}

/**
 * Composant principal d'affichage des graphiques financiers
 * Gère l'affichage des différentes vues et éléments visuels
 */
export function FinancialChartMain({ formData }: FinancialChartMainProps) {
  const [showCombined, setShowCombined] = useState<boolean>(false);
  
  const { 
    chartData, 
    breakevenWithoutWakastart, 
    breakevenWithWakastart,
    financialBenefit,
    timeGain,
    lastQuarterData
  } = useFinancialData(formData);

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
        
        <ChartMetricsDisplay formData={formData} />

        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-2 gap-3">
          <ChartLegend />
          <button 
            onClick={handleToggleView} 
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm transition-colors shrink-0"
          >
            {showCombined ? "Voir les graphiques séparés" : "Voir le graphique combiné"}
          </button>
        </div>
      </div>

      {showCombined ? (
        <CombinedChart 
          data={chartData} 
          breakevenWithoutWakastart={breakevenWithoutWakastart} 
          breakevenWithWakastart={breakevenWithWakastart} 
        />
      ) : (
        <SplitCharts 
          data={chartData} 
          breakevenWithoutWakastart={breakevenWithoutWakastart} 
          breakevenWithWakastart={breakevenWithWakastart} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ScenarioSummary 
          title="Sans Wakastart"
          color="bg-cyan-500"
          breakeven={breakevenWithoutWakastart}
          lastQuarterData={lastQuarterData}
          withWakastart={false}
        />
        <ScenarioSummary 
          title="Avec Wakastart"
          color="bg-indigo-500"
          breakeven={breakevenWithWakastart}
          lastQuarterData={lastQuarterData}
          withWakastart={true}
        />
      </div>

      <WakastartBenefits 
        financialBenefit={financialBenefit}
        timeGain={timeGain}
      />
    </div>
  );
}