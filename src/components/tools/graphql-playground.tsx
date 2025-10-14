/**
 * Composant GraphQL Playground - Test et exploration d'APIs GraphQL
 */
"use client";

import { useState } from "react";
import { Play, RotateCcw, Info } from "lucide-react";
import Button from "@/components/v1/winv/Button/Button";

interface GraphQLResponse {
  data?: any;
  errors?: any[];
  extensions?: any;
}

export default function GraphQLPlayground() {
  const [endpoint, setEndpoint] = useState("https://api.github.com/graphql");
  const [query, setQuery] = useState(`query {
  viewer {
    login
    name
    repositories(first: 5) {
      nodes {
        name
        description
        stargazerCount
      }
    }
  }
}`);
  const [variables, setVariables] = useState("{\n  \n}");
  const [headers, setHeaders] = useState(
    '{\n  "Authorization": "Bearer YOUR_TOKEN"\n}'
  );
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async () => {
    if (!endpoint.trim()) {
      setError("Veuillez saisir une URL d'endpoint");
      return;
    }

    if (!query.trim()) {
      setError("Veuillez saisir une requête GraphQL");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let parsedHeaders = {};
      let parsedVariables = {};

      try {
        parsedHeaders = JSON.parse(headers);
      } catch (e) {
        setError("Format des en-têtes JSON invalide");
        setLoading(false);
        return;
      }

      try {
        parsedVariables = JSON.parse(variables);
      } catch (e) {
        setError("Format des variables JSON invalide");
        setLoading(false);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
        body: JSON.stringify({
          query,
          variables: parsedVariables,
        }),
      });

      const data = await response.json();
      setResponse(data);

      if (data.errors) {
        setError("La requête GraphQL contient des erreurs");
      }
    } catch (err) {
      setError(
        `Erreur lors de l'exécution: ${
          err instanceof Error ? err.message : "Erreur inconnue"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setQuery("");
    setVariables("{\n  \n}");
    setHeaders('{\n  "Authorization": "Bearer YOUR_TOKEN"\n}');
    setResponse(null);
    setError(null);
  };

  const loadExample = (example: string) => {
    switch (example) {
      case "github":
        setEndpoint("https://api.github.com/graphql");
        setQuery(`query {
  viewer {
    login
    name
    repositories(first: 5) {
      nodes {
        name
        description
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
      }
    }
  }
}`);
        setHeaders('{\n  "Authorization": "Bearer YOUR_GITHUB_TOKEN"\n}');
        break;
      case "countries":
        setEndpoint("https://countries.trevorblades.com/graphql");
        setQuery(`query {
  countries {
    name
    capital
    currency
    languages {
      name
    }
  }
}`);
        setHeaders("{\n  \n}");
        break;
      case "rickandmorty":
        setEndpoint("https://rickandmortyapi.com/graphql");
        setQuery(`query {
  characters {
    results {
      id
      name
      status
      species
      image
    }
  }
}`);
        setHeaders("{\n  \n}");
        break;
    }
  };

  const formatJSON = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-kantumruy-pro mb-2">
          GraphQL Playground
        </h1>
        <p className="text-muted-foreground">
          Testez et explorez vos APIs GraphQL avec un éditeur interactif
        </p>
      </div>

      {/* Exemples rapides */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="font-medium mb-3">Exemples rapides</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => loadExample("github")}
            className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-md hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
            variant="secondary"
            size="sm"
          >
            GitHub API
          </Button>
          <Button
            onClick={() => loadExample("countries")}
            className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            variant="secondary"
            size="sm"
          >
            Countries API
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => loadExample("rickandmorty")}
            className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            Rick & Morty API
          </Button>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoint et en-têtes */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Endpoint GraphQL
            </label>
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://api.example.com/graphql"
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              En-têtes HTTP
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder='{"Authorization": "Bearer token"}'
              rows={4}
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            />
          </div>
        </div>

        {/* Variables */}
        <div>
          <label className="block text-sm font-medium mb-2">Variables</label>
          <textarea
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            placeholder='{"key": "value"}'
            rows={4}
            className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
          />
        </div>
      </div>

      {/* Requête GraphQL */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Requête GraphQL
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="query { ... }"
          rows={8}
          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex items-center space-x-3">
        <Button
          variant="primary"
          onClick={executeQuery}
          disabled={loading}
          className="space-x-2 px-4 py-2 bg-primary dark:bg-primary text-primary-foreground dark:text-foreground rounded-lg hover:bg-primary/90 dark:hover:bg-primary/75 disabled:opacity-50 transition-colors"
          icon={Play}
        >
          <span>{loading ? "Exécution..." : "Exécuter la requête"}</span>
        </Button>

        <Button
          onClick={clearAll}
          variant="secondary"
          className="space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          icon={RotateCcw}
        >
          <span>Effacer</span>
        </Button>
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <strong>Erreur:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {/* Réponse */}
      {response && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Réponse</h3>

          {response.errors && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Erreurs GraphQL
              </h4>
              <pre className="text-sm text-yellow-800 dark:text-yellow-200 overflow-x-auto">
                {formatJSON(response.errors)}
              </pre>
            </div>
          )}

          {response.data && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Données
              </h4>
              <pre className="text-sm text-green-800 dark:text-green-200 overflow-x-auto">
                {formatJSON(response.data)}
              </pre>
            </div>
          )}

          {response.extensions && (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                Extensions
              </h4>
              <pre className="text-sm text-orange-800 dark:text-orange-200 overflow-x-auto">
                {formatJSON(response.extensions)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Conseils */}
      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
              Conseils d'utilisation
            </h3>
            <ul className="space-y-1 text-orange-800 dark:text-orange-200">
              <li>
                • Utilisez l'API GitHub avec un token personnel pour plus de
                requêtes
              </li>
              <li>
                • Les variables GraphQL doivent être au format JSON valide
              </li>
              <li>
                • Les en-têtes HTTP permettent d'ajouter l'authentification
              </li>
              <li>
                • Utilisez l'introspection pour explorer le schéma GraphQL
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
