"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Type, Shuffle, Settings } from "lucide-react";

export function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(50);
  const [type, setType] = useState("lorem");
  const [startWithLorem, setStartWithLorem] = useState(true);

  // Base de données de textes Lorem Ipsum
  const textTypes = {
    lorem: {
      name: "Lorem Ipsum Classique",
      description: "Texte latin classique utilisé en typographie",
      words: [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
        "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
        "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
        "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
        "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
        "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
        "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
        "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
        "quas", "molestias", "excepturi", "sint", "obcaecati", "cupiditate", "non",
        "provident", "similique", "sunt", "in", "culpa", "qui", "officia", "deserunt",
        "mollitia", "animi", "id", "est", "laborum", "et", "dolorum", "fuga", "et",
        "harum", "quidem", "rerum", "facilis", "est", "et", "expedita", "distinctio"
      ]
    },
    bacon: {
      name: "Bacon Ipsum",
      description: "Texte généré avec des mots liés au bacon",
      words: [
        "bacon", "ipsum", "dolor", "amet", "pork", "belly", "ribs", "sausage",
        "ham", "hock", "shank", "beef", "chicken", "turkey", "meat", "steak",
        "roast", "grill", "smoke", "cook", "flavor", "juicy", "tender", "crispy",
        "delicious", "savory", "spicy", "sweet", "salty", "rich", "succulent",
        "mouthwatering", "appetizing", "tasty", "yummy", "scrumptious", "delectable",
        "flavorful", "aromatic", "seasoned", "marinated", "grilled", "roasted",
        "smoked", "fried", "braised", "stewed", "barbecue", "charcoal", "wood",
        "fire", "heat", "sizzle", "crackle", "pop", "bubble", "steam", "aroma",
        "fragrance", "scent", "bouquet", "essence", "taste", "palate", "tongue",
        "mouth", "lips", "teeth", "chew", "bite", "swallow", "digest", "enjoy",
        "savor", "relish", "devour", "consume", "feast", "dine", "eat", "drink"
      ]
    },
    hipster: {
      name: "Hipster Ipsum",
      description: "Texte avec des mots hipster et modernes",
      words: [
        "artisan", "craft", "bespoke", "vintage", "retro", "modern", "minimalist",
        "organic", "sustainable", "eco-friendly", "green", "natural", "handmade",
        "authentic", "unique", "original", "creative", "innovative", "trendy",
        "stylish", "fashionable", "chic", "elegant", "sophisticated", "refined",
        "polished", "curated", "selected", "premium", "luxury", "exclusive",
        "limited", "edition", "collector", "rare", "special", "extraordinary",
        "remarkable", "outstanding", "exceptional", "superior", "quality", "excellence",
        "perfection", "masterpiece", "work", "art", "design", "aesthetic", "beauty",
        "harmony", "balance", "proportion", "symmetry", "rhythm", "flow", "movement",
        "energy", "vibe", "atmosphere", "ambiance", "mood", "feeling", "emotion",
        "passion", "inspiration", "motivation", "drive", "ambition", "vision",
        "dream", "goal", "aspiration", "desire", "wish", "hope", "faith", "belief"
      ]
    },
    corporate: {
      name: "Corporate Ipsum",
      description: "Texte avec du jargon d'entreprise",
      words: [
        "synergy", "leverage", "paradigm", "strategy", "initiative", "solution",
        "framework", "methodology", "process", "workflow", "pipeline", "roadmap",
        "milestone", "deliverable", "outcome", "result", "impact", "value",
        "proposition", "benefit", "advantage", "competitive", "edge", "differentiator",
        "unique", "selling", "point", "market", "share", "growth", "expansion",
        "scalability", "efficiency", "productivity", "performance", "optimization",
        "improvement", "enhancement", "innovation", "transformation", "disruption",
        "revolution", "evolution", "progress", "advancement", "development",
        "implementation", "execution", "deployment", "rollout", "launch",
        "introduction", "presentation", "proposal", "recommendation", "suggestion",
        "insight", "analysis", "evaluation", "assessment", "review", "audit",
        "compliance", "governance", "management", "leadership", "direction",
        "guidance", "support", "assistance", "collaboration", "partnership"
      ]
    },
    tech: {
      name: "Tech Ipsum",
      description: "Texte avec des termes technologiques",
      words: [
        "algorithm", "data", "structure", "function", "variable", "parameter",
        "method", "class", "object", "instance", "property", "attribute",
        "interface", "implementation", "inheritance", "polymorphism", "encapsulation",
        "abstraction", "modularity", "scalability", "performance", "optimization",
        "efficiency", "reliability", "availability", "maintainability", "testability",
        "debugging", "testing", "validation", "verification", "quality", "assurance",
        "deployment", "integration", "configuration", "customization", "personalization",
        "automation", "orchestration", "containerization", "virtualization", "cloud",
        "infrastructure", "architecture", "design", "pattern", "framework", "library",
        "package", "module", "component", "service", "api", "endpoint", "request",
        "response", "protocol", "standard", "specification", "documentation",
        "repository", "version", "control", "branch", "merge", "commit", "push",
        "pull", "clone", "fork", "issue", "bug", "feature", "enhancement", "fix"
      ]
    }
  };

  // Fonction pour générer le texte Lorem Ipsum
  const generateLoremIpsum = (numParagraphs: number, numWords: number, textType: string, startWithLorem: boolean) => {
    const typeData = textTypes[textType as keyof typeof textTypes];
    if (!typeData) return "Type de texte non trouvé";

    const words = typeData.words;
    const paragraphs: string[] = [];

    for (let p = 0; p < numParagraphs; p++) {
      const paragraphWords: string[] = [];
      
      // Premier mot du premier paragraphe
      if (p === 0 && startWithLorem && textType === "lorem") {
        paragraphWords.push("Lorem");
        paragraphWords.push("ipsum");
      }
      
      // Générer les mots restants
      const wordsToGenerate = startWithLorem && p === 0 && textType === "lorem" 
        ? numWords - 2 
        : numWords;
      
      for (let w = 0; w < wordsToGenerate; w++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        paragraphWords.push(randomWord);
      }
      
      // Capitaliser le premier mot
      if (paragraphWords.length > 0) {
        paragraphWords[0] = paragraphWords[0].charAt(0).toUpperCase() + paragraphWords[0].slice(1);
      }
      
      // Ajouter la ponctuation
      const lastWord = paragraphWords[paragraphWords.length - 1];
      paragraphWords[paragraphWords.length - 1] = lastWord + ".";
      
      paragraphs.push(paragraphWords.join(" "));
    }

    return paragraphs.join("\n\n");
  };

  const generatedText = useMemo(() => 
    generateLoremIpsum(paragraphs, words, type, startWithLorem), 
    [paragraphs, words, type, startWithLorem]
  );

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerateText = () => {
    // Force la régénération en modifiant légèrement les paramètres
    setWords(prev => prev);
  };

  const quickPresets = [
    { name: "Court", paragraphs: 1, words: 20 },
    { name: "Moyen", paragraphs: 3, words: 50 },
    { name: "Long", paragraphs: 5, words: 100 },
    { name: "Très long", paragraphs: 10, words: 200 }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Générateur Lorem Ipsum
          </CardTitle>
          <CardDescription>
            Générez du texte de remplissage pour vos projets de design et développement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contrôles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de texte</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {Object.entries(textTypes).map(([key, typeData]) => (
                  <option key={key} value={key}>
                    {typeData.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Paragraphes</label>
              <Input
                type="number"
                value={paragraphs}
                onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mots par paragraphe</label>
              <Input
                type="number"
                value={words}
                onChange={(e) => setWords(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Options</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="startWithLorem"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="startWithLorem" className="text-sm">
                  Commencer par "Lorem ipsum"
                </label>
              </div>
            </div>
          </div>

          {/* Presets rapides */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Presets rapides</label>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setParagraphs(preset.paragraphs);
                    setWords(preset.words);
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={regenerateText}
              className="flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Régénérer
            </Button>
            <Button
              variant="default"
              onClick={() => copyToClipboard(generatedText)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier
            </Button>
            <Button
              variant="default"
              onClick={() => downloadFile(generatedText, 'lorem-ipsum.txt', 'text/plain')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>

          {/* Aperçu */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Aperçu</label>
              <div className="text-xs text-muted-foreground">
                {generatedText.split('\n\n').length} paragraphe(s) • {generatedText.split(' ').length} mot(s)
              </div>
            </div>
            <Textarea
              value={generatedText}
              readOnly
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Types de texte disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Textes classiques</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Lorem Ipsum</strong>: Texte latin traditionnel</li>
                <li>• <strong>Bacon Ipsum</strong>: Version avec mots liés au bacon</li>
                <li>• <strong>Hipster Ipsum</strong>: Vocabulaire hipster et moderne</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Textes spécialisés</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Corporate</strong>: Jargon d'entreprise</li>
                <li>• <strong>Tech</strong>: Terminologie technologique</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Utilisation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Prototypage de sites web</li>
                <li>• Tests de mise en page</li>
                <li>• Développement d'interfaces</li>
                <li>• Présentations et maquettes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Conseils</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez 1-3 paragraphes pour les tests</li>
                <li>• 50-100 mots par paragraphe est optimal</li>
                <li>• Régénérez pour varier le contenu</li>
                <li>• Parfait pour les wireframes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
