/**
 * Outil de formatage JSON
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Braces, Copy, Check, Minimize, Maximize, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/v1/winv";

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError("");
    } catch (err) {
      setError("JSON invalide : " + (err as Error).message);
      setOutputJson("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError("");
    } catch (err) {
      setError("JSON invalide : " + (err as Error).message);
      setOutputJson("");
    }
  };

  const copyToClipboard = async () => {
    if (outputJson) {
      await navigator.clipboard.writeText(outputJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    const sample = {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001",
      },
      hobbies: ["reading", "swimming", "coding"],
      isActive: true,
    };
    setInputJson(JSON.stringify(sample));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Braces className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">JSON Formatter</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>JSON d'entrée</CardTitle>
            <CardDescription>Collez votre JSON brut ici</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder='{"key": "value", "array": [1, 2, 3]}'
              className="min-h-[300px] font-mono text-sm"
            />

            <div className="flex flex-wrap gap-2">
              <Button onClick={formatJson} className="flex-1" icon={Maximize}>
                Formater
              </Button>
              <Button onClick={minifyJson} variant="default" className="flex-1" icon={Minimize}>
                Minifier
              </Button>
              <Button onClick={loadSample} variant="default" icon={FileText}>
                Exemple
              </Button> 
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle>JSON formaté</CardTitle>
            <CardDescription>Résultat du formatage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <Textarea
                  value={outputJson}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted"
                  placeholder="Le JSON formaté apparaîtra ici..."
                />
                {outputJson && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
