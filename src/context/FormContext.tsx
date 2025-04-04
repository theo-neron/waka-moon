import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, initialFormData } from '../types/form';

interface FormContextType {
  formData: FormData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleViewProjections: () => void;
  handleBackToForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setActiveTab("results");
    // Ici, on pourrait ajouter une logique d'envoi des données vers une API
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    // Conversion des champs numériques
    if (
      name === "averagePrice" || 
      name === "teamSize" || 
      name === "monthlyBudget" || 
      name === "capital" || 
      name === "cac" || 
      name === "churnRate" || 
      name === "salesCycle" || 
      name === "clientTarget12m" || 
      name === "mrrTarget12m"
    ) {
      processedValue = value === "" ? 0 : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewProjections = () => {
    setActiveTab("results");
  };

  const handleBackToForm = () => {
    setActiveTab("form");
  };

  const value = {
    formData,
    activeTab,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleViewProjections,
    handleBackToForm
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}