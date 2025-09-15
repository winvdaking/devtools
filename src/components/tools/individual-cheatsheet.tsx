/**
 * Composant pour afficher un cheatsheet individuel
 * Affiche un cheatsheet spécifique basé sur son nom
 */

import React, { useState } from "react";
import { allCheatSheets } from "../../data/cheatsheets";
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
  Copy,
  Check,
} from "lucide-react";

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

interface IndividualCheatsheetProps {
  cheatsheetName: string;
}

export default function IndividualCheatsheet({
  cheatsheetName,
}: IndividualCheatsheetProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  // Trouver le cheatsheet correspondant
  const cheatsheet = allCheatSheets.find((cs) => cs.name === cheatsheetName);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set(prev).add(itemId));
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  if (!cheatsheet) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-kantumruy-pro mb-2">
            Cheatsheet non trouvé
          </h2>
          <p className="text-muted-foreground">
            Le cheatsheet "{cheatsheetName}" n'a pas été trouvé.
          </p>
        </div>
      </div>
    );
  }

  const icon = iconMap[cheatsheet.icon || "Code"] || (
    <Code className="w-5 h-5" />
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h2 className="text-2xl font-bold font-playfair">
            {cheatsheet.name}
          </h2>
        </div>
        <p className="text-muted-foreground">{cheatsheet.description}</p>
      </div>

      <div className="grid gap-6">
        {cheatsheet.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h4 className="text-lg font-semibold border-b pb-2">
              {section.title}
            </h4>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-card border rounded-lg p-4">
                  <h5 className="font-medium mb-2">{item.title}</h5>
                  <p className="text-muted-foreground mb-3">
                    {item.description}
                  </p>

                  {item.code && (
                    <div className="relative">
                      <div className="bg-muted rounded p-3 font-mono text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{item.code}</pre>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            item.code!,
                            `code-${sectionIndex}-${itemIndex}`
                          )
                        }
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 hover:bg-background border transition-colors"
                        title="Copier le code"
                      >
                        {copiedItems.has(
                          `code-${sectionIndex}-${itemIndex}`
                        ) ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}

                  {item.examples && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Exemples :</p>
                      <div className="space-y-2">
                        {item.examples.map((example, exampleIndex) => {
                          const exampleId = `example-${sectionIndex}-${itemIndex}-${exampleIndex}`;
                          return (
                            <div
                              key={exampleIndex}
                              className="flex items-center gap-2"
                            >
                              <div className="flex-1 bg-muted rounded p-2 font-mono text-xs">
                                {example}
                              </div>
                              <button
                                onClick={() =>
                                  copyToClipboard(example, exampleId)
                                }
                                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                                title="Copier l'exemple"
                              >
                                {copiedItems.has(exampleId) ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
