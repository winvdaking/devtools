/**
 * Page d'accueil de l'application DevTools
 * Présente les outils disponibles et les fonctionnalités principales
 */

import {
  BookOpen,
  Code,
  Database,
  Globe,
  Zap,
  Terminal,
  GitBranch,
  Package,
  Monitor,
  Network,
  Shield,
  Type,
  Binary,
  Key,
  Link,
  Calendar,
  Braces,
  FileType,
  Keyboard,
  Clock,
  FileSpreadsheet,
  Ship,
  FileCode,
  FileText,
  Mail,
  Search,
  ChevronRight,
  BarChart3,
  Palette,
  Webhook,
  Grid,
  AlertTriangle,
  RefreshCw,
  Star,
  QrCode,
  Lock,
  Hash,
  FileImage,
  Sparkles,
} from "lucide-react";

// Outils populaires avec leurs IDs pour la navigation
const popularTools = [
  { id: "qr-generator", name: "QR Generator", icon: QrCode, popular: true },
  { id: "markdown-to-discord", name: "Markdown vers Discord", icon: FileText, popular: true },
  { id: "git-cheatsheet", name: "Cheatsheet Git", icon: GitBranch, popular: true },
  { id: "readme-generator", name: "Générateur README", icon: FileText, popular: true },
  { id: "password-generator", name: "Password Generator", icon: Lock, popular: true },
];

const toolCategories = [
  {
    id: "cheatsheets",
    name: "Cheatsheets",
    description: "Références des technologies de développement",
    icon: BookOpen,
    tools: [
      { id: "git-cheatsheet", name: "Git", icon: GitBranch, popular: true },
      { id: "docker-cheatsheet", name: "Docker", icon: Ship, popular: true },
      { id: "bash-cheatsheet", name: "Bash/Shell", icon: Terminal, popular: true },
      { id: "node-cheatsheet", name: "Node.js/npm", icon: Package },
      { id: "laravel-cheatsheet", name: "Laravel", icon: Code },
      { id: "react-cheatsheet", name: "React", icon: Globe, popular: true },
      { id: "python-cheatsheet", name: "Python", icon: Code },
      { id: "sql-cheatsheet", name: "SQL", icon: Database },
      { id: "linux-cheatsheet", name: "Linux", icon: Monitor },
      { id: "regex-cheatsheet", name: "Regex", icon: BookOpen },
    ],
  },
  {
    id: "formatting",
    name: "Formatage & Conversion",
    description: "Outils de formatage et conversion de données",
    icon: Type,
    tools: [
      { id: "json-formatter", name: "JSON Formatter", icon: Braces, popular: true },
      { id: "xml-formatter", name: "XML Formatter", icon: FileCode },
      { id: "yaml-formatter", name: "YAML Formatter", icon: FileText },
      { id: "sql-formatter", name: "SQL Formatter", icon: Database },
      { id: "text-converter", name: "Convertisseur de Texte", icon: Type },
      { id: "spell-checker", name: "Correcteur Orthographique", icon: BookOpen },
      { id: "text-reformulator", name: "Reformulateur de Texte", icon: RefreshCw },
      { id: "json-to-csv", name: "JSON to CSV", icon: FileSpreadsheet },
    ],
  },
  {
    id: "encoding",
    name: "Encodage & Sécurité",
    description: "Outils d'encodage, hachage et sécurité",
    icon: Shield,
    tools: [
      { id: "base64", name: "Encodeur/Décodeur Base64", icon: Binary, popular: true },
      { id: "hash-encrypt", name: "Hachage & Chiffrement", icon: Hash, popular: true },
      { id: "url-encoder", name: "URL Encoder/Decoder", icon: Link, popular: true },
      { id: "html-escape", name: "HTML Escape", icon: Code },
      { id: "basic-auth", name: "Générateur Basic Auth", icon: Shield },
      { id: "jwt-parser", name: "JWT Parser", icon: Key },
    ],
  },
  {
    id: "generators",
    name: "Générateurs",
    description: "Outils de génération automatique",
    icon: Zap,
    tools: [
      { id: "uuid-generator", name: "UUID Generator", icon: Key, popular: true },
      { id: "random-port", name: "Générateur de Ports", icon: Network },
      { id: "crontab-generator", name: "Générateur Crontab", icon: Clock },
      { id: "slugify", name: "Générateur de Slug", icon: Type },
      { id: "mock-data-generator", name: "Générateur de Données", icon: Database },
      { id: "password-generator", name: "Password Generator", icon: Lock, popular: true },
      { id: "qr-generator", name: "QR Generator", icon: QrCode, popular: true },
      { id: "lorem-ipsum-generator", name: "Lorem Ipsum", icon: Type, popular: true },
    ],
  },
  {
    id: "utilities",
    name: "Utilitaires",
    description: "Outils pratiques et utilitaires",
    icon: Monitor,
    tools: [
      { id: "date-formatter", name: "Formateur de Dates", icon: Calendar },
      { id: "url-parser", name: "URL Parser", icon: Globe },
      { id: "device-info", name: "Info Appareil", icon: Monitor },
      { id: "email-normalizer", name: "Normalisateur Email", icon: Mail },
      { id: "chmod-calculator", name: "Calculateur Chmod", icon: Shield },
      { id: "docker-converter", name: "Convertisseur Docker", icon: Ship },
    ],
  },
  {
    id: "development",
    name: "Développement",
    description: "Outils pour le développement",
    icon: Code,
    tools: [
      { id: "bundle-analyzer", name: "Analyseur de Bundle", icon: BarChart3 },
      { id: "graphql-playground", name: "GraphQL Playground", icon: Webhook },
      { id: "color-palette-generator", name: "Générateur de Palette", icon: Palette },
      { id: "css-grid-generator", name: "Générateur CSS Grid", icon: Grid },
      { id: "console-log-beautifier", name: "Beautificateur de Logs", icon: Terminal },
      { id: "error-stack-parser", name: "Analyseur d'Erreurs", icon: AlertTriangle },
    ],
  },
  {
    id: "creative",
    name: "Créatif",
    description: "Outils créatifs et visuels",
    icon: Sparkles,
    tools: [
      { id: "ascii-art", name: "ASCII Art", icon: FileImage, popular: true },
      { id: "emoji-picker", name: "Sélecteur d'Émojis", icon: Sparkles },
    ],
  },
  {
    id: "reference",
    name: "Références",
    description: "Aide-mémoire et documentation",
    icon: BookOpen,
    tools: [
      { id: "mime-types", name: "MIME Types", icon: FileType },
      { id: "keycode-info", name: "Info Touches Clavier", icon: Keyboard },
      { id: "http-status", name: "HTTP Status Codes", icon: Globe },
      { id: "regex-tester", name: "Testeur Regex", icon: Search },
    ],
  },
];

