/**
 * Types pour la gestion des outils de développement
 */
import { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export type ToolId =
  | "date-formatter"
  | "json-formatter"
  | "text-converter"
  | "hash-encrypt"
  | "base64"
  | "uuid-generator"
  | "url-encoder"
  | "html-escape"
  | "url-parser"
  | "device-info"
  | "jwt-parser"
  | "slugify"
  | "basic-auth"
  | "mime-types"
  | "keycode-info"
  | "http-status"
  | "git-cheatsheet"
  | "random-port"
  | "crontab-generator"
  | "json-to-csv"
  | "sql-formatter"
  | "chmod-calculator"
  | "docker-converter"
  | "xml-formatter"
  | "yaml-formatter"
  | "email-normalizer"
  | "regex-tester"
  | "regex-cheatsheet";
