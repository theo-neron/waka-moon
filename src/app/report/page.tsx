'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormContext } from '@/context/FormContext';
import { AgentResultCard } from '@/components/reports/agent-result-card';
import { ReportHeader } from '@/components/reports/report-header';
import { AgentConversationUI } from '@/components/reports/agent-conversation';
import { ExternalSourcesList } from '@/components/reports/external-sources-list';
import { AgentType, AnalysisReport } from '@/types/agent';
import { Loader } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const { 
    reportData, 
    reportStatus, 
    currentConversationAgent, 
    setCurrentConversationAgent,
    handleSendMessageToAgent
  } = useFormContext();
  
  // État local pour gérer le rapport si rechargement de page
  const [localReportData, setLocalReportData] = useState<AnalysisReport | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  useEffect(() => {
    // Si reportData existe dans le contexte, l'utiliser
    if (reportData) {
      setLocalReportData(reportData);
      return;
    }
    
    // Sinon, essayer de récupérer depuis localStorage
    try {
      const storedReport = localStorage.getItem('reportData');
      if (storedReport) {
        setLocalReportData(JSON.parse(storedReport));
      } else {
        // Rediriger si pas de données
        router.push('/');
      }
    } catch (error) {
      console.error('Error loading report data:', error);
      router.push('/');
    }
  }, [reportData, router]);
  
  // Afficher un loader si les données ne sont pas encore chargées
  if (reportStatus === 'loading' || (!localReportData && !reportData)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
        <p className="text-white mt-4">Génération du rapport en cours...</p>
        <p className="text-slate-400 text-sm mt-2">Cela peut prendre jusqu'à 2 minutes</p>
      </div>
    );
  }
  
  // Utiliser les données du contexte ou les données locales
  const report = reportData || localReportData;
  
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Aucun rapport disponible. Veuillez revenir au formulaire.</p>
      </div>
    );
  }
  
  const handleStartConversation = (agentType: AgentType) => {
    setCurrentConversationAgent(agentType);
    setActiveTab('conversation');
  };
  
  const handleDownloadPDF = () => {
    // Cette fonction sera implémentée avec react-pdf
    console.log('Download PDF');
    alert('La fonctionnalité d\'export PDF sera disponible prochainement');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ReportHeader 
          report={report} 
          onDownloadPDF={handleDownloadPDF} 
        />
        
        <div className="bg-slate-800/40 backdrop-blur-md rounded-xl mb-8 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex p-1 bg-slate-900/50 overflow-x-auto">
              <TabsTrigger 
                value="summary" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Résumé
              </TabsTrigger>
              <TabsTrigger 
                value="market" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Marché
              </TabsTrigger>
              <TabsTrigger 
                value="legal" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Juridique
              </TabsTrigger>
              <TabsTrigger 
                value="financial" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Finances
              </TabsTrigger>
              <TabsTrigger 
                value="customer" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Clients
              </TabsTrigger>
              <TabsTrigger 
                value="strategy" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Stratégie
              </TabsTrigger>
              <TabsTrigger 
                value="statistics" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Statistiques
              </TabsTrigger>
              <TabsTrigger 
                value="conversation" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg py-2 px-4 font-medium"
              >
                Conversation
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.values(AgentType).slice(0, 4).map((agentType) => (
                    <AgentResultCard 
                      key={agentType}
                      result={report.agents[agentType]}
                      onStartConversation={handleStartConversation}
                    />
                  ))}
                </div>
                
                <div className="mt-6">
                  <ExternalSourcesList sources={report.externalSources || []} />
                </div>
              </TabsContent>
              
              <TabsContent value="market">
                <AgentResultCard 
                  result={report.agents[AgentType.MARKET_RESEARCH]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="legal">
                <AgentResultCard 
                  result={report.agents[AgentType.LEGAL]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="financial">
                <AgentResultCard 
                  result={report.agents[AgentType.FINANCIAL]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="customer">
                <AgentResultCard 
                  result={report.agents[AgentType.CUSTOMER]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="strategy">
                <AgentResultCard 
                  result={report.agents[AgentType.STRATEGY]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="statistics">
                <AgentResultCard 
                  result={report.agents[AgentType.STATISTICS]}
                  onStartConversation={handleStartConversation}
                />
              </TabsContent>
              
              <TabsContent value="conversation">
                {currentConversationAgent ? (
                  <AgentConversationUI 
                    conversation={report.conversations[currentConversationAgent]}
                    onSendMessage={handleSendMessageToAgent}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-400">
                      Sélectionnez un agent pour démarrer une conversation
                    </p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}