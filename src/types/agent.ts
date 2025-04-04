/**
 * Types pour les agents IA
 */

import { FormData } from './form';

/**
 * Types d'agents disponibles dans le système
 */
export enum AgentType {
  MARKET_RESEARCH = 'market-research',
  LEGAL = 'legal',
  FINANCIAL = 'financial',
  CUSTOMER = 'customer',
  STRATEGY = 'strategy',
  STATISTICS = 'statistics',
}

/**
 * Spécialisation sectorielle de l'agent
 */
export enum AgentSector {
  GENERAL = 'general',
  FINTECH = 'fintech',
  HRTECH = 'hrtech',
  MARTECH = 'martech',
  SAAS = 'saas',
  ECOMMERCE = 'ecommerce',
}

/**
 * État d'exécution de l'agent
 */
export type AgentStatus = 'idle' | 'pending' | 'completed' | 'error';

/**
 * Résultat de l'exécution d'un agent
 */
export interface AgentResult {
  agentName: string;
  agentType: AgentType;
  sector?: AgentSector;
  content: string;
  status: AgentStatus;
  timestamp: string;
  error?: string;
  data?: Record<string, any>; // Données structurées extraites
  dataVisualization?: Record<string, any>; // Configuration des visualisations
}

/**
 * Message dans une conversation avec un agent
 */
export interface AgentMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
}

/**
 * Historique de conversation avec un agent
 */
export interface AgentConversation {
  agentType: AgentType;
  messages: AgentMessage[];
}

/**
 * Rapport complet d'analyse
 */
export interface AnalysisReport {
  id: string;
  projectName: string;
  date: string;
  formData: FormData;
  agents: Record<AgentType, AgentResult>;
  summary?: string;
  conversations: Record<AgentType, AgentConversation>;
  externalSources?: ExternalSource[];
}

/**
 * Source de données externe
 */
export interface ExternalSource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: 'article' | 'statistics' | 'report' | 'research' | 'other';
  relevance: number; // 0-100
}