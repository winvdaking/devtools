"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Type, Palette, Settings } from "lucide-react";

export function AsciiArt() {
  const [text, setText] = useState("HELLO");
  const [font, setFont] = useState("standard");
  const [customText, setCustomText] = useState("");

  // Base de données d'art ASCII simple
  const asciiFonts = {
    standard: {
      A: `    ██    
   ████   
  ██  ██  
 ████████ 
 ██    ██ 
 ██    ██ `,
      B: `███████  
 ██   ██ 
 ██████  
 ██   ██ 
 ██   ██ 
 ██████  `,
      C: ` ██████  
██    ██ 
██       
██       
██    ██ 
 ██████  `,
      D: `███████  
 ██   ██ 
 ██   ██ 
 ██   ██ 
 ██   ██ 
 ██████  `,
      E: `███████  
██       
███████  
██       
██       
███████  `,
      F: `███████  
██       
███████  
██       
██       
██       `,
      G: ` ██████  
██    ██ 
██       
██  ████ 
██    ██ 
 ██████  `,
      H: `██   ██ 
██   ██ 
███████ 
██   ██ 
██   ██ 
██   ██ `,
      I: `███████ 
   ██   
   ██   
   ██   
   ██   
███████ `,
      J: `███████ 
     ██ 
     ██ 
     ██ 
██   ██ 
 █████  `,
      K: `██   ██ 
██  ██  
██ ██   
████    
██ ██   
██  ██  `,
      L: `██       
██       
██       
██       
██       
███████  `,
      M: `██    ██ 
███  ███ 
████████ 
██ ██ ██ 
██    ██ 
██    ██ `,
      N: `██    ██ 
███   ██ 
████  ██ 
██ ██ ██ 
██  ████ 
██   ███ `,
      O: ` ██████  
██    ██ 
██    ██ 
██    ██ 
██    ██ 
 ██████  `,
      P: `███████  
██   ██ 
███████  
██       
██       
██       `,
      Q: ` ██████  
██    ██ 
██    ██ 
██ ██ ██ 
██  ████ 
 ██████  `,
      R: `███████  
██   ██ 
███████  
██ ██    
██  ██   
██   ██  `,
      S: ` ██████  
██       
 ██████  
      ██ 
██    ██ 
 ██████  `,
      T: `███████ 
   ██   
   ██   
   ██   
   ██   
   ██   `,
      U: `██   ██ 
██   ██ 
██   ██ 
██   ██ 
██   ██ 
 █████  `,
      V: `██   ██ 
██   ██ 
██   ██ 
 ██ ██  
  ███   
   █    `,
      W: `██   ██ 
██   ██ 
██   ██ 
██ ██ ██ 
████████ 
███  ███ `,
      X: `██   ██ 
 ██ ██  
  ███   
  ███   
 ██ ██  
██   ██ `,
      Y: `██   ██ 
 ██ ██  
  ███   
   ██   
   ██   
   ██   `,
      Z: `███████ 
    ██  
   ██   
  ██    
 ██     
███████ `,
      " ": `        
        
        
        
        
        `,
      "!": `  ██   
  ██   
  ██   
  ██   
      
  ██   `,
      "?": ` ██████  
██    ██ 
      ██ 
    ██   
   ██    
   ██    `,
      ".": `        
        
        
        
 ████   
 ████   `,
      ",": `        
        
        
 ████   
 ████   
  ██    `,
      ":": `        
  ██    
        
  ██    
        
        `,
      ";": `        
  ██    
        
  ██    
 ██     
        `,
      "0": ` ██████  
██    ██ 
██ ██ ██ 
██ ██ ██ 
██    ██ 
 ██████  `,
      "1": `   ██    
 ████    
   ██    
   ██    
   ██    
 ██████  `,
      "2": ` ██████  
      ██ 
 ██████  
██       
██       
███████  `,
      "3": ` ██████  
      ██ 
 ██████  
      ██ 
██    ██ 
 ██████  `,
      "4": `██    ██ 
██    ██ 
██    ██ 
███████ 
      ██ 
      ██ `,
      "5": `███████  
██       
███████  
      ██ 
██    ██ 
 ██████  `,
      "6": ` ██████  
██       
███████  
██    ██ 
██    ██ 
 ██████  `,
      "7": `███████ 
      ██ 
     ██  
    ██   
   ██    
  ██     `,
      "8": ` ██████  
██    ██ 
 ██████  
██    ██ 
██    ██ 
 ██████  `,
      "9": ` ██████  
██    ██ 
██    ██ 
 ███████ 
      ██ 
 ██████  `
    },
    block: {
      A: `██████  
██  ██  
██████  
██  ██  
██  ██  
██  ██  `,
      B: `██████  
██  ██  
██████  
██  ██  
██  ██  
██████  `,
      C: `██████  
██      
██      
██      
██      
██████  `,
      D: `██████  
██  ██  
██  ██  
██  ██  
██  ██  
██████  `,
      E: `██████  
██      
██████  
██      
██      
██████  `,
      F: `██████  
██      
██████  
██      
██      
██      `,
      G: `██████  
██      
██  ████ 
██  ██  
██  ██  
██████  `,
      H: `██  ██  
██  ██  
██████  
██  ██  
██  ██  
██  ██  `,
      I: `██████  
  ██    
  ██    
  ██    
  ██    
██████  `,
      J: `██████  
    ██  
    ██  
    ██  
██  ██  
██████  `,
      K: `██  ██  
██ ██   
████    
██ ██   
██  ██  
██  ██  `,
      L: `██      
██      
██      
██      
██      
██████  `,
      M: `██  ██  
██████  
██  ██  
██  ██  
██  ██  
██  ██  `,
      N: `██  ██  
███ ██  
██████  
██ ███  
██  ██  
██  ██  `,
      O: `██████  
██  ██  
██  ██  
██  ██  
██  ██  
██████  `,
      P: `██████  
██  ██  
██████  
██      
██      
██      `,
      Q: `██████  
██  ██  
██  ██  
██ ███  
██  ██  
██████  `,
      R: `██████  
██  ██  
██████  
██ ██   
██  ██  
██  ██  `,
      S: `██████  
██      
██████  
    ██  
██  ██  
██████  `,
      T: `██████  
  ██    
  ██    
  ██    
  ██    
  ██    `,
      U: `██  ██  
██  ██  
██  ██  
██  ██  
██  ██  
██████  `,
      V: `██  ██  
██  ██  
██  ██  
██  ██  
 ████   
  ██    `,
      W: `██  ██  
██  ██  
██  ██  
██  ██  
██████  
██  ██  `,
      X: `██  ██  
 ████   
  ██    
  ██    
 ████   
██  ██  `,
      Y: `██  ██  
██  ██  
 ████   
  ██    
  ██    
  ██    `,
      Z: `██████  
    ██  
   ██   
  ██    
 ██     
██████  `,
      " ": `      
      
      
      
      
      `,
      "!": `  ██   
  ██   
  ██   
  ██   
      
  ██   `,
      "?": `██████  
██  ██  
    ██  
  ██   
  ██   
  ██    `,
      ".": `      
      
      
      
 ████   
 ████   `,
      ",": `      
      
      
 ████   
 ████   
  ██    `,
      ":": `      
  ██    
      
  ██    
      
      `,
      ";": `      
  ██    
      
  ██    
 ██     
      `,
      "0": `██████  
██  ██  
██  ██  
██  ██  
██  ██  
██████  `,
      "1": `  ██    
 ████    
  ██    
  ██    
  ██    
██████  `,
      "2": `██████  
    ██  
██████  
██      
██      
██████  `,
      "3": `██████  
    ██  
██████  
    ██  
██  ██  
██████  `,
      "4": `██  ██  
██  ██  
██████  
    ██  
    ██  
    ██  `,
      "5": `██████  
██      
██████  
    ██  
██  ██  
██████  `,
      "6": `██████  
██      
██████  
██  ██  
██  ██  
██████  `,
      "7": `██████  
    ██  
   ██   
  ██    
 ██     
██      `,
      "8": `██████  
██  ██  
██████  
██  ██  
██  ██  
██████  `,
      "9": `██████  
██  ██  
██  ██  
██████  
    ██  
██████  `
    }
  };

  // Fonction pour générer l'art ASCII
  const generateAsciiArt = (inputText: string, selectedFont: string) => {
    const fontData = asciiFonts[selectedFont as keyof typeof asciiFonts];
    if (!fontData) return "Police non trouvée";

    const lines = Array(6).fill("");
    
    for (const char of inputText.toUpperCase()) {
      const charArt = fontData[char as keyof typeof fontData] || fontData[" "];
      const charLines = charArt.split('\n');
      
      for (let i = 0; i < 6; i++) {
        lines[i] += (charLines[i] || "") + "  ";
      }
    }
    
    return lines.join('\n');
  };

  const asciiOutput = useMemo(() => generateAsciiArt(text, font), [text, font]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const predefinedTexts = [
    "HELLO",
    "WORLD",
    "ASCII",
    "ART",
    "DEV",
    "TOOLS",
    "2024",
    "COOL"
  ];

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Générateur d'Art ASCII
          </CardTitle>
          <CardDescription>
            Créez de l'art ASCII à partir de votre texte avec différentes polices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contrôles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Texte</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Saisissez votre texte..."
                maxLength={20}
              />
              <div className="text-xs text-muted-foreground">
                Maximum 20 caractères
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Police</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="standard">Standard</option>
                <option value="block">Block</option>
              </select>
            </div>
          </div>

          {/* Textes prédéfinis */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Textes prédéfinis</label>
            <div className="flex flex-wrap gap-2">
              {predefinedTexts.map((predefinedText) => (
                <Button
                  key={predefinedText}
                  variant="default"
                  size="sm"
                  onClick={() => setText(predefinedText)}
                >
                  {predefinedText}
                </Button>
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Aperçu</label>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => copyToClipboard(asciiOutput)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => downloadFile(asciiOutput, 'ascii-art.txt', 'text/plain')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-gray-900 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap min-h-[200px]">
              {asciiOutput}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(asciiOutput)}
              className="flex items-center gap-2"
              icon={Copy}>
              Copier l'art ASCII
            </Button>
            <Button
              variant="default"
              onClick={() => downloadFile(asciiOutput, 'ascii-art.txt', 'text/plain')}
              className="flex items-center gap-2"
              icon={Download}
            >
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Guide d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Caractères supportés</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Lettres A-Z (majuscules)</li>
                <li>• Chiffres 0-9</li>
                <li>• Symboles: ! ? . , : ;</li>
                <li>• Espaces</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Polices disponibles</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Standard</strong>: Style classique</li>
                <li>• <strong>Block</strong>: Style bloc plus épais</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Conseils</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez des textes courts pour un meilleur rendu</li>
                <li>• Les majuscules donnent un meilleur résultat</li>
                <li>• Parfait pour les titres et signatures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Utilisation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Copiez le résultat dans vos documents</li>
                <li>• Utilisez dans les commentaires de code</li>
                <li>• Parfait pour les README et documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
