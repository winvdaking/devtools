/**
 * Informations sur les codes de touches
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Keyboard, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export function KeycodeInfo() {
  const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null);
  const [lastPressed, setLastPressed] = useState<KeyInfo[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(true);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isListening) return;

    const info: KeyInfo = {
      key: event.key,
      code: event.code,
      keyCode: event.keyCode,
      which: event.which,
      location: event.location,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
    };

    setKeyInfo(info);
    setLastPressed(prev => [info, ...prev.slice(0, 4)]); // Garder les 5 dernières
    
    // Empêcher certaines actions par défaut pour les touches spéciales
    if (['F1', 'F5', 'F11', 'F12'].includes(event.key) || 
        (event.ctrlKey && ['r', 'w', 't'].includes(event.key.toLowerCase()))) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (isListening) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isListening]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getLocationName = (location: number): string => {
    switch (location) {
      case 0: return "Standard";
      case 1: return "Gauche";
      case 2: return "Droite";
      case 3: return "Pavé numérique";
      default: return "Inconnu";
    }
  };

  const getKeyDescription = (key: string, code: string): string => {
    if (key === ' ') return "Espace";
    if (key === 'Enter') return "Entrée";
    if (key === 'Tab') return "Tabulation";
    if (key === 'Escape') return "Échap";
    if (key === 'Backspace') return "Retour arrière";
    if (key === 'Delete') return "Supprimer";
    if (key.startsWith('Arrow')) return `Flèche ${key.replace('Arrow', '').toLowerCase()}`;
    if (key.startsWith('F') && /^F\d+$/.test(key)) return `Touche de fonction ${key}`;
    if (code.startsWith('Digit')) return `Chiffre ${key}`;
    if (code.startsWith('Key')) return `Lettre ${key.toUpperCase()}`;
    return key;
  };

  const commonKeys = [
    { key: 'Enter', code: 'Enter', keyCode: 13, description: 'Entrée' },
    { key: ' ', code: 'Space', keyCode: 32, description: 'Espace' },
    { key: 'Tab', code: 'Tab', keyCode: 9, description: 'Tabulation' },
    { key: 'Escape', code: 'Escape', keyCode: 27, description: 'Échap' },
    { key: 'Backspace', code: 'Backspace', keyCode: 8, description: 'Retour arrière' },
    { key: 'Delete', code: 'Delete', keyCode: 46, description: 'Supprimer' },
    { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38, description: 'Flèche haut' },
    { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, description: 'Flèche bas' },
    { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37, description: 'Flèche gauche' },
    { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, description: 'Flèche droite' },
    { key: 'Shift', code: 'ShiftLeft', keyCode: 16, description: 'Maj (gauche)' },
    { key: 'Control', code: 'ControlLeft', keyCode: 17, description: 'Ctrl (gauche)' },
    { key: 'Alt', code: 'AltLeft', keyCode: 18, description: 'Alt (gauche)' },
    { key: 'Meta', code: 'MetaLeft', keyCode: 91, description: 'Cmd/Win (gauche)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Keyboard className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Keycode info</h2>
        </div>
        <Button
          onClick={() => setIsListening(!isListening)}
          variant={isListening ? "default" : "outline"}
          size="sm"
        >
          {isListening ? "Écoute active" : "Reprendre l'écoute"}
        </Button>
      </div>

      {/* Instructions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Keyboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isListening ? "Appuyez sur n'importe quelle touche" : "Écoute désactivée"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isListening 
                ? "Les informations de la touche s'afficheront ci-dessous"
                : "Cliquez sur 'Reprendre l'écoute' pour continuer"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Informations de la dernière touche */}
      {keyInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Dernière touche pressée</CardTitle>
            <CardDescription>
              {getKeyDescription(keyInfo.key, keyInfo.code)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "key", value: keyInfo.key, description: "Valeur de la touche" },
                { label: "code", value: keyInfo.code, description: "Code physique" },
                { label: "keyCode", value: keyInfo.keyCode.toString(), description: "Code numérique (déprécié)" },
                { label: "which", value: keyInfo.which.toString(), description: "Code which (déprécié)" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="relative">
                    <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                      {item.value === ' ' ? '(espace)' : item.value}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(item.value, item.label)}
                      className="absolute top-1 right-1"
                    >
                      {copied === item.label ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Modificateurs */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Modificateurs</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'altKey', label: 'Alt', active: keyInfo.altKey },
                  { key: 'ctrlKey', label: 'Ctrl', active: keyInfo.ctrlKey },
                  { key: 'metaKey', label: 'Cmd/Win', active: keyInfo.metaKey },
                  { key: 'shiftKey', label: 'Shift', active: keyInfo.shiftKey },
                ].map((mod) => (
                  <div
                    key={mod.key}
                    className={`p-3 rounded-lg text-center text-sm font-medium ${
                      mod.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {mod.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Emplacement</div>
                <div className="text-sm text-muted-foreground">
                  {getLocationName(keyInfo.location)} ({keyInfo.location})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historique */}
      {lastPressed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Dernières touches</CardTitle>
            <CardDescription>
              Historique des {lastPressed.length} dernières touches pressées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lastPressed.map((key, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-medium">
                      {key.key === ' ' ? '(espace)' : key.key}
                    </span>
                    <span className="text-sm text-muted-foreground font-mono">
                      {key.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getKeyDescription(key.key, key.code)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Touches communes */}
      <Card>
        <CardHeader>
          <CardTitle>Touches communes</CardTitle>
          <CardDescription>
            Référence des touches fréquemment utilisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonKeys.map((key, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{key.description}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    key: "{key.key === ' ' ? 'espace' : key.key}" | code: "{key.code}" | keyCode: {key.keyCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Keyboard className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                À propos des keycodes
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Les propriétés keyCode et which sont dépréciées. Utilisez key pour la valeur logique 
                et code pour l'emplacement physique de la touche. Idéal pour les raccourcis clavier et les jeux.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
