/**
 * Générateur d'authentification basique
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Copy, Check, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BasicAuthGenerator() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authString, setAuthString] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const generateBasicAuth = () => {
    if (!username.trim() || !password.trim()) {
      setAuthString("");
      return;
    }

    const credentials = `${username}:${password}`;
    const encoded = btoa(credentials);
    setAuthString(`Basic ${encoded}`);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    setUsername("admin");
    setPassword("password123");
  };

  const clearAll = () => {
    setUsername("");
    setPassword("");
    setAuthString("");
  };

  React.useEffect(() => {
    generateBasicAuth();
  }, [username, password]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Basic auth generator</h2>
      </div>

      {/* Formulaire de saisie */}
      <Card>
        <CardHeader>
          <CardTitle>Identifiants</CardTitle>
          <CardDescription>
            Saisissez le nom d'utilisateur et le mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom d'utilisateur</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  className="font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button onClick={loadSample} variant="outline" size="sm">
                Exemple
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
                Effacer
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {username && password
                ? "✓ Prêt à générer"
                : "Saisissez les identifiants"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultat */}
      {authString && (
        <Card>
          <CardHeader>
            <CardTitle>Header d'authentification</CardTitle>
            <CardDescription>Header HTTP Authorization généré</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                Authorization: {authString}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(`Authorization: ${authString}`, "header")
                }
                className="absolute top-2 right-2"
              >
                {copied === "header" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Valeur seule</label>
                <div className="relative">
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                    {authString}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(authString, "value")}
                    className="absolute top-1 right-1"
                  >
                    {copied === "value" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Encodé Base64</label>
                <div className="relative">
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                    {authString.replace("Basic ", "")}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        authString.replace("Basic ", ""),
                        "base64"
                      )
                    }
                    className="absolute top-1 right-1"
                  >
                    {copied === "base64" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exemples d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples d'utilisation</CardTitle>
          <CardDescription>
            Comment utiliser l'authentification basique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium mb-1">cURL</div>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                curl -H "Authorization: {authString || "Basic <token>"}"
                https://api.example.com
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-1">JavaScript (Fetch)</div>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                {`fetch('https://api.example.com', {
  headers: {
    'Authorization': '${authString || "Basic <token>"}'
  }
})`}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-1">Postman</div>
              <div className="p-3 bg-muted rounded-lg text-sm">
                Authorization → Type: Basic Auth → Username:{" "}
                {username || "<username>"} → Password:{" "}
                {password ? "••••••••" : "<password>"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                Sécurité importante
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                L'authentification basique transmet les identifiants en Base64
                (facilement décodable). Utilisez toujours HTTPS en production et
                préférez des méthodes plus sécurisées comme OAuth2 ou JWT.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
