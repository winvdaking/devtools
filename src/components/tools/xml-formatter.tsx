/**
 * Formateur et prettifier XML
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCode,
  Copy,
  Check,
  FileText,
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

export function XmlFormatter() {
  const [inputXml, setInputXml] = useState("");
  const [formattedXml, setFormattedXml] = useState("");
  const [minifiedXml, setMinifiedXml] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const sampleXmls = [
    {
      name: "HTML simple",
      xml: "<html><head><title>Page</title></head><body><h1>Titre</h1><p>Paragraphe</p></body></html>",
    },
    {
      name: "Configuration",
      xml: "<config><database><host>localhost</host><port>5432</port><name>mydb</name></database><server><port>3000</port><debug>true</debug></server></config>",
    },
    {
      name: "RSS Feed",
      xml: '<rss version="2.0"><channel><title>Mon Blog</title><link>https://example.com</link><description>Description du blog</description><item><title>Article 1</title><link>https://example.com/1</link><description>Description article 1</description></item></channel></rss>',
    },
    {
      name: "SOAP Request",
      xml: '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><AuthHeader><Username>user</Username><Password>pass</Password></AuthHeader></soap:Header><soap:Body><GetUserRequest><UserId>123</UserId></GetUserRequest></soap:Body></soap:Envelope>',
    },
  ];

  const validateXml = (xml: string): string[] => {
    const errors: string[] = [];

    try {
      // Vérifier les balises non fermées
      const openTags: string[] = [];
      const selfClosingTags = ["br", "hr", "img", "input", "meta", "link"];

      const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?>/g;
      let match;

      while ((match = tagRegex.exec(xml)) !== null) {
        const tagName = match[1];
        const isClosing = match[0].startsWith("</");
        const isSelfClosing =
          match[0].endsWith("/>") || selfClosingTags.includes(tagName);

        if (isSelfClosing) continue;

        if (isClosing) {
          if (openTags.length === 0 || openTags.pop() !== tagName) {
            errors.push(
              `Balise fermante </${tagName}> sans balise ouvrante correspondante`
            );
          }
        } else {
          openTags.push(tagName);
        }
      }

      if (openTags.length > 0) {
        errors.push(`Balises non fermées: ${openTags.join(", ")}`);
      }

      // Vérifier les attributs mal formés
      const attrRegex =
        /<[^>]*\s([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/g;
      while ((match = attrRegex.exec(xml)) !== null) {
        const attrValue = match[0].split("=")[1];
        if (!attrValue.startsWith('"') && !attrValue.startsWith("'")) {
          errors.push(`Attribut ${match[1]} sans guillemets`);
        }
      }
    } catch (err) {
      errors.push("Erreur lors de la validation XML");
    }

    return errors;
  };

  const formatXml = (xml: string) => {
    if (!xml.trim()) {
      setError("Veuillez entrer du XML");
      return;
    }

    try {
      setError("");
      setValidationErrors([]);

      // Valider le XML
      const errors = validateXml(xml);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setError("XML invalide détecté");
        return;
      }

      // Nettoyer le XML
      let cleanXml = xml
        .trim()
        .replace(/>\s+</g, "><") // Supprimer les espaces entre balises
        .replace(/\s+/g, " ") // Normaliser les espaces
        .replace(/>\s*</g, "><"); // Nettoyer les espaces autour des balises

      // Formater avec indentation
      let formatted = "";
      let indent = 0;
      const indentStr = " ".repeat(indentSize);

      // Diviser en balises
      const parts = cleanXml.split(/(<\/?[^>]+>)/);

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (!part) continue;

        if (part.startsWith("</")) {
          // Balise fermante
          indent--;
          formatted += "\n" + indentStr.repeat(indent) + part;
        } else if (part.startsWith("<") && !part.endsWith("/>")) {
          // Balise ouvrante
          formatted += "\n" + indentStr.repeat(indent) + part;
          indent++;
        } else if (part.startsWith("<") && part.endsWith("/>")) {
          // Balise auto-fermante
          formatted += "\n" + indentStr.repeat(indent) + part;
        } else if (part !== "<" && part !== ">") {
          // Contenu textuel
          formatted += part;
        }
      }

      setFormattedXml(formatted.trim());
    } catch (err) {
      setError("Erreur lors du formatage du XML");
    }
  };

  const minifyXml = (xml: string) => {
    if (!xml.trim()) {
      setError("Veuillez entrer du XML");
      return;
    }

    try {
      setError("");
      setValidationErrors([]);

      // Valider le XML
      const errors = validateXml(xml);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setError("XML invalide détecté");
        return;
      }

      let minified = xml
        .trim()
        .replace(/>\s+</g, "><") // Supprimer les espaces entre balises
        .replace(/\s+/g, " ") // Normaliser les espaces
        .replace(/>\s*</g, "><") // Nettoyer les espaces autour des balises
        .replace(/\n/g, "") // Supprimer les retours à la ligne
        .replace(/\t/g, "") // Supprimer les tabulations
        .replace(/\s*\/>/g, "/>") // Nettoyer les balises auto-fermantes
        .replace(/>\s*</g, "><"); // Nettoyer les espaces entre balises

      setMinifiedXml(minified);
    } catch (err) {
      setError("Erreur lors de la minification du XML");
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = (sample: (typeof sampleXmls)[0]) => {
    setInputXml(sample.xml);
    setFormattedXml("");
    setMinifiedXml("");
    setError("");
    setValidationErrors([]);
  };

  const clearAll = () => {
    setInputXml("");
    setFormattedXml("");
    setMinifiedXml("");
    setError("");
    setValidationErrors([]);
  };

  const downloadXml = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/xml" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <FileCode className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">XML Formatter</h2>
      </div>

      {/* Exemples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples XML</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleXmls.map((sample) => (
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
                    {sample.xml}
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

      {/* XML d'entrée */}
      <Card>
        <CardHeader>
          <CardTitle>XML d'entrée</CardTitle>
          <CardDescription>Collez votre XML ici</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputXml}
            onChange={(e) => setInputXml(e.target.value)}
            placeholder="<root><element>contenu</element></root>"
            className="min-h-[200px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => formatXml(inputXml)} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Formater
            </Button>
            <Button onClick={() => minifyXml(inputXml)} variant="outline">
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
              Erreurs de validation XML
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

      {/* XML formaté */}
      {formattedXml && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>XML formaté</CardTitle>
                <CardDescription>
                  XML avec indentation et formatage
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(formattedXml, "formatted")}
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
                  onClick={() => downloadXml(formattedXml, "formatted.xml")}
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
                {formattedXml}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* XML minifié */}
      {minifiedXml && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>XML minifié</CardTitle>
                <CardDescription>
                  XML optimisé pour la production
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(minifiedXml, "minified")}
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
                  onClick={() => downloadXml(minifiedXml, "minified.xml")}
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
                {minifiedXml}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      {(formattedXml || minifiedXml) && (
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {inputXml.length}
                </div>
                <div className="text-xs text-muted-foreground">Caractères</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {(inputXml.match(/<[^>]+>/g) || []).length}
                </div>
                <div className="text-xs text-muted-foreground">Balises</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {(inputXml.match(/[a-zA-Z][a-zA-Z0-9]*\s*=/g) || []).length}
                </div>
                <div className="text-xs text-muted-foreground">Attributs</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {formattedXml ? formattedXml.split("\n").length : 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Lignes formatées
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <FileCode className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Formateur XML
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Formatez et minifiez vos fichiers XML pour une meilleure
                lisibilité ou pour optimiser la production. Validation
                automatique des erreurs de syntaxe et support des balises
                auto-fermantes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
