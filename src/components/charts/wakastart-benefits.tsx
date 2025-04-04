import React from 'react';
import { formatEuro } from '@/lib/utils/formatting';

interface WakastartBenefitsProps {
  financialBenefit: number;
  timeGain: number;
}

export function WakastartBenefits({ financialBenefit, timeGain }: WakastartBenefitsProps) {
  return (
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
  );
}