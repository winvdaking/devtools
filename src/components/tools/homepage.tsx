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
} from "lucide-react";

const toolCategories = [
  {
    id: "cheatsheets",
    name: "Cheatsheets Tech",
    description: "Références des technologies de développement",
    icon: BookOpen,
    tools: [
      { name: "Git", icon: GitBranch },
      { name: "Docker", icon: Ship },
      { name: "Bash/Shell", icon: Terminal },
      { name: "Node.js/npm", icon: Package },
      { name: "Laravel", icon: Code },
      { name: "React", icon: Globe },
      { name: "Python", icon: Code },
      { name: "SQL", icon: Database },
      { name: "Linux", icon: Monitor },
      { name: "Regex", icon: BookOpen },
    ],
  },
  {
    id: "formatting",
    name: "Formatage & Conversion",
    description: "Outils de formatage et conversion de données",
    icon: Type,
    tools: [
      { name: "JSON Formatter", icon: Braces },
      { name: "XML Formatter", icon: FileCode },
      { name: "YAML Formatter", icon: FileText },
      { name: "SQL Formatter", icon: Database },
      { name: "Text Converter", icon: Type },
      { name: "Spell Checker", icon: BookOpen },
      { name: "Text Reformulator", icon: RefreshCw },
      { name: "JSON to CSV", icon: FileSpreadsheet },
    ],
  },
  {
    id: "encoding",
    name: "Encodage & Sécurité",
    description: "Outils d'encodage, hachage et sécurité",
    icon: Shield,
    tools: [
      { name: "Base64 Encoder/Decoder", icon: Binary },
      { name: "Hash & Encrypt", icon: Shield },
      { name: "URL Encoder/Decoder", icon: Link },
      { name: "HTML Escape", icon: Code },
      { name: "Basic Auth Generator", icon: Shield },
      { name: "JWT Parser", icon: Key },
    ],
  },
  {
    id: "generators",
    name: "Générateurs",
    description: "Outils de génération automatique",
    icon: Zap,
    tools: [
      { name: "UUID Generator", icon: Key },
      { name: "Random Port Generator", icon: Network },
      { name: "Crontab Generator", icon: Clock },
      { name: "Slugify String", icon: Type },
      { name: "Mock Data Generator", icon: Database },
    ],
  },
  {
    id: "utilities",
    name: "Utilitaires",
    description: "Outils pratiques et utilitaires",
    icon: Monitor,
    tools: [
      { name: "Date Formatter", icon: Calendar },
      { name: "URL Parser", icon: Globe },
      { name: "Device Information", icon: Monitor },
      { name: "Email Normalizer", icon: Mail },
      { name: "Chmod Calculator", icon: Shield },
      { name: "Docker Converter", icon: Ship },
    ],
  },
  {
    id: "development",
    name: "Développement",
    description: "Outils pour le développement",
    icon: Code,
    tools: [
      { name: "Bundle Analyzer", icon: BarChart3 },
      { name: "GraphQL Playground", icon: Webhook },
      { name: "Color Palette Generator", icon: Palette },
      { name: "CSS Grid Generator", icon: Grid },
      { name: "Console Log Beautifier", icon: Terminal },
      { name: "Error Stack Parser", icon: AlertTriangle },
    ],
  },
  {
    id: "reference",
    name: "Références",
    description: "Aide-mémoire et documentation",
    icon: BookOpen,
    tools: [
      { name: "MIME Types", icon: FileType },
      { name: "Keycode Info", icon: Keyboard },
      { name: "HTTP Status Codes", icon: Globe },
      { name: "Regex Tester", icon: Search },
    ],
  },
];

export default function Homepage() {
  return (
    <div className="space-y-8">
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
            <h1 className="text-4xl font-bold font-playfair">tools.dlpz.fr</h1>
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

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">
            Outils disponibles
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-500">
            {toolCategories.length}
          </div>
          <div className="text-sm text-muted-foreground">Catégories</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">10</div>
          <div className="text-sm text-muted-foreground">Cheatsheets</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-500">100%</div>
          <div className="text-sm text-muted-foreground">Gratuit</div>
        </div>
      </div>

      {/* Catégories d'outils */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-playfair text-center">
          Outils disponibles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-card border rounded-lg p-6 space-y-4"
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
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
                        >
                          <ToolIcon className="w-3 h-3" />
                          <span>{tool.name}</span>
                        </div>
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
        <h2 className="text-2xl font-bold font-playfair text-center">
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
