/**
 * Composant Sidebar - Navigation principale de l'application
 * Version refaite avec une meilleure structure et performance
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Package,
  Home,
  QrCode,
  Bug,
  Smile,
  Shuffle,
  Gamepad2,
  Blocks,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolId, ToolCategory } from "@/types/tools";
import { ThemeToggle } from "./ui/theme-toggle";
import { DiscordIcon } from "./ui/discord-icon";

interface SidebarProps {
  activeTool: ToolId;
  onToolSelect: (toolId: ToolId) => void;
}

// Configuration des catégories d'outils (ordre alphabétique)
const toolCategories: ToolCategory[] = [
  {
    id: "home",
    name: "Accueil",
    description: "Page d'accueil et présentation",
    tools: [
      {
        id: "homepage",
        name: "Accueil",
        description: "Page d'accueil et présentation des outils",
        icon: Home,
        category: "home",
      },
    ],
  },
  {
    id: "components",
    name: "Components UI",
    description: "Composants UI réutilisables",
    tools: [
      {
        id: "scrollbar-component",
        name: "ScrollBar Animée",
        description: "Scrollbar horizontale avec timeline",
        icon: Blocks,
        category: "components",
      },
    ],
  },
  {
    id: "cheatsheets",
    name: "Cheatsheets",
    description: "Références des technologies de développement",
    tools: [
      {
        id: "git-cheatsheet",
        name: "Git",
        description: "Commandes Git essentielles",
        icon: GitBranch,
        category: "cheatsheets",
      },
      {
        id: "docker-cheatsheet",
        name: "Docker",
        description: "Commandes Docker et Docker Compose",
        icon: Ship,
        category: "cheatsheets",
      },
      {
        id: "bash-cheatsheet",
        name: "Bash/Shell",
        description: "Commandes terminal et shell",
        icon: Terminal,
        category: "cheatsheets",
      },
      {
        id: "node-cheatsheet",
        name: "Node.js/npm",
        description: "Commandes Node.js et npm",
        icon: Package,
        category: "cheatsheets",
      },
      {
        id: "laravel-cheatsheet",
        name: "Laravel",
        description: "Artisan et Laravel",
        icon: Code,
        category: "cheatsheets",
      },
      {
        id: "react-cheatsheet",
        name: "React",
        description: "Hooks et composants React",
        icon: Globe,
        category: "cheatsheets",
      },
      {
        id: "python-cheatsheet",
        name: "Python",
        description: "Commandes Python et pip",
        icon: Code,
        category: "cheatsheets",
      },
      {
        id: "sql-cheatsheet",
        name: "SQL",
        description: "Requêtes SQL essentielles",
        icon: Database,
        category: "cheatsheets",
      },
      {
        id: "linux-cheatsheet",
        name: "Linux",
        description: "Commandes système Linux",
        icon: Monitor,
        category: "cheatsheets",
      },
      {
        id: "regex-cheatsheet",
        name: "Regex",
        description: "Expressions régulières",
        icon: BookOpen,
        category: "cheatsheets",
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
      {
        id: "responsive-design-checker",
        name: "Responsive Design Checker",
        description: "Vérificateur de design responsive",
        icon: Monitor,
        category: "development",
      },
      {
        id: "performance-monitor",
        name: "Performance Monitor",
        description: "Moniteur de performance web",
        icon: BarChart3,
        category: "development",
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
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Générateur de mots de passe sécurisés",
        icon: Shield,
        category: "encoding",
      },
      {
        id: "security-headers-checker",
        name: "Security Headers Checker",
        description: "Vérificateur d'en-têtes de sécurité",
        icon: Shield,
        category: "encoding",
      },
      {
        id: "ssl-certificate-checker",
        name: "SSL Certificate Checker",
        description: "Vérificateur de certificats SSL",
        icon: Shield,
        category: "encoding",
      },
    ],
  },
  {
    id: "formatting",
    name: "Formatage & Conversion",
    description: "Outils de formatage et conversion de données",
    tools: [
      {
        id: "markdown-to-html",
        name: "Markdown to HTML",
        description: "Conversion Markdown vers HTML",
        icon: FileText,
        category: "formatting",
      },
      {
        id: "markdown-to-discord",
        name: "Markdown to Discord",
        description: "Conversion Markdown vers Discord",
        icon: DiscordIcon,
        category: "formatting",
      },
      {
        id: "markdown-to-slack",
        name: "Markdown to Slack",
        description: "Conversion Markdown vers Slack",
        icon: Hash,
        category: "formatting",
      },
      {
        id: "markdown-to-jira",
        name: "Markdown to Jira",
        description: "Conversion Markdown vers Jira",
        icon: Bug,
        category: "formatting",
      },
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
      {
        id: "readme-generator",
        name: "README Generator",
        description: "Générateur de fichiers README",
        icon: FileText,
        category: "formatting",
      },
      {
        id: "changelog-generator",
        name: "Changelog Generator",
        description: "Générateur de changelogs",
        icon: Calendar,
        category: "formatting",
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
      {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Génération de QR Codes personnalisés",
        icon: QrCode,
        category: "generators",
      },
      {
        id: "ascii-art",
        name: "ASCII Art Generator",
        description: "Génération d'art ASCII à partir de texte",
        icon: Type,
        category: "generators",
      },
      {
        id: "string-obfuscator",
        name: "String Obfuscator",
        description: "Obfuscation et chiffrement de texte",
        icon: Shuffle,
        category: "generators",
      },
      {
        id: "emoji-picker",
        name: "Emoji Picker",
        description: "Sélecteur d'émojis et icônes",
        icon: Smile,
        category: "generators",
      },
      {
        id: "lorem-ipsum-generator",
        name: "Lorem Ipsum Generator",
        description: "Génération de texte de remplissage",
        icon: FileText,
        category: "generators",
      },
    ],
  },
  {
    id: "games",
    name: "Jeux",
    description: "Jeux et divertissements",
    tools: [
      {
        id: "memory-game",
        name: "Memory Game",
        description: "Jeu de mémoire avec paires",
        icon: Gamepad2,
        category: "games",
      },
      {
        id: "snake-game",
        name: "Snake",
        description: "Jeu du serpent classique",
        icon: Zap,
        category: "games",
      },
      {
        id: "game-2048",
        name: "2048",
        description: "Puzzle de fusion de nombres",
        icon: Grid,
        category: "games",
      },
      {
        id: "simon-says",
        name: "Simon Says",
        description: "Mémorisation de séquences",
        icon: Palette,
        category: "games",
      },
      {
        id: "tic-tac-toe",
        name: "Tic-Tac-Toe",
        description: "Morpion avec IA",
        icon: Hash,
        category: "games",
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
        id: "regex-tester",
        name: "Regex Tester",
        description: "Testeur d'expressions régulières",
        icon: Search,
        category: "reference",
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
];

// Composant pour un élément de catégorie
interface CategoryItemProps {
  category: ToolCategory;
  isExpanded: boolean;
  onToggle: () => void;
  activeTool: ToolId;
  onToolSelect: (toolId: ToolId) => void;
  onCloseMobile: () => void;
}

function CategoryItem({ 
  category, 
  isExpanded, 
  onToggle, 
  activeTool, 
  onToolSelect, 
  onCloseMobile 
}: CategoryItemProps) {
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div className="space-y-1">
      {/* Bouton de catégorie */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-accent hover:text-accent-foreground transition-colors group"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{category.name}</span>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
            {category.tools.length}
          </span>
        </div>
        <ChevronIcon className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-foreground" />
      </button>

      {/* Liste des outils */}
      {isExpanded && (
        <div className="ml-2 space-y-1 border-l border-border pl-3">
          {category.tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  onToolSelect(tool.id as ToolId);
                  onCloseMobile();
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ToolIcon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {tool.name}
                  </div>
                  <div className="text-xs truncate opacity-75">
                    {tool.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Composant principal de la sidebar
export function Sidebar({ activeTool, onToolSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["home"])
  );

  // Gestion de l'ouverture/fermeture des catégories
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  // Fermer la sidebar sur mobile
  const closeMobile = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Gestion du redimensionnement de fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Bouton mobile pour ouvrir la sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-72 bg-card border-r border-border flex flex-col",
          "lg:relative lg:z-0 lg:translate-x-0 lg:w-80",
          "shadow-xl lg:shadow-none",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
              <img
                src="https://dorianlopez.fr/avatar.png"
                alt="Dorian Lopez"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-sm font-semibold">
                tools.dlpz.fr
              </h1>
              <p className="text-xs text-muted-foreground">
                DevTools Hub
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={closeMobile}
              className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 space-y-2 overflow-y-auto flex-1">
            {toolCategories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isExpanded={expandedCategories.has(category.id)}
                onToggle={() => toggleCategory(category.id)}
                activeTool={activeTool}
                onToolSelect={onToolSelect}
                onCloseMobile={closeMobile}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex flex-col items-center justify-center text-xs text-muted-foreground space-y-2">
            <a
              href="https://dorianlopez.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-foreground transition-colors group"
            >
              <Zap className="h-3 w-3 group-hover:text-primary" />
              <span>dorianlopez.fr</span>
            </a>
            <div className="text-center">
              <span>dlpz.fr © {new Date().getFullYear()} - Tous droits réservés</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}