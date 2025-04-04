import React from 'react';
import { Users } from 'lucide-react';
import { FormData } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TeamFinanceFormProps {
  data: Pick<FormData, 'teamSize' | 'monthlyBudget' | 'capital'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TeamFinanceForm({ data, onInputChange }: TeamFinanceFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Users className="w-5 h-5 text-cyan-400" />
          Équipe et Finances
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="teamSize" className="text-slate-300">Taille de l'équipe</Label>
            <Input
              id="teamSize"
              name="teamSize"
              type="number"
              value={data.teamSize}
              onChange={onInputChange}
              min="1"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyBudget" className="text-slate-300">Budget mensuel (€)</Label>
            <Input
              id="monthlyBudget"
              name="monthlyBudget"
              type="number"
              value={data.monthlyBudget}
              onChange={onInputChange}
              min="0"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capital" className="text-slate-300">Capital disponible (€)</Label>
            <Input
              id="capital"
              name="capital"
              type="number"
              value={data.capital}
              onChange={onInputChange}
              min="0"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}