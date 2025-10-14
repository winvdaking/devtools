/**
 * Générateur de crontab
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/v1/winv";

export function CrontabGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [command, setCommand] = useState("");
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: "Chaque minute", cron: "* * * * *", desc: "Exécute chaque minute" },
    {
      name: "Chaque heure",
      cron: "0 * * * *",
      desc: "Exécute au début de chaque heure",
    },
    {
      name: "Quotidien (minuit)",
      cron: "0 0 * * *",
      desc: "Exécute tous les jours à minuit",
    },
    {
      name: "Quotidien (9h)",
      cron: "0 9 * * *",
      desc: "Exécute tous les jours à 9h",
    },
    {
      name: "Hebdomadaire",
      cron: "0 0 * * 0",
      desc: "Exécute tous les dimanches à minuit",
    },
    {
      name: "Mensuel",
      cron: "0 0 1 * *",
      desc: "Exécute le 1er de chaque mois à minuit",
    },
    {
      name: "Annuel",
      cron: "0 0 1 1 *",
      desc: "Exécute le 1er janvier à minuit",
    },
    {
      name: "Jours ouvrés (9h)",
      cron: "0 9 * * 1-5",
      desc: "Exécute du lundi au vendredi à 9h",
    },
    {
      name: "Toutes les 15 min",
      cron: "*/15 * * * *",
      desc: "Exécute toutes les 15 minutes",
    },
    {
      name: "Toutes les 6h",
      cron: "0 */6 * * *",
      desc: "Exécute toutes les 6 heures",
    },
  ];

  const generateDescription = (
    min: string,
    hr: string,
    dom: string,
    mon: string,
    dow: string
  ): string => {
    const parts: string[] = [];

    // Minute
    if (min === "*") parts.push("chaque minute");
    else if (min.includes("/"))
      parts.push(`toutes les ${min.split("/")[1]} minutes`);
    else if (min.includes(",")) parts.push(`aux minutes ${min}`);
    else if (min.includes("-"))
      parts.push(`de la minute ${min.split("-")[0]} à ${min.split("-")[1]}`);
    else parts.push(`à la minute ${min}`);

    // Heure
    if (hr === "*") parts.push("chaque heure");
    else if (hr.includes("/"))
      parts.push(`toutes les ${hr.split("/")[1]} heures`);
    else if (hr.includes(",")) parts.push(`aux heures ${hr}`);
    else if (hr.includes("-"))
      parts.push(`de ${hr.split("-")[0]}h à ${hr.split("-")[1]}h`);
    else parts.push(`à ${hr}h`);

    // Jour du mois
    if (dom !== "*") {
      if (dom.includes("/")) parts.push(`tous les ${dom.split("/")[1]} jours`);
      else if (dom.includes(",")) parts.push(`les jours ${dom} du mois`);
      else if (dom.includes("-"))
        parts.push(`du ${dom.split("-")[0]} au ${dom.split("-")[1]} du mois`);
      else parts.push(`le ${dom} du mois`);
    }

    // Mois
    if (mon !== "*") {
      const months = [
        "",
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];
      if (mon.includes(",")) {
        const monthNames = mon
          .split(",")
          .map((m) => months[parseInt(m)] || m)
          .join(", ");
        parts.push(`en ${monthNames}`);
      } else if (mon.includes("-")) {
        const start = months[parseInt(mon.split("-")[0])] || mon.split("-")[0];
        const end = months[parseInt(mon.split("-")[1])] || mon.split("-")[1];
        parts.push(`de ${start} à ${end}`);
      } else {
        parts.push(`en ${months[parseInt(mon)] || mon}`);
      }
    }

    // Jour de la semaine
    if (dow !== "*") {
      const days = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
      ];
      if (dow === "1-5") parts.push("du lundi au vendredi");
      else if (dow === "6,0") parts.push("le week-end");
      else if (dow.includes(",")) {
        const dayNames = dow
          .split(",")
          .map((d) => days[parseInt(d)] || d)
          .join(", ");
        parts.push(`le ${dayNames}`);
      } else if (dow.includes("-")) {
        const start = days[parseInt(dow.split("-")[0])] || dow.split("-")[0];
        const end = days[parseInt(dow.split("-")[1])] || dow.split("-")[1];
        parts.push(`du ${start} au ${end}`);
      } else {
        parts.push(`le ${days[parseInt(dow)] || dow}`);
      }
    }

    return parts.join(", ");
  };

  useEffect(() => {
    const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(cron);
    setDescription(
      generateDescription(minute, hour, dayOfMonth, month, dayOfWeek)
    );
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const loadPreset = (preset: (typeof presets)[0]) => {
    const parts = preset.cron.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFullCrontabEntry = () => {
    return command ? `${cronExpression} ${command}` : cronExpression;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Clock className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Crontab generator</h2>
      </div>

      {/* Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles prédéfinis</CardTitle>
          <CardDescription>
            Cliquez sur un modèle pour l'appliquer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="default"
                size="sm"
                onClick={() => loadPreset(preset)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {preset.cron}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {preset.desc}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration manuelle */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration manuelle</CardTitle>
          <CardDescription>
            Définissez chaque champ de l'expression cron
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minute (0-59)</label>
              <Input
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                * = chaque minute
                <br />
                */5 = toutes les 5 min
                <br />
                0,30 = à 0 et 30
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Heure (0-23)</label>
              <Input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                * = chaque heure
                <br />
                */6 = toutes les 6h
                <br />
                9-17 = de 9h à 17h
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Jour (1-31)</label>
              <Input
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                * = chaque jour
                <br />
                1 = le 1er
                <br />
                */2 = tous les 2 jours
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mois (1-12)</label>
              <Input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                * = chaque mois
                <br />
                1 = janvier
                <br />
                1,7 = jan et juillet
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Jour sem. (0-7)</label>
              <Input
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                * = chaque jour
                <br />
                0,7 = dimanche
                <br />
                1-5 = lun-ven
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Commande à exécuter (optionnel)
            </label>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="/usr/bin/backup.sh"
              className="font-mono"
            />
          </div>
        </CardContent>
      </Card>

      {/* Résultat */}
      <Card>
        <CardHeader>
          <CardTitle>Expression cron générée</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="p-4 bg-muted rounded-lg font-mono text-lg break-all">
              {getFullCrontabEntry()}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => copyToClipboard(getFullCrontabEntry())}
              className="absolute top-2 right-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Minute</div>
              <div className="font-mono font-bold">{minute}</div>
            </div>
            <div className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Heure</div>
              <div className="font-mono font-bold">{hour}</div>
            </div>
            <div className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Jour</div>
              <div className="font-mono font-bold">{dayOfMonth}</div>
            </div>
            <div className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Mois</div>
              <div className="font-mono font-bold">{month}</div>
            </div>
            <div className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Jour sem.</div>
              <div className="font-mono font-bold">{dayOfWeek}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle>Syntaxe cron</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Caractères spéciaux :</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code className="font-mono">*</code> - Toutes les valeurs
                  </li>
                  <li>
                    <code className="font-mono">,</code> - Séparateur de valeurs
                  </li>
                  <li>
                    <code className="font-mono">-</code> - Plage de valeurs
                  </li>
                  <li>
                    <code className="font-mono">/</code> - Intervalle
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Exemples :</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code className="font-mono">0 2 * * *</code> - Tous les
                    jours à 2h
                  </li>
                  <li>
                    <code className="font-mono">*/15 * * * *</code> - Toutes les
                    15 min
                  </li>
                  <li>
                    <code className="font-mono">0 9-17 * * 1-5</code> - 9h-17h,
                    lun-ven
                  </li>
                  <li>
                    <code className="font-mono">0 0 1 */3 *</code> - Tous les 3
                    mois
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                À propos de cron
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Cron est un planificateur de tâches Unix. L'expression générée
                peut être utilisée dans votre crontab pour automatiser des
                scripts et commandes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
