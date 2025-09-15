/**
 * Index des cheatsheets
 * Exporte tous les cheatsheets disponibles dans l'application
 */

// Import des cheatsheets
import { gitCheatSheet } from "./git";
import { dockerCheatSheet } from "./docker";
import { bashCheatSheet } from "./bash";
import { composerCheatSheet } from "./composer";
import { nodeCheatSheet } from "./node";
import { laravelCheatSheet } from "./laravel";
import { symfonyCheatSheet } from "./symfony";
import { reactCheatSheet } from "./react";
import { nextCheatSheet } from "./next";
import { nuxtCheatSheet } from "./nuxt";
import { vueCheatSheet } from "./vue";
import { pythonCheatSheet } from "./python";
import { sqlCheatSheet } from "./sql";
import { linuxCheatSheet } from "./linux";
import { regexCheatSheet } from "./regex";
import { curlCheatSheet } from "./curl";
import { jsEs6CheatSheet } from "./js-es6";

// Import des types
import { CheatSheet } from "../../types/cheatsheets";

/**
 * Tableau de tous les cheatsheets disponibles
 * Organisé par catégories pour faciliter la navigation
 */
export const allCheatSheets: CheatSheet[] = [
  // Version Control
  gitCheatSheet,

  // Containers & DevOps
  dockerCheatSheet,
  linuxCheatSheet,

  // Shell & Terminal
  bashCheatSheet,
  curlCheatSheet,

  // Package Managers
  composerCheatSheet,
  nodeCheatSheet,

  // Backend Frameworks
  laravelCheatSheet,
  symfonyCheatSheet,
  pythonCheatSheet,

  // Frontend Frameworks
  reactCheatSheet,
  nextCheatSheet,
  vueCheatSheet,
  nuxtCheatSheet,

  // Databases
  sqlCheatSheet,

  // Tools & Utilities
  regexCheatSheet,

  // Programming Languages
  jsEs6CheatSheet,
];

/**
 * Objet avec tous les cheatsheets indexés par nom
 * Utile pour accéder rapidement à un cheatsheet spécifique
 */
export const cheatSheetsByName: Record<string, CheatSheet> = {
  Git: gitCheatSheet,
  Docker: dockerCheatSheet,
  "Bash/Shell": bashCheatSheet,
  Composer: composerCheatSheet,
  "Node.js/npm": nodeCheatSheet,
  Laravel: laravelCheatSheet,
  Symfony: symfonyCheatSheet,
  React: reactCheatSheet,
  "Next.js": nextCheatSheet,
  "Nuxt.js": nuxtCheatSheet,
  "Vue.js": vueCheatSheet,
  Python: pythonCheatSheet,
  SQL: sqlCheatSheet,
  Linux: linuxCheatSheet,
  Regex: regexCheatSheet,
  cURL: curlCheatSheet,
  "JavaScript ES6+": jsEs6CheatSheet,
};

/**
 * Objet avec tous les cheatsheets indexés par tag
 * Utile pour filtrer les cheatsheets par catégorie
 */
export const cheatSheetsByTag: Record<string, CheatSheet[]> = {
  "version-control": [gitCheatSheet],
  containerization: [dockerCheatSheet],
  devops: [dockerCheatSheet, linuxCheatSheet],
  shell: [bashCheatSheet, linuxCheatSheet],
  terminal: [bashCheatSheet, curlCheatSheet],
  "package-manager": [composerCheatSheet, nodeCheatSheet],
  php: [composerCheatSheet, laravelCheatSheet, symfonyCheatSheet],
  javascript: [
    jsEs6CheatSheet,
    nodeCheatSheet,
    reactCheatSheet,
    nextCheatSheet,
    vueCheatSheet,
    nuxtCheatSheet,
  ],
  frontend: [jsEs6CheatSheet, reactCheatSheet, nextCheatSheet, vueCheatSheet, nuxtCheatSheet],
  backend: [jsEs6CheatSheet, laravelCheatSheet, symfonyCheatSheet, pythonCheatSheet],
  framework: [
    laravelCheatSheet,
    symfonyCheatSheet,
    reactCheatSheet,
    nextCheatSheet,
    vueCheatSheet,
    nuxtCheatSheet,
  ],
  react: [reactCheatSheet, nextCheatSheet],
  vue: [vueCheatSheet, nuxtCheatSheet],
  ssr: [nextCheatSheet, nuxtCheatSheet],
  ssg: [nextCheatSheet, nuxtCheatSheet],
  database: [sqlCheatSheet],
  sql: [sqlCheatSheet],
  python: [pythonCheatSheet],
  programming: [jsEs6CheatSheet, pythonCheatSheet],
  "es6": [jsEs6CheatSheet],
  "es2015": [jsEs6CheatSheet],
  "modern-js": [jsEs6CheatSheet],
  scripting: [pythonCheatSheet],
  "data-science": [pythonCheatSheet],
  unix: [bashCheatSheet, linuxCheatSheet],
  system: [linuxCheatSheet],
  administration: [linuxCheatSheet],
  server: [laravelCheatSheet, symfonyCheatSheet, linuxCheatSheet],
  regex: [regexCheatSheet],
  pattern: [regexCheatSheet],
  validation: [regexCheatSheet],
  search: [regexCheatSheet],
  text: [regexCheatSheet],
  curl: [curlCheatSheet],
  http: [curlCheatSheet],
  api: [curlCheatSheet],
  testing: [curlCheatSheet],
  download: [curlCheatSheet],
  network: [curlCheatSheet],
};

/**
 * Fonction pour obtenir un cheatsheet par nom
 * @param name - Nom du cheatsheet
 * @returns Le cheatsheet correspondant ou undefined
 */
export const getCheatSheetByName = (name: string): CheatSheet | undefined => {
  return cheatSheetsByName[name];
};

/**
 * Fonction pour obtenir des cheatsheets par tag
 * @param tag - Tag à rechercher
 * @returns Tableau des cheatsheets correspondants
 */
export const getCheatSheetsByTag = (tag: string): CheatSheet[] => {
  return cheatSheetsByTag[tag] || [];
};

/**
 * Fonction pour rechercher des cheatsheets par nom ou description
 * @param query - Terme de recherche
 * @returns Tableau des cheatsheets correspondants
 */
export const searchCheatSheets = (query: string): CheatSheet[] => {
  const lowercaseQuery = query.toLowerCase();

  return allCheatSheets.filter(
    (cheatSheet) =>
      cheatSheet.name.toLowerCase().includes(lowercaseQuery) ||
      cheatSheet.description?.toLowerCase().includes(lowercaseQuery) ||
      cheatSheet.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Fonction pour obtenir tous les tags uniques
 * @returns Tableau de tous les tags disponibles
 */
export const getAllTags = (): string[] => {
  const tags = new Set<string>();

  allCheatSheets.forEach((cheatSheet) => {
    cheatSheet.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
};

// Export par défaut
export default allCheatSheets;
