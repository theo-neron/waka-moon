'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AnalysisReport } from '@/types/agent';
import { ChevronLeft, Download, BarChart2 } from 'lucide-react';

interface ReportHeaderProps {
  report: AnalysisReport;
  onDownloadPDF: () => void;
}

export function ReportHeader({ report, onDownloadPDF }: ReportHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-cyan-400">Rapport d'analyse</span> : {report.projectName}
        </h1>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-slate-700 hover:bg-slate-800"
            onClick={() => router.push('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour au formulaire
          </Button>
          
          <Button
            onClick={onDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>
      </div>
      
      <div className="mt-6 bg-gradient-to-r from-slate-800/40 to-indigo-900/30 border border-indigo-900/30 rounded-lg p-5">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Résumé exécutif</h2>
        </div>
        <div className="mt-3 text-slate-300 whitespace-pre-wrap">
          {report.summary || 'Le résumé exécutif est en cours de génération...'}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800/60">
          <div className="text-sm text-slate-400">Modèle de revenus</div>
          <div className="font-medium text-white">{getRevenueModelName(report.formData.revenueModel)}</div>
        </div>
        <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800/60">
          <div className="text-sm text-slate-400">Budget mensuel</div>
          <div className="font-medium text-white">{formatCurrency(report.formData.monthlyBudget)} €</div>
        </div>
        <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800/60">
          <div className="text-sm text-slate-400">CAC actuel</div>
          <div className="font-medium text-white">{formatCurrency(report.formData.cac)} €</div>
        </div>
      </div>
    </div>
  );
}

function getRevenueModelName(model: string): string {
  const models: Record<string, string> = {
    'subscription': 'Abonnement',
    'freemium': 'Freemium',
    'usage': 'Paiement à l\'usage',
    'other': 'Autre'
  };
  return models[model] || model;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}