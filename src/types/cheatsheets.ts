/**
 * Types TypeScript pour les cheatsheets
 * Définit la structure des données pour les références rapides
 */

/**
 * Interface pour un élément de cheatsheet
 * Chaque élément contient une commande ou un concept avec sa description
 */
export interface CheatSheetItem {
  /** Titre de la commande ou du concept */
  title: string;
  /** Description détaillée de ce que fait la commande */
  description: string;
  /** Code ou commande prête à copier-coller */
  code?: string;
  /** Exemples d'utilisation supplémentaires */
  examples?: string[];
  /** Catégorie pour organiser les éléments */
  category?: string;
}

/**
 * Interface pour une section de cheatsheet
 * Regroupe plusieurs éléments liés par un thème
 */
export interface CheatSheetSection {
  /** Titre de la section */
  title: string;
  /** Liste des éléments de cette section */
  items: CheatSheetItem[];
}

/**
 * Interface pour un cheatsheet complet
 * Représente un cheatsheet pour une technologie spécifique
 */
export interface CheatSheet {
  /** Nom de la technologie */
  name: string;
  /** Description de la technologie */
  description?: string;
  /** Sections du cheatsheet */
  sections: CheatSheetSection[];
  /** Icône associée (nom de l'icône Lucide) */
  icon?: string;
  /** Tags pour la recherche */
  tags?: string[];
}
