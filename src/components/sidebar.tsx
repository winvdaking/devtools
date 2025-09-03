/**
 * Composant Sidebar - Navigation principale de l'application
 */
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Braces,
  Type,
  Shield,
  Binary,
  Key,
  Link,
  Code,
  Globe,
  Monitor,
  Hash,
  Menu,
  X,
  FileType,
  Keyboard,
  GitBranch,
  Network,
  Clock,
  FileSpreadsheet,
  Database,
  Ship,
  FileCode,
  FileText,
  Mail,
  Search,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tool, ToolId } from "@/types/tools";

interface SidebarProps {
  activeTool: ToolId;
  onToolSelect: (toolId: ToolId) => void;
}

const tools: Omit<Tool, "component">[] = [
  {
    id: "date-formatter",
    name: "Date Formatter",
    description: "Formatage de dates",
    icon: Calendar,
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Formatage JSON",
    icon: Braces,
  },
  {
    id: "text-converter",
    name: "Text Converter",
    description: "Conversion de texte",
    icon: Type,
  },
  {
    id: "hash-encrypt",
    name: "Hash & Encrypt",
    description: "Hachage et chiffrement",
    icon: Shield,
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Encodage/décodage Base64",
    icon: Binary,
  },
  {
    id: "uuid-generator",
    name: "UUID & Token Generator",
    description: "Génération UUID et tokens",
    icon: Key,
  },
  {
    id: "url-encoder",
    name: "Encode/decode URL-format",
    description: "Encodage/décodage URL",
    icon: Link,
  },
  {
    id: "html-escape",
    name: "Escape HTML entities",
    description: "Échappement HTML",
    icon: Code,
  },
  {
    id: "url-parser",
    name: "URL parser",
    description: "Analyse d'URL",
    icon: Globe,
  },
  {
    id: "device-info",
    name: "Device information",
    description: "Informations appareil",
    icon: Monitor,
  },
  {
    id: "jwt-parser",
    name: "JWT parser",
    description: "Analyse de tokens JWT",
    icon: Key,
  },
  {
    id: "slugify",
    name: "Slugify string",
    description: "Génération de slugs",
    icon: Hash,
  },
  {
    id: "basic-auth",
    name: "Basic auth generator",
    description: "Génération d'auth basique",
    icon: Shield,
  },
  {
    id: "mime-types",
    name: "MIME types",
    description: "Référence types MIME",
    icon: FileType,
  },
  {
    id: "keycode-info",
    name: "Keycode info",
    description: "Informations touches clavier",
    icon: Keyboard,
  },
  {
    id: "http-status",
    name: "HTTP status codes",
    description: "Codes de statut HTTP",
    icon: Globe,
  },
  {
    id: "git-cheatsheet",
    name: "Git cheatsheet",
    description: "Aide-mémoire Git",
    icon: GitBranch,
  },
  {
    id: "random-port",
    name: "Random port generator",
    description: "Générateur de ports",
    icon: Network,
  },
  {
    id: "crontab-generator",
    name: "Crontab generator",
    description: "Générateur de cron",
    icon: Clock,
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    description: "Conversion JSON vers CSV",
    icon: FileSpreadsheet,
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Formatage SQL",
    icon: Database,
  },
  {
    id: "chmod-calculator",
    name: "Chmod Calculator",
    description: "Calculateur de permissions",
    icon: Shield,
  },
  {
    id: "docker-converter",
    name: "Docker Converter",
    description: "Convertisseur Docker",
    icon: Ship,
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Formatage XML",
    icon: FileCode,
  },
  {
    id: "yaml-formatter",
    name: "YAML Formatter",
    description: "Formatage YAML",
    icon: FileText,
  },
  {
    id: "email-normalizer",
    name: "Email Normalizer",
    description: "Normalisation d'emails",
    icon: Mail,
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Testeur d'expressions régulières",
    icon: Search,
  },
  {
    id: "regex-cheatsheet",
    name: "Regex Cheatsheet",
    description: "Aide-mémoire regex",
    icon: BookOpen,
  },
];

export function Sidebar({ activeTool, onToolSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton mobile pour ouvrir la sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border shadow-md"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-72 bg-card border-r border-border transition-transform duration-300",
          "lg:relative lg:z-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                DT
              </span>
            </div>
            <h1 className="text-lg font-semibold">DevTools Hub</h1>
          </div>

          {/* Bouton fermer pour mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;

              return (
                <motion.button
                  key={tool.id}
                  onClick={() => {
                    onToolSelect(tool.id as ToolId);
                    setIsOpen(false); // Fermer la sidebar sur mobile après sélection
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {tool.name}
                    </div>
                    <div
                      className={cn(
                        "text-xs truncate",
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {tool.description}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </nav>
      </motion.aside>
    </>
  );
}
