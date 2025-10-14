/**
 * Outil d'échappement des entités HTML
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check, ArrowUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function HtmlEscape() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [copied, setCopied] = useState(false);

  const htmlEntities: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  const reverseHtmlEntities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#x27;": "'",
    "&#39;": "'",
    "&#x2F;": "/",
    "&#47;": "/",
  };

  const escapeHtml = (text: string): string => {
    return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char] || char);
  };

  const unescapeHtml = (text: string): string => {
    return text.replace(
      /&(amp|lt|gt|quot|#x27|#39|#x2F|#47);/g,
      (entity) => reverseHtmlEntities[entity] || entity
    );
  };

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    if (mode === "escape") {
      setOutputText(escapeHtml(inputText));
    } else {
      setOutputText(unescapeHtml(inputText));
    }
  };

  const switchMode = () => {
    setMode(mode === "escape" ? "unescape" : "escape");
    // Échanger input et output si possible
    if (outputText) {
      setInputText(outputText);
      setOutputText(inputText);
    }
  };

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    if (mode === "escape") {
      setInputText(
        '<div class="example">Hello "World" & <span>Test</span></div>'
      );
    } else {
      setInputText(
        "&lt;div class=&quot;example&quot;&gt;Hello &quot;World&quot; &amp; &lt;span&gt;Test&lt;/span&gt;&lt;/div&gt;"
      );
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
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
        <Code className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Escape HTML entities</h2>
      </div>

      {/* Contrôles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Mode :</span>
              <Button
                variant={mode === "escape" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("escape")}
              >
                Échapper
              </Button>
              <Button
                variant={mode === "unescape" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("unescape")}
              >
                Déséchappe
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button onClick={switchMode} variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Inverser
              </Button>
              <Button onClick={loadSample} variant="outline" size="sm">
                Exemple
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
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
              {mode === "escape" ? "HTML à échapper" : "HTML à déséchappe"}
            </CardTitle>
            <CardDescription>
              {mode === "escape"
                ? "Saisissez le code HTML avec des caractères spéciaux"
                : "Collez le HTML avec des entités échappées"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "escape"
                  ? '<div class="example">Hello "World" & more</div>'
                  : "&lt;div class=&quot;example&quot;&gt;Hello &quot;World&quot; &amp; more&lt;/div&gt;"
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
              {mode === "escape" ? "HTML échappé" : "HTML déséchappe"}
            </CardTitle>
            <CardDescription>
              Résultat du {mode === "escape" ? "échappement" : "déséchappe"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-muted"
                placeholder={`Le résultat ${
                  mode === "escape" ? "échappé" : "déséchappe"
                } apparaîtra ici...`}
              />
              {outputText && (
                <Button
                  variant="outline"
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

            {outputText && (
              <div className="mt-4 text-sm text-muted-foreground">
                {outputText.length} caractères
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Référence des entités */}
      <Card>
        <CardHeader>
          <CardTitle>Entités HTML courantes</CardTitle>
          <CardDescription>Référence des caractères échappés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(htmlEntities).map(([char, entity]) => (
              <div key={char} className="text-center p-2 bg-muted rounded">
                <div className="font-mono text-lg">{char}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {entity}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Code className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                À propos des entités HTML
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                L'échappement HTML convertit les caractères spéciaux en entités
                pour éviter les problèmes d'interprétation et les attaques XSS.
                Essentiel pour afficher du contenu utilisateur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
