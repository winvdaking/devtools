/**
 * Outil de formatage de dates
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/v1/winv";

export function DateFormatter() {
  const [inputDate, setInputDate] = useState("");
  const [locale, setLocale] = useState("fr-FR");
  const [formatType, setFormatType] = useState("long");
  const [formattedDate, setFormattedDate] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inputDate) {
      try {
        const date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
          const options: Intl.DateTimeFormatOptions =
            formatType === "long"
              ? {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                }
              : {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                };

          setFormattedDate(date.toLocaleDateString(locale, options));
        } else {
          setFormattedDate("Date invalide");
        }
      } catch (error) {
        setFormattedDate("Erreur de formatage");
      }
    } else {
      setFormattedDate("");
    }
  }, [inputDate, locale, formatType]);

  const copyToClipboard = async () => {
    if (formattedDate) {
      await navigator.clipboard.writeText(formattedDate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const setCurrentDate = () => {
    const now = new Date();
    setInputDate(now.toISOString().split("T")[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Date Formatter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Saisissez une date et choisissez le format de sortie
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date d'entrée</label>
              <div className="flex space-x-2">
                <Input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                />
                <Button
                  variant="default"
                  onClick={setCurrentDate}
                  className="px-3"
                >
                  Aujourd'hui
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Locale</label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="fr-FR">Français (France)</option>
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="de-DE">Deutsch</option>
                <option value="es-ES">Español</option>
                <option value="it-IT">Italiano</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="long"
                  checked={formatType === "long"}
                  onChange={(e) => setFormatType(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">Format long</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="short"
                  checked={formatType === "short"}
                  onChange={(e) => setFormatType(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">Format court</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {formattedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="font-mono text-lg">{formattedDate}</span>
              <Button
                variant="default"
                size="sm"
                onClick={copyToClipboard}
                className="ml-4"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
