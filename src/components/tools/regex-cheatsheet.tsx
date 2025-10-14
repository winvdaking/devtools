/**
 * Aide-mémoire des expressions régulières
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Copy, Check, Search, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/v1/winv";

interface RegexPattern {
  name: string;
  pattern: string;
  description: string;
  examples: string[];
  category: string;
  flags?: string;
}

export function RegexCheatsheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const regexPatterns: RegexPattern[] = [
    // Métacaractères de base
    {
      name: "Point (.)",
      pattern: ".",
      description:
        "Correspond à n'importe quel caractère sauf le retour à la ligne",
      examples: ["a.c", "a.c", "a.c"],
      category: "Métacaractères",
    },
    {
      name: "Caret (^)",
      pattern: "^",
      description: "Début de ligne ou de chaîne",
      examples: ["^abc", "abc", "def"],
      category: "Métacaractères",
    },
    {
      name: "Dollar ($)",
      pattern: "$",
      description: "Fin de ligne ou de chaîne",
      examples: ["abc$", "abc", "def"],
      category: "Métacaractères",
    },
    {
      name: "Asterisk (*)",
      pattern: "*",
      description: "0 ou plusieurs occurrences du caractère précédent",
      examples: ["a*", "", "a", "aa", "aaa"],
      category: "Métacaractères",
    },
    {
      name: "Plus (+)",
      pattern: "+",
      description: "1 ou plusieurs occurrences du caractère précédent",
      examples: ["a+", "a", "aa", "aaa"],
      category: "Métacaractères",
    },
    {
      name: "Question (?)",
      pattern: "?",
      description: "0 ou 1 occurrence du caractère précédent",
      examples: ["a?", "", "a"],
      category: "Métacaractères",
    },
    {
      name: "Backslash (\\)",
      pattern: "\\",
      description: "Échappe le caractère suivant",
      examples: ["\\.", ".", "a.b"],
      category: "Métacaractères",
    },
    {
      name: "Pipe (|)",
      pattern: "|",
      description: "Alternative (OU logique)",
      examples: ["a|b", "a", "b"],
      category: "Métacaractères",
    },

    // Classes de caractères
    {
      name: "Classe de caractères",
      pattern: "[abc]",
      description: "Un des caractères entre crochets",
      examples: ["[abc]", "a", "b", "c"],
      category: "Classes de caractères",
    },
    {
      name: "Classe négative",
      pattern: "[^abc]",
      description: "Tout sauf les caractères entre crochets",
      examples: ["[^abc]", "d", "e", "f"],
      category: "Classes de caractères",
    },
    {
      name: "Plage de caractères",
      pattern: "[a-z]",
      description: "Caractères de a à z (minuscules)",
      examples: ["[a-z]", "a", "m", "z"],
      category: "Classes de caractères",
    },
    {
      name: "Chiffres",
      pattern: "[0-9]",
      description: "Chiffres de 0 à 9",
      examples: ["[0-9]", "0", "5", "9"],
      category: "Classes de caractères",
    },
    {
      name: "Caractères spéciaux",
      pattern: "[\\w\\s]",
      description: "Caractères de mot et espaces",
      examples: ["[\\w\\s]", "a", " ", "1"],
      category: "Classes de caractères",
    },

    // Classes prédéfinies
    {
      name: "\\w",
      pattern: "\\w",
      description: "Caractère de mot (lettre, chiffre, underscore)",
      examples: ["\\w", "a", "1", "_"],
      category: "Classes prédéfinies",
    },
    {
      name: "\\W",
      pattern: "\\W",
      description: "Tout sauf caractère de mot",
      examples: ["\\W", " ", ".", "!"],
      category: "Classes prédéfinies",
    },
    {
      name: "\\d",
      pattern: "\\d",
      description: "Chiffre (équivalent à [0-9])",
      examples: ["\\d", "0", "5", "9"],
      category: "Classes prédéfinies",
    },
    {
      name: "\\D",
      pattern: "\\D",
      description: "Tout sauf chiffre (équivalent à [^0-9])",
      examples: ["\\D", "a", " ", "!"],
      category: "Classes prédéfinies",
    },
    {
      name: "\\s",
      pattern: "\\s",
      description: "Caractère d'espacement (espace, tab, retour à la ligne)",
      examples: ["\\s", " ", "\\t", "\\n"],
      category: "Classes prédéfinies",
    },
    {
      name: "\\S",
      pattern: "\\S",
      description: "Tout sauf caractère d'espacement",
      examples: ["\\S", "a", "1", "!"],
      category: "Classes prédéfinies",
    },

    // Quantificateurs
    {
      name: "Quantificateur exact",
      pattern: "{n}",
      description: "Exactement n occurrences",
      examples: ["a{3}", "aaa"],
      category: "Quantificateurs",
    },
    {
      name: "Quantificateur min",
      pattern: "{n,}",
      description: "Au moins n occurrences",
      examples: ["a{2,}", "aa", "aaa", "aaaa"],
      category: "Quantificateurs",
    },
    {
      name: "Quantificateur plage",
      pattern: "{n,m}",
      description: "Entre n et m occurrences",
      examples: ["a{2,4}", "aa", "aaa", "aaaa"],
      category: "Quantificateurs",
    },
    {
      name: "Quantificateur non-greedy",
      pattern: "*?",
      description: "0 ou plusieurs occurrences (non-greedy)",
      examples: ["a*?", "", "a"],
      category: "Quantificateurs",
    },
    {
      name: "Quantificateur non-greedy",
      pattern: "+?",
      description: "1 ou plusieurs occurrences (non-greedy)",
      examples: ["a+?", "a"],
      category: "Quantificateurs",
    },

    // Groupes et références
    {
      name: "Groupe capturant",
      pattern: "(abc)",
      description: "Groupe capturant (accessible via $1, $2, etc.)",
      examples: ["(abc)", "abc"],
      category: "Groupes et références",
    },
    {
      name: "Groupe non-capturant",
      pattern: "(?:abc)",
      description: "Groupe non-capturant (pas accessible via $1, $2, etc.)",
      examples: ["(?:abc)", "abc"],
      category: "Groupes et références",
    },
    {
      name: "Référence arrière",
      pattern: "\\1",
      description: "Référence au premier groupe capturant",
      examples: ["(a)\\1", "aa"],
      category: "Groupes et références",
    },
    {
      name: "Assertion positive",
      pattern: "(?=abc)",
      description: "Assertion positive (doit être suivie de abc)",
      examples: ["a(?=b)", "a dans 'ab'"],
      category: "Groupes et références",
    },
    {
      name: "Assertion négative",
      pattern: "(?!abc)",
      description: "Assertion négative (ne doit pas être suivie de abc)",
      examples: ["a(?!b)", "a dans 'ac'"],
      category: "Groupes et références",
    },

    // Flags
    {
      name: "Global (g)",
      pattern: "/regex/g",
      description: "Recherche globale (toutes les correspondances)",
      examples: ["/a/g", "a dans 'aaa'"],
      category: "Flags",
      flags: "g",
    },
    {
      name: "Ignore Case (i)",
      pattern: "/regex/i",
      description: "Ignore la casse",
      examples: ["/a/i", "a", "A"],
      category: "Flags",
      flags: "i",
    },
    {
      name: "Multiline (m)",
      pattern: "/regex/m",
      description: "Traite chaque ligne séparément",
      examples: ["/^a/m", "a au début de chaque ligne"],
      category: "Flags",
      flags: "m",
    },
    {
      name: "Unicode (u)",
      pattern: "/regex/u",
      description: "Support Unicode complet",
      examples: ["/\\u{1F600}/u", "😀"],
      category: "Flags",
      flags: "u",
    },
    {
      name: "Sticky (y)",
      pattern: "/regex/y",
      description: "Recherche sticky (commence à lastIndex)",
      examples: ["/a/y", "a à la position spécifiée"],
      category: "Flags",
      flags: "y",
    },
    {
      name: "Dot All (s)",
      pattern: "/regex/s",
      description: "Le point correspond aussi aux retours à la ligne",
      examples: ["/a.b/s", "a\\nb"],
      category: "Flags",
      flags: "s",
    },
  ];

  const commonPatterns = [
    {
      name: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      description: "Validation d'adresse email",
      usage: "Validation de formulaires, nettoyage de données",
    },
    {
      name: "URL",
      pattern: "https?://[^\\s]+",
      description: "Détection d'URLs HTTP/HTTPS",
      usage: "Extraction d'URLs, validation de liens",
    },
    {
      name: "Date (YYYY-MM-DD)",
      pattern: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
      description: "Format de date ISO",
      usage: "Validation de dates, parsing de fichiers",
    },
    {
      name: "Téléphone français",
      pattern: "(?:0[1-9]|\\+33[1-9])(?:[0-9]{8})",
      description: "Numéro de téléphone français",
      usage: "Validation de formulaires, nettoyage de données",
    },
    {
      name: "Code postal",
      pattern: "^[0-9]{5}$",
      description: "Code postal français (5 chiffres)",
      usage: "Validation d'adresses, géolocalisation",
    },
    {
      name: "IPv4",
      pattern:
        "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      description: "Adresse IPv4",
      usage: "Validation d'adresses réseau, sécurité",
    },
    {
      name: "Mot de passe fort",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      description:
        "Mot de passe avec majuscule, minuscule, chiffre et caractère spécial",
      usage: "Validation de sécurité, formulaires d'inscription",
    },
    {
      name: "Nom de fichier",
      pattern: "^[a-zA-Z0-9._-]+$",
      description:
        "Nom de fichier valide (lettres, chiffres, points, tirets, underscores)",
      usage: "Validation de noms de fichiers, sécurité",
    },
  ];

  const filteredPatterns = regexPatterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(
    new Set(regexPatterns.map((p) => p.category))
  ).sort();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getPatternsByCategory = (category: string) => {
    return filteredPatterns.filter((p) => p.category === category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Regex Cheatsheet</h2>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un pattern regex..."
              className="pl-10"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredPatterns.length} patterns trouvés sur{" "}
            {regexPatterns.length}
          </div>
        </CardContent>
      </Card>

      {/* Patterns communs */}
      <Card>
        <CardHeader>
          <CardTitle>Patterns communs</CardTitle>
          <CardDescription>
            Expressions régulières fréquemment utilisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonPatterns.map((pattern) => (
              <div
                key={pattern.name}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{pattern.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pattern.description}
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(pattern.pattern, `common-${pattern.name}`)
                    }
                  >
                    {copied === `common-${pattern.name}` ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-muted p-2 rounded break-all">
                  {pattern.pattern}
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Usage:</strong> {pattern.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patterns par catégorie */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryPatterns = getPatternsByCategory(category);
          if (categoryPatterns.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {categoryPatterns.length} pattern
                    {categoryPatterns.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPatterns.map((pattern, index) => (
                    <div
                      key={`${pattern.name}-${index}`}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{pattern.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pattern.description}
                          </p>
                          {pattern.flags && (
                            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                              Flags: {pattern.flags}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              pattern.pattern,
                              `${pattern.name}-${index}`
                            )
                          }
                        >
                          {copied === `${pattern.name}-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="font-mono text-sm bg-muted p-2 rounded">
                        {pattern.pattern}
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">
                          Exemples:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pattern.examples.map((example, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-background border px-2 py-1 rounded"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ressources utiles */}
      <Card>
        <CardHeader>
          <CardTitle>Ressources utiles</CardTitle>
          <CardDescription>
            Liens et outils pour approfondir vos connaissances en regex
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Outils en ligne</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Regex101 - Testeur et débogueur</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>RegexPal - Testeur simple</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>RegExr - Apprentissage interactif</span>
                </li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>MDN Web Docs - Guide complet</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Regular-Expressions.info</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Regex Tutorial - Apprentissage pas à pas</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conseils d'utilisation */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Conseils d'utilisation
              </p>
              <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                <li>• Testez toujours vos regex sur des exemples réels</li>
                <li>• Utilisez des outils en ligne pour déboguer</li>
                <li>• Pensez aux cas limites et aux caractères spéciaux</li>
                <li>• Documentez vos patterns complexes</li>
                <li>
                  • Évitez les regex trop complexes - divisez-les si nécessaire
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <BookOpen className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Aide-mémoire Regex
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Référence complète des expressions régulières avec exemples
                pratiques, patterns communs et conseils d'utilisation. Parfait
                pour les développeurs qui travaillent avec la validation de
                données et la manipulation de texte.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
