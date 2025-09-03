/**
 * Convertisseur JSON vers CSV
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Copy, Check, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function JsonToCsv() {
  const [inputJson, setInputJson] = useState("");
  const [outputCsv, setOutputCsv] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const convertJsonToCsv = () => {
    if (!inputJson.trim()) {
      setOutputCsv("");
      setError("");
      return;
    }

    try {
      const data = JSON.parse(inputJson);

      // Vérifier si c'est un tableau
      if (!Array.isArray(data)) {
        throw new Error("Le JSON doit être un tableau d'objets");
      }

      if (data.length === 0) {
        setOutputCsv("");
        setError("Le tableau JSON est vide");
        return;
      }

      // Extraire toutes les clés possibles
      const allKeys = new Set<string>();
      data.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((key) => allKeys.add(key));
        }
      });

      const keys = Array.from(allKeys);

      if (keys.length === 0) {
        throw new Error("Aucune propriété trouvée dans les objets");
      }

      let csv = "";

      // Ajouter les en-têtes si demandé
      if (includeHeaders) {
        csv +=
          keys.map((key) => escapeCsvValue(key, delimiter)).join(delimiter) +
          "\n";
      }

      // Ajouter les données
      data.forEach((item) => {
        const row = keys.map((key) => {
          const value = item && typeof item === "object" ? item[key] : "";
          return escapeCsvValue(value, delimiter);
        });
        csv += row.join(delimiter) + "\n";
      });

      setOutputCsv(csv.trim());
      setError("");
    } catch (err) {
      setError((err as Error).message || "Erreur lors de la conversion");
      setOutputCsv("");
    }
  };

  const escapeCsvValue = (value: any, delimiter: string): string => {
    if (value === null || value === undefined) {
      return "";
    }

    let stringValue = String(value);

    // Si la valeur contient le délimiteur, des guillemets ou des retours à la ligne
    if (
      stringValue.includes(delimiter) ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      // Échapper les guillemets en les doublant
      stringValue = stringValue.replace(/"/g, '""');
      // Entourer de guillemets
      stringValue = `"${stringValue}"`;
    }

    return stringValue;
  };

  const copyToClipboard = async () => {
    if (outputCsv) {
      await navigator.clipboard.writeText(outputCsv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCsv = () => {
    if (!outputCsv) return;

    const blob = new Blob([outputCsv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadSample = () => {
    const sample = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        city: "New York",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        age: 25,
        city: "Los Angeles",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        age: 35,
        city: "Chicago",
      },
    ];
    setInputJson(JSON.stringify(sample, null, 2));
  };

  React.useEffect(() => {
    convertJsonToCsv();
  }, [inputJson, delimiter, includeHeaders]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <FileSpreadsheet className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">JSON to CSV</h2>
      </div>

      {/* Options */}
      <Card>
        <CardHeader>
          <CardTitle>Options de conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Délimiteur :</label>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                <option value=",">Virgule (,)</option>
                <option value=";">Point-virgule (;)</option>
                <option value="\t">Tabulation</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Inclure les en-têtes</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input JSON */}
        <Card>
          <CardHeader>
            <CardTitle>JSON d'entrée</CardTitle>
            <CardDescription>Collez votre tableau JSON ici</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
              className="min-h-[300px] font-mono text-sm"
            />

            <div className="flex justify-between items-center">
              <Button onClick={loadSample} variant="outline" size="sm">
                Exemple
              </Button>
              <span className="text-sm text-muted-foreground">
                {inputJson.length} caractères
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Output CSV */}
        <Card>
          <CardHeader>
            <CardTitle>CSV généré</CardTitle>
            <CardDescription>Résultat de la conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <Textarea
                  value={outputCsv}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted"
                  placeholder="Le CSV apparaîtra ici..."
                />
                {outputCsv && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCsv}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {outputCsv && !error && (
              <div className="text-sm text-muted-foreground">
                {outputCsv.split("\n").length} lignes générées
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informations */}
      <Card>
        <CardHeader>
          <CardTitle>Comment utiliser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium mb-2">Format JSON attendu :</h4>
              <div className="p-3 bg-muted rounded font-mono text-xs">
                {`[
  {"nom": "valeur1", "age": 25},
  {"nom": "valeur2", "age": 30}
]`}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Résultat CSV :</h4>
              <div className="p-3 bg-muted rounded font-mono text-xs">
                {`nom,age
valeur1,25
valeur2,30`}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Fonctionnalités :</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Conversion automatique des types</li>
                  <li>• Gestion des valeurs nulles</li>
                  <li>• Échappement automatique</li>
                  <li>• Choix du délimiteur</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Limitations :</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Seuls les tableaux d'objets</li>
                  <li>• Objets imbriqués aplatis</li>
                  <li>• Tableaux convertis en chaînes</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <FileSpreadsheet className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                JSON vers CSV
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Convertit un tableau d'objets JSON en format CSV pour l'import
                dans Excel, Google Sheets ou autres outils d'analyse de données.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
