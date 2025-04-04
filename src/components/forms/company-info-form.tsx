import React from 'react';
import { Building2 } from 'lucide-react';
import { FormData } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanyInfoFormProps {
  data: Pick<FormData, 'companyName' | 'developmentStage' | 'sector' | 'targetMarket'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

/**
 * Formulaire pour les informations de l'entreprise
 */
export function CompanyInfoForm({ data, onInputChange, onSelectChange }: CompanyInfoFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Building2 className="w-5 h-5 text-cyan-400" />
          Identité et Contexte
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-slate-300">Nom de l'entreprise</Label>
            <Input
              id="companyName"
              name="companyName"
              value={data.companyName}
              onChange={onInputChange}
              required
              className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="developmentStage" className="text-slate-300">Stade de développement</Label>
            <Select 
              value={data.developmentStage} 
              onValueChange={(value) => onSelectChange('developmentStage', value)}
            >
              <SelectTrigger id="developmentStage" className="bg-slate-900/60 border-slate-700">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="idea">Idée</SelectItem>
                <SelectItem value="less-1y">Moins d'1 an</SelectItem>
                <SelectItem value="1-3y">1-3 ans</SelectItem>
                <SelectItem value="more-3y">Plus de 3 ans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector" className="text-slate-300">Secteur d'activité</Label>
            <Select 
              value={data.sector} 
              onValueChange={(value) => onSelectChange('sector', value)}
            >
              <SelectTrigger id="sector" className="bg-slate-900/60 border-slate-700">
                <SelectValue placeholder="Sélectionnez un secteur" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="hrtech">HRTech</SelectItem>
                <SelectItem value="martech">MarTech</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetMarket" className="text-slate-300">Public cible</Label>
            <Select 
              value={data.targetMarket} 
              onValueChange={(value) => onSelectChange('targetMarket', value)}
            >
              <SelectTrigger id="targetMarket" className="bg-slate-900/60 border-slate-700">
                <SelectValue placeholder="Sélectionnez une cible" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="B2B">B2B</SelectItem>
                <SelectItem value="B2C">B2C</SelectItem>
                <SelectItem value="B2B2C">B2B2C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}