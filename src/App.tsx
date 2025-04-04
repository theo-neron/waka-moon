import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { SiteHeader } from './components/layout/site-header';
import { MainForm } from './components/forms';
import { ResultsHeader } from './components/results/results-header';
import { FinancialChartMain } from './components/charts/financial-chart-main';
import { FormProvider, useFormContext } from './context/FormContext';

/**
 * Composant principal de l'application
 */
function AppContent() {
  const { 
    formData, 
    activeTab, 
    setActiveTab, 
    handleInputChange, 
    handleSelectChange, 
    handleSubmit, 
    handleViewProjections, 
    handleBackToForm 
  } = useFormContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SiteHeader />
        
        <div className="bg-slate-800/40 backdrop-blur-md p-1 rounded-xl mb-8 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger 
                value="form" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg text-base py-3 font-medium"
              >
                Formulaire
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg text-base py-3 font-medium"
              >
                Projections financières
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              <TabsContent value="form">
                <MainForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  onSubmit={handleSubmit}
                  onViewProjections={handleViewProjections}
                />
              </TabsContent>

              <TabsContent value="results">
                <div className="mb-6">
                  <ResultsHeader onBackToForm={handleBackToForm} />
                  
                  <div className="bg-slate-800/60 rounded-lg backdrop-blur-sm shadow-xl p-6 overflow-hidden">
                    <FinancialChartMain formData={formData} />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/**
 * Composant racine qui englobe l'application avec le contexte du formulaire
 */
function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

export default App;