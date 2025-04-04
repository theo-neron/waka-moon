import React from 'react';
import { Wallet } from 'lucide-react';
import { FormData } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SaasMetricsFormProps {
  data: Pick<FormData, 'cac' | 'churnRate' | 'salesCycle'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SaasMetricsForm({ data, onInputChange }: SaasMetricsFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Wallet className="w-5 h-5 text-cyan-400" />
          Métriques SaaS
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="cac" className="text-slate-300">CAC estimé (€)</Label>
            <Input
              id="cac"
              name="cac"
              type="number"
              value={data.cac}
              onChange={onInputChange}
              min="0"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="churnRate" className="text-slate-300">Taux de churn mensuel (%)</Label>
            <Input
              id="churnRate"
              name="churnRate"
              type="number"
              value={data.churnRate}
              onChange={onInputChange}
              min="0"
              max="100"
              step="0.1"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesCycle" className="text-slate-300">Cycle de vente (jours)</Label>
            <Input
              id="salesCycle"
              name="salesCycle"
              type="number"
              value={data.salesCycle}
              onChange={onInputChange}
              min="1"
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}