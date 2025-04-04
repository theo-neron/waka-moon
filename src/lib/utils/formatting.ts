/**
 * Utilitaires de formatage de données
 * Ce fichier contient des fonctions pour formater différents types de données 
 * (monétaires, pourcentages, dates, etc.) de manière cohérente dans l'application
 */

/**
 * Formate un nombre en format monétaire EUR
 * 
 * @param value - Le nombre à formater
 * @returns Chaîne de caractères formatée en EUR (ex: "1 234,56 €")
 */
export const formatEuro = (value: number): string => {
  return `${value.toLocaleString('fr-FR')} €`;
};

/**
 * Formate une valeur en pourcentage
 * 
 * @param value - Le nombre à formater 
 * @param decimalPlaces - Nombre de décimales à conserver
 * @returns Chaîne de caractères formatée en pourcentage (ex: "12,5 %")
 */
export const formatPercent = (value: number, decimalPlaces: number = 1): string => {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  })} %`;
};

/**
 * Formatage de texte pour afficher un pluriel conditionnel
 * 
 * @param count - Le nombre 
 * @param singular - Forme singulière
 * @param plural - Forme plurielle
 * @returns La forme appropriée selon le nombre
 */
export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural;
};

/**
 * Formate un montant avec le symbole de devise approprié
 * 
 * @param value - Montant à formater
 * @param currency - Code de devise (EUR par défaut)
 * @param maximumFractionDigits - Nombre maximum de décimales (0 par défaut)
 * @returns Montant formaté (ex: "1 234 €" ou "$1,234")
 */
export const formatCurrency = (
  value: number, 
  currency: string = 'EUR', 
  maximumFractionDigits: number = 0
): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: currency,
    maximumFractionDigits
  }).format(value);
};

/**
 * Formate une date en format français
 * 
 * @param date - Date à formater (string ISO ou objet Date)
 * @param includeTime - Inclure l'heure (false par défaut)
 * @returns Date formatée (ex: "01/01/2023" ou "01/01/2023 14:30")
 */
export const formatDate = (date: Date | string, includeTime: boolean = false): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: '2-digit', month: '2-digit', year: 'numeric' };
    
  return dateObj.toLocaleDateString('fr-FR', options);
};

/**
 * Formate un grand nombre avec un suffixe (k, M, B)
 * 
 * @param value - Nombre à formater
 * @returns Nombre formaté avec suffixe (ex: "1.2k", "3.4M")
 */
export const formatCompactNumber = (value: number): string => {
  const formatter = Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    compactDisplay: 'short'
  });
  
  return formatter.format(value);
};