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
  ChevronDown,
  ChevronRight,
  Zap,
  BarChart3,
  Palette,
  Webhook,
  Grid,
  Terminal,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ToolId, ToolCategory } from "@/types/tools";
import { ThemeToggle } from "./ui/theme-toggle";

interface SidebarProps {
  activeTool: ToolId;
  onToolSelect: (toolId: ToolId) => void;
}

const toolCategories: ToolCategory[] = [
  {
    id: "formatting",
    name: "Formatage & Conversion",
    description: "Outils de formatage et conversion de données",
    tools: [
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Formatage et validation JSON",
        icon: Braces,
        category: "formatting",
      },
      {
        id: "xml-formatter",
        name: "XML Formatter",
        description: "Formatage et validation XML",
        icon: FileCode,
        category: "formatting",
      },
      {
        id: "yaml-formatter",
        name: "YAML Formatter",
        description: "Formatage et validation YAML",
        icon: FileText,
        category: "formatting",
      },
      {
        id: "sql-formatter",
        name: "SQL Formatter",
        description: "Formatage et beautification SQL",
        icon: Database,
        category: "formatting",
      },
      {
        id: "text-converter",
        name: "Text Converter",
        description: "Conversion et transformation de texte",
        icon: Type,
        category: "formatting",
      },
      {
        id: "spell-checker",
        name: "Correcteur Orthographique",
        description: "Vérification orthographe et grammaire",
        icon: BookOpen,
        category: "formatting",
      },
      {
        id: "text-reformulator",
        name: "Reformulateur de Texte",
        description: "Reformulation selon différents styles",
        icon: RefreshCw,
        category: "formatting",
      },
      {
        id: "json-to-csv",
        name: "JSON to CSV",
        description: "Conversion JSON vers CSV",
        icon: FileSpreadsheet,
        category: "formatting",
      },
    ],
  },
  {
    id: "encoding",
    name: "Encodage & Sécurité",
    description: "Outils d'encodage, hachage et sécurité",
    tools: [
      {
        id: "base64",
        name: "Base64 Encoder/Decoder",
        description: "Encodage/décodage Base64",
        icon: Binary,
        category: "encoding",
      },
      {
        id: "hash-encrypt",
        name: "Hash & Encrypt",
        description: "Hachage et chiffrement",
        icon: Shield,
        category: "encoding",
      },
      {
        id: "url-encoder",
        name: "URL Encoder/Decoder",
        description: "Encodage/décodage URL",
        icon: Link,
        category: "encoding",
      },
      {
        id: "html-escape",
        name: "HTML Escape",
        description: "Échappement des entités HTML",
        icon: Code,
        category: "encoding",
      },
      {
        id: "basic-auth",
        name: "Basic Auth Generator",
        description: "Génération d'authentification basique",
        icon: Shield,
        category: "encoding",
      },
      {
        id: "jwt-parser",
        name: "JWT Parser",
        description: "Analyse et décodage de tokens JWT",
        icon: Key,
        category: "encoding",
      },
    ],
  },
  {
    id: "generators",
    name: "Générateurs",
    description: "Outils de génération automatique",
    tools: [
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Génération d'UUID et tokens",
        icon: Key,
        category: "generators",
      },
      {
        id: "random-port",
        name: "Random Port Generator",
        description: "Génération de ports aléatoires",
        icon: Network,
        category: "generators",
      },
      {
        id: "crontab-generator",
        name: "Crontab Generator",
        description: "Génération d'expressions cron",
        icon: Clock,
        category: "generators",
      },
      {
        id: "slugify",
        name: "Slugify String",
        description: "Génération de slugs URL",
        icon: Hash,
        category: "generators",
      },
      {
        id: "mock-data-generator",
        name: "Mock Data Generator",
        description: "Génération de données de test",
        icon: Database,
        category: "generators",
      },
    ],
  },
  {
    id: "utilities",
    name: "Utilitaires",
    description: "Outils pratiques et utilitaires",
    tools: [
      {
        id: "date-formatter",
        name: "Date Formatter",
        description: "Formatage et conversion de dates",
        icon: Calendar,
        category: "utilities",
      },
      {
        id: "url-parser",
        name: "URL Parser",
        description: "Analyse et décomposition d'URL",
        icon: Globe,
        category: "utilities",
      },
      {
        id: "device-info",
        name: "Device Information",
        description: "Informations sur l'appareil",
        icon: Monitor,
        category: "utilities",
      },
      {
        id: "email-normalizer",
        name: "Email Normalizer",
        description: "Normalisation d'adresses email",
        icon: Mail,
        category: "utilities",
      },
      {
        id: "chmod-calculator",
        name: "Chmod Calculator",
        description: "Calculateur de permissions Unix",
        icon: Shield,
        category: "utilities",
      },
      {
        id: "docker-converter",
        name: "Docker Converter",
        description: "Convertisseur de formats Docker",
        icon: Ship,
        category: "utilities",
      },
    ],
  },
  {
    id: "development",
    name: "Développement",
    description: "Outils pour le développement",
    tools: [
      {
        id: "bundle-analyzer",
        name: "Bundle Analyzer",
        description: "Analyse de la taille des bundles",
        icon: BarChart3,
        category: "development",
      },
      {
        id: "graphql-playground",
        name: "GraphQL Playground",
        description: "Test et exploration d'APIs GraphQL",
        icon: Webhook,
        category: "development",
      },
      {
        id: "color-palette-generator",
        name: "Color Palette Generator",
        description: "Génération de palettes de couleurs",
        icon: Palette,
        category: "development",
      },
      {
        id: "css-grid-generator",
        name: "CSS Grid Generator",
        description: "Création de grilles CSS",
        icon: Grid,
        category: "development",
      },
      {
        id: "console-log-beautifier",
        name: "Console Log Beautifier",
        description: "Formatage des logs console",
        icon: Terminal,
        category: "development",
      },
      {
        id: "error-stack-parser",
        name: "Error Stack Parser",
        description: "Analyse des traces d'erreur",
        icon: AlertTriangle,
        category: "development",
      },
    ],
  },
  {
    id: "reference",
    name: "Références",
    description: "Aide-mémoire et documentation",
    tools: [
      {
        id: "mime-types",
        name: "MIME Types",
        description: "Référence des types MIME",
        icon: FileType,
        category: "reference",
      },
      {
        id: "keycode-info",
        name: "Keycode Info",
        description: "Informations sur les touches clavier",
        icon: Keyboard,
        category: "reference",
      },
      {
        id: "http-status",
        name: "HTTP Status Codes",
        description: "Codes de statut HTTP",
        icon: Globe,
        category: "reference",
      },
      {
        id: "git-cheatsheet",
        name: "Git Cheatsheet",
        description: "Aide-mémoire Git",
        icon: GitBranch,
        category: "reference",
      },
      {
        id: "regex-cheatsheet",
        name: "Regex Cheatsheet",
        description: "Aide-mémoire des expressions régulières",
        icon: BookOpen,
        category: "reference",
      },
      {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Testeur d'expressions régulières",
        icon: Search,
        category: "reference",
      },
    ],
  },
  {
    id: "cheatsheets",
    name: "Cheatsheets Tech",
    description: "Références des technologies de développement",
    tools: [
      {
        id: "cheatsheets",
        name: "Cheatsheets",
        description:
          "Références rapides Node.js, PHP, React, Nuxt, Laravel, Symfony, Cursor AI, Claude, GitHub Copilot",
        icon: BookOpen,
        category: "cheatsheets",
      },
    ],
  },
];

