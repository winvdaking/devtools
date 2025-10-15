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
  | "markdown-to-html"
  | "markdown-to-discord"
  | "markdown-to-slack"
  | "markdown-to-jira"
  | "ascii-art"
  | "string-obfuscator"
  | "emoji-picker"
  | "lorem-ipsum-generator"
  | "readme-generator"
  | "changelog-generator"
  | "responsive-design-checker"
  | "password-generator"
  | "security-headers-checker"
  | "ssl-certificate-checker"
  | "performance-monitor"

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
  | "qr-generator"

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

  // Cheatsheets des technologies
  | "cheatsheets"

  // Page d'accueil
  | "homepage"

  // Components UI
  | "scrollbar-component"
  | "button-component"

  // Jeux
  | "memory-game"
  | "snake-game"
  | "game-2048"
  | "simon-says"
  | "tic-tac-toe";

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
