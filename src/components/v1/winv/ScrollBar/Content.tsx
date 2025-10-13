"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Zap } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";
import { ScrollBar } from "./ScrollBar";

export const Content = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const usageCode = `import { ScrollBar } from "@/components/v1/winv/ScrollBar";

export default function MyPage() {
  return (
    <main>
      {/* Votre contenu existant ici */}
      <div className="h-screen bg-blue-100">Section 1</div>
      <div className="h-screen bg-green-100">Section 2</div>
      <div className="h-screen bg-red-100">Section 3</div>
      
      {/* ScrollBar autonome - s'adapte automatiquement */}
      <ScrollBar />
    </main>
  );
}`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        id="hero" 
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
                ScrollBar
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Scrollbar horizontale autonome qui s'adapte automatiquement à n'importe quelle page. 
              Aucune configuration requise, fonctionne out-of-the-box.
            </p>
          </div>
        </div>
      </div>

      {/* Contenu supplémentaire pour forcer le scroll */}
      <div 
        id="preview" 
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Preview Interactive
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Section 1</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Faites défiler pour voir la scrollbar en action. Elle s'adapte automatiquement aux sections.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Section 2</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cliquez sur les marques orange pour naviguer directement vers les sections.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div
        id="features"
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cliquez sur la timeline pour naviguer rapidement dans le contenu.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Sections</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Les marques orange indiquent les sections et permettent la navigation directe.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Responsive</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  S'adapte automatiquement à la taille de l'écran et au contenu.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div
        id="preview"
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Preview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Faites défiler cette page pour voir la scrollbar en action
            </p>
          </div>
          
          <Card className="p-8 border-0 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                ScrollBar Interactive
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                La scrollbar apparaît automatiquement en bas à droite de l'écran. 
                Cliquez dessus pour naviguer rapidement dans le contenu.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>• Cliquez pour naviguer</span>
                <span>• Survolez pour voir les effets</span>
                <span>• S'adapte automatiquement</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Usage Section */}
      <div 
        id="usage" 
        data-section 
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Utilisation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
             

            </p>
          </div>
          
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gray-800 dark:bg-gray-900 p-6 border-b border-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">MyPage.tsx</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(usageCode, 0)}
                  className="gap-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-600 dark:border-gray-500 text-white"
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
            <div className="bg-gray-900 dark:bg-gray-950">
              <SyntaxHighlighter
 gray-500       language="typescript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "2rem",
                  background: "transparent",
                  fontSize: "16px",
                  fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', monospace",
                }}
                showLineNumbers
              >
                {usageCode}
              </SyntaxHighlighter>
            </div>
          </Card>
        </div>
      </div>

      {/* Contenu supplémentaire pour forcer le scroll */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Contenu supplémentaire pour la preview
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Section 1</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ce contenu permet de rendre la page suffisamment longue pour que la scrollbar s'affiche.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Section 2</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  La scrollbar apparaît automatiquement quand la page dépasse la hauteur de l'écran.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Plus de contenu
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Card 1</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Card 2</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Card 3</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ut enim ad minim vendark:bg-gray-600exercitation ullamco.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Dernière section
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Maintenant vous devriez voir la scrollbar en bas à droite de l'écran. 
              Faites défiler ou cliquez dessus pour naviguer !
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cliquez sur la timeline pour naviguer rapidement dans le contenu.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Sections</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Les marques orange indiquent les sections et permettent la navigation directe.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Responsive</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  S'adapte automatiquement à la taille de l'écran et au contenu.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div 
        id="demo" 
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Démonstration
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              La scrollbar est maintenant visible en bas à droite ! 
              Faites défiler ou cliquez sur les marques pour naviguer entre les sections.
            </p>
          </div>
        </div>
      </div>

      {/* ScrollBar Component - Affiché en bas à droite */}
      <ScrollBar />
    </div>
  );
};