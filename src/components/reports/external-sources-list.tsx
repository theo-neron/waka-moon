'use client'

import React from 'react';
import { ExternalSource } from '@/types/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText, BarChart, FileSearch, HelpCircle } from 'lucide-react';

interface ExternalSourcesListProps {
  sources: ExternalSource[];
}

export function ExternalSourcesList({ sources }: ExternalSourcesListProps) {
  if (!sources || sources.length === 0) return null;

  const getSourceIcon = (type: ExternalSource['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4 text-cyan-400" />;
      case 'statistics':
        return <BarChart className="h-4 w-4 text-green-400" />;
      case 'report':
        return <FileSearch className="h-4 w-4 text-amber-400" />;
      case 'research':
        return <FileSearch className="h-4 w-4 text-purple-400" />;
      default:
        return <HelpCircle className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <Card className="border-slate-800/60 bg-slate-900/30">
      <CardHeader className="border-b border-slate-800/40 pb-3">
        <CardTitle className="text-lg text-white">Sources de données externes</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {sources.map((source) => (
            <div 
              key={source.id} 
              className="bg-slate-800/30 border border-slate-800/40 rounded-lg p-3 flex items-start gap-3"
            >
              <div className="mt-0.5">
                {getSourceIcon(source.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm flex items-center gap-2">
                  {source.title}
                  <span className="bg-slate-700/50 text-xs px-1.5 py-0.5 rounded">
                    {source.relevance}%
                  </span>
                </h4>
                <p className="text-slate-300 text-xs mt-1">{source.description}</p>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 text-xs mt-2 flex items-center gap-1 hover:underline"
                >
                  Consulter la source <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}