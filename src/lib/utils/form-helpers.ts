/**
 * Fonctions utilitaires pour le traitement des données de formulaire
 */

/**
 * Convertit le code de secteur en nom lisible
 */
export function getSectorName(sector: string): string {
  const sectors: Record<string, string> = {
    'fintech': 'FinTech',
    'hrtech': 'HR Tech',
    'martech': 'MarTech',
    'saas': 'SaaS général',
    'ecommerce': 'E-commerce',
    'other': 'Autre'
  };
  return sectors[sector] || sector;
}

/**
 * Convertit le code de stade de développement en nom lisible
 */
export function getDevelopmentStageName(stage: string): string {
  const stages: Record<string, string> = {
    'idea': 'Idée',
    'less-1y': 'Moins d\'1 an',
    '1-3y': '1-3 ans',
    'more-3y': 'Plus de 3 ans'
  };
  return stages[stage] || stage;
}

/**
 * Convertit le code de modèle de revenus en nom lisible
 */
export function getRevenueModelName(model: string): string {
  const models: Record<string, string> = {
    'subscription': 'Abonnement',
    'freemium': 'Freemium',
    'usage': 'Paiement à l\'usage',
    'other': 'Autre'
  };
  return models[model] || model;
}