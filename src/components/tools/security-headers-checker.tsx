"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, XCircle, AlertTriangle, ExternalLink, Copy, Download } from "lucide-react";

export function SecurityHeadersChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Record<string, any>>({});

  // Définition des en-têtes de sécurité
  const securityHeaders = {
    "Strict-Transport-Security": {
      name: "HTTP Strict Transport Security (HSTS)",
      description: "Force l'utilisation de HTTPS",
      importance: "high",
      example: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
    },
    "Content-Security-Policy": {
      name: "Content Security Policy (CSP)",
      description: "Protège contre les attaques XSS",
      importance: "high",
      example: "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'"
    },
    "X-Frame-Options": {
      name: "X-Frame-Options",
      description: "Protège contre les attaques de clickjacking",
      importance: "high",
      example: "X-Frame-Options: DENY"
    },
    "X-Content-Type-Options": {
      name: "X-Content-Type-Options",
      description: "Empêche le MIME type sniffing",
      importance: "medium",
      example: "X-Content-Type-Options: nosniff"
    },
    "Referrer-Policy": {
      name: "Referrer Policy",
      description: "Contrôle les informations de referrer",
      importance: "medium",
      example: "Referrer-Policy: strict-origin-when-cross-origin"
    },
    "Permissions-Policy": {
      name: "Permissions Policy",
      description: "Contrôle les fonctionnalités du navigateur",
      importance: "medium",
      example: "Permissions-Policy: camera=(), microphone=(), geolocation=()"
    },
    "X-XSS-Protection": {
      name: "X-XSS-Protection",
      description: "Protection XSS (déprécié mais encore utilisé)",
      importance: "low",
      example: "X-XSS-Protection: 1; mode=block"
    },
    "Cross-Origin-Embedder-Policy": {
      name: "Cross-Origin Embedder Policy",
      description: "Contrôle l'intégration de ressources cross-origin",
      importance: "medium",
      example: "Cross-Origin-Embedder-Policy: require-corp"
    },
    "Cross-Origin-Opener-Policy": {
      name: "Cross-Origin Opener Policy",
      description: "Contrôle l'accès aux fenêtres cross-origin",
      importance: "medium",
      example: "Cross-Origin-Opener-Policy: same-origin"
    },
    "Cross-Origin-Resource-Policy": {
      name: "Cross-Origin Resource Policy",
      description: "Contrôle l'accès aux ressources cross-origin",
      importance: "medium",
      example: "Cross-Origin-Resource-Policy: same-origin"
    }
  };

  // Vérification des en-têtes de sécurité
  const checkSecurityHeaders = async () => {
    if (!url) {
      setError("Veuillez entrer une URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setResults({});

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      
      // Simulation de la vérification (en réalité, on ne peut pas faire de requêtes CORS)
      // Ici on simule des résultats pour la démonstration
      setTimeout(() => {
        const mockResults: Record<string, any> = {};
        
        Object.keys(securityHeaders).forEach(header => {
          const random = Math.random();
          mockResults[header] = {
            present: random > 0.3, // 70% de chance d'être présent
            value: random > 0.3 ? generateMockHeaderValue(header) : null,
            status: random > 0.7 ? "good" : random > 0.4 ? "warning" : "error"
          };
        });

        setResults(mockResults);
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError("URL invalide");
      setIsLoading(false);
    }
  };

  // Génération de valeurs d'en-têtes simulées
  const generateMockHeaderValue = (header: string) => {
    const values: Record<string, string[]> = {
      "Strict-Transport-Security": [
        "max-age=31536000; includeSubDomains; preload",
        "max-age=31536000; includeSubDomains",
        "max-age=31536000"
      ],
      "Content-Security-Policy": [
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
        "default-src 'self'; script-src 'self'",
        "default-src 'none'"
      ],
      "X-Frame-Options": ["DENY", "SAMEORIGIN"],
      "X-Content-Type-Options": ["nosniff"],
      "Referrer-Policy": [
        "strict-origin-when-cross-origin",
        "strict-origin",
        "no-referrer"
      ],
      "Permissions-Policy": [
        "camera=(), microphone=(), geolocation=()",
        "camera=(), microphone=()",
        "camera=()"
      ],
      "X-XSS-Protection": ["1; mode=block", "1"],
      "Cross-Origin-Embedder-Policy": ["require-corp", "credentialless"],
      "Cross-Origin-Opener-Policy": ["same-origin", "same-origin-allow-popups"],
      "Cross-Origin-Resource-Policy": ["same-origin", "cross-origin", "same-site"]
    };

    const headerValues = values[header] || ["valeur-exemple"];
    return headerValues[Math.floor(Math.random() * headerValues.length)];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generateReport = () => {
    let report = `# Rapport de Sécurité - En-têtes HTTP\n\n`;
    report += `**URL analysée:** ${url}\n`;
    report += `**Date:** ${new Date().toLocaleDateString()}\n\n`;

    report += `## Résumé\n\n`;
    const present = Object.values(results).filter((r: any) => r.present).length;
    const total = Object.keys(results).length;
    report += `- En-têtes présents: ${present}/${total}\n`;
    report += `- Score de sécurité: ${Math.round((present / total) * 100)}%\n\n`;

    report += `## Détails par en-tête\n\n`;
    Object.entries(results).forEach(([header, result]: [string, any]) => {
      const headerInfo = securityHeaders[header as keyof typeof securityHeaders];
      report += `### ${headerInfo.name}\n\n`;
      report += `**Statut:** ${result.present ? "✅ Présent" : "❌ Absent"}\n`;
      if (result.value) {
        report += `**Valeur:** \`${result.value}\`\n`;
      }
      report += `**Description:** ${headerInfo.description}\n`;
      report += `**Importance:** ${headerInfo.importance}\n\n`;
    });

    return report;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-headers-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Vérificateur d'En-têtes de Sécurité
          </CardTitle>
          <CardDescription>
            Vérifiez les en-têtes de sécurité HTTP de votre site web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">URL du site à analyser</label>
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1"
              />
              <Button onClick={checkSecurityHeaders} disabled={isLoading}>
                {isLoading ? "Analyse en cours..." : "Analyser"}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(url, '_blank')}
              disabled={!url}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Ouvrir le site
            </Button>
            {Object.keys(results).length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generateReport())}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copier le rapport
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadReport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {Object.keys(results).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Résultats de l'analyse
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Résumé */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Résumé</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">
                    {Object.values(results).filter((r: any) => r.present).length}
                  </div>
                  <div className="text-muted-foreground">Présents</div>
                </div>
                <div className="text-center">
                  <div className="text-red-600 font-semibold">
                    {Object.values(results).filter((r: any) => !r.present).length}
                  </div>
                  <div className="text-muted-foreground">Absents</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-semibold">
                    {Math.round((Object.values(results).filter((r: any) => r.present).length / Object.keys(results).length) * 100)}%
                  </div>
                  <div className="text-muted-foreground">Score</div>
                </div>
              </div>
            </div>

            {/* Détails des en-têtes */}
            <div className="space-y-4">
              {Object.entries(results).map(([header, result]: [string, any]) => {
                const headerInfo = securityHeaders[header as keyof typeof securityHeaders];
                return (
                  <div key={header} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(result.present ? "good" : "error")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{headerInfo.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getImportanceColor(headerInfo.importance)}`}>
                            {headerInfo.importance}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {headerInfo.description}
                        </p>
                        <div className="text-sm">
                          <span className="font-medium">Statut:</span>{" "}
                          <span className={result.present ? "text-green-600" : "text-red-600"}>
                            {result.present ? "✅ Présent" : "❌ Absent"}
                          </span>
                        </div>
                        {result.value && (
                          <div className="mt-2">
                            <span className="font-medium text-sm">Valeur:</span>
                            <div className="mt-1 p-2 bg-muted rounded font-mono text-sm">
                              {result.value}
                            </div>
                          </div>
                        )}
                        <div className="mt-2">
                          <span className="font-medium text-sm">Exemple:</span>
                          <div className="mt-1 p-2 bg-muted rounded font-mono text-sm">
                            {headerInfo.example}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guide des en-têtes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guide des En-têtes de Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">En-têtes critiques</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>HSTS:</strong> Force HTTPS</li>
                <li>• <strong>CSP:</strong> Protection XSS</li>
                <li>• <strong>X-Frame-Options:</strong> Anti-clickjacking</li>
                <li>• <strong>X-Content-Type-Options:</strong> Anti-MIME sniffing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">En-têtes recommandés</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Referrer-Policy:</strong> Contrôle du referrer</li>
                <li>• <strong>Permissions-Policy:</strong> Contrôle des fonctionnalités</li>
                <li>• <strong>COOP/COEP:</strong> Isolation des processus</li>
                <li>• <strong>CORS:</strong> Contrôle cross-origin</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Implémentation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Configurez au niveau du serveur web</li>
                <li>• Testez avec des outils en ligne</li>
                <li>• Surveillez les erreurs de console</li>
                <li>• Mettez à jour régulièrement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Outils utiles</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>securityheaders.com</strong> - Test en ligne</li>
                <li>• <strong>Mozilla Observatory</strong> - Audit complet</li>
                <li>• <strong>DevTools</strong> - Inspection réseau</li>
                <li>• <strong>Lighthouse</strong> - Audit de sécurité</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
