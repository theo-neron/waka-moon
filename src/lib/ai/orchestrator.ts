/**
 * Orchestrateur pour la coordination des agents IA
 */
import { 
  AgentType, 
  AgentSector, 
  AgentResult, 
  AgentConversation, 
  AgentMessage, 
  AnalysisReport,
  ExternalSource
} from '@/types/agent';
import { FormData } from '@/types/form';
import { runAgentAnalysis, generateExecutiveSummary, continueConversation } from './agent-service';
import { findRelevantExternalSources } from './external-data-service';
import { generateId } from '@/lib/utils';

/**
 * Exécute une analyse complète avec tous les agents
 */
export async function runCompleteAnalysis(formData: FormData): Promise<AnalysisReport> {
  // Initialisation du rapport
  const reportId = generateId();
  const conversations: Record<AgentType, AgentConversation> = initializeConversations();
  
  const report: AnalysisReport = {
    id: reportId,
    projectName: formData.companyName,
    date: new Date().toISOString(),
    formData,
    agents: {
      [AgentType.MARKET_RESEARCH]: createPendingAgentResult(AgentType.MARKET_RESEARCH),
      [AgentType.LEGAL]: createPendingAgentResult(AgentType.LEGAL),
      [AgentType.FINANCIAL]: createPendingAgentResult(AgentType.FINANCIAL),
      [AgentType.CUSTOMER]: createPendingAgentResult(AgentType.CUSTOMER),
      [AgentType.STRATEGY]: createPendingAgentResult(AgentType.STRATEGY),
      [AgentType.STATISTICS]: createPendingAgentResult(AgentType.STATISTICS)
    },
    conversations
  };

  try {
    // Déterminer le secteur spécialisé pour l'agent d'étude de marché
    const sector = mapFormSectorToAgentSector(formData.sector);
    
    // Exécution parallèle des agents pour optimiser le temps de réponse
    const [
      marketResearch,
      legal,
      financial,
      customer,
      strategy,
      statistics,
      externalSources
    ] = await Promise.all([
      runAgentAnalysis(AgentType.MARKET_RESEARCH, formData, sector),
      runAgentAnalysis(AgentType.LEGAL, formData),
      runAgentAnalysis(AgentType.FINANCIAL, formData),
      runAgentAnalysis(AgentType.CUSTOMER, formData),
      runAgentAnalysis(AgentType.STRATEGY, formData),
      runAgentAnalysis(AgentType.STATISTICS, formData),
      findRelevantExternalSources(formData)
    ]);

    // Mise à jour du rapport avec les résultats
    report.agents[AgentType.MARKET_RESEARCH] = marketResearch;
    report.agents[AgentType.LEGAL] = legal;
    report.agents[AgentType.FINANCIAL] = financial;
    report.agents[AgentType.CUSTOMER] = customer;
    report.agents[AgentType.STRATEGY] = strategy;
    report.agents[AgentType.STATISTICS] = statistics;
    report.externalSources = externalSources;

    // Génération du résumé exécutif
    report.summary = await generateExecutiveSummary(report.agents);
    
    return report;
  } catch (error) {
    console.error('Error during complete analysis:', error);
    throw error;
  }
}

/**
 * Continue une conversation avec un agent spécifique
 */
export async function continueAgentConversation(
  report: AnalysisReport,
  agentType: AgentType,
  userMessage: string
): Promise<AnalysisReport> {
  // Récupérer la conversation existante
  const conversation = report.conversations[agentType];
  
  if (!conversation) {
    throw new Error(`Conversation avec l'agent ${agentType} non trouvée`);
  }
  
  // Ajouter le message de l'utilisateur à la conversation
  const newUserMessage: AgentMessage = {
    id: generateId(),
    role: 'user',
    content: userMessage,
    timestamp: new Date().toISOString()
  };
  
  conversation.messages.push(newUserMessage);
  
  // Obtenir la réponse de l'agent
  const agentResponse = await continueConversation(
    conversation,
    userMessage,
    report.formData
  );
  
  // Ajouter la réponse de l'agent à la conversation
  conversation.messages.push(agentResponse);
  
  // Mettre à jour le rapport
  return {
    ...report,
    conversations: {
      ...report.conversations,
      [agentType]: conversation
    }
  };
}

/**
 * Initialise les conversations pour tous les agents
 */
function initializeConversations(): Record<AgentType, AgentConversation> {
  const conversations: Record<AgentType, AgentConversation> = {} as Record<AgentType, AgentConversation>;
  
  // Créer une conversation vide pour chaque type d'agent
  Object.values(AgentType).forEach(agentType => {
    conversations[agentType] = {
      agentType,
      messages: [
        {
          id: generateId(),
          role: 'system',
          content: 'Bienvenue! Je suis votre assistant spécialisé. Comment puis-je vous aider?',
          timestamp: new Date().toISOString()
        }
      ]
    };
  });
  
  return conversations;
}

/**
 * Crée un résultat d'agent en attente
 */
function createPendingAgentResult(agentType: AgentType): AgentResult {
  return {
    agentName: getAgentName(agentType),
    agentType,
    content: '',
    status: 'pending',
    timestamp: new Date().toISOString()
  };
}

/**
 * Mappe le secteur du formulaire vers un AgentSector
 */
function mapFormSectorToAgentSector(formSector: string): AgentSector {
  switch (formSector) {
    case 'fintech':
      return AgentSector.FINTECH;
    case 'hrtech':
      return AgentSector.HRTECH;
    case 'martech':
      return AgentSector.MARTECH;
    case 'saas':
      return AgentSector.SAAS;
    case 'ecommerce':
      return AgentSector.ECOMMERCE;
    default:
      return AgentSector.GENERAL;
  }
}

/**
 * Obtient le nom lisible d'un agent en fonction de son type
 */
function getAgentName(agentType: AgentType): string {
  const agentNames: Record<AgentType, string> = {
    [AgentType.MARKET_RESEARCH]: 'Étude de marché',
    [AgentType.LEGAL]: 'Analyse juridique',
    [AgentType.FINANCIAL]: 'Analyse financière',
    [AgentType.CUSTOMER]: 'Typologie client',
    [AgentType.STRATEGY]: 'Stratégie de marché',
    [AgentType.STATISTICS]: 'Statistiques & prévisions',
  };
  
  return agentNames[agentType] || 'Agent inconnu';
}