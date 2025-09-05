/**
 * Composant Correcteur Orthographique
 * Détecte et corrige les erreurs d'orthographe, de grammaire et de ponctuation
 */

import { useState, useCallback } from "react";
import {
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  BookOpen,
  Zap,
} from "lucide-react";

interface SpellError {
  word: string;
  suggestions: string[];
  type: "spelling" | "grammar" | "punctuation";
  context: string;
  position: { start: number; end: number };
}

interface CorrectionResult {
  originalText: string;
  correctedText: string;
  errors: SpellError[];
  statistics: {
    totalErrors: number;
    spellingErrors: number;
    grammarErrors: number;
    punctuationErrors: number;
  };
}

export default function SpellChecker() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  // Dictionnaire simplifié d'erreurs courantes en français
  const commonErrors: Record<string, string[]> = {
    // Erreurs d'orthographe courantes
    sa: ["ça", "sa"],
    ca: ["ça", "ca"],
    ou: ["où", "ou"],
    a: ["à", "a"],
    la: ["là", "la"],
    se: ["ce", "se"],
    ce: ["se", "ce"],
    ses: ["ces", "ses"],
    ces: ["ses", "ces"],
    leur: ["leurs", "leur"],
    leurs: ["leur", "leurs"],
    tout: ["tous", "tout"],
    tous: ["tout", "tous"],
    toute: ["toutes", "toute"],
    toutes: ["toute", "toutes"],
    dans: ["dans", "en"],
    en: ["dans", "en"],
    pour: ["pour", "par"],
    par: ["pour", "par"],

    // Erreurs de conjugaison
    fais: ["fais", "fait"],
    fait: ["fais", "fait"],
    peux: ["peux", "peut"],
    peut: ["peux", "peut"],
    vois: ["vois", "voit"],
    voit: ["vois", "voit"],
    vais: ["vais", "va"],
    vas: ["vas", "va"],
    va: ["vais", "vas", "va"],

    // Erreurs de ponctuation
    "...": ["…", "..."],
    "!?": ["?!", "!?"],
    "??": ["??", "?"],
    "!!": ["!!", "!"],
  };

  // Règles de grammaire basiques
  const grammarRules = [
    {
      pattern: /\b(je|tu|il|elle|on)\s+(?:vais|vas|va)\s+(?:de|du|des)\s+/gi,
      suggestion: "Vérifiez l'accord avec le sujet",
      type: "grammar" as const,
    },
    {
      pattern: /\b(?:les|des)\s+[a-zéèêëàâäôöùûüÿç]+s\s+(?:est|sont)\b/gi,
      suggestion: "Accord sujet-verbe : pluriel",
      type: "grammar" as const,
    },
    {
      pattern: /\b(?:un|une)\s+[a-zéèêëàâäôöùûüÿç]+s\b/gi,
      suggestion: "Article singulier avec nom pluriel",
      type: "grammar" as const,
    },
  ];

  const checkSpelling = useCallback((text: string): CorrectionResult => {
    const errors: SpellError[] = [];
    let correctedText = text;

    // Vérification des erreurs courantes - seulement les mots problématiques
    const problematicWords = [
      "sa",
      "ca",
      "ou",
      "a",
      "la",
      "se",
      "ce",
      "ses",
      "ces",
      "leur",
      "leurs",
      "tout",
      "tous",
      "toute",
      "toutes",
    ];

    problematicWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      let match;

      while ((match = regex.exec(text)) !== null) {
        const suggestions = commonErrors[word] || [];
        errors.push({
          word: match[0],
          suggestions,
          type: "spelling",
          context: text.substring(
            Math.max(0, match.index - 20),
            match.index + word.length + 20
          ),
          position: { start: match.index, end: match.index + word.length },
        });
      }
    });

    // Vérification des règles de grammaire
    grammarRules.forEach((rule) => {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          word: match[0],
          suggestions: [rule.suggestion],
          type: rule.type,
          context: text.substring(
            Math.max(0, match.index - 20),
            match.index + match[0].length + 20
          ),
          position: { start: match.index, end: match.index + match[0].length },
        });
      }
    });

    // Vérification de la ponctuation
    const punctuationErrors = [
      { pattern: /\.{3,}/g, suggestion: "…", type: "punctuation" as const },
      { pattern: /[!?]{2,}/g, suggestion: "!", type: "punctuation" as const },
      {
        pattern: /[.,;:!?]\s*[.,;:!?]/g,
        suggestion: "Ponctuation double",
        type: "punctuation" as const,
      },
    ];

    punctuationErrors.forEach((rule) => {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          word: match[0],
          suggestions: [rule.suggestion],
          type: rule.type,
          context: text.substring(
            Math.max(0, match.index - 20),
            match.index + match[0].length + 20
          ),
          position: { start: match.index, end: match.index + match[0].length },
        });
      }
    });

    // Statistiques
    const statistics = {
      totalErrors: errors.length,
      spellingErrors: errors.filter((e) => e.type === "spelling").length,
      grammarErrors: errors.filter((e) => e.type === "grammar").length,
      punctuationErrors: errors.filter((e) => e.type === "punctuation").length,
    };

    return {
      originalText: text,
      correctedText: text, // Pour l'instant, on ne corrige pas automatiquement
      errors,
      statistics,
    };
  }, []);

  const handleCheckSpelling = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulation d'un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = checkSpelling(inputText);
    setResult(result);
    setIsProcessing(false);
  };

  const applyCorrection = (error: SpellError, suggestion: string) => {
    if (!result) return;

    const newText =
      result.originalText.substring(0, error.position.start) +
      suggestion +
      result.originalText.substring(error.position.end);

    setInputText(newText);

    // Re-vérifier le texte corrigé
    const newResult = checkSpelling(newText);
    setResult(newResult);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-playfair mb-2">
          Correcteur Orthographique
        </h2>
        <p className="text-muted-foreground">
          Détecte et corrige les erreurs d'orthographe, de grammaire et de
          ponctuation
        </p>
      </div>

      {/* Sélection de langue */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Langue :</span>
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      {/* Zone de saisie */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Texte à vérifier
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tapez ou collez votre texte ici pour vérifier l'orthographe..."
            className="w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCheckSpelling}
            disabled={!inputText.trim() || isProcessing}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            {isProcessing ? "Vérification..." : "Vérifier l'orthographe"}
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
                {result.statistics.totalErrors}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">
                {result.statistics.spellingErrors}
              </div>
              <div className="text-sm text-muted-foreground">Orthographe</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {result.statistics.grammarErrors}
              </div>
              <div className="text-sm text-muted-foreground">Grammaire</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">
                {result.statistics.punctuationErrors}
              </div>
              <div className="text-sm text-muted-foreground">Ponctuation</div>
            </div>
          </div>

          {/* Liste des erreurs */}
          {result.errors.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Erreurs détectées :</h3>
              <div className="space-y-3">
                {result.errors.map((error, index) => (
                  <div key={index} className="bg-card border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {error.type === "spelling" && (
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        )}
                        {error.type === "grammar" && (
                          <AlertCircle className="w-5 h-5 text-blue-500" />
                        )}
                        {error.type === "punctuation" && (
                          <AlertCircle className="w-5 h-5 text-purple-500" />
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-red-600">
                            {error.word}
                          </span>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full">
                            {error.type === "spelling" && "Orthographe"}
                            {error.type === "grammar" && "Grammaire"}
                            {error.type === "punctuation" && "Ponctuation"}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Contexte :</span>{" "}
                          {error.context}
                        </div>

                        {error.suggestions.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-sm font-medium">
                              Suggestions :
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {error.suggestions.map(
                                (suggestion, suggestionIndex) => (
                                  <button
                                    key={suggestionIndex}
                                    onClick={() =>
                                      applyCorrection(error, suggestion)
                                    }
                                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Aucune erreur détectée !
              </h3>
              <p className="text-muted-foreground">
                Votre texte semble correct.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(inputText)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted"
            >
              <Copy className="w-4 h-4" />
              Copier le texte
            </button>

            <button
              onClick={() => downloadText(inputText, "texte-corrige.txt")}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
