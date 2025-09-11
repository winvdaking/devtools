/**
 * Testeur d'expressions régulières
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, FileText, RefreshCw, AlertCircle, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
  fullMatch: string;
}

export function RegexTester() {
  const [regex, setRegex] = useState("");
  const [testText, setTestText] = useState("");
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    unicode: false,
    sticky: false,
    dotAll: false
  });
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const sampleRegexes = [
    {
      name: "Email",
      regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      description: "Validation d'adresse email"
    },
    {
      name: "URL",
      regex: "https?://[^\\s]+",
      description: "Détection d'URLs HTTP/HTTPS"
    },
    {
      name: "Date (YYYY-MM-DD)",
      regex: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
      description: "Format de date ISO"
    },
    {
      name: "Téléphone français",
      regex: "(?:0[1-9]|\\+33[1-9])(?:[0-9]{8})",
      description: "Numéro de téléphone français"
    },
    {
      name: "Code postal",
      regex: "^[0-9]{5}$",
      description: "Code postal français (5 chiffres)"
    },
    {
      name: "IPv4",
      regex: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      description: "Adresse IPv4"
    }
  ];

  const sampleTexts = [
    {
      name: "Emails",
      text: "john.doe@example.com\njane.smith@gmail.com\ninvalid-email\nadmin@company.org"
    },
    {
      name: "URLs",
      text: "https://example.com\nhttp://test.org\nftp://files.com\nnot-a-url"
    },
    {
      name: "Dates",
      text: "2024-01-15\n2024-13-45\n2023-12-31\ninvalid-date"
    },
    {
      name: "Téléphones",
      text: "0123456789\n+33123456789\n123456789\ninvalid-phone"
    }
  ];

  const validateRegex = (regexString: string): boolean => {
    try {
      new RegExp(regexString);
      return true;
    } catch {
      return false;
    }
  };

  const getFlagsString = (): string => {
    const flagMap = {
      global: 'g',
      ignoreCase: 'i',
      multiline: 'm',
      unicode: 'u',
      sticky: 'y',
      dotAll: 's'
    };

    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => flagMap[key as keyof typeof flags])
      .join('');
  };

  const testRegex = () => {
    if (!regex.trim()) {
      setError("Veuillez entrer une expression régulière");
      return;
    }

    if (!testText.trim()) {
      setError("Veuillez entrer du texte à tester");
      return;
    }

    try {
      setError("");

      // Valider la regex
      if (!validateRegex(regex)) {
        setIsValid(false);
        setError("Expression régulière invalide");
        return;
      }

      setIsValid(true);

      // Créer l'objet RegExp avec les flags
      const flagsString = getFlagsString();
      const regexObj = new RegExp(regex, flagsString);

      // Tester la regex
      const newMatches: RegexMatch[] = [];
      let match;

      if (flags.global) {
        // Recherche globale
        while ((match = regexObj.exec(testText)) !== null) {
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            fullMatch: match[0]
          });

          // Éviter les boucles infinies si la regex ne progresse pas
          if (match.index === regexObj.lastIndex) {
            regexObj.lastIndex++;
          }
        }
      } else {
        // Recherche unique
        match = regexObj.exec(testText);
        if (match) {
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            fullMatch: match[0]
          });
        }
      }

      setMatches(newMatches);
    } catch (err) {
      setError(`Erreur lors du test: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  const highlightMatches = (text: string, matches: RegexMatch[]): string => {
    if (matches.length === 0) return text;

    let highlightedText = text;
    let offset = 0;

    // Trier les matches par index décroissant pour éviter les problèmes d'offset
    const sortedMatches = [...matches].sort((a, b) => b.index - a.index);

    for (const match of sortedMatches) {
      const before = highlightedText.substring(0, match.index + offset);
      const matched = highlightedText.substring(match.index + offset, match.index + offset + match.match.length);
      const after = highlightedText.substring(match.index + offset + match.match.length);

      highlightedText = before + `<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">${matched}</mark>` + after;
      offset += 45; // Longueur approximative du HTML ajouté
    }

    return highlightedText;
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSampleRegex = (sample: typeof sampleRegexes[0]) => {
    setRegex(sample.regex);
    setError("");
    setMatches([]);
  };

  const loadSampleText = (sample: typeof sampleTexts[0]) => {
    setTestText(sample.text);
    setError("");
    setMatches([]);
  };

  const clearAll = () => {
    setRegex("");
    setTestText("");
    setMatches([]);
    setError("");
  };

  const getRegexInfo = () => {
    if (!regex.trim() || !isValid) return null;

    try {
      const regexObj = new RegExp(regex);
      const source = regexObj.source;
      const flagsString = getFlagsString();

      return {
        source,
        flags: flagsString,
        length: source.length,
        hasAnchors: /^[\^$]/.test(source) || /[\^$]$/.test(source),
        hasQuantifiers: /[*+?{}]/.test(source),
        hasGroups: /[()]/.test(source),
        hasCharacterClasses: /[\[\]]/.test(source),
        hasEscapes: /\\[^\\]/.test(source)
      };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (regex.trim() && testText.trim()) {
      testRegex();
    }
  }, [regex, testText, flags]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Search className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Regex Tester</h2>
      </div>

      {/* Exemples d'expressions régulières */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples d'expressions régulières</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleRegexes.map((sample) => (
              <Button
                key={sample.name}
                variant="outline"
                size="sm"
                onClick={() => loadSampleRegex(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{sample.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {sample.regex}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sample.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exemples de texte */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples de texte</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleTexts.map((sample) => (
              <Button
                key={sample.name}
                variant="outline"
                size="sm"
                onClick={() => loadSampleText(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{sample.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {sample.text.split('\n')[0]}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration des flags */}
      <Card>
        <CardHeader>
          <CardTitle>Options de regex</CardTitle>
          <CardDescription>
            Configurez les flags de l'expression régulière
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.global}
                onChange={(e) => setFlags(prev => ({ ...prev, global: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Global (g)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.ignoreCase}
                onChange={(e) => setFlags(prev => ({ ...prev, ignoreCase: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Ignore Case (i)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.multiline}
                onChange={(e) => setFlags(prev => ({ ...prev, multiline: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Multiline (m)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.unicode}
                onChange={(e) => setFlags(prev => ({ ...prev, unicode: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Unicode (u)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.sticky}
                onChange={(e) => setFlags(prev => ({ ...prev, sticky: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Sticky (y)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.dotAll}
                onChange={(e) => setFlags(prev => ({ ...prev, dotAll: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Dot All (s)</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Expression régulière */}
      <Card>
        <CardHeader>
          <CardTitle>Expression régulière</CardTitle>
          <CardDescription>
            Entrez votre expression régulière ici
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              placeholder="/^[a-z]+$/"
              className={`font-mono ${!isValid ? 'border-red-500' : ''}`}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Flags: {getFlagsString() || 'aucun'}
              </div>
              {!isValid && (
                <div className="text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Expression invalide</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Texte à tester */}
      <Card>
        <CardHeader>
          <CardTitle>Texte à tester</CardTitle>
          <CardDescription>
            Entrez le texte sur lequel tester votre regex
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            className="min-h-[150px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={testRegex} className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Tester
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Erreur */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="text-red-800 dark:text-red-200">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Résultats */}
      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Résultats</CardTitle>
                <CardDescription>
                  {matches.length} correspondance{matches.length > 1 ? 's' : ''} trouvée{matches.length > 1 ? 's' : ''}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(matches.map(m => m.match).join('\n'), "matches")}
              >
                {copied === "matches" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier toutes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Texte avec surlignage */}
              <div>
                <h4 className="font-medium mb-2">Texte avec correspondances surlignées :</h4>
                <div
                  className="p-3 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightMatches(testText, matches) }}
                />
              </div>

              {/* Liste des correspondances */}
              <div>
                <h4 className="font-medium mb-2">Détail des correspondances :</h4>
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            Correspondance {index + 1} à la position {match.index}
                          </div>
                          <div className="text-sm font-mono mt-1">
                            "{match.match}"
                          </div>
                          {match.groups.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Groupes: {match.groups.map((group, i) => `$${i + 1}="${group}"`).join(', ')}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(match.match, `match-${index}`)}
                        >
                          {copied === `match-${index}` ? (
                            <Check className="h-4 w-4 mr-2" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          Copier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Aucune correspondance */}
      {regex.trim() && testText.trim() && matches.length === 0 && isValid && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardContent className="pt-6">
            <div className="text-orange-800 dark:text-orange-200">
              Aucune correspondance trouvée avec cette expression régulière.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations sur la regex */}
      {(() => {
        const info = getRegexInfo();
        if (!info) return null;

        return (
          <Card>
            <CardHeader>
              <CardTitle>Informations sur la regex</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">
                    {info.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Caractères</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">
                    {info.flags.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Flags</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">
                    {info.hasGroups ? 'Oui' : 'Non'}
                  </div>
                  <div className="text-xs text-muted-foreground">Groupes</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">
                    {info.hasQuantifiers ? 'Oui' : 'Non'}
                  </div>
                  <div className="text-xs text-muted-foreground">Quantificateurs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Search className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Testeur d'expressions régulières
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Testez vos expressions régulières en temps réel avec validation automatique,
                surlignage des correspondances et configuration des flags. Parfait pour
                développer et déboguer des patterns regex complexes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
