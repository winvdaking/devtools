"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, CheckCircle, XCircle, AlertTriangle, ExternalLink, Copy, Download, Clock, Zap, Globe, HardDrive } from "lucide-react";

export function PerformanceMonitor() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  });

  // Métriques de performance Core Web Vitals
  const coreWebVitals = [
    {
      name: "Largest Contentful Paint (LCP)",
      description: "Temps de chargement du plus grand élément de contenu",
      threshold: { good: 2.5, poor: 4.0 },
      unit: "s",
      icon: Clock
    },
    {
      name: "First Input Delay (FID)",
      description: "Délai avant la première interaction utilisateur",
      threshold: { good: 100, poor: 300 },
      unit: "ms",
      icon: Zap
    },
    {
      name: "Cumulative Layout Shift (CLS)",
      description: "Stabilité visuelle de la page",
      threshold: { good: 0.1, poor: 0.25 },
      unit: "",
      icon: BarChart3
    }
  ];

  // Analyse des performances
  const analyzePerformance = async () => {
    if (!url) {
      setError("Veuillez entrer une URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setPerformanceData(null);

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      
      // Simulation de l'analyse de performance
      setTimeout(() => {
        const mockPerformanceData = {
          url: urlObj.href,
          timestamp: new Date().toISOString(),
          overallScore: Math.floor(Math.random() * 40) + 60, // Score entre 60-100
          metrics: {
            lcp: Math.random() * 3 + 1, // 1-4 secondes
            fid: Math.random() * 200 + 50, // 50-250ms
            cls: Math.random() * 0.3, // 0-0.3
            fcp: Math.random() * 2 + 0.5, // 0.5-2.5 secondes
            ttfb: Math.random() * 500 + 100, // 100-600ms
            si: Math.random() * 3 + 1 // 1-4 secondes
          },
          resources: {
            totalRequests: Math.floor(Math.random() * 50) + 20,
            totalSize: Math.floor(Math.random() * 2000) + 500, // KB
            images: {
              count: Math.floor(Math.random() * 20) + 5,
              size: Math.floor(Math.random() * 1000) + 200
            },
            scripts: {
              count: Math.floor(Math.random() * 15) + 3,
              size: Math.floor(Math.random() * 800) + 100
            },
            stylesheets: {
              count: Math.floor(Math.random() * 8) + 2,
              size: Math.floor(Math.random() * 300) + 50
            }
          },
          opportunities: [
            {
              title: "Optimiser les images",
              description: "Compresser et redimensionner les images",
              impact: "high",
              savings: "1.2s"
            },
            {
              title: "Minifier le CSS",
              description: "Supprimer les espaces et commentaires inutiles",
              impact: "medium",
              savings: "0.3s"
            },
            {
              title: "Activer la compression",
              description: "Utiliser gzip ou brotli pour compresser les ressources",
              impact: "high",
              savings: "0.8s"
            }
          ],
          diagnostics: [
            {
              title: "Ressources non utilisées",
              description: "CSS et JavaScript non utilisés détectés",
              impact: "medium"
            },
            {
              title: "Requêtes de police non optimisées",
              description: "Chargement de polices non optimisé",
              impact: "low"
            },
            {
              title: "Cache du navigateur",
              description: "Ressources sans en-têtes de cache appropriés",
              impact: "medium"
            }
          ]
        };

        setPerformanceData(mockPerformanceData);
        setIsLoading(false);
      }, 3000);

    } catch (err) {
      setError("URL invalide");
      setIsLoading(false);
    }
  };

  // Simulation des métriques en temps réel
  useEffect(() => {
    if (performanceData) {
      const interval = setInterval(() => {
        setRealTimeMetrics(prev => ({
          loadTime: prev.loadTime + (Math.random() - 0.5) * 10,
          domContentLoaded: prev.domContentLoaded + (Math.random() - 0.5) * 5,
          firstContentfulPaint: prev.firstContentfulPaint + (Math.random() - 0.5) * 3,
          largestContentfulPaint: prev.largestContentfulPaint + (Math.random() - 0.5) * 2,
          firstInputDelay: prev.firstInputDelay + (Math.random() - 0.5) * 1,
          cumulativeLayoutShift: prev.cumulativeLayoutShift + (Math.random() - 0.5) * 0.01
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [performanceData]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getMetricStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return { status: "good", color: "text-green-600" };
    if (value <= thresholds.poor) return { status: "warning", color: "text-yellow-600" };
    return { status: "poor", color: "text-red-600" };
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
    if (!performanceData) return "";

    let report = `# Rapport de Performance Web\n\n`;
    report += `**URL analysée:** ${performanceData.url}\n`;
    report += `**Date:** ${new Date(performanceData.timestamp).toLocaleDateString()}\n`;
    report += `**Score global:** ${performanceData.overallScore}/100\n\n`;

    report += `## Core Web Vitals\n\n`;
    coreWebVitals.forEach((vital, index) => {
      const metricKey = vital.name.includes('LCP') ? 'lcp' : 
                       vital.name.includes('FID') ? 'fid' : 'cls';
      const value = performanceData.metrics[metricKey];
      const status = getMetricStatus(value, vital.threshold);
      report += `### ${vital.name}\n`;
      report += `- **Valeur:** ${value.toFixed(2)}${vital.unit}\n`;
      report += `- **Statut:** ${status.status}\n`;
      report += `- **Description:** ${vital.description}\n\n`;
    });

    report += `## Ressources\n\n`;
    report += `- **Requêtes totales:** ${performanceData.resources.totalRequests}\n`;
    report += `- **Taille totale:** ${performanceData.resources.totalSize} KB\n`;
    report += `- **Images:** ${performanceData.resources.images.count} (${performanceData.resources.images.size} KB)\n`;
    report += `- **Scripts:** ${performanceData.resources.scripts.count} (${performanceData.resources.scripts.size} KB)\n`;
    report += `- **CSS:** ${performanceData.resources.stylesheets.count} (${performanceData.resources.stylesheets.size} KB)\n\n`;

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
    a.download = 'performance-report.md';
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
            <BarChart3 className="h-5 w-5" />
            Moniteur de Performance Web
          </CardTitle>
          <CardDescription>
            Analysez les performances de votre site web et les Core Web Vitals
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
              <Button onClick={analyzePerformance} disabled={isLoading}>
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
            {performanceData && (
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
      {performanceData && (
        <>
          {/* Score global */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Score de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold ${getScoreBgColor(performanceData.overallScore)} ${getScoreColor(performanceData.overallScore)}`}>
                  {performanceData.overallScore}
                </div>
                <div className="mt-4">
                  <div className="text-lg font-medium">Score Global</div>
                  <div className="text-sm text-muted-foreground">
                    {performanceData.overallScore >= 90 ? "Excellent" : 
                     performanceData.overallScore >= 70 ? "Bon" : "À améliorer"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Web Vitals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Core Web Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coreWebVitals.map((vital, index) => {
                  const metricKey = vital.name.includes('LCP') ? 'lcp' : 
                                   vital.name.includes('FID') ? 'fid' : 'cls';
                  const value = performanceData.metrics[metricKey];
                  const status = getMetricStatus(value, vital.threshold);
                  const Icon = vital.icon;

                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-sm">{vital.name}</div>
                          <div className="text-xs text-muted-foreground">{vital.description}</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${status.color}`}>
                          {value.toFixed(2)}{vital.unit}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                          status.status === "good" ? "bg-green-100 text-green-800" :
                          status.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {status.status === "good" ? "Bon" : 
                           status.status === "warning" ? "À améliorer" : "Mauvais"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Métriques en temps réel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Métriques en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{realTimeMetrics.loadTime.toFixed(0)}ms</div>
                  <div className="text-xs text-muted-foreground">Temps de chargement</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{realTimeMetrics.domContentLoaded.toFixed(0)}ms</div>
                  <div className="text-xs text-muted-foreground">DOM Content Loaded</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{realTimeMetrics.firstContentfulPaint.toFixed(0)}ms</div>
                  <div className="text-xs text-muted-foreground">First Contentful Paint</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ressources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Analyse des Ressources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Résumé</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requêtes totales:</span>
                      <span>{performanceData.resources.totalRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taille totale:</span>
                      <span>{performanceData.resources.totalSize} KB</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Répartition</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Images:</span>
                      <span>{performanceData.resources.images.count} ({performanceData.resources.images.size} KB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scripts:</span>
                      <span>{performanceData.resources.scripts.count} ({performanceData.resources.scripts.size} KB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CSS:</span>
                      <span>{performanceData.resources.stylesheets.count} ({performanceData.resources.stylesheets.size} KB)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunités d'optimisation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Opportunités d'Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.opportunities.map((opp: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{opp.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(opp.impact)}`}>
                          {opp.impact}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opp.description}</p>
                      <div className="text-sm font-medium text-green-600">
                        Économie estimée: {opp.savings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Diagnostics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.diagnostics.map((diag: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{diag.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(diag.impact)}`}>
                          {diag.impact}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{diag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Guide d'optimisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Guide d'Optimisation des Performances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Optimisations critiques</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Optimisez et compressez les images</li>
                <li>• Minifiez CSS, JS et HTML</li>
                <li>• Activez la compression gzip/brotli</li>
                <li>• Utilisez un CDN</li>
                <li>• Implémentez le lazy loading</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Core Web Vitals</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>LCP:</strong> Optimisez les images et le CSS critique</li>
                <li>• <strong>FID:</strong> Réduisez le JavaScript bloquant</li>
                <li>• <strong>CLS:</strong> Définissez les dimensions des images</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Outils de mesure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Lighthouse:</strong> Audit complet</li>
                <li>• <strong>PageSpeed Insights:</strong> Google</li>
                <li>• <strong>WebPageTest:</strong> Analyse détaillée</li>
                <li>• <strong>Chrome DevTools:</strong> Profiling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Surveillance continue</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Configurez des alertes de performance</li>
                <li>• Surveillez les Core Web Vitals</li>
                <li>• Testez sur différents appareils</li>
                <li>• Analysez les données utilisateur réelles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
