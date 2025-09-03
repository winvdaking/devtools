/**
 * Utilitaires pour la gestion des classes CSS et autres fonctions communes
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine les classes CSS avec Tailwind merge pour éviter les conflits
 * @param inputs - Classes CSS à combiner
 * @returns Classes CSS combinées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
