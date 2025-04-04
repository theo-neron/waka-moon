/**
 * Utilitaires généraux de l'application
 * Ce fichier contient des fonctions utilitaires réutilisables dans tout le projet
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Utilitaire pour combiner des classes CSS avec clsx et tailwind-merge
 * Permet de fusionner proprement des classes Tailwind, même avec des variantes conflictuelles
 * 
 * @param inputs - Classes CSS à fusionner
 * @returns Classes CSS fusionnées et optimisées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère un identifiant unique aléatoire
 * Utilisé pour les identifiants des messages, des rapports, etc.
 * 
 * @returns Chaîne de caractères unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Fonction utilitaire pour attendre un délai spécifié
 * Utile pour déboguer ou simuler des délais réseau
 * 
 * @param ms - Délai en millisecondes
 * @returns Promise qui se résout après le délai spécifié
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Tronque un texte à une longueur maximale et ajoute des points de suspension
 * 
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale (défaut: 100)
 * @returns Texte tronqué avec points de suspension si nécessaire
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Vérifie si une URL est valide
 * 
 * @param url - URL à vérifier
 * @returns Booléen indiquant si l'URL est valide
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Copie un texte dans le presse-papiers
 * 
 * @param text - Texte à copier
 * @returns Promise qui se résout lorsque le texte est copié
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy text:', error);
  }
}

/**
 * Debounce une fonction pour limiter son exécution
 * 
 * @param fn - Fonction à debouncer
 * @param delay - Délai en millisecondes
 * @returns Fonction debouncée
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}