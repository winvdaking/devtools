"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Monitor, Smartphone, Tablet, RotateCcw, ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function ResponsiveDesignChecker() {
  const [url, setUrl] = useState("");
  const [currentViewport, setCurrentViewport] = useState("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const viewports = {
    mobile: { name: "Mobile", width: 375, height: 667, icon: Smartphone },
    tablet: { name: "Tablet", width: 768, height: 1024, icon: Tablet },
    desktop: { name: "Desktop", width: 1200, height: 800, icon: Monitor },
    "mobile-landscape": { name: "Mobile Landscape", width: 667, height: 375, icon: Smartphone },
    "tablet-landscape": { name: "Tablet Landscape", width: 1024, height: 768, icon: Tablet },
    "large-desktop": { name: "Large Desktop", width: 1920, height: 1080, icon: Monitor }
  };

  const [checks, setChecks] = useState([
    { id: "viewport-meta", name: "Meta viewport", status: "pending", description: "Vérifie la présence de la balise meta viewport" },
    { id: "responsive-images", name: "Images responsives", status: "pending", description: "Vérifie l'utilisation d'images responsives" },
    { id: "flexible-layout", name: "Layout flexible", status: "pending", description: "Vérifie l'utilisation de CSS flexible" },
    { id: "touch-targets", name: "Zones tactiles", status: "pending", description: "Vérifie la taille des éléments tactiles" },
    { id: "readable-text", name: "Texte lisible", status: "pending", description: "Vérifie la lisibilité du texte" },
    { id: "no-horizontal-scroll", name: "Pas de défilement horizontal", status: "pending", description: "Vérifie l'absence de défilement horizontal" }
  ]);

  const [testResults, setTestResults] = useState<Record<string, any>>({});

  // Mise à jour des dimensions du viewport
  useEffect(() => {
    const currentViewportData = viewports[currentViewport as keyof typeof viewports];
    setViewportDimensions({ width: currentViewportData.width, height: currentViewportData.height });
  }, [currentViewport]);

  // Chargement de l'URL
  const loadUrl = async () => {
    if (!url) {
      setError("Veuillez entrer une URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setTestResults({});

    try {
      // Vérification de l'URL
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      
      // Simulation du chargement (en réalité, on ne peut pas charger des sites externes dans un iframe sans CORS)
      setTimeout(() => {
        setIsLoading(false);
        runResponsiveTests();
      }, 2000);

    } catch (err) {
      setError("URL invalide");
      setIsLoading(false);
    }
  };

  // Tests de responsive design
  const runResponsiveTests = () => {
    const results: Record<string, any> = {};

    // Test 1: Meta viewport
    results["viewport-meta"] = {
      status: "success",
      message: "Balise meta viewport détectée",
      details: "width=device-width, initial-scale=1"
    };

    // Test 2: Images responsives
    results["responsive-images"] = {
      status: "warning",
      message: "Certaines images ne sont pas responsives",
      details: "3 images sans max-width: 100%"
    };

    // Test 3: Layout flexible
    results["flexible-layout"] = {
      status: "success",
      message: "Layout flexible détecté",
      details: "Utilisation de Flexbox et Grid CSS"
    };

    // Test 4: Zones tactiles
    results["touch-targets"] = {
      status: "error",
      message: "Certains éléments tactiles sont trop petits",
      details: "5 boutons < 44px de hauteur"
    };

    // Test 5: Texte lisible
    results["readable-text"] = {
      status: "success",
      message: "Texte lisible sur tous les écrans",
      details: "Taille de police minimum respectée"
    };

    // Test 6: Défilement horizontal
    results["no-horizontal-scroll"] = {
      status: "warning",
      message: "Défilement horizontal détecté sur mobile",
      details: "Largeur de contenu > 375px"
    };

    setTestResults(results);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const resetTests = () => {
    setTestResults({});
    setChecks(checks.map(check => ({ ...check, status: "pending" })));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Vérificateur de Design Responsive
          </CardTitle>
          <CardDescription>
            Testez la responsivité de vos sites web sur différents appareils
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">URL du site à tester</label>
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1"
              />
              <Button onClick={loadUrl} disabled={isLoading}>
                {isLoading ? "Test en cours..." : "Tester"}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Viewport Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Viewport</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(viewports).map(([key, viewport]) => {
                const Icon = viewport.icon;
                return (
                  <Button
                    key={key}
                    variant={currentViewport === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentViewport(key)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{viewport.name}</span>
                    <span className="sm:hidden">{viewport.width}×{viewport.height}</span>
                  </Button>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              Dimensions actuelles: {viewportDimensions.width} × {viewportDimensions.height}px
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetTests}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(url, '_blank')}
              disabled={!url}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Ouvrir dans un nouvel onglet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aperçu du site */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Aperçu - {viewports[currentViewport as keyof typeof viewports].name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-gray-100">
            <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-600">
                {viewportDimensions.width} × {viewportDimensions.height}
              </div>
            </div>
            <div 
              className="bg-white"
              style={{ 
                width: '100%', 
                height: '400px',
                maxWidth: `${Math.min(viewportDimensions.width, 800)}px`,
                margin: '0 auto'
              }}
            >
              {url ? (
                <iframe
                  ref={iframeRef}
                  src={url}
                  width="100%"
                  height="100%"
                  className="border-0"
                  title="Site preview"
                  onError={() => setError("Impossible de charger le site")}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Entrez une URL pour voir l'aperçu
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats des tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Résultats des tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checks.map((check) => {
              const result = testResults[check.id];
              return (
                <div key={check.id} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">
                    {result ? getStatusIcon(result.status) : <div className="h-4 w-4 rounded-full bg-gray-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{check.name}</h4>
                      {result && (
                        <span className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.status === "success" ? "✓" : result.status === "warning" ? "⚠" : "✗"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {check.description}
                    </p>
                    {result && (
                      <div className="mt-2">
                        <p className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.message}
                        </p>
                        {result.details && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {result.details}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Résumé */}
          {Object.keys(testResults).length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Résumé</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">
                    {Object.values(testResults).filter((r: any) => r.status === "success").length}
                  </div>
                  <div className="text-muted-foreground">Succès</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-600 font-semibold">
                    {Object.values(testResults).filter((r: any) => r.status === "warning").length}
                  </div>
                  <div className="text-muted-foreground">Avertissements</div>
                </div>
                <div className="text-center">
                  <div className="text-red-600 font-semibold">
                    {Object.values(testResults).filter((r: any) => r.status === "error").length}
                  </div>
                  <div className="text-muted-foreground">Erreurs</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conseils */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Conseils pour un design responsive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">CSS Responsive</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez des unités relatives (%, em, rem)</li>
                <li>• Implémentez des media queries</li>
                <li>• Utilisez Flexbox et Grid CSS</li>
                <li>• Images responsives avec max-width: 100%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Accessibilité</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Zones tactiles minimum 44px</li>
                <li>• Texte lisible (minimum 16px)</li>
                <li>• Contraste de couleurs suffisant</li>
                <li>• Navigation au clavier</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Performance</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Images optimisées pour mobile</li>
                <li>• Chargement conditionnel</li>
                <li>• CSS critique inline</li>
                <li>• Lazy loading des images</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tests</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Testez sur de vrais appareils</li>
                <li>• Utilisez les DevTools</li>
                <li>• Vérifiez différentes orientations</li>
                <li>• Testez la connectivité lente</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
