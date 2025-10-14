/**
 * Outil de conversion de texte
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Type, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function TextConverter() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const conversions = [
    {
      id: "uppercase",
      name: "UPPERCASE",
      description: "Convertit en majuscules",
      convert: (text: string) => text.toUpperCase(),
    },
    {
      id: "lowercase",
      name: "lowercase",
      description: "Convertit en minuscules",
      convert: (text: string) => text.toLowerCase(),
    },
    {
      id: "camelCase",
      name: "camelCase",
      description: "Convertit en camelCase",
      convert: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
    },
    {
      id: "snake_case",
      name: "snake_case",
      description: "Convertit en snake_case",
      convert: (text: string) =>
        text
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map((word) => word.toLowerCase())
          .join("_"),
    },
    {
      id: "kebab-case",
      name: "kebab-case",
      description: "Convertit en kebab-case",
      convert: (text: string) =>
        text
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map((word) => word.toLowerCase())
          .join("-"),
    },
    {
      id: "PascalCase",
      name: "PascalCase",
      description: "Convertit en PascalCase",
      convert: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^./, (chr) => chr.toUpperCase()),
    },
  ];

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    setInputText("Hello World Example Text");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Type className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Text Converter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Texte d'entrée</CardTitle>
          <CardDescription>Saisissez le texte à convertir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Saisissez votre texte ici..."
            className="min-h-[120px]"
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

      {inputText && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conversions.map((conversion) => {
            const convertedText = conversion.convert(inputText);
            return (
              <Card key={conversion.id} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-mono">
                    {conversion.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {conversion.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="p-3 bg-muted rounded-lg min-h-[80px] font-mono text-sm break-words">
                      {convertedText}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(convertedText, conversion.id)
                      }
                      className="absolute top-2 right-2"
                    >
                      {copied === conversion.id ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
