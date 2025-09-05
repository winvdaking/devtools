/**
 * Types pour la gestion des outils de développement
 */
import { LucideIcon } from "lucide-react";

export type ToolId =
  // Outils de formatage
  | "date-formatter"
  | "json-formatter"
  | "text-converter"
  | "xml-formatter"
  | "yaml-formatter"
  | "sql-formatter"
  | "json-to-csv"

  // Outils d'encodage et sécurité
  | "hash-encrypt"
  | "base64"
  | "url-encoder"
  | "html-escape"
  | "basic-auth"
  | "jwt-parser"

  // Générateurs
  | "uuid-generator"
  | "random-port"
  | "crontab-generator"
  | "slugify"

  // Utilitaires
  | "url-parser"
  | "device-info"
  | "chmod-calculator"
  | "docker-converter"
  | "email-normalizer"

  // Références et aide-mémoire
  | "mime-types"
  | "keycode-info"
  | "http-status"
  | "regex-tester"

  // Cheatsheets individuels
  | "git-cheatsheet"
  | "docker-cheatsheet"
  | "bash-cheatsheet"
  | "node-cheatsheet"
  | "laravel-cheatsheet"
  | "react-cheatsheet"
  | "python-cheatsheet"
  | "sql-cheatsheet"
  | "linux-cheatsheet"
  | "regex-cheatsheet"

  // Outils de développement
  | "bundle-analyzer"
  | "graphql-playground"
  | "color-palette-generator"
  | "css-grid-generator"
  | "mock-data-generator"
  | "console-log-beautifier"
  | "error-stack-parser"
  | "spell-checker"
  | "text-reformulator"

  // Cheatsheets des technologies
  | "cheatsheets";

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  component: React.ComponentType;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  tools: Omit<Tool, "component">[];
}
