/**
 * Composant Reformulateur de Texte
 * Reformule le texte selon différents styles et niveaux de formalité
 */

import React, { useState, useCallback } from "react";
import {
  RefreshCw,
  Copy,
  Download,
  Sparkles,
  BookOpen,
  Target,
  Users,
  Briefcase,
  Heart,
} from "lucide-react";

interface ReformulationStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

interface ReformulationResult {
  originalText: string;
  reformulatedText: string;
  style: string;
  wordCount: {
    original: number;
    reformulated: number;
  };
  readability: {
    score: number;
    level: string;
  };
}

export default function TextReformulator() {
  const [inputText, setInputText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("formal");
  const [result, setResult] = useState<ReformulationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const reformulationStyles: ReformulationStyle[] = [
    {
      id: "formal",
      name: "Formel",
      description: "Langage soutenu et professionnel",
      icon: <Briefcase className="w-4 h-4" />,
      examples: [
        "Nous vous prions de bien vouloir...",
        "Il convient de noter que...",
        "En conséquence de ce qui précède...",
      ],
    },
    {
      id: "casual",
      name: "Décontracté",
      description: "Langage familier et amical",
      icon: <Heart className="w-4 h-4" />,
      examples: [
        "Salut ! Comment ça va ?",
        "C'est vraiment cool !",
        "Pas de souci, on s'en occupe !",
      ],
    },
    {
      id: "professional",
      name: "Professionnel",
      description: "Langage clair et efficace",
      icon: <Target className="w-4 h-4" />,
      examples: [
        "Notre objectif est de...",
        "Les résultats montrent que...",
        "Nous recommandons de...",
      ],
    },
    {
      id: "academic",
      name: "Académique",
      description: "Langage scientifique et précis",
      icon: <BookOpen className="w-4 h-4" />,
      examples: [
        "Cette étude démontre que...",
        "Les données indiquent une corrélation...",
        "Il est pertinent de souligner que...",
      ],
    },
    {
      id: "creative",
      name: "Créatif",
      description: "Langage expressif et imagé",
      icon: <Sparkles className="w-4 h-4" />,
      examples: [
        "Les mots dansent sur la page...",
        "Une symphonie d'idées...",
        "Comme une vague qui déferle...",
      ],
    },
    {
      id: "simple",
      name: "Simple",
      description: "Langage accessible et clair",
      icon: <Users className="w-4 h-4" />,
      examples: [
        "C'est facile à comprendre...",
        "Voici ce qu'il faut faire...",
        "Le résultat est simple...",
      ],
    },
  ];

  // Règles de reformulation par style
  const reformulationRules = {
    formal: {
      contractions: {
        "c'est": "ceci est",
        "n'est": "n'est pas",
        "d'un": "d'un",
      },
      vocabulary: {
        cool: "excellent",
        super: "remarquable",
        génial: "exceptionnel",
      },
      structure: "Utiliser des phrases complexes avec des connecteurs logiques",
    },
    casual: {
      contractions: {
        "ceci est": "c'est",
        "n'est pas": "n'est pas",
        "d'un": "d'un",
      },
      vocabulary: {
        excellent: "cool",
        remarquable: "super",
        exceptionnel: "génial",
      },
      structure: "Utiliser des phrases courtes et familières",
    },
    professional: {
      contractions: { "c'est": "c'est", "n'est": "n'est", "d'un": "d'un" },
      vocabulary: {
        cool: "efficace",
        super: "excellent",
        génial: "remarquable",
      },
      structure: "Utiliser des phrases claires et directes",
    },
    academic: {
      contractions: {
        "c'est": "ceci est",
        "n'est": "n'est pas",
        "d'un": "d'un",
      },
      vocabulary: {
        cool: "pertinent",
        super: "significatif",
        génial: "notable",
      },
      structure:
        "Utiliser des phrases complexes avec un vocabulaire spécialisé",
    },
    creative: {
      contractions: { "c'est": "c'est", "n'est": "n'est", "d'un": "d'un" },
      vocabulary: {
        cool: "fascinant",
        super: "merveilleux",
        génial: "extraordinaire",
      },
      structure: "Utiliser des métaphores et des expressions imagées",
    },
    simple: {
      contractions: { "c'est": "c'est", "n'est": "n'est", "d'un": "d'un" },
      vocabulary: { cool: "bien", super: "très bien", génial: "excellent" },
      structure: "Utiliser des phrases courtes et un vocabulaire simple",
    },
  };

  const reformulateText = useCallback(
    (text: string, style: string): ReformulationResult => {
      let reformulatedText = text;
      const rules =
        reformulationRules[style as keyof typeof reformulationRules];

      if (rules) {
        // Appliquer les règles de vocabulaire
        Object.entries(rules.vocabulary).forEach(([oldWord, newWord]) => {
          const regex = new RegExp(`\\b${oldWord}\\b`, "gi");
          reformulatedText = reformulatedText.replace(regex, newWord);
        });

        // Appliquer les règles de contractions
        Object.entries(rules.contractions).forEach(([oldWord, newWord]) => {
          const regex = new RegExp(`\\b${oldWord}\\b`, "gi");
          reformulatedText = reformulatedText.replace(regex, newWord);
        });

        // Appliquer des transformations spécifiques au style
        switch (style) {
          case "formal":
            reformulatedText = reformulatedText
              .replace(/\b(je|tu)\b/gi, "nous")
              .replace(/\b(mon|ma|mes)\b/gi, "notre")
              .replace(/\b(ce|cette)\b/gi, "ledit/la dite");
            break;

          case "casual":
            reformulatedText = reformulatedText
              .replace(/\b(nous)\b/gi, "on")
              .replace(/\b(notre)\b/gi, "notre")
              .replace(/\b(ledit|la dite)\b/gi, "ce/cette");
            break;

          case "academic":
            reformulatedText = reformulatedText
              .replace(/\b(je pense|je crois)\b/gi, "il semble que")
              .replace(/\b(beaucoup)\b/gi, "un nombre considérable de")
              .replace(/\b(important)\b/gi, "significatif");
            break;

          case "creative":
            reformulatedText = reformulatedText
              .replace(/\b(beau)\b/gi, "magnifique")
              .replace(/\b(grand)\b/gi, "majestueux")
              .replace(/\b(rapide)\b/gi, "fulgurant");
            break;

          case "simple":
            reformulatedText = reformulatedText
              .replace(/\b(considérable)\b/gi, "grand")
              .replace(/\b(significatif)\b/gi, "important")
              .replace(/\b(pertinent)\b/gi, "utile");
            break;
        }
      }

      // Calculer les statistiques
      const wordCount = {
        original: text.split(/\s+/).filter((word) => word.length > 0).length,
        reformulated: reformulatedText
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
      };

      // Calculer la lisibilité (formule simplifiée)
      const avgWordLength =
        reformulatedText
          .split(/\s+/)
          .reduce((acc, word) => acc + word.length, 0) / wordCount.reformulated;
      const readabilityScore = Math.max(0, 100 - avgWordLength * 5);

      let readabilityLevel = "Facile";
      if (readabilityScore < 30) readabilityLevel = "Difficile";
      else if (readabilityScore < 60) readabilityLevel = "Moyen";

      return {
        originalText: text,
        reformulatedText,
        style,
        wordCount,
        readability: {
          score: Math.round(readabilityScore),
          level: readabilityLevel,
        },
      };
    },
    []
  );

  const handleReformulate = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulation d'un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = reformulateText(inputText, selectedStyle);
    setResult(result);
    setIsProcessing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInputText("");
    setResult(null);
  };

  const getStyleIcon = (styleId: string) => {
    return (
      reformulationStyles.find((s) => s.id === styleId)?.icon || (
        <Target className="w-4 h-4" />
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-playfair mb-2">
          Reformulateur de Texte
        </h2>
        <p className="text-muted-foreground">
          Reformule votre texte selon différents styles et niveaux de formalité
        </p>
      </div>

      {/* Sélection du style */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Style de reformulation :
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {reformulationStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedStyle === style.id
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {style.icon}
                <span className="font-medium">{style.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {style.description}
              </p>
              <div className="text-xs">{style.examples[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Texte à reformuler
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tapez ou collez votre texte ici pour le reformuler..."
            className="w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReformulate}
            disabled={!inputText.trim() || isProcessing}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`}
            />
            {isProcessing ? "Reformulation..." : "Reformuler le texte"}
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 border rounded-lg hover:bg-muted"
          >
            Effacer
          </button>
        </div>
      </div>

      {/* Résultats */}
      {result && (
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {result.wordCount.original}
              </div>
              <div className="text-sm text-muted-foreground">
                Mots originaux
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {result.wordCount.reformulated}
              </div>
              <div className="text-sm text-muted-foreground">
                Mots reformulés
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {result.readability.score}
              </div>
              <div className="text-sm text-muted-foreground">Lisibilité</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">
                {result.readability.level}
              </div>
              <div className="text-sm text-muted-foreground">Niveau</div>
            </div>
          </div>

          {/* Texte reformulé */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getStyleIcon(result.style)}
              <h3 className="text-lg font-semibold">
                Texte reformulé (
                {reformulationStyles.find((s) => s.id === result.style)?.name})
              </h3>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="whitespace-pre-wrap">
                {result.reformulatedText}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(result.reformulatedText)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted"
              >
                <Copy className="w-4 h-4" />
                Copier le texte reformulé
              </button>

              <button
                onClick={() =>
                  downloadText(result.reformulatedText, "texte-reformule.txt")
                }
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          </div>

          {/* Comparaison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Texte original</h4>
              <div className="bg-muted rounded-lg p-3 text-sm">
                <div className="whitespace-pre-wrap">{result.originalText}</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Texte reformulé</h4>
              <div className="bg-muted rounded-lg p-3 text-sm">
                <div className="whitespace-pre-wrap">
                  {result.reformulatedText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
