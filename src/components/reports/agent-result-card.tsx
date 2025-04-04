'use client'

import React, { useState } from 'react';
import { AgentResult, AgentType } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Maximize2, Minimize2, LineChart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DataVisualization } from './data-visualization';

interface AgentResultCardProps {
  result: AgentResult;
  onStartConversation: (agentType: AgentType) => void;
}

export function AgentResultCard({ result, onStartConversation }: AgentResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Détermine une classe CSS en fonction du type d'agent
  const getAgentColor = (agentType: AgentType): string => {
    const colors: Record<string, string> = {
      'market-research': 'from-cyan-800/30 to-blue-800/20 border-cyan-900/40',
      'legal': 'from-amber-800/30 to-orange-800/20 border-amber-900/40',
      'financial': 'from-green-800/30 to-emerald-800/20 border-green-900/40',
      'customer': 'from-purple-800/30 to-violet-800/20 border-purple-900/40',
      'strategy': 'from-indigo-800/30 to-blue-800/20 border-indigo-900/40',
      'statistics': 'from-rose-800/30 to-pink-800/20 border-rose-900/40'
    };
    
    return colors[agentType] || 'from-slate-800/30 to-slate-800/20 border-slate-800/40';
  };
  
  // Extrait les données importantes (spécifique à chaque agent)
  const getHighlights = (result: AgentResult): React.ReactNode => {
    if (!result.data) return null;
    
    switch (result.agentType) {
      case AgentType.MARKET_RESEARCH:
        if (result.data.market_size) {
          return (
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-slate-800/30 rounded p-2">
                <div className="text-slate-400">Taille du marché</div>
                <div className="text-white font-medium">
                  {new Intl.NumberFormat('fr-FR', { 
                    style: 'currency', 
                    currency: result.data.market_size.unit || 'USD',
                    maximumFractionDigits: 0
                  }).format(result.data.market_size.value)}
                </div>
              </div>
              <div className="bg-slate-800/30 rounded p-2">
                <div className="text-slate-400">Croissance annuelle</div>
                <div className="text-white font-medium">
                  {result.data.market_size.growth_rate}%
                </div>
              </div>
            </div>
          );
        }
        break;
        
      case AgentType.FINANCIAL:
        if (result.data.financial_metrics) {
          return (
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div className="bg-slate-800/30 rounded p-2">
                <div className="text-slate-400">Burn Rate</div>
                <div className="text-white font-medium">
                  {new Intl.NumberFormat('fr-FR', { 
                    style: 'currency', 
                    currency: result.data.financial_metrics.burn_rate.unit || 'EUR',
                    maximumFractionDigits: 0
                  }).format(result.data.financial_metrics.burn_rate.value)}
                  /{result.data.financial_metrics.burn_rate.period}
                </div>
              </div>
              <div className="bg-slate-800/30 rounded p-2">
                <div className="text-slate-400">Runway</div>
                <div className="text-white font-medium">
                  {result.data.financial_metrics.runway.value} {result.data.financial_metrics.runway.unit}
                </div>
              </div>
              <div className="bg-slate-800/30 rounded p-2">
                <div className="text-slate-400">Break Even</div>
                <div className="text-white font-medium">
                  {result.data.financial_metrics.break_even.value} {result.data.financial_metrics.break_even.unit}
                </div>
              </div>
            </div>
          );
        }
        break;
        
      default:
        return null;
    }
    
    return null;
  };

  return (
    <Card className={`border bg-gradient-to-br ${getAgentColor(result.agentType)} overflow-hidden`}>
      <CardHeader className="border-b border-slate-800/40 pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-white">{result.agentName}</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/40"
            onClick={() => onStartConversation(result.agentType)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/40"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {result.dataVisualization && (
          <div className="mb-4">
            <DataVisualization config={result.dataVisualization} />
          </div>
        )}
        
        {getHighlights(result)}
        
        <div className={`mt-4 prose prose-invert prose-sm max-w-none ${!expanded ? 'max-h-60 overflow-hidden relative' : ''}`}>
          {!expanded && !result.dataVisualization && !getHighlights(result) && (
            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
          )}
          <ReactMarkdown>{result.content}</ReactMarkdown>
        </div>
        
        {!expanded && (
          <Button 
            variant="ghost" 
            className="mt-2 text-slate-400 hover:text-white"
            onClick={() => setExpanded(true)}
          >
            Voir plus
          </Button>
        )}
      </CardContent>
    </Card>
  );
}