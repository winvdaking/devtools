/**
 * Formateur et prettifier SQL
 */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Copy, Check, FileText, Minus, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";

export function SqlFormatter() {
  const [inputSql, setInputSql] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [minifiedSql, setMinifiedSql] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  const sampleQueries = [
    {
      name: "SELECT simple",
      sql: "SELECT id,name,email FROM users WHERE active=1 ORDER BY name ASC;"
    },
    {
      name: "JOIN complexe",
      sql: "SELECT u.id,u.name,o.order_date,o.total FROM users u INNER JOIN orders o ON u.id=o.user_id WHERE o.status='completed' AND o.total>100 ORDER BY o.total DESC LIMIT 10;"
    },
    {
      name: "INSERT multiple",
      sql: "INSERT INTO products (name,price,category,created_at) VALUES ('Laptop',999.99,'Electronics',NOW()),('Mouse',29.99,'Accessories',NOW()),('Keyboard',79.99,'Accessories',NOW());"
    },
    {
      name: "UPDATE avec JOIN",
      sql: "UPDATE users u SET u.last_login=NOW(),u.login_count=u.login_count+1 FROM user_sessions s WHERE u.id=s.user_id AND s.session_id='abc123';"
    }
  ];

  const sqlKeywords = [
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER',
    'TABLE', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'JOIN', 'LEFT', 'RIGHT',
    'INNER', 'OUTER', 'ON', 'GROUP', 'BY', 'HAVING', 'ORDER', 'LIMIT', 'OFFSET',
    'UNION', 'ALL', 'DISTINCT', 'AS', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AND', 'OR', 'NOT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'COUNT', 'SUM', 'AVG',
    'MAX', 'MIN', 'DISTINCT', 'TOP', 'ROWNUM', 'ROW_NUMBER', 'RANK', 'DENSE_RANK'
  ];

  const formatSql = (sql: string) => {
    if (!sql.trim()) {
      setError("Veuillez entrer du code SQL");
      return;
    }

    try {
      setError("");
      let formatted = sql.trim();

      // Convertir en minuscules si demandé
      if (!uppercase) {
        formatted = formatted.toLowerCase();
      }

      // Ajouter des espaces autour des opérateurs
      formatted = formatted
        .replace(/([=<>!+\-*/%])/g, ' $1 ')
        .replace(/\s+/g, ' ')
        .trim();

      // Formater les mots-clés SQL
      sqlKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${uppercase ? keyword : keyword.toLowerCase()}\\b`, 'gi');
        formatted = formatted.replace(regex, uppercase ? keyword : keyword.toLowerCase());
      });

      // Ajouter des retours à la ligne et indentation
      const indent = ' '.repeat(indentSize);
      formatted = formatted
        .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|HAVING|ORDER|LIMIT|OFFSET|UNION|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER)\b/gi, '\n$1')
        .replace(/\b(AND|OR)\b/gi, '\n$1')
        .replace(/\b(INNER|LEFT|RIGHT|FULL)\s+JOIN\b/gi, '\n$1 JOIN')
        .replace(/\b(UNION|UNION ALL)\b/gi, '\n$1\n')
        .replace(/\b(INSERT|UPDATE|DELETE)\s+INTO\b/gi, '\n$1 INTO')
        .replace(/\b(CREATE|DROP|ALTER)\s+(TABLE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER)\b/gi, '\n$1 $2')
        .replace(/,\s*/g, ',\n' + indent)
        .replace(/\(\s*/g, '(\n' + indent)
        .replace(/\s*\)/g, '\n)')
        .replace(/\s*;\s*$/g, ';');

      // Nettoyer les lignes vides multiples
      formatted = formatted.replace(/\n\s*\n/g, '\n').trim();

      setFormattedSql(formatted);
    } catch (err) {
      setError("Erreur lors du formatage du SQL");
    }
  };

  const minifySql = (sql: string) => {
    if (!sql.trim()) {
      setError("Veuillez entrer du code SQL");
      return;
    }

    try {
      setError("");
      let minified = sql.trim();

      // Supprimer les commentaires
      minified = minified.replace(/--.*$/gm, '');
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');

      // Supprimer les espaces et retours à la ligne
      minified = minified
        .replace(/\s+/g, ' ')
        .replace(/\s*([=<>!+\-*/%])\s*/g, '$1')
        .replace(/\s*([,;()])\s*/g, '$1')
        .trim();

      setMinifiedSql(minified);
    } catch (err) {
      setError("Erreur lors de la minification du SQL");
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = (sample: typeof sampleQueries[0]) => {
    setInputSql(sample.sql);
    setFormattedSql("");
    setMinifiedSql("");
    setError("");
  };

  const clearAll = () => {
    setInputSql("");
    setFormattedSql("");
    setMinifiedSql("");
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">SQL Formatter</h2>
      </div>

      {/* Exemples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples SQL</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQueries.map((sample) => (
              <Button
                key={sample.name}
                variant="default"
                size="sm"
                onClick={() => loadSample(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div className="w-full">
                  <div className="font-medium mb-1">{sample.name}</div>
                  <div className="text-xs text-muted-foreground font-mono break-all text-left">
                    {sample.sql}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Personnalisez le formatage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Taille d'indentation</label>
              <Input
                type="number"
                value={indentSize}
                onChange={(e) => setIndentSize(Math.max(1, Math.min(8, parseInt(e.target.value) || 2)))}
                min={1}
                max={8}
                className="w-20"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Mots-clés en majuscules</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SQL d'entrée */}
      <Card>
        <CardHeader>
          <CardTitle>SQL d'entrée</CardTitle>
          <CardDescription>
            Collez votre requête SQL ici
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            placeholder="SELECT * FROM users WHERE active = 1;"
            className="min-h-[200px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => formatSql(inputSql)} className="flex-1"
              icon={FileText}>
              Formater
            </Button>
            <Button onClick={() => minifySql(inputSql)} variant="default"
              icon={Minus}>
              Minifier
            </Button>
            <Button onClick={clearAll} variant="default" icon={Zap}>
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

      {/* SQL formaté */}
      {formattedSql && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>SQL formaté</CardTitle>
                <CardDescription>
                  Requête formatée avec indentation
                </CardDescription>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => copyToClipboard(formattedSql, "formatted")}
                icon={copied === "formatted" ? Check : Copy}
              >
                Copier
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {formattedSql}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SQL minifié */}
      {minifiedSql && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>SQL minifié</CardTitle>
                <CardDescription>
                  Requête optimisée pour la production
                </CardDescription>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => copyToClipboard(minifiedSql, "minified")}
              >
                {copied === "minified" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto break-all">
                {minifiedSql}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      {(formattedSql || minifiedSql) && (
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {inputSql.length}
                </div>
                <div className="text-xs text-muted-foreground">Caractères</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {inputSql.split(/\s+/).length}
                </div>
                <div className="text-xs text-muted-foreground">Mots</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {inputSql.split(';').length - 1}
                </div>
                <div className="text-xs text-muted-foreground">Requêtes</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold text-primary">
                  {sqlKeywords.filter(keyword =>
                    inputSql.toUpperCase().includes(keyword)
                  ).length}
                </div>
                <div className="text-xs text-muted-foreground">Mots-clés</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Database className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Formateur SQL
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Formatez et minifiez vos requêtes SQL pour une meilleure lisibilité
                ou pour optimiser la production. Supporte SELECT, INSERT, UPDATE, DELETE,
                JOIN et autres clauses SQL courantes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
