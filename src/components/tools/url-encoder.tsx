/**
 * Outil d'encodage/décodage d'URL
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, Copy, Check, ArrowUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/v1/winv";

export function UrlEncoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const processText = () => {
    setError("");

    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    try {
      if (mode === "encode") {
        // Encodage URL
        const encoded = encodeURIComponent(inputText);
        setOutputText(encoded);
      } else {
        // Décodage URL
        const decoded = decodeURIComponent(inputText);
        setOutputText(decoded);
      }
    } catch (err) {
      setError(
        mode === "encode"
          ? "Erreur lors de l'encodage"
          : "URL invalide pour le décodage"
      );
      setOutputText("");
    }
  };

  const switchMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    // Échanger input et output si possible
    if (outputText && !error) {
      setInputText(outputText);
      setOutputText(inputText);
    }
    setError("");
  };

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    if (mode === "encode") {
      setInputText("https://example.com/search?q=hello world&category=web dev");
    } else {
      setInputText(
        "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26category%3Dweb%20dev"
      );
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setError("");
  };

  // Traitement automatique
  React.useEffect(() => {
    processText();
  }, [inputText, mode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Link className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Encode/decode URL-format</h2>
      </div>

      {/* Contrôles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Mode :</span>
              <Button
                variant={mode === "encode" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("encode")}
              >
                Encoder
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("decode")}
              >
                Décoder
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button onClick={switchMode} variant="default" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Inverser
              </Button>
              <Button onClick={loadSample} variant="default" size="sm">
                Exemple
              </Button>
              <Button onClick={clearAll} variant="default" size="sm">
                Effacer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "encode" ? "URL à encoder" : "URL à décoder"}
            </CardTitle>
            <CardDescription>
              {mode === "encode"
                ? "Saisissez l'URL à encoder"
                : "Collez l'URL encodée à décoder"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "https://example.com/search?q=hello world"
                  : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
              }
              className="min-h-[200px] font-mono text-sm"
            />

            <div className="mt-4 text-sm text-muted-foreground">
              {inputText.length} caractères
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "encode" ? "URL encodée" : "URL décodée"}
            </CardTitle>
            <CardDescription>
              Résultat du {mode === "encode" ? "encodage" : "décodage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-muted"
                  placeholder={`Le résultat ${
                    mode === "encode" ? "encodé" : "décodé"
                  } apparaîtra ici...`}
                />
                {outputText && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            )}

            {outputText && !error && (
              <div className="mt-4 text-sm text-muted-foreground">
                {outputText.length} caractères
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Link className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                À propos de l'encodage URL
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                L'encodage URL (percent-encoding) convertit les caractères
                spéciaux en format %XX pour les rendre sûrs dans les URLs.
                Utilisé pour les paramètres de requête et les données de
                formulaire.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
