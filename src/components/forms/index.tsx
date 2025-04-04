import React from 'react';
import { FormData } from '../../types/form';
import { Button } from '../ui/button';
import { CompanyInfoForm } from './company-info-form';
import { ProductForm } from './product-form';
import { TeamFinanceForm } from './team-finance-form';
import { SaasMetricsForm } from './saas-metrics-form';
import { GoalsForm } from './goals-form';
import { ContactForm } from './contact-form';

interface MainFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onViewProjections: () => void;
}

export function MainForm({
  formData,
  onInputChange,
  onSelectChange,
  onSubmit,
  onViewProjections
}: MainFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <CompanyInfoForm 
        data={formData} 
        onInputChange={onInputChange} 
        onSelectChange={onSelectChange} 
      />
      
      <ProductForm 
        data={formData} 
        onInputChange={onInputChange} 
        onSelectChange={onSelectChange} 
      />
      
      <TeamFinanceForm 
        data={formData} 
        onInputChange={onInputChange} 
      />
      
      <SaasMetricsForm 
        data={formData} 
        onInputChange={onInputChange} 
      />
      
      <GoalsForm 
        data={formData} 
        onInputChange={onInputChange} 
      />
      
      <ContactForm 
        email={formData.email} 
        onChange={onInputChange} 
      />

      <div className="flex justify-between gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full py-6 text-base border-slate-700 text-slate-200 hover:bg-slate-800"
          onClick={onViewProjections}
        >
          Voir les projections
        </Button>
        <Button 
          type="submit" 
          className="w-full py-6 text-base bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 border-0"
        >
          Générer l'étude de marché
        </Button>
      </div>
    </form>
  );
}