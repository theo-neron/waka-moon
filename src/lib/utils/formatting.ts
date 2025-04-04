/**
 * Formate un nombre en format monétaire EUR
 * @param value - Le nombre à formater
 * @returns Chaîne de caractères formatée en EUR (ex: "1 234,56 €")
 */
export const formatEuro = (value: number): string => {
  return `${value.toLocaleString('fr-FR')} €`;
};

/**
 * Formate une valeur en pourcentage
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
 * @param count - Le nombre 
 * @param singular - Forme singulière
 * @param plural - Forme plurielle
 * @returns La forme appropriée selon le nombre
 */
export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural;
};