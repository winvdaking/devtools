"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Package, Zap, Palette, Monitor } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScrollBar } from "@/components/v1/winv/ScrollBar";

export default function ScrollBarComponentPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const installCode = `npm install framer-motion`;

  const scrollBarCode = `"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollBarProps {
  activeSection?: number;
  showScrollCard?: boolean;
}

export const ScrollBar = ({ activeSection = 0, showScrollCard = false }: ScrollBarProps = {}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  // Calculer le pourcentage de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setMouseX(percentage);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const scrollTo = (percentage / 100) * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  const timelineMarks = Array.from({ length: 40 }, (_, i) => i);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-stone-50/95 dark:bg-stone-800/95 backdrop-blur-sm px-4 py-1 border border-stone-200/50 dark:border-stone-700/50"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
          borderRadius: "16px",
        }}
      >
        <div
          className="relative w-[240px] h-8 flex items-center justify-center cursor-pointer"
          onClick={handleTimelineClick}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {timelineMarks.map((mark, index) => {
              const markProgress = (mark / (timelineMarks.length - 1)) * 100;
              const isNearMouse = isHovered && Math.abs(markProgress - mouseX) < 4;
              const isBigMark = index === 0 || index === timelineMarks.length - 1 || mark % 5 === 0;

              return (
                <motion.div
                  key={mark}
                  className={\`w-[1.5px] rounded-full transition-all duration-200 \${
                    isBigMark ? "bg-black/50 dark:bg-white/50" : "bg-gray-300 dark:bg-gray-500"
                  }\`}
                  style={{
                    height: isNearMouse ? "24px" : isBigMark ? "16px" : "12px",
                  }}
                  animate={{ scaleY: isNearMouse ? 1.2 : 1 }}
                  transition={{ duration: 0.15 }}
                />
              );
            })}
          </div>

          <div
            className="absolute pointer-events-none flex items-center"
            style={{
              left: \`\${scrollProgress}%\`,
              top: "0",
              bottom: "0",
              transform: "translateX(-50%)"
            }}
          >
            <div className="w-[3px] h-[28px] bg-orange-500 dark:bg-orange-400 rounded-full shadow-md" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};`;

  const usageCode = `import { ScrollBar } from "@/components/v1/winv";

export default function MyPage() {
  return (
    <main>
      {/* Votre contenu ici */}
      <section className="min-h-screen">
        <h1>Section 1</h1>
      </section>
      
      <section className="min-h-screen">
        <h1>Section 2</h1>
      </section>
      
      {/* ScrollBar fixée en bas à droite */}
      <ScrollBar />
    </main>
  );
}`;

  return (
    <div className="w-full">
      <main>
        {/* Section Code */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Installation */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Installation
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(installCode, 0)}
                className="gap-2"
              >
                {copiedIndex === 0 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="bg-[#1e1e1e]">
            <SyntaxHighlighter
              language="bash"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
              }}
            >
              {installCode}
            </SyntaxHighlighter>
          </div>
        </Card>

        {/* Utilisation */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Utilisation
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(usageCode, 1)}
                className="gap-2"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="bg-[#1e1e1e]">
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
              }}
              showLineNumbers
            >
              {usageCode}
            </SyntaxHighlighter>
          </div>
        </Card>

        {/* Code Complet */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Code Source Complet
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(scrollBarCode, 2)}
                className="gap-2"
              >
                {copiedIndex === 2 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="bg-[#1e1e1e] max-h-[600px] overflow-auto">
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
              }}
              showLineNumbers
            >
              {scrollBarCode}
            </SyntaxHighlighter>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Fonctionnalités
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Timeline interactive</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">40 traits verticaux avec animation fluide</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Curseur dynamique</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Indicateur de position orange</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Hover localisé</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Traits s'agrandissent sous la souris</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Thème adaptatif</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Support complet dark/light mode</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Sections supplémentaires pour permettre le scroll */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Exemples d'utilisation
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Cette ScrollBar peut être utilisée dans différents contextes : portfolios, blogs, landing pages,
              ou toute application nécessitant une indication visuelle de progression.
            </p>
            <p>
              Le composant est entièrement personnalisable. Vous pouvez modifier les couleurs, la taille,
              le nombre de traits, et tous les aspects visuels selon vos besoins.
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Personnalisation
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold">Couleurs</h3>
            <p>
              Modifiez les classes Tailwind pour changer les couleurs. Le curseur utilise actuellement
              <code className="px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded mx-2">orange-500</code>
              mais vous pouvez utiliser n'importe quelle couleur de votre palette.
            </p>
            <h3 className="text-xl font-semibold mt-4">Taille et Position</h3>
            <p>
              Ajustez la largeur avec <code className="px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded mx-2">w-[240px]</code>
              et la position avec les classes <code className="px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded mx-2">bottom-4 right-4</code>.
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Performance
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Le composant utilise des techniques d'optimisation pour assurer des performances fluides :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Event listeners nettoyés automatiquement</li>
              <li>Calculs optimisés pour éviter les re-renders</li>
              <li>Transitions CSS natives pour des animations performantes</li>
              <li>Transform GPU-accelerated</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Compatibilité
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Compatible avec :</p>
            <ul className="list-disc list-inside space-y-2">
              <li>React 18+ et Next.js 13+</li>
              <li>Tous les navigateurs modernes</li>
              <li>Mobile et desktop avec support tactile</li>
              <li>Mode sombre et mode clair</li>
            </ul>
          </div>
        </Card>

        <div className="h-32"></div>
      </div>

      {/* Vraie ScrollBar fonctionnelle */}
      <ScrollBar />
    </main>
    </div>
  );
}