interface HomepageProps {
  onToolSelect?: (toolId: string) => void;
}

export default function Homepage({ onToolSelect }: HomepageProps) {
  const handleToolClick = (toolId: string) => {
    if (onToolSelect) {
      onToolSelect(toolId);
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-8 md:p-12 lg:p-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <img
              src="https://dorianlopez.fr/avatar.png"
              alt="Dorian Lopez"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-kantumruy-pro font-bold">tools.dlpz.fr</h1>
            <p className="text-muted-foreground">
              Boîte à outils pour développeurs
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Une collection d'outils essentiels pour les développeurs : formatage,
          conversion, encodage, génération et références techniques.
        </p>
      </div>

      {/* Outils populaires */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <h2 className="text-xl font-bold text-center">Outils populaires</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {popularTools.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="group relative bg-card border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left"
              >
                {/* Badge flottant */}
                <div className="absolute -top-1 -right-1 z-20">
                  <div className="bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-100 text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm border border-yellow-300 dark:border-yellow-400">
                    Populaire
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ToolIcon className="w-5 h-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{tool.name}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground font-kantumruy-pro">
            Outils disponibles
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-500">
            {toolCategories.length}
          </div>
          <div className="text-sm text-muted-foreground">Catégories</div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-500">10</div>
          <div className="text-sm text-muted-foreground">Cheatsheets</div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-500">100%</div>
          <div className="text-sm text-muted-foreground">Gratuit</div>
        </div>
      </div>

      {/* Catégories d'outils */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Outils disponibles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-card border-4 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {category.tools.length} outils
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.tools.slice(0, 4).map((tool, index) => {
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleToolClick(tool.id)}
                          className="group relative flex items-center gap-1 px-2 py-1 bg-muted hover:bg-primary/10 rounded-md text-xs transition-colors"
                        >
                          <ToolIcon className="w-3 h-3" />
                          <span>{tool.name}</span>
                          {tool.popular && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                    {category.tools.length > 4 && (
                      <div className="px-2 py-1 bg-muted rounded-md text-xs">
                        +{category.tools.length - 4} autres
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fonctionnalités principales */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-kantumruy-pro text-center">
          Fonctionnalités principales
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6 text-center space-y-3">
            <Zap className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Rapide et efficace</h3>
            <p className="text-sm text-muted-foreground">
              Outils optimisés pour un workflow de développement fluide
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center space-y-3">
            <Shield className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Sécurisé</h3>
            <p className="text-sm text-muted-foreground">
              Tous les traitements se font localement dans votre navigateur
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center space-y-3">
            <Globe className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Interface responsive et accessible sur tous les appareils
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4">
        <h3 className="text-xl font-semibold">Prêt à commencer ?</h3>
        <p className="text-muted-foreground">
          Explorez les outils disponibles dans la sidebar pour découvrir toutes
          les fonctionnalités.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="w-4 h-4" />
          <span>Utilisez la navigation à gauche pour accéder aux outils</span>
        </div>
      </div>
    </div>
  );
}
