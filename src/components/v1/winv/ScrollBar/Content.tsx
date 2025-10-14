"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scroll, Copy, Check, Download, Code, Palette, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Scrollbar from "./ScrollBar";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ContentProps {
  setProgress: (v: number) => void;
}

export const Content = ({ setProgress }: ContentProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedPosition, setSelectedPosition] = useState("bottom-6 right-6");

  const colorOptions = [
    { value: "orange", label: "Orange", class: "bg-orange-500 dark:bg-orange-400" },
    { value: "blue", label: "Bleu", class: "bg-blue-500 dark:bg-blue-400" },
    { value: "green", label: "Vert", class: "bg-green-500 dark:bg-green-400" },
    { value: "purple", label: "Violet", class: "bg-purple-500 dark:bg-purple-400" },
    { value: "red", label: "Rouge", class: "bg-red-500 dark:bg-red-400" },
  ];

  const positionOptions = [
    { value: "bottom-6 right-6", label: "Bas droite" },
    { value: "bottom-6 left-6", label: "Bas gauche" },
    { value: "bottom-6 left-1/2 -translate-x-1/2", label: "Bas centre" },
    { value: "top-6 right-6", label: "Haut droite" },
    { value: "top-6 left-6", label: "Haut gauche" },
  ];

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCode = () => {
    const selectedColorClass = colorOptions.find(c => c.value === selectedColor)?.class || "bg-orange-500 dark:bg-orange-400";
    
    return `import Scrollbar from "@/components/v1/winv/ScrollBar/ScrollBar";

export default function MyComponent() {
  return (
    <div className="relative">
      <div className="h-screen overflow-y-scroll">
        {/* Contenu scrollable */}
      </div>
      
      {/* ScrollBar */}
      <Scrollbar 
        currentPosition="${selectedPosition}"
        currentColor="${selectedColorClass}"
        currentSize={{ width: "w-[300px]", height: "h-[30px]" }}
      />
    </div>
  );
}`;
  };

  const generateInstallCode = () => {
    return `// Installation des dépendances
npm install framer-motion

// Ou avec yarn
yarn add framer-motion

// Ou avec pnpm
pnpm add framer-motion`;
  };

  return (
    <div className="h-screen overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
      >
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Scroll className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">ScrollBar Component</h1>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Composant ScrollBar interactif</CardTitle>
            <CardDescription>
              Une ScrollBar personnalisée avec effets de hover, animations fluides et design moderne.
              Parfait pour améliorer l'expérience utilisateur de vos applications.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Démo en direct */}
        <Card>
          <CardHeader>
            <CardTitle>Démo en direct</CardTitle>
            <CardDescription>
              Testez la ScrollBar ci-dessous - survolez les traits et cliquez pour naviguer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-background dark:to-muted rounded-lg flex items-center justify-center text-lg font-medium">
              <div className="text-center space-y-2">
                <Scroll className="h-12 w-12 mx-auto text-orange-500" />
                <p>Zone de démonstration</p>
                <p className="text-sm text-muted-foreground">Utilisez la ScrollBar en bas à droite</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Personnalisez l'apparence de votre ScrollBar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Couleur
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`h-8 rounded-md border-2 transition-all ${
                        selectedColor === color.value
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-full h-full rounded ${color.class}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Position
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {positionOptions.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code d'installation */}
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>
              Installez les dépendances nécessaires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SyntaxHighlighter
                language="bash"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1E1E1E',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {generateInstallCode()}
              </SyntaxHighlighter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateInstallCode(), "install")}
                className="absolute top-2 right-2"
              >
                {copied === "install" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Code d'utilisation</CardTitle>
            <CardDescription>
              Copiez ce code pour intégrer la ScrollBar dans votre projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1E1E1E',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {generateCode()}
              </SyntaxHighlighter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateCode(), "usage")}
                className="absolute top-2 right-2"
              >
                {copied === "usage" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fonctionnalités */}
        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités</CardTitle>
            <CardDescription>
              Découvrez toutes les capacités de ce composant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">🎨 Design</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Animations fluides avec Framer Motion</li>
                  <li>• Effet de hover sur les traits</li>
                  <li>• Design moderne et élégant</li>
                  <li>• Support du mode sombre</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">⚡ Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Optimisé avec useMemo et useCallback</li>
                  <li>• Scroll smooth natif</li>
                  <li>• Responsive et adaptatif</li>
                  <li>• TypeScript ready</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Espace pour la démo */}
        <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-background dark:to-muted rounded-lg flex items-center justify-center text-lg font-medium">
          <div className="text-center space-y-2">
            <Code className="h-12 w-12 mx-auto text-blue-500" />
            <p>Section de démonstration</p>
            <p className="text-sm text-muted-foreground">Scroll pour voir la ScrollBar en action</p>
          </div>
        </div>

        <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 dark:from-background dark:to-muted rounded-lg flex items-center justify-center text-lg font-medium">
          <div className="text-center space-y-2">
            <Download className="h-12 w-12 mx-auto text-green-500" />
            <p>Prêt à utiliser</p>
            <p className="text-sm text-muted-foreground">Copiez le code et intégrez-le dans votre projet</p>
          </div>
        </div>
      </motion.div>

      {/* ScrollBar de démonstration */}
      <Scrollbar 
        currentPosition={selectedPosition}
        currentColor={colorOptions.find(c => c.value === selectedColor)?.class || "bg-orange-500 dark:bg-orange-400"}
        currentSize={{ width: "w-[300px]", height: "h-[30px]" }}
      />
    </div>
  );
};
