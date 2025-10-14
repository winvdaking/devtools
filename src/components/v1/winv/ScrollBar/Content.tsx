"use client";

import React, { useState, useCallback, useMemo } from "react";
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

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const selectedColorClass = useMemo(() => 
    colorOptions.find(c => c.value === selectedColor)?.class || "bg-orange-500 dark:bg-orange-400",
    [selectedColor]
  );

  const generateCode = useMemo(() => {
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
  }, [selectedPosition, selectedColorClass]);

  const generateInstallCode = useMemo(() => {
    return `// Installation des dépendances
npm install framer-motion

// Ou avec yarn
yarn add framer-motion

// Ou avec pnpm
pnpm add framer-motion`;
  }, []);

  const generateSourceCode = useMemo(() => {
    return `/**
 * ScrollBar Component - @winv
 * Composant de scroll personnalisé avec effets de hover et animations fluides
 * Optimisé avec Framer Motion et TypeScript
 */
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Scrollbar({
  className = "",
  currentPosition = "bottom-6 right-6",
  currentColor = "bg-black dark:bg-white",
  currentSize = { width: "w-[300px]", height: "h-[32px]" },
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [showScrollCard, setShowScrollCard] = useState(true);

  // Calcul du scroll du conteneur
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
      
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Gestion du clic pour scroller vers la position
  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;

    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const newScrollY = (newProgress / 100) * scrollHeight;

      scrollContainer.scrollTo({
        top: newScrollY,
        behavior: "smooth",
      });
    }
  }, []);

  // Détection du hover pour effet de proximité
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mousePos = ((e.clientX - rect.left) / rect.width) * 100;
    setMouseX(mousePos);
  }, []);

  return (
          <motion.div
        className={\`fixed \${currentPosition} z-50 \${className}\`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollCard ? 1 : 0, y: showScrollCard ? 0 : 20 }}
        transition={{ duration: 0.25 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMouseX(-100);
        }}
        aria-hidden={!showScrollCard}
        role="presentation"
      >
      <div
        className="bg-stone-50/95 dark:bg-background backdrop-blur-sm px-3 py-1 border border-stone-200/50 dark:border-stone-700/50"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: 16,
        }}
      >
        <div
          className={\`relative \${currentSize.width} \${currentSize.height} flex items-center justify-center cursor-pointer\`}
          onClick={handleTimelineClick}
          onMouseMove={handleMouseMove}
        >
          {/* Traits de la scrollbar */}
          <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
            {useMemo(() => 
              Array.from({ length: 41 }, (_, i) => {
                const markProgress = (i / 40) * 100;
                const dist = Math.abs(markProgress - mouseX);
                const scale = dist < 2 ? 1.8 : dist < 5 ? 1.4 : 1;
                const isBig = i === 0 || i === 40 || i % 5 === 0;
                const isEnd = i === 0 || i === 40;
                const baseHeight = isEnd ? 14 : isBig ? 16 : 12;
                
                return (
                  <div
            key={i}
                    className={\`w-[2px] rounded-full transition-all duration-150 \${
                      isBig
                        ? "bg-black/80 dark:bg-white/80"
                        : "bg-gray-300 dark:bg-gray-500"
                    }\`}
                    style={{
                      height: baseHeight * scale,
                    }}
                  />
                );
              }), [mouseX])
            }
          </div>

          {/* Curseur de progression */}
          <div
            className="absolute pointer-events-none flex items-center"
            style={{
              left: \`\${scrollProgress}%\`,
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
            }}
          >
            <div
              className={\`w-[3px] h-[24px] \${currentColor} rounded-full shadow-md\`}
            />
          </div>
        </div>
      </div>
          </motion.div>
  );
}`;
  }, []);

  return (
    <div className="h-screen overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scroll className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">ScrollBar Component</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Créé par <span className="font-mono text-primary">@winv</span>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Composant ScrollBar interactif</CardTitle>
            <CardDescription>
              ScrollBar personnalisée avec effets de hover, animations fluides et design moderne.
              Optimisée avec Framer Motion et TypeScript. Parfait pour améliorer l'UX.
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
                {generateInstallCode}
              </SyntaxHighlighter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateInstallCode, "install")}
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
                {generateCode}
              </SyntaxHighlighter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateCode, "usage")}
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

        {/* Code source du composant */}
        <Card>
          <CardHeader>
            <CardTitle>Code source du composant</CardTitle>
            <CardDescription>
              Voici le code complet de la ScrollBar.tsx
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
                {generateSourceCode}
              </SyntaxHighlighter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateSourceCode, "source")}
                className="absolute top-2 right-2"
              >
                {copied === "source" ? (
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
        </motion.div>

      {/* ScrollBar de démonstration */}
      <Scrollbar 
        currentPosition={selectedPosition}
        currentColor={selectedColorClass}
        currentSize={{ width: "w-[300px]", height: "h-[30px]" }}
      />
    </div>
  );
};
