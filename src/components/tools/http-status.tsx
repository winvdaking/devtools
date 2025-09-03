/**
 * Codes de statut HTTP
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Copy, Check, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HttpStatus {
  code: number;
  name: string;
  description: string;
  category: string;
  details: string;
}

export function HttpStatusCodes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const httpStatuses: HttpStatus[] = [
    // 1xx - Informational
    { code: 100, name: "Continue", description: "Le serveur a reçu les en-têtes de la requête", category: "1xx - Informational", details: "Le client peut continuer avec le corps de la requête" },
    { code: 101, name: "Switching Protocols", description: "Le serveur accepte de changer de protocole", category: "1xx - Informational", details: "Utilisé pour WebSocket ou HTTP/2" },
    { code: 102, name: "Processing", description: "Le serveur traite la requête", category: "1xx - Informational", details: "WebDAV - traitement en cours" },

    // 2xx - Success
    { code: 200, name: "OK", description: "Requête réussie", category: "2xx - Success", details: "La requête a été traitée avec succès" },
    { code: 201, name: "Created", description: "Ressource créée avec succès", category: "2xx - Success", details: "Nouvelle ressource créée suite à POST/PUT" },
    { code: 202, name: "Accepted", description: "Requête acceptée pour traitement", category: "2xx - Success", details: "Traitement asynchrone accepté" },
    { code: 204, name: "No Content", description: "Succès sans contenu de réponse", category: "2xx - Success", details: "Succès mais pas de contenu à retourner" },
    { code: 206, name: "Partial Content", description: "Contenu partiel retourné", category: "2xx - Success", details: "Utilisé pour les téléchargements par chunks" },

    // 3xx - Redirection
    { code: 300, name: "Multiple Choices", description: "Plusieurs options disponibles", category: "3xx - Redirection", details: "Plusieurs représentations possibles" },
    { code: 301, name: "Moved Permanently", description: "Ressource déplacée définitivement", category: "3xx - Redirection", details: "Redirection permanente - mise à jour des liens" },
    { code: 302, name: "Found", description: "Ressource trouvée ailleurs temporairement", category: "3xx - Redirection", details: "Redirection temporaire" },
    { code: 304, name: "Not Modified", description: "Ressource non modifiée", category: "3xx - Redirection", details: "Utiliser la version en cache" },
    { code: 307, name: "Temporary Redirect", description: "Redirection temporaire avec même méthode", category: "3xx - Redirection", details: "Redirection temporaire stricte" },
    { code: 308, name: "Permanent Redirect", description: "Redirection permanente avec même méthode", category: "3xx - Redirection", details: "Redirection permanente stricte" },

    // 4xx - Client Error
    { code: 400, name: "Bad Request", description: "Requête malformée", category: "4xx - Client Error", details: "Syntaxe de requête incorrecte" },
    { code: 401, name: "Unauthorized", description: "Authentification requise", category: "4xx - Client Error", details: "Identifiants manquants ou invalides" },
    { code: 403, name: "Forbidden", description: "Accès interdit", category: "4xx - Client Error", details: "Pas d'autorisation pour cette ressource" },
    { code: 404, name: "Not Found", description: "Ressource introuvable", category: "4xx - Client Error", details: "La ressource demandée n'existe pas" },
    { code: 405, name: "Method Not Allowed", description: "Méthode HTTP non autorisée", category: "4xx - Client Error", details: "Méthode non supportée pour cette ressource" },
    { code: 409, name: "Conflict", description: "Conflit avec l'état actuel", category: "4xx - Client Error", details: "Conflit avec l'état de la ressource" },
    { code: 410, name: "Gone", description: "Ressource définitivement supprimée", category: "4xx - Client Error", details: "Ressource qui existait mais plus maintenant" },
    { code: 422, name: "Unprocessable Entity", description: "Entité non traitable", category: "4xx - Client Error", details: "Données valides mais non traitables" },
    { code: 429, name: "Too Many Requests", description: "Trop de requêtes", category: "4xx - Client Error", details: "Limite de taux dépassée" },

    // 5xx - Server Error
    { code: 500, name: "Internal Server Error", description: "Erreur interne du serveur", category: "5xx - Server Error", details: "Erreur générique côté serveur" },
    { code: 501, name: "Not Implemented", description: "Fonctionnalité non implémentée", category: "5xx - Server Error", details: "Méthode non reconnue par le serveur" },
    { code: 502, name: "Bad Gateway", description: "Réponse invalide du serveur amont", category: "5xx - Server Error", details: "Proxy/Gateway a reçu une réponse invalide" },
    { code: 503, name: "Service Unavailable", description: "Service temporairement indisponible", category: "5xx - Server Error", details: "Surcharge ou maintenance" },
    { code: 504, name: "Gateway Timeout", description: "Timeout du serveur amont", category: "5xx - Server Error", details: "Proxy/Gateway n'a pas reçu de réponse à temps" },
    { code: 505, name: "HTTP Version Not Supported", description: "Version HTTP non supportée", category: "5xx - Server Error", details: "Version HTTP de la requête non supportée" },
  ];

  const filteredStatuses = httpStatuses.filter(
    (status) =>
      status.code.toString().includes(searchTerm) ||
      status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(httpStatuses.map(status => status.category))).sort();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusesByCategory = (category: string) => {
    return filteredStatuses.filter(status => status.category === category);
  };

  const getStatusColor = (code: number): string => {
    if (code < 200) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (code < 300) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (code < 400) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (code < 500) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Globe className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">HTTP status codes</h2>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par code, nom ou description..."
              className="pl-10"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredStatuses.length} codes de statut trouvés sur {httpStatuses.length}
          </div>
        </CardContent>
      </Card>

      {/* Résultats par catégorie */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryStatuses = getStatusesByCategory(category);
          if (categoryStatuses.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {categoryStatuses.length} code{categoryStatuses.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryStatuses.map((status) => (
                    <div
                      key={status.code}
                      className="flex items-start justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-mono font-medium ${getStatusColor(status.code)}`}>
                            {status.code}
                          </span>
                          <div>
                            <div className="font-medium">{status.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {status.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground ml-0 pl-0">
                          {status.details}
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(status.code.toString(), `code-${status.code}`)}
                        >
                          {copied === `code-${status.code}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStatuses.length === 0 && searchTerm && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-muted-foreground">
              Aucun code de statut trouvé pour "{searchTerm}"
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résumé des catégories */}
      <Card>
        <CardHeader>
          <CardTitle>Catégories de codes de statut</CardTitle>
          <CardDescription>
            Signification des différentes gammes de codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { range: "1xx", name: "Informational", description: "Réponses informatives", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { range: "2xx", name: "Success", description: "Requêtes réussies", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
              { range: "3xx", name: "Redirection", description: "Actions supplémentaires requises", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
              { range: "4xx", name: "Client Error", description: "Erreurs côté client", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
              { range: "5xx", name: "Server Error", description: "Erreurs côté serveur", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
            ].map((cat) => (
              <div key={cat.range} className="text-center p-4 rounded-lg border">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-mono font-medium mb-2 ${cat.color}`}>
                  {cat.range}
                </div>
                <div className="font-medium text-sm">{cat.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {cat.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Globe className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                À propos des codes de statut HTTP
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Les codes de statut HTTP indiquent si une requête HTTP a été traitée avec succès. 
                Ils sont essentiels pour le debugging des APIs et applications web.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
