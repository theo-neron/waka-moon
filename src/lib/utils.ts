import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Utilitaire pour combiner des classes CSS avec clsx et tailwind-merge
 * Permet de fusionner proprement des classes Tailwind, même avec des variantes conflictuelles
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère un identifiant unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Attends pendant un certain nombre de millisecondes
 * Utile pour déboguer ou simuler des délais réseau
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}