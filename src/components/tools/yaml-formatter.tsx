/**
 * Formateur et prettifier YAML
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Copy,
  Check,
  FileCode,
  Minus,
  Zap,
  AlertCircle,
} from "lucide-react";
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

export function YamlFormatter() {
  const [inputYaml, setInputYaml] = useState("");
  const [formattedYaml, setFormattedYaml] = useState("");
  const [minifiedYaml, setMinifiedYaml] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const sampleYamls = [
    {
      name: "Configuration simple",
      yaml: 'app:\n  name: "Mon App"\n  version: "1.0.0"\n  debug: true\n  port: 3000',
    },
    {
      name: "Docker Compose",
      yaml: 'version: "3.8"\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    volumes:\n      - ./html:/usr/share/nginx/html\n  db:\n    image: postgres:13\n    environment:\n      POSTGRES_DB: mydb\n      POSTGRES_PASSWORD: secret',
    },
    {
      name: "Kubernetes Deployment",
      yaml: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  labels:\n    app: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80",
    },
    {
      name: "GitHub Actions",
      yaml: 'name: CI/CD\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v2\n    - name: Setup Node.js\n      uses: actions/setup-node@v2\n      with:\n        node-version: "16"\n    - name: Install dependencies\n      run: npm ci\n    - name: Run tests\n      run: npm test',
    },
  ];

  const validateYaml = (yaml: string): string[] => {
    const errors: string[] = [];

    try {
      const lines = yaml.split("\n");
      let lineNumber = 0;

      for (const line of lines) {
        lineNumber++;
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith("#")) continue;

        // Vérifier l'indentation
        if (
          trimmedLine.startsWith("-") ||
          /^[a-zA-Z_][a-zA-Z0-9_]*\s*:/.test(trimmedLine)
        ) {
          const leadingSpaces = line.length - line.trimStart().length;
          if (leadingSpaces % indentSize !== 0) {
            errors.push(
              `Ligne ${lineNumber}: Indentation incorrecte (doit être multiple de ${indentSize})`
            );
          }
        }

        // Vérifier la syntaxe des listes
        if (trimmedLine.startsWith("-")) {
          if (trimmedLine === "-") {
            errors.push(`Ligne ${lineNumber}: Élément de liste vide`);
          }
        }

        // Vérifier la syntaxe des clés-valeurs
        if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*:/.test(trimmedLine)) {
          if (!trimmedLine.includes(":")) {
            errors.push(`Ligne ${lineNumber}: Clé sans valeur`);
          }
        }

        // Vérifier les guillemets
        if (trimmedLine.includes('"') || trimmedLine.includes("'")) {
          const quoteCount = (trimmedLine.match(/"/g) || []).length;
          if (quoteCount % 2 !== 0) {
            errors.push(`Ligne ${lineNumber}: Guillemets non fermés`);
          }
        }
      }
    } catch (err) {
      errors.push("Erreur lors de la validation YAML");
    }

    return errors;
  };

  const formatYaml = (yaml: string) => {
    if (!yaml.trim()) {
      setError("Veuillez entrer du YAML");
      return;
    }

    try {
      setError("");
      setValidationErrors([]);

      // Valider le YAML
      const errors = validateYaml(yaml);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setError("YAML invalide détecté");
        return;
      }

      // Nettoyer le YAML
      let cleanYaml = yaml
        .trim()
        .replace(/\r\n/g, "\n") // Normaliser les retours à la ligne
        .replace(/\r/g, "\n") // Normaliser les retours à la ligne
        .replace(/\t/g, " ".repeat(indentSize)); // Remplacer les tabulations

      // Formater avec indentation
      const lines = cleanYaml.split("\n");
      let formatted = "";
      let currentIndent = 0;
      const indentStr = " ".repeat(indentSize);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith("#")) {
          formatted += "\n";
          continue;
        }

        // Calculer l'indentation
        if (line.startsWith("-")) {
          // Élément de liste
          formatted += indentStr.repeat(currentIndent) + line + "\n";
        } else if (line.includes(":")) {
          // Clé-valeur
          if (line.endsWith(":")) {
            // Clé sans valeur (objet)
            formatted += indentStr.repeat(currentIndent) + line + "\n";
            currentIndent++;
          } else {
            // Clé avec valeur
            formatted += indentStr.repeat(currentIndent) + line + "\n";
          }
        } else {
          // Ligne de contenu
          formatted += indentStr.repeat(currentIndent) + line + "\n";
        }

        // Ajuster l'indentation pour la ligne suivante
        if (i < lines.length - 1) {
          const nextLine = lines[i + 1].trim();
          if (
            nextLine &&
            !nextLine.startsWith("#") &&
            !nextLine.startsWith("-")
          ) {
            if (nextLine.includes(":") && nextLine.endsWith(":")) {
              // La ligne suivante est une clé d'objet, augmenter l'indentation
              currentIndent++;
            }
          }
        }
      }

      setFormattedYaml(formatted.trim());
    } catch (err) {
      setError("Erreur lors du formatage du YAML");
    }
  };

  const minifyYaml = (yaml: string) => {
    if (!yaml.trim()) {
      setError("Veuillez entrer du YAML");
      return;
    }

    try {
      setError("");
      setValidationErrors([]);

      // Valider le YAML
      const errors = validateYaml(yaml);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setError("YAML invalide détecté");
        return;
      }

      let minified = yaml
        .trim()
        .replace(/\r\n/g, "\n") // Normaliser les retours à la ligne
        .replace(/\r/g, "\n") // Normaliser les retours à la ligne
        .replace(/\t/g, " ") // Remplacer les tabulations
        .replace(/\n\s*\n/g, "\n") // Supprimer les lignes vides multiples
        .replace(/\n/g, " ") // Remplacer les retours à la ligne par des espaces
        .replace(/\s+/g, " ") // Normaliser les espaces
        .trim();

      setMinifiedYaml(minified);
    } catch (err) {
      setError("Erreur lors de la minification du YAML");
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = (sample: (typeof sampleYamls)[0]) => {
    setInputYaml(sample.yaml);
    setFormattedYaml("");
    setMinifiedYaml("");
    setError("");
    setValidationErrors([]);
  };

  const clearAll = () => {
    setInputYaml("");
    setFormattedYaml("");
    setMinifiedYaml("");
    setError("");
    setValidationErrors([]);
  };

  const downloadYaml = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/yaml" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getYamlStats = (yaml: string) => {
    const lines = yaml.split("\n");
    const nonEmptyLines = lines.filter(
      (line) => line.trim() && !line.trim().startsWith("#")
    );
    const commentLines = lines.filter((line) => line.trim().startsWith("#"));
    const keyValuePairs = nonEmptyLines.filter(
      (line) => line.includes(":") && !line.endsWith(":")
    );
    const objects = nonEmptyLines.filter(
      (line) => line.includes(":") && line.endsWith(":")
    );
    const lists = nonEmptyLines.filter((line) => line.trim().startsWith("-"));

    return {
      totalLines: lines.length,
      nonEmptyLines: nonEmptyLines.length,
      commentLines: commentLines.length,
      keyValuePairs: keyValuePairs.length,
      objects: objects.length,
      lists: lists.length,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">YAML Formatter</h2>
      </div>

      {/* Exemples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples YAML</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleYamls.map((sample) => (
              <Button
                key={sample.name}
                variant="outline"
                size="sm"
                onClick={() => loadSample(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{sample.name}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {sample.yaml.split("\n")[0]}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Personnalisez le formatage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Taille d'indentation</label>
            <Input
              type="number"
              value={indentSize}
              onChange={(e) =>
                setIndentSize(
                  Math.max(1, Math.min(8, parseInt(e.target.value) || 2))
                )
              }
              min={1}
              max={8}
              className="w-20"
            />
            <div className="text-xs text-muted-foreground">
              Nombre d'espaces pour chaque niveau d'indentation
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YAML d'entrée */}
      <Card>
        <CardHeader>
          <CardTitle>YAML d'entrée</CardTitle>
          <CardDescription>Collez votre YAML ici</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputYaml}
            onChange={(e) => setInputYaml(e.target.value)}
            placeholder="app:\n  name: Mon App\n  version: 1.0.0"
            className="min-h-[200px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => formatYaml(inputYaml)} className="flex-1">
              <FileCode className="h-4 w-4 mr-2" />
              Formater
            </Button>
            <Button onClick={() => minifyYaml(inputYaml)} variant="outline">
              <Minus className="h-4 w-4 mr-2" />
              Minifier
            </Button>
            <Button onClick={clearAll} variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Erreurs de validation */}
      {validationErrors.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Erreurs de validation YAML
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {validationErrors.map((error, index) => (
                <li
                  key={index}
                  className="text-orange-800 dark:text-orange-200"
                >
                  • {error}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Erreur générale */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="text-red-800 dark:text-red-200">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* YAML formaté */}
      {formattedYaml && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>YAML formaté</CardTitle>
                <CardDescription>
                  YAML avec indentation et formatage
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(formattedYaml, "formatted")}
                >
                  {copied === "formatted" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadYaml(formattedYaml, "formatted.yaml")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {formattedYaml}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* YAML minifié */}
      {minifiedYaml && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>YAML minifié</CardTitle>
                <CardDescription>
                  YAML optimisé pour la production
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(minifiedYaml, "minified")}
                >
                  {copied === "minified" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadYaml(minifiedYaml, "minified.yaml")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto break-all">
                {minifiedYaml}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      {(formattedYaml || minifiedYaml) && (
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              {(() => {
                const stats = getYamlStats(inputYaml);
                return (
                  <>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-2xl font-bold text-primary">
                        {stats.totalLines}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lignes totales
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-2xl font-bold text-primary">
                        {stats.keyValuePairs}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Paires clé-valeur
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-2xl font-bold text-primary">
                        {stats.lists}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Éléments de liste
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Formateur YAML
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Formatez et minifiez vos fichiers YAML pour une meilleure
                lisibilité ou pour optimiser la production. Validation
                automatique de la syntaxe et support des commentaires, listes et
                objets imbriqués.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
