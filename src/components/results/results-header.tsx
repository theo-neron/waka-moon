import React from 'react';
import { BarChart } from 'lucide-react';
import { Button } from '../ui/button';

interface ResultsHeaderProps {
  onBackToForm: () => void;
}

export function ResultsHeader({ onBackToForm }: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <BarChart className="w-6 h-6 text-cyan-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">Projections Financières</h2>
      </div>
      <Button 
        onClick={onBackToForm} 
        variant="outline" 
        className="border-slate-700 text-slate-200 hover:bg-slate-800"
        size="sm"
      >
        Retour au formulaire
      </Button>
    </div>
  );
}