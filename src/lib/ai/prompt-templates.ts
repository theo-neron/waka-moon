/**
 * Templates de prompts pour les agents IA
 */
import { AgentType, AgentSector } from '@/types/agent';
import { FormData } from '@/types/form';
import { getSectorName, getRevenueModelName, getDevelopmentStageName } from '@/lib/utils/form-helpers';

/**
 * Génère le contexte de base à partir des données du formulaire
 */
export function generateBaseContext(formData: FormData): string {
  return `
Contexte du projet SaaS:
- Nom de l'entreprise: ${formData.companyName}
- Secteur: ${getSectorName(formData.sector)}
- Stade de développement: ${getDevelopmentStageName(formData.developmentStage)}
- Marché cible: ${formData.targetMarket}
- Modèle de revenus: ${getRevenueModelName(formData.revenueModel)}
- Prix moyen mensuel: ${formData.averagePrice}€
- Taille de l'équipe: ${formData.teamSize} personnes
- Budget mensuel: ${formData.monthlyBudget}€
- Capital disponible: ${formData.capital}€
- CAC actuel: ${formData.cac}€
- Taux de churn mensuel: ${formData.churnRate}%
- Cycle de vente: ${formData.salesCycle} jours
- Objectif clients à 12 mois: ${formData.clientTarget12m} clients
- Objectif MRR à 12 mois: ${formData.mrrTarget12m}€

Description du produit:
${formData.description}
`;
}

/**
 * Prompt pour l'agent d'étude de marché
 */
export function generateMarketResearchPrompt(formData: FormData, sector: AgentSector = AgentSector.GENERAL): string {
  const baseContext = generateBaseContext(formData);
  
  // Contexte spécifique au secteur
  let sectorContext = '';
  if (sector !== AgentSector.GENERAL) {
    sectorContext = `Tu es spécialisé dans le secteur ${getSectorName(sector as string)} et dois adapter ton analyse à ce contexte spécifique.`;
  }
  
  return `${baseContext}
  
${sectorContext}

Tu es un expert en étude de marché spécialisé dans les startups SaaS. Fais une analyse détaillée du marché pour ce projet SaaS incluant:
1. Taille du marché global et tendances (avec données chiffrées)
2. Principaux concurrents (au moins 5) avec leurs forces/faiblesses
3. Analyse de leurs offres et positionnement tarifaire
4. Opportunités de marché inexploitées
5. Évaluation des barrières à l'entrée

Inclus des références à des sources d'informations crédibles pour justifier ton analyse.
Format ta réponse de façon structurée, claire et professionnelle en utilisant des titres et sous-titres.
Fournis des données structurées pour les concurrents sous format JSON dans ta réponse, en utilisant la syntaxe suivante:

\`\`\`json
{
  "market_size": { "value": 1200000000, "unit": "USD", "growth_rate": 15.5 },
  "competitors": [
    {
      "name": "Nom du concurrent",
      "url": "site-web.com",
      "pricing": { "min": 99, "max": 499, "unit": "EUR", "model": "monthly" },
      "strengths": ["Force 1", "Force 2"],
      "weaknesses": ["Faiblesse 1", "Faiblesse 2"]
    }
  ]
}
\`\`\`
`;
}

/**
 * Prompt pour l'agent juridique
 */
export function generateLegalPrompt(formData: FormData): string {
  const baseContext = generateBaseContext(formData);
  return `${baseContext}
  
Tu es un expert juridique spécialisé dans les startups SaaS. Fais une analyse détaillée des aspects juridiques à considérer pour ce projet SaaS incluant:
1. Structure juridique recommandée avec avantages/inconvénients
2. Réglementations sectorielles spécifiques (RGPD, etc.)
3. Propriété intellectuelle et protection de la marque
4. Contrats types nécessaires (CGU, CGV, etc.)
5. Risques juridiques spécifiques à éviter

Format ta réponse de façon structurée, claire et professionnelle.
Ajoute des références aux textes de loi ou directives pertinentes.
`;
}

/**
 * Prompt pour l'agent financier
 */
export function generateFinancialPrompt(formData: FormData): string {
  const baseContext = generateBaseContext(formData);
  return `${baseContext}
  
Tu es un expert financier spécialisé dans les startups SaaS. Fais une analyse détaillée des aspects financiers pour ce projet SaaS incluant:
1. Structure de coûts détaillée pour la première année
2. Prévisions financières sur 3 ans (revenus, coûts, marge)
3. Métriques financières clés à surveiller (CAC, LTV, etc.)
4. Stratégies de pricing optimales
5. Options de financement recommandées

Format ta réponse de façon structurée, claire et professionnelle.
Inclus un tableau financier simplifié et des recommandations concrètes.

Fournis des données structurées sous format JSON dans ta réponse, en utilisant la syntaxe suivante:

\`\`\`json
{
  "financial_metrics": {
    "burn_rate": { "value": 25000, "unit": "EUR", "period": "monthly" },
    "runway": { "value": 6, "unit": "months" },
    "break_even": { "value": 18, "unit": "months" }
  },
  "revenue_projections": [
    { "period": "Y1", "value": 120000, "unit": "EUR" },
    { "period": "Y2", "value": 450000, "unit": "EUR" },
    { "period": "Y3", "value": 1200000, "unit": "EUR" }
  ]
}
\`\`\`
`;
}

/**
 * Prompt pour l'agent typologie client
 */
export function generateCustomerPrompt(formData: FormData): string {
  const baseContext = generateBaseContext(formData);
  return `${baseContext}
  
Tu es un expert en analyse client spécialisé dans les startups SaaS. Fais une analyse détaillée des profils clients pour ce projet SaaS incluant:
1. Personas clients détaillés (au moins 3)
2. Parcours d'achat typique
3. Points de friction et objections communes
4. Stratégies d'acquisition et de rétention recommandées
5. Indicateurs de satisfaction client à mesurer

Format ta réponse de façon structurée, claire et professionnelle.
Sois spécifique et concret dans tes recommandations.

Fournis des données structurées pour les personas sous format JSON dans ta réponse, en utilisant la syntaxe suivante:

\`\`\`json
{
  "personas": [
    {
      "name": "Nom du persona",
      "role": "Rôle professionnel",
      "company_size": "Taille d'entreprise typique",
      "pain_points": ["Point de douleur 1", "Point de douleur 2"],
      "goals": ["Objectif 1", "Objectif 2"],
      "acquisition_channels": ["Canal 1", "Canal 2"]
    }
  ]
}
\`\`\`
`;
}

/**
 * Prompt pour l'agent stratégie
 */
export function generateStrategyPrompt(formData: FormData): string {
  const baseContext = generateBaseContext(formData);
  return `${baseContext}
  
Tu es un expert en stratégie d'entreprise spécialisé dans les startups SaaS. Fais une analyse stratégique pour ce projet SaaS incluant:
1. Positionnement stratégique recommandé
2. Avantages compétitifs à développer 
3. Feuille de route stratégique sur 24 mois
4. KPIs stratégiques à suivre
5. Risques stratégiques et plans de mitigation

Format ta réponse de façon structurée, claire et professionnelle.
Fournis un plan d'action concret et réaliste.
`;
}

/**
 * Prompt pour l'agent statisticien
 */
export function generateStatisticsPrompt(formData: FormData): string {
  const baseContext = generateBaseContext(formData);
  return `${baseContext}
  
Tu es un expert en analyse statistique spécialisé dans les startups SaaS. Fais une analyse statistique pour ce projet SaaS incluant:
1. Benchmarks sectoriels pertinents
2. Analyses de corrélation entre métriques clés
3. Prévisions de croissance basées sur les données du secteur
4. Modèles de rétention et churn prédictifs
5. Insights clés basés sur l'analyse de données

Format ta réponse de façon structurée, claire et professionnelle.
Inclus des références à des études et sources statistiques pertinentes.

Fournis des données structurées sous format JSON dans ta réponse, en utilisant la syntaxe suivante:

\`\`\`json
{
  "benchmarks": {
    "cac": { "industry_avg": 1200, "unit": "EUR", "source": "Nom de la source" },
    "churn": { "industry_avg": 5.2, "unit": "percent_monthly", "source": "Nom de la source" },
    "arpu": { "industry_avg": 120, "unit": "EUR", "source": "Nom de la source" }
  },
  "growth_predictions": [
    { "metric": "users", "period": "12m", "growth_rate": 120, "probability": 0.7 },
    { "metric": "revenue", "period": "12m", "growth_rate": 150, "probability": 0.6 }
  ]
}
\`\`\`
`;
}

/**
 * Obtenez le prompt en fonction du type d'agent
 */
export function getAgentPrompt(agentType: AgentType, formData: FormData, sector: AgentSector = AgentSector.GENERAL): string {
  switch (agentType) {
    case AgentType.MARKET_RESEARCH:
      return generateMarketResearchPrompt(formData, sector);
    case AgentType.LEGAL:
      return generateLegalPrompt(formData);
    case AgentType.FINANCIAL:
      return generateFinancialPrompt(formData);
    case AgentType.CUSTOMER:
      return generateCustomerPrompt(formData);
    case AgentType.STRATEGY:
      return generateStrategyPrompt(formData);
    case AgentType.STATISTICS:
      return generateStatisticsPrompt(formData);
    default:
      throw new Error(`Type d'agent non reconnu: ${agentType}`);
  }
}