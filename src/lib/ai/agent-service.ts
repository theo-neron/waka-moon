/**
 * Service pour l'interaction avec les agents IA
 * Ce module fournit les fonctionnalités pour exécuter des analyses avec différents agents spécialisés
 */
import { OpenAI } from "openai";
import { AgentType, AgentSector, AgentResult, AgentConversation, AgentMessage } from '@/types/agent';
import { FormData } from '@/types/form';
import { getAgentPrompt } from './prompt-templates';
import { generateId } from '@/lib/utils';

/**
 * Initialiser le client OpenAI avec la clé API
 * La clé est récupérée depuis les variables d'environnement
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

/**
 * Génère une analyse avec un agent spécifié
 * @param agentType - Type d'agent à utiliser pour l'analyse
 * @param formData - Données du formulaire pour contextualiser l'analyse
 * @param sector - Secteur spécifique pour l'analyse (optionnel)
 * @returns Résultat de l'analyse par l'agent
 */
export async function runAgentAnalysis(
  agentType: AgentType,
  formData: FormData,
  sector: AgentSector = AgentSector.GENERAL
): Promise<AgentResult> {
  try {
    // Obtenir le prompt approprié pour l'agent
    const prompt = getAgentPrompt(agentType, formData, sector);
    
    // Appeler l'API OpenAI pour générer l'analyse
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu es un expert SaaS spécialisé dans l'analyse de business plans pour startups." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 2500,
    });
    
    // Extraire le contenu et les données structurées
    const content = response.choices[0].message.content || '';
    const data = extractStructuredData(content);
    
    // Construire et retourner le résultat
    return {
      agentName: getAgentName(agentType),
      agentType: agentType,
      sector: sector,
      content: content,
      status: 'completed',
      timestamp: new Date().toISOString(),
      data: data,
      dataVisualization: generateVisualizationConfig(agentType, data)
    };
  } catch (error) {
    console.error(`Error with ${agentType} agent:`, error);
    // Retourner un résultat d'erreur
    return {
      agentName: getAgentName(agentType),
      agentType: agentType,
      sector: sector,
      content: '',
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Extrait les données structurées du contenu généré
 * Recherche un bloc JSON dans le contenu et le parse
 * @param content - Contenu texte à analyser
 * @returns Données structurées extraites ou undefined si non trouvées
 */
function extractStructuredData(content: string): Record<string, any> | undefined {
  try {
    const jsonMatch = content.match(/```json\n([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    return undefined;
  } catch (error) {
    console.error('Error extracting structured data:', error);
    return undefined;
  }
}

/**
 * Génère une configuration de visualisation en fonction du type d'agent et des données
 * @param agentType - Type d'agent pour déterminer la visualisation appropriée
 * @param data - Données structurées à visualiser
 * @returns Configuration de visualisation ou undefined si non applicable
 */
function generateVisualizationConfig(agentType: AgentType, data?: Record<string, any>): Record<string, any> | undefined {
  if (!data) return undefined;
  
  switch (agentType) {
    case AgentType.MARKET_RESEARCH:
      if (data.competitors) {
        return {
          type: 'competitors-table',
          data: data.competitors
        };
      }
      break;
    
    case AgentType.FINANCIAL:
      if (data.revenue_projections) {
        return {
          type: 'revenue-bar-chart',
          data: data.revenue_projections
        };
      }
      break;
    
    case AgentType.STATISTICS:
      if (data.benchmarks) {
        return {
          type: 'benchmarks-radar',
          data: Object.entries(data.benchmarks).map(([key, value]: [string, any]) => ({
            metric: key,
            value: value.industry_avg,
            unit: value.unit
          }))
        };
      }
      break;
      
    default:
      return undefined;
  }
  
  return undefined;
}

/**
 * Continue une conversation avec un agent
 * @param conversation - Historique de conversation existant
 * @param userMessage - Nouveau message de l'utilisateur
 * @param formData - Données de contexte pour l'agent
 * @returns Nouveau message généré par l'agent
 */
export async function continueConversation(
  conversation: AgentConversation,
  userMessage: string,
  formData: FormData
): Promise<AgentMessage> {
  try {
    // Construction du contexte de conversation
    const conversationHistory = conversation.messages.map(msg => ({
      role: msg.role === 'agent' ? 'assistant' : msg.role,
      content: msg.content
    }));
    
    // Ajout du nouveau message utilisateur
    conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    
    // Obtention de la réponse de l'agent
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: `Tu es un expert SaaS spécialisé en ${getAgentName(conversation.agentType).toLowerCase()}. 
          Réponds aux questions en te basant sur le contexte du projet et ton expertise. 
          Sois précis, utile et concis dans tes réponses.` 
        },
        ...conversationHistory
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });
    
    const agentResponse = response.choices[0].message.content || '';
    
    // Création du message de réponse
    return {
      id: generateId(),
      role: 'agent',
      content: agentResponse,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error continuing conversation:', error);
    return {
      id: generateId(),
      role: 'system',
      content: 'Désolé, une erreur s\'est produite lors de la génération de la réponse.',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Génère un résumé exécutif basé sur toutes les analyses des agents
 * @param agentResults - Résultats de tous les agents
 * @returns Résumé exécutif synthétisé
 */
export async function generateExecutiveSummary(agentResults: Record<AgentType, AgentResult>): Promise<string> {
  try {
    // Construire un résumé de toutes les analyses
    let analysisOverview = '';
    
    for (const agentType of Object.values(AgentType)) {
      const result = agentResults[agentType];
      if (result && result.status === 'completed') {
        analysisOverview += `\n\n## ${result.agentName}\n\n${result.content.substring(0, 500)}...\n`;
      }
    }
    
    // Générer le résumé exécutif
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: `Tu es un conseiller business spécialisé dans les startups SaaS. 
          Ton rôle est de synthétiser des analyses détaillées en un résumé exécutif clair et actionnable.` 
        },
        { 
          role: "user", 
          content: `Voici des extraits d'analyses détaillées réalisées par différents experts sur un projet SaaS. 
          ${analysisOverview}
          
          Crée un résumé exécutif concis (max 500 mots) qui synthétise les principaux points de ces analyses.
          Structure ton résumé avec les sections suivantes:
          1. Aperçu du marché et opportunités
          2. Points forts du projet
          3. Défis principaux à surmonter
          4. Recommandations stratégiques clés
          5. Prochaines étapes concrètes
          
          Sois direct, précis et orienté action.` 
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });
    
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating executive summary:', error);
    return 'Impossible de générer le résumé exécutif en raison d\'une erreur.';
  }
}

/**
 * Obtient le nom lisible d'un agent en fonction de son type
 * @param agentType - Type d'agent
 * @returns Nom lisible pour l'agent
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