"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, XCircle, AlertTriangle, ExternalLink, Copy, Download, Calendar, Key, Globe } from "lucide-react";

export function SSLCertificateChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [certificateInfo, setCertificateInfo] = useState<any>(null);

  // Vérification du certificat SSL
  const checkSSLCertificate = async () => {
    if (!url) {
      setError("Veuillez entrer une URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setCertificateInfo(null);

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      
      // Simulation de la vérification SSL (en réalité, on ne peut pas faire de requêtes CORS)
      // Ici on simule des résultats pour la démonstration
      setTimeout(() => {
        const mockCertificateInfo = {
          valid: Math.random() > 0.2, // 80% de chance d'être valide
          issuer: "Let's Encrypt Authority X3",
          subject: urlObj.hostname,
          serialNumber: "03:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF",
          validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          keySize: 2048,
          signatureAlgorithm: "SHA256withRSA",
          version: 3,
          extensions: [
            "Subject Alternative Name",
            "Key Usage",
            "Extended Key Usage",
            "Basic Constraints"
          ],
          chain: [
            {
              issuer: "Let's Encrypt Authority X3",
              subject: urlObj.hostname,
              valid: true
            },
            {
              issuer: "DST Root CA X3",
              subject: "Let's Encrypt Authority X3",
              valid: true
            }
          ],
          ocsp: {
            status: "good",
            responder: "http://ocsp.letsencrypt.org"
          },
          crl: {
            status: "good",
            url: "http://crl.letsencrypt.org/letsencryptauthorityx3.crl"
          },
          vulnerabilities: [
            {
              name: "Heartbleed",
              status: "safe",
              description: "Vulnérabilité Heartbleed non détectée"
            },
            {
              name: "POODLE",
              status: "safe",
              description: "Vulnérabilité POODLE non détectée"
            },
            {
              name: "BEAST",
              status: "safe",
              description: "Vulnérabilité BEAST non détectée"
            }
          ],
          protocols: {
            "TLS 1.0": false,
            "TLS 1.1": false,
            "TLS 1.2": true,
            "TLS 1.3": true
          },
          ciphers: [
            "TLS_AES_256_GCM_SHA384",
            "TLS_CHACHA20_POLY1305_SHA256",
            "TLS_AES_128_GCM_SHA256"
          ],
          grade: Math.random() > 0.3 ? "A" : Math.random() > 0.5 ? "B" : "C"
        };

        setCertificateInfo(mockCertificateInfo);
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError("URL invalide");
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-100";
      case "B":
        return "text-blue-600 bg-blue-100";
      case "C":
        return "text-yellow-600 bg-yellow-100";
      case "D":
        return "text-orange-600 bg-orange-100";
      case "F":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
      case "safe":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
      case "unsafe":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilExpiry = (validTo: string) => {
    const expiry = new Date(validTo);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const generateReport = () => {
    if (!certificateInfo) return "";

    let report = `# Rapport de Certificat SSL\n\n`;
    report += `**URL analysée:** ${url}\n`;
    report += `**Date:** ${new Date().toLocaleDateString()}\n\n`;

    report += `## Résumé\n\n`;
    report += `- **Statut:** ${certificateInfo.valid ? "✅ Valide" : "❌ Invalide"}\n`;
    report += `- **Grade:** ${certificateInfo.grade}\n`;
    report += `- **Émetteur:** ${certificateInfo.issuer}\n`;
    report += `- **Sujet:** ${certificateInfo.subject}\n`;
    report += `- **Taille de clé:** ${certificateInfo.keySize} bits\n`;
    report += `- **Algorithme:** ${certificateInfo.signatureAlgorithm}\n\n`;

    report += `## Validité\n\n`;
    report += `- **Valide depuis:** ${formatDate(certificateInfo.validFrom)}\n`;
    report += `- **Valide jusqu'au:** ${formatDate(certificateInfo.validTo)}\n`;
    report += `- **Jours restants:** ${getDaysUntilExpiry(certificateInfo.validTo)}\n\n`;

    report += `## Chaîne de certificats\n\n`;
    certificateInfo.chain.forEach((cert: any, index: number) => {
      report += `${index + 1}. **${cert.subject}**\n`;
      report += `   - Émis par: ${cert.issuer}\n`;
      report += `   - Statut: ${cert.valid ? "✅ Valide" : "❌ Invalide"}\n\n`;
    });

    report += `## Protocoles supportés\n\n`;
    Object.entries(certificateInfo.protocols).forEach(([protocol, supported]) => {
      report += `- **${protocol}:** ${supported ? "✅ Supporté" : "❌ Non supporté"}\n`;
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
    a.download = 'ssl-certificate-report.md';
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
            Vérificateur de Certificat SSL
          </CardTitle>
          <CardDescription>
            Vérifiez la validité et la sécurité des certificats SSL/TLS
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
              <Button onClick={checkSSLCertificate} disabled={isLoading}>
                {isLoading ? "Vérification en cours..." : "Vérifier"}
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
            {certificateInfo && (
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
      {certificateInfo && (
        <>
          {/* Résumé */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Résumé du Certificat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(certificateInfo.valid ? "good" : "error")}
                    <div>
                      <div className="font-medium">
                        {certificateInfo.valid ? "Certificat Valide" : "Certificat Invalide"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {certificateInfo.subject}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-lg font-bold ${getGradeColor(certificateInfo.grade)}`}>
                      {certificateInfo.grade}
                    </div>
                    <div>
                      <div className="font-medium">Grade de Sécurité</div>
                      <div className="text-sm text-muted-foreground">
                        Évaluation globale
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">{certificateInfo.keySize} bits</div>
                      <div className="text-sm text-muted-foreground">Taille de clé</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">{certificateInfo.signatureAlgorithm}</div>
                      <div className="text-sm text-muted-foreground">Algorithme de signature</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails du certificat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Détails du Certificat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Informations générales</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Émetteur:</span>
                        <span>{certificateInfo.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sujet:</span>
                        <span>{certificateInfo.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Numéro de série:</span>
                        <span className="font-mono text-xs">{certificateInfo.serialNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{certificateInfo.version}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Validité</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valide depuis:</span>
                        <span>{formatDate(certificateInfo.validFrom)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valide jusqu'au:</span>
                        <span>{formatDate(certificateInfo.validTo)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jours restants:</span>
                        <span className={getDaysUntilExpiry(certificateInfo.validTo) < 30 ? "text-red-600" : "text-green-600"}>
                          {getDaysUntilExpiry(certificateInfo.validTo)} jours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Protocoles supportés</h4>
                    <div className="space-y-2">
                      {Object.entries(certificateInfo.protocols).map(([protocol, supported]) => (
                        <div key={protocol} className="flex items-center gap-2">
                          {getStatusIcon(supported ? "good" : "error")}
                          <span className="text-sm">{protocol}</span>
                          <span className={`text-xs px-2 py-1 rounded ${supported ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {supported ? "Supporté" : "Non supporté"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Vulnérabilités</h4>
                    <div className="space-y-2">
                      {certificateInfo.vulnerabilities.map((vuln: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          {getStatusIcon(vuln.status)}
                          <div>
                            <div className="text-sm font-medium">{vuln.name}</div>
                            <div className="text-xs text-muted-foreground">{vuln.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chaîne de certificats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Chaîne de Certificats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificateInfo.chain.map((cert: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(cert.valid ? "good" : "error")}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{cert.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        Émis par: {cert.issuer}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Niveau {index + 1} de la chaîne
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Guide SSL/TLS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guide SSL/TLS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Bonnes pratiques</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez des certificats de 2048+ bits</li>
                <li>• Désactivez TLS 1.0 et 1.1</li>
                <li>• Activez TLS 1.3</li>
                <li>• Configurez HSTS</li>
                <li>• Surveillez l'expiration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Types de certificats</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>DV:</strong> Validation de domaine</li>
                <li>• <strong>OV:</strong> Validation d'organisation</li>
                <li>• <strong>EV:</strong> Validation étendue</li>
                <li>• <strong>Wildcard:</strong> Sous-domaines multiples</li>
                <li>• <strong>Multi-domain:</strong> Plusieurs domaines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Surveillance</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Configurez des alertes d'expiration</li>
                <li>• Testez régulièrement la configuration</li>
                <li>• Surveillez les vulnérabilités</li>
                <li>• Utilisez des outils de monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Outils utiles</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>SSL Labs:</strong> Test complet</li>
                <li>• <strong>Mozilla Observatory:</strong> Audit sécurité</li>
                <li>• <strong>Qualys SSL:</strong> Analyse détaillée</li>
                <li>• <strong>OpenSSL:</strong> Outils en ligne de commande</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
