import React from 'react';
import { TrendingUp } from 'lucide-react';
import { FormData } from '../../types/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface GoalsFormProps {
  data: Pick<FormData, 'clientTarget12m' | 'mrrTarget12m'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GoalsForm({ data, onInputChange }: GoalsFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Objectifs à 12 mois
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientTarget12m" className="text-slate-300">Objectif clients</Label>
            <Input
              id="clientTarget12m"
              name="clientTarget12m"
              type="number"
              value={data.clientTarget12m}
              onChange={onInputChange}
              min="0"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mrrTarget12m" className="text-slate-300">Objectif MRR (€)</Label>
            <Input
              id="mrrTarget12m"
              name="mrrTarget12m"
              type="number"
              value={data.mrrTarget12m}
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