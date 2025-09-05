/**
 * Composant principal des cheatsheets pour les technologies de développement
 * Fournit des références rapides pour toutes les technologies de développement
 */

import React, { useState } from "react";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Layers,
  Zap,
  Terminal,
  GitBranch,
  Package,
  Server,
  Monitor,
  Network,
} from "lucide-react";

// Import des cheatsheets depuis les fichiers séparés
import { allCheatSheets } from "../../data/cheatsheets";

// Mapping des icônes par nom
const iconMap: Record<string, React.ReactNode> = {
  GitBranch: <GitBranch className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
};

// Convertir les cheatsheets en format compatible avec l'ancien composant
const cheatsheets: TechnologyCheatsheet[] = allCheatSheets.map(
  (cheatSheet) => ({
    name: cheatSheet.name,
    icon: iconMap[cheatSheet.icon || "Code"] || <Code className="w-5 h-5" />,
    sections: cheatSheet.sections.map((section) => ({
      title: section.title,
      items: section.items.map((item) => ({
        title: item.title,
        description: item.description,
        code: item.code,
        examples: item.examples,
      })),
    })),
  })
);

interface CheatsheetSection {
  title: string;
  items: Array<{
    title: string;
    description: string;
    code?: string;
    examples?: string[];
  }>;
}

interface TechnologyCheatsheet {
  name: string;
  icon: React.ReactNode;
  sections: CheatsheetSection[];
}

export default function Cheatsheets() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-playfair mb-2">Cheatsheets</h2>
        <p className="text-muted-foreground">
          Références rapides pour les technologies de développement
        </p>
      </div>

      {/* Onglets */}
      <div className="flex flex-wrap gap-2 border-b">
        {cheatsheets.map((cheatsheet, index) => (
          <button
            key={cheatsheet.name}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {cheatsheet.icon}
            {cheatsheet.name}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="space-y-6">
        {cheatsheets[activeTab] && (
          <>
            <div className="flex items-center gap-3 mb-6">
              {cheatsheets[activeTab].icon}
              <h3 className="text-xl font-bold font-playfair">
                {cheatsheets[activeTab].name}
              </h3>
            </div>

            <div className="grid gap-6">
              {cheatsheets[activeTab].sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">
                    {section.title}
                  </h4>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-card border rounded-lg p-4"
                      >
                        <h5 className="font-medium mb-2">{item.title}</h5>
                        <p className="text-muted-foreground mb-3">
                          {item.description}
                        </p>

                        {item.code && (
                          <div className="bg-muted rounded p-3 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">
                              {item.code}
                            </pre>
                          </div>
                        )}

                        {item.examples && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">
                              Exemples :
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {item.examples.map((example, exampleIndex) => (
                                <li key={exampleIndex}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
