'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, initialFormData } from '@/types/form';
import { AgentType, AnalysisReport } from '@/types/agent';

interface FormContextType {
  formData: FormData;
  activeTab: string;
  reportData: AnalysisReport | null;
  reportStatus: 'idle' | 'loading' | 'success' | 'error';
  currentConversationAgent: AgentType | null;
  isGeneratingReport: boolean;
  setActiveTab: (tab: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleViewProjections: () => void;
  handleBackToForm: () => void;
  handleGenerateReport: () => Promise<void>;
  handleSendMessageToAgent: (agentType: AgentType, message: string) => Promise<void>;
  setCurrentConversationAgent: (agentType: AgentType | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<string>("form");
  const [reportData, setReportData] = useState<AnalysisReport | null>(null);
  const [reportStatus, setReportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentConversationAgent, setCurrentConversationAgent] = useState<AgentType | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  
  const router = useRouter();

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
  
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setReportStatus('loading');
    
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la génération du rapport');
      }
      
      const data = await response.json();
      setReportData(data.report);
      
      // Stocker dans localStorage pour la persistance
      localStorage.setItem('reportData', JSON.stringify(data.report));
      
      setReportStatus('success');
      router.push('/report');
    } catch (error) {
      console.error('Error generating report:', error);
      setReportStatus('error');
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  const handleSendMessageToAgent = async (agentType: AgentType, message: string) => {
    if (!reportData) return;
    
    try {
      const response = await fetch('/api/ai/converse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: reportData.id,
          agentType,
          message,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la conversation avec l\'agent');
      }
      
      const data = await response.json();
      
      // Mettre à jour les données du rapport
      setReportData(data.report);
      
      // Mettre à jour le localStorage
      localStorage.setItem('reportData', JSON.stringify(data.report));
    } catch (error) {
      console.error('Error sending message to agent:', error);
    }
  };

  const value = {
    formData,
    activeTab,
    reportData,
    reportStatus,
    currentConversationAgent,
    isGeneratingReport,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleViewProjections,
    handleBackToForm,
    handleGenerateReport,
    handleSendMessageToAgent,
    setCurrentConversationAgent
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