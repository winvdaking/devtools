/**
 * Outil de génération de slugs
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hash, Copy, Check } from "lucide-react";
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

export function SlugifyString() {
  const [inputText, setInputText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeAccents, setRemoveAccents] = useState(true);
  const [maxLength, setMaxLength] = useState("");
  const [slugs, setSlugs] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState<string | null>(null);

  // Fonction pour supprimer les accents
  const removeAccentsFromText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Fonction de base pour créer un slug
  const createSlug = (
    text: string,
    options: {
      separator: string;
      lowercase: boolean;
      removeAccents: boolean;
      maxLength?: number;
    }
  ): string => {
    let result = text;

    // Supprimer les accents si demandé
    if (options.removeAccents) {
      result = removeAccentsFromText(result);
    }

    // Convertir en minuscules si demandé
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Remplacer les espaces et caractères spéciaux par le séparateur
    result = result
      .replace(/[^a-zA-Z0-9\s]/g, "") // Supprimer les caractères spéciaux
      .replace(/\s+/g, options.separator) // Remplacer les espaces par le séparateur
      .replace(new RegExp(`\\${options.separator}+`, "g"), options.separator) // Éviter les séparateurs multiples
      .replace(
        new RegExp(`^\\${options.separator}|\\${options.separator}$`, "g"),
        ""
      ); // Supprimer les séparateurs en début/fin

    // Limiter la longueur si spécifié
    if (options.maxLength && result.length > options.maxLength) {
      result = result.substring(0, options.maxLength);
      // S'assurer qu'on ne coupe pas au milieu d'un mot
      const lastSeparator = result.lastIndexOf(options.separator);
      if (lastSeparator > result.length * 0.8) {
        result = result.substring(0, lastSeparator);
      }
    }

    return result;
  };

  // Différentes variantes de slugs
  const generateSlugs = () => {
    if (!inputText.trim()) {
      setSlugs({});
      return;
    }

    const maxLen = maxLength ? parseInt(maxLength) : undefined;
    const baseOptions = {
      separator,
      lowercase,
      removeAccents,
      maxLength: maxLen,
    };

    const variants = {
      default: createSlug(inputText, baseOptions),
      hyphen: createSlug(inputText, { ...baseOptions, separator: "-" }),
      underscore: createSlug(inputText, { ...baseOptions, separator: "_" }),
      dot: createSlug(inputText, { ...baseOptions, separator: "." }),
      camelCase: inputText
        .split(/\s+/)
        .map((word, index) => {
          const cleanWord = removeAccents ? removeAccentsFromText(word) : word;
          const processedWord = cleanWord.replace(/[^a-zA-Z0-9]/g, "");
          return index === 0
            ? processedWord.toLowerCase()
            : processedWord.charAt(0).toUpperCase() +
                processedWord.slice(1).toLowerCase();
        })
        .join(""),
      pascalCase: inputText
        .split(/\s+/)
        .map((word) => {
          const cleanWord = removeAccents ? removeAccentsFromText(word) : word;
          const processedWord = cleanWord.replace(/[^a-zA-Z0-9]/g, "");
          return (
            processedWord.charAt(0).toUpperCase() +
            processedWord.slice(1).toLowerCase()
          );
        })
        .join(""),
      filename: createSlug(inputText, {
        ...baseOptions,
        separator: "_",
        lowercase: true,
      }).replace(/[^a-zA-Z0-9_]/g, ""),
    };

    setSlugs(variants);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    setInputText("Créer un Article de Blog Génial avec des Accents ! 2024");
  };

  React.useEffect(() => {
    generateSlugs();
  }, [inputText, separator, lowercase, removeAccents, maxLength]);

  const slugVariants = [
    {
      key: "default",
      name: "Slug personnalisé",
      description: "Avec vos paramètres",
    },
    {
      key: "hyphen",
      name: "Slug avec tirets",
      description: "Format standard web",
    },
    {
      key: "underscore",
      name: "Slug avec underscores",
      description: "Format base de données",
    },
    { key: "dot", name: "Slug avec points", description: "Format alternatif" },
    { key: "camelCase", name: "camelCase", description: "Format JavaScript" },
    {
      key: "pascalCase",
      name: "PascalCase",
      description: "Format classe/composant",
    },
    {
      key: "filename",
      name: "Nom de fichier",
      description: "Format système de fichiers",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Hash className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Slugify string</h2>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Texte à convertir</CardTitle>
          <CardDescription>
            Saisissez le texte à transformer en slug
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Mon Titre d'Article Génial avec des Accents !"
            className="min-h-[100px]"
          />

          <div className="flex justify-between items-center">
            <Button onClick={loadSample} variant="outline" size="sm">
              Texte d'exemple
            </Button>
            <span className="text-sm text-muted-foreground">
              {inputText.length} caractères
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardHeader>
          <CardTitle>Options de génération</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Séparateur</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="-">Tiret (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Point (.)</option>
                <option value="">Aucun</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Longueur max</label>
              <Input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                placeholder="Illimitée"
                min="1"
                max="200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Minuscules</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={removeAccents}
                  onChange={(e) => setRemoveAccents(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Supprimer accents</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {inputText && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Variantes générées</h3>

          <div className="grid grid-cols-1 gap-4">
            {slugVariants.map((variant) => {
              const slug = slugs[variant.key];
              return slug ? (
                <Card key={variant.key}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">
                            {variant.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {variant.description}
                          </span>
                        </div>
                        <div className="font-mono text-sm bg-muted p-2 rounded break-all">
                          {slug}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {slug.length} caractères
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(slug, variant.key)}
                        className="ml-4 flex-shrink-0"
                      >
                        {copied === variant.key ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </div>
        </div>
      )}

      <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Hash className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                À propos des slugs
              </p>
              <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                Les slugs sont des identifiants lisibles utilisés dans les URLs,
                noms de fichiers, et bases de données. Ils ne contiennent que
                des caractères alphanumériques et des séparateurs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
