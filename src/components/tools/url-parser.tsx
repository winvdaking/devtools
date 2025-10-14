/**
 * Outil d'analyse d'URL
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/v1/winv";

interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  searchParams: { [key: string]: string };
}

export function UrlParser() {
  const [inputUrl, setInputUrl] = useState("");
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const parseUrl = (urlString: string) => {
    if (!urlString.trim()) {
      setParsedUrl(null);
      setError("");
      return;
    }

    try {
      // Ajouter http:// si aucun protocole n'est spécifié
      const urlToParse = urlString.includes("://")
        ? urlString
        : `http://${urlString}`;
      const url = new URL(urlToParse);

      const searchParams: { [key: string]: string } = {};
      url.searchParams.forEach((value, key) => {
        searchParams[key] = value;
      });

      setParsedUrl({
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? "443" : "80"),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        searchParams,
      });
      setError("");
    } catch (err) {
      setError("URL invalide");
      setParsedUrl(null);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    setInputUrl(
      "https://www.example.com:8080/path/to/page?param1=value1&param2=value2&search=hello%20world#section"
    );
  };

  React.useEffect(() => {
    parseUrl(inputUrl);
  }, [inputUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Globe className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">URL parser</h2>
      </div>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>URL à analyser</CardTitle>
          <CardDescription>
            Saisissez une URL complète pour l'analyser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://www.example.com:8080/path?param=value#section"
            className="font-mono"
          />

          <div className="flex justify-between items-center">
            <Button onClick={loadSample} variant="default" size="sm">
              URL d'exemple
            </Button>
            {error && <span className="text-sm text-destructive">{error}</span>}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {parsedUrl && (
        <div className="space-y-4">
          {/* Composants principaux */}
          <Card>
            <CardHeader>
              <CardTitle>Composants de l'URL</CardTitle>
              <CardDescription>
                Décomposition de l'URL en ses parties principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    label: "Protocole",
                    value: parsedUrl.protocol,
                    key: "protocol",
                  },
                  {
                    label: "Nom d'hôte",
                    value: parsedUrl.hostname,
                    key: "hostname",
                  },
                  { label: "Port", value: parsedUrl.port, key: "port" },
                  {
                    label: "Chemin",
                    value: parsedUrl.pathname || "/",
                    key: "pathname",
                  },
                  {
                    label: "Requête",
                    value: parsedUrl.search || "(aucune)",
                    key: "search",
                  },
                  {
                    label: "Fragment",
                    value: parsedUrl.hash || "(aucun)",
                    key: "hash",
                  },
                  { label: "Origine", value: parsedUrl.origin, key: "origin" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="font-mono text-sm text-muted-foreground break-all">
                        {item.value}
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="ml-4 flex-shrink-0"
                    >
                      {copied === item.key ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Paramètres de requête */}
          {Object.keys(parsedUrl.searchParams).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de requête</CardTitle>
                <CardDescription>
                  Paramètres extraits de la chaîne de requête
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(parsedUrl.searchParams).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{key}</div>
                          <div className="font-mono text-sm text-muted-foreground break-all">
                            {decodeURIComponent(value)}
                          </div>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              decodeURIComponent(value),
                              `param-${key}`
                            )
                          }
                          className="ml-4 flex-shrink-0"
                        >
                          {copied === `param-${key}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informations supplémentaires */}
          <Card>
            <CardHeader>
              <CardTitle>Informations détaillées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Type de protocole</div>
                  <div className="text-sm text-muted-foreground">
                    {parsedUrl.protocol === "https:"
                      ? "Sécurisé (HTTPS)"
                      : parsedUrl.protocol === "http:"
                        ? "Non sécurisé (HTTP)"
                        : parsedUrl.protocol.replace(":", "")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Port par défaut</div>
                  <div className="text-sm text-muted-foreground">
                    {parsedUrl.protocol === "https:"
                      ? "443 (HTTPS)"
                      : parsedUrl.protocol === "http:"
                        ? "80 (HTTP)"
                        : "Non standard"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Nombre de paramètres
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Object.keys(parsedUrl.searchParams).length}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Longueur totale</div>
                  <div className="text-sm text-muted-foreground">
                    {inputUrl.length} caractères
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Globe className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                À propos du parsing d'URL
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Le parsing d'URL décompose une URL en ses composants selon la
                RFC 3986. Utile pour l'analyse, la validation et la manipulation
                d'URLs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
