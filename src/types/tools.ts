/**
 * Types pour la gestion des outils de développement
 */
import { LucideIcon } from "lucide-react";

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
