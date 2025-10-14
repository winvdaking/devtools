/**
 * Outil d'analyse de tokens JWT
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, Check, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/v1/winv";

interface JwtParts {
  header: any;
  payload: any;
  signature: string;
  isValid: boolean;
  error?: string;
}

export function JwtParser() {
  const [inputJwt, setInputJwt] = useState("");
  const [parsedJwt, setParsedJwt] = useState<JwtParts | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const parseJwt = (token: string) => {
    if (!token.trim()) {
      setParsedJwt(null);
      setError("");
      return;
    }

    try {
      const parts = token.split(".");
      
      if (parts.length !== 3) {
        throw new Error("Le JWT doit avoir exactement 3 parties séparées par des points");
      }

      // Décoder le header
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      
      // Décoder le payload
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      
      // La signature reste encodée
      const signature = parts[2];

      setParsedJwt({
        header,
        payload,
        signature,
        isValid: true
      });
      setError("");
    } catch (err) {
      setError((err as Error).message || "JWT invalide");
      setParsedJwt(null);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    // JWT d'exemple (non signé, pour démonstration)
    const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2ODM4MjMzMjIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setInputJwt(sampleJwt);
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString("fr-FR");
  };

  const isExpired = (exp?: number): boolean => {
    if (!exp) return false;
    return Date.now() > exp * 1000;
  };

  React.useEffect(() => {
    parseJwt(inputJwt);
  }, [inputJwt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Key className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">JWT parser</h2>
      </div>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>Token JWT</CardTitle>
          <CardDescription>
            Collez votre token JWT pour l'analyser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputJwt}
            onChange={(e) => setInputJwt(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="min-h-[120px] font-mono text-sm"
          />
          
          <div className="flex justify-between items-center">
            <Button onClick={loadSample} variant="default" size="sm">
              JWT d'exemple
            </Button>
            {error && (
              <span className="text-sm text-destructive">{error}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {parsedJwt && (
        <div className="space-y-4">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Header</CardTitle>
                  <CardDescription>
                    Métadonnées du token
                  </CardDescription>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(parsedJwt.header, null, 2), "header")}
                >
                  {copied === "header" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {JSON.stringify(parsedJwt.header, null, 2)}
              </pre>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Algorithme</div>
                  <div className="text-sm text-muted-foreground">
                    {parsedJwt.header.alg || "Non spécifié"}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-sm text-muted-foreground">
                    {parsedJwt.header.typ || "Non spécifié"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payload */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payload</CardTitle>
                  <CardDescription>
                    Données du token
                  </CardDescription>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(parsedJwt.payload, null, 2), "payload")}
                >
                  {copied === "payload" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {JSON.stringify(parsedJwt.payload, null, 2)}
              </pre>

              {/* Claims standards */}
              <div className="mt-4 space-y-3">
                <h4 className="font-medium">Claims standards détectés :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "sub", label: "Sujet", value: parsedJwt.payload.sub },
                    { key: "iss", label: "Émetteur", value: parsedJwt.payload.iss },
                    { key: "aud", label: "Audience", value: parsedJwt.payload.aud },
                    { key: "exp", label: "Expiration", value: parsedJwt.payload.exp ? formatTimestamp(parsedJwt.payload.exp) : undefined },
                    { key: "nbf", label: "Pas avant", value: parsedJwt.payload.nbf ? formatTimestamp(parsedJwt.payload.nbf) : undefined },
                    { key: "iat", label: "Émis à", value: parsedJwt.payload.iat ? formatTimestamp(parsedJwt.payload.iat) : undefined },
                    { key: "jti", label: "ID JWT", value: parsedJwt.payload.jti },
                  ].filter(claim => claim.value).map((claim) => (
                    <div key={claim.key} className="space-y-1">
                      <div className="text-sm font-medium">{claim.label}</div>
                      <div className="text-sm text-muted-foreground break-all">
                        {claim.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statut d'expiration */}
                {parsedJwt.payload.exp && (
                  <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                    isExpired(parsedJwt.payload.exp) 
                      ? "bg-destructive/10 border border-destructive/20" 
                      : "bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800"
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      isExpired(parsedJwt.payload.exp) ? "text-destructive" : "text-green-600"
                    }`} />
                    <span className={`text-sm font-medium ${
                      isExpired(parsedJwt.payload.exp) ? "text-destructive" : "text-green-800 dark:text-green-200"
                    }`}>
                      {isExpired(parsedJwt.payload.exp) ? "Token expiré" : "Token valide"}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Signature */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Signature</CardTitle>
                  <CardDescription>
                    Signature encodée (vérification côté serveur requise)
                  </CardDescription>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => copyToClipboard(parsedJwt.signature, "signature")}
                >
                  {copied === "signature" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all">
                {parsedJwt.signature}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Avertissement de sécurité
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Ce parser décode uniquement le header et le payload. La vérification de la signature 
                doit être effectuée côté serveur avec la clé secrète appropriée. Ne jamais faire confiance 
                à un JWT sans vérification de signature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
