/**
 * Normalisateur d'emails
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, FileText, RefreshCw, Download, AlertCircle } from "lucide-react";
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

interface EmailInfo {
  original: string;
  normalized: string;
  isValid: boolean;
  domain: string;
  localPart: string;
  suggestions: string[];
}

export function EmailNormalizer() {
  const [inputEmails, setInputEmails] = useState("");
  const [normalizedEmails, setNormalizedEmails] = useState<EmailInfo[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [options, setOptions] = useState({
    lowercase: true,
    removeDots: false,
    removePlus: false,
    removeComments: true,
    sortByDomain: false,
    removeDuplicates: true
  });

  const sampleEmails = [
    {
      name: "Emails simples",
      emails: "john.doe@example.com\nJANE.SMITH@GMAIL.COM\nuser+tag@domain.org"
    },
    {
      name: "Avec commentaires",
      emails: "john.doe@example.com (John Doe)\nuser@domain.com (Contact)\nadmin@site.net (Administrator)"
    },
    {
      name: "Avec espaces",
      emails: " john.doe@example.com \n  user@domain.com  \nadmin@site.net"
    },
    {
      name: "Formats mixtes",
      emails: "John.Doe@EXAMPLE.COM\nuser+test@domain.org\nADMIN@SITE.NET\njohn.doe@example.com"
    }
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const normalizeEmail = (email: string): EmailInfo => {
    let normalized = email.trim();
    const original = normalized;

    // Extraire les commentaires
    let comment = "";
    if (options.removeComments) {
      const commentMatch = normalized.match(/\(([^)]+)\)/);
      if (commentMatch) {
        comment = commentMatch[1];
        normalized = normalized.replace(/\s*\([^)]+\)/, '');
      }
    }

    // Séparer la partie locale et le domaine
    const atIndex = normalized.indexOf('@');
    if (atIndex === -1) {
      return {
        original,
        normalized,
        isValid: false,
        domain: '',
        localPart: normalized,
        suggestions: []
      };
    }

    let localPart = normalized.substring(0, atIndex);
    let domain = normalized.substring(atIndex + 1);

    // Normaliser la partie locale
    if (options.lowercase) {
      localPart = localPart.toLowerCase();
    }

    if (options.removeDots) {
      localPart = localPart.replace(/\./g, '');
    }

    if (options.removePlus) {
      const plusIndex = localPart.indexOf('+');
      if (plusIndex !== -1) {
        localPart = localPart.substring(0, plusIndex);
      }
    }

    // Normaliser le domaine
    if (options.lowercase) {
      domain = domain.toLowerCase();
    }

    // Reconstruire l'email
    normalized = localPart + '@' + domain;

    // Ajouter le commentaire si nécessaire
    if (!options.removeComments && comment) {
      normalized += ` (${comment})`;
    }

    // Générer des suggestions
    const suggestions: string[] = [];
    if (domain.includes('gmail.com')) {
      suggestions.push(localPart.replace(/\./g, '') + '@gmail.com');
      if (localPart.includes('+')) {
        suggestions.push(localPart.substring(0, localPart.indexOf('+')) + '@gmail.com');
      }
    }

    return {
      original,
      normalized,
      isValid: validateEmail(normalized.replace(/\s*\([^)]+\)/, '')),
      domain,
      localPart,
      suggestions
    };
  };

  const processEmails = () => {
    if (!inputEmails.trim()) {
      setError("Veuillez entrer des emails");
      return;
    }

    try {
      setError("");

      // Diviser les emails
      const emailList = inputEmails
        .split(/[\n,;]/)
        .map(email => email.trim())
        .filter(email => email.length > 0);

      if (emailList.length === 0) {
        setError("Aucun email valide trouvé");
        return;
      }

      // Normaliser chaque email
      let processedEmails = emailList.map(normalizeEmail);

      // Supprimer les doublons si demandé
      if (options.removeDuplicates) {
        const seen = new Set<string>();
        processedEmails = processedEmails.filter(email => {
          const key = email.normalized.toLowerCase();
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      }

      // Trier par domaine si demandé
      if (options.sortByDomain) {
        processedEmails.sort((a, b) => a.domain.localeCompare(b.domain));
      }

      setNormalizedEmails(processedEmails);
    } catch (err) {
      setError("Erreur lors du traitement des emails");
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = (sample: typeof sampleEmails[0]) => {
    setInputEmails(sample.emails);
    setNormalizedEmails([]);
    setError("");
  };

  const clearAll = () => {
    setInputEmails("");
    setNormalizedEmails([]);
    setError("");
  };

  const downloadEmails = (emails: EmailInfo[], filename: string) => {
    const content = emails.map(email => email.normalized).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStats = () => {
    if (normalizedEmails.length === 0) return null;

    const validEmails = normalizedEmails.filter(email => email.isValid);
    const invalidEmails = normalizedEmails.filter(email => !email.isValid);
    const domains = new Set(normalizedEmails.map(email => email.domain));
    const gmailEmails = normalizedEmails.filter(email => email.domain.includes('gmail.com'));

    return {
      total: normalizedEmails.length,
      valid: validEmails.length,
      invalid: invalidEmails.length,
      uniqueDomains: domains.size,
      gmailCount: gmailEmails.length
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
        <Mail className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Email Normalizer</h2>
      </div>

      {/* Exemples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples d'emails</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleEmails.map((sample) => (
              <Button
                key={sample.name}
                variant="outline"
                size="sm"
                onClick={() => loadSample(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{sample.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {sample.emails.split('\n')[0]}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardHeader>
          <CardTitle>Options de normalisation</CardTitle>
          <CardDescription>
            Personnalisez le comportement de normalisation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => setOptions(prev => ({ ...prev, lowercase: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Convertir en minuscules</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.removeDots}
                  onChange={(e) => setOptions(prev => ({ ...prev, removeDots: e.target.checked }))}
                  className="text-sm font-medium"
                />
                <span>Supprimer les points dans la partie locale</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.removePlus}
                  onChange={(e) => setOptions(prev => ({ ...prev, removePlus: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Supprimer les tags (+tag)</span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => setOptions(prev => ({ ...prev, removeComments: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Supprimer les commentaires</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.sortByDomain}
                  onChange={(e) => setOptions(prev => ({ ...prev, sortByDomain: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Trier par domaine</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.removeDuplicates}
                  onChange={(e) => setOptions(prev => ({ ...prev, removeDuplicates: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Supprimer les doublons</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emails d'entrée */}
      <Card>
        <CardHeader>
          <CardTitle>Emails d'entrée</CardTitle>
          <CardDescription>
            Collez vos emails ici (un par ligne, séparés par des virgules ou des points-virgules)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputEmails}
            onChange={(e) => setInputEmails(e.target.value)}
            placeholder="john.doe@example.com&#10;JANE.SMITH@GMAIL.COM&#10;user+tag@domain.org"
            className="min-h-[200px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={processEmails} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Normaliser
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

      {/* Emails normalisés */}
      {normalizedEmails.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Emails normalisés</CardTitle>
                <CardDescription>
                  {normalizedEmails.length} email{normalizedEmails.length > 1 ? 's' : ''} traité{normalizedEmails.length > 1 ? 's' : ''}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(normalizedEmails.map(e => e.normalized).join('\n'), "emails")}
                >
                  {copied === "emails" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copier tous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadEmails(normalizedEmails, "emails_normalized.txt")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {normalizedEmails.map((email, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${email.isValid
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-medium ${email.isValid
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-red-800 dark:text-red-200'
                          }`}>
                          {email.isValid ? '✓ Valide' : '✗ Invalide'}
                        </span>
                        {email.suggestions.length > 0 && (
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            Suggestions disponibles
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Original:</span>
                          <span className="font-mono ml-2">{email.original}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Normalisé:</span>
                          <span className="font-mono ml-2">{email.normalized}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Partie locale:</span> {email.localPart} |
                          <span className="font-medium ml-2">Domaine:</span> {email.domain}
                        </div>
                      </div>

                      {email.suggestions.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                            Suggestions:
                          </div>
                          <div className="space-y-1">
                            {email.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <span className="text-xs font-mono text-blue-700 dark:text-blue-300">
                                  {suggestion}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(suggestion, `suggestion-${index}-${idx}`)}
                                  className="h-5 px-2"
                                >
                                  {copied === `suggestion-${index}-${idx}` ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(email.normalized, `email-${index}`)}
                    >
                      {copied === `email-${index}` ? (
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
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      {(() => {
        const stats = getStats();
        if (!stats) return null;

        return (
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">
                    {stats.total}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-950/20 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.valid}
                  </div>
                  <div className="text-xs text-muted-foreground">Valides</div>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-950/20 rounded">
                  <div className="text-2xl font-bold text-red-600">
                    {stats.invalid}
                  </div>
                  <div className="text-xs text-muted-foreground">Invalides</div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-950/20 rounded">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.uniqueDomains}
                  </div>
                  <div className="text-xs text-muted-foreground">Domaines uniques</div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-950/20 rounded">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.gmailCount}
                  </div>
                  <div className="text-xs text-muted-foreground">Gmail</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Mail className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Normalisateur d'emails
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Normalisez et validez vos listes d'emails avec des options configurables.
                Supprimez les doublons, normalisez les domaines et générez des suggestions
                pour les emails Gmail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