export function Sidebar({ activeTool, onToolSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["formatting", "encoding", "development", "cheatsheets"])
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

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
          "fixed left-0 top-0 z-40 h-full w-72 bg-card border-r border-border transition-transform duration-300 overflow-hidden",
          "lg:relative lg:z-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                DL
              </span>
            </div>
            <h1 className="text-lg font-semibold font-playfair">
              tools.dlpz.fr
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {/* Bouton fermer pour mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation avec scroll vertical uniquement */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 space-y-4">
            {toolCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const Icon = isExpanded ? ChevronDown : ChevronRight;

              return (
                <div key={category.id} className="space-y-2">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({category.tools.length})
                      </span>
                    </div>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 space-y-1"
                    >
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isActive = activeTool === tool.id;

                        return (
                          <motion.button
                            key={tool.id}
                            onClick={() => {
                              onToolSelect(tool.id as ToolId);
                              setIsOpen(false); // Fermer la sidebar sur mobile après sélection
                            }}
                            className={cn(
                              "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ToolIcon className="h-4 w-4 flex-shrink-0" />
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
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <a
            href="https://dorianlopez.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Zap className="h-4 w-4" />
            <span>
              Développé par <strong>dorianlopez.fr</strong>
            </span>
          </a>
        </div>
      </motion.aside>
    </>
  );
}
