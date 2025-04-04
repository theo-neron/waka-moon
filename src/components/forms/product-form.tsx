import React from 'react';
import { Target } from 'lucide-react';
import { FormData } from '../../types/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProductFormProps {
  data: Pick<FormData, 'description' | 'revenueModel' | 'averagePrice'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export function ProductForm({ data, onInputChange, onSelectChange }: ProductFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Target className="w-5 h-5 text-cyan-400" />
          Produit et Modèle Économique
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description de la solution</Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={onInputChange}
              rows={3}
              maxLength={500}
              required
              placeholder="Décrivez brièvement votre solution..."
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="revenueModel" className="text-slate-300">Modèle de revenus</Label>
              <Select 
                value={data.revenueModel} 
                onValueChange={(value) => onSelectChange('revenueModel', value)}
              >
                <SelectTrigger id="revenueModel" className="bg-slate-900/60 border-slate-700">
                  <SelectValue placeholder="Sélectionnez un modèle" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="subscription">Abonnement</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="usage">Paiement à l'usage</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="averagePrice" className="text-slate-300">Prix moyen mensuel (€)</Label>
              <Input
                id="averagePrice"
                name="averagePrice"
                type="number"
                value={data.averagePrice}
                onChange={onInputChange}
                min="0"
                required
                className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}