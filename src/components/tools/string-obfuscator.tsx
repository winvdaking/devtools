"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Eye, EyeOff, Shuffle, RotateCcw } from "lucide-react";

export function StringObfuscator() {
  const [inputText, setInputText] = useState("Hello World! This is a secret message.");
  const [obfuscationType, setObfuscationType] = useState("base64");
  const [showOriginal, setShowOriginal] = useState(false);

  // Fonctions d'obfuscation
  const obfuscationMethods = {
    base64: {
      name: "Base64",
      description: "Encodage Base64 standard",
      obfuscate: (text: string) => btoa(unescape(encodeURIComponent(text))),
      deobfuscate: (text: string) => {
        try {
          return decodeURIComponent(escape(atob(text)));
        } catch {
          return "Erreur de décodage Base64";
        }
      }
    },
    hex: {
      name: "Hexadécimal",
      description: "Conversion en hexadécimal",
      obfuscate: (text: string) => {
        return text.split('').map(char => 
          char.charCodeAt(0).toString(16).padStart(2, '0')
        ).join('');
      },
      deobfuscate: (text: string) => {
        try {
          return text.match(/.{2}/g)?.map(hex => 
            String.fromCharCode(parseInt(hex, 16))
          ).join('') || "Erreur de décodage hexadécimal";
        } catch {
          return "Erreur de décodage hexadécimal";
        }
      }
    },
    binary: {
      name: "Binaire",
      description: "Conversion en binaire",
      obfuscate: (text: string) => {
        return text.split('').map(char => 
          char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join(' ');
      },
      deobfuscate: (text: string) => {
        try {
          return text.split(' ').map(binary => 
            String.fromCharCode(parseInt(binary, 2))
          ).join('');
        } catch {
          return "Erreur de décodage binaire";
        }
      }
    },
    rot13: {
      name: "ROT13",
      description: "Rotation de 13 caractères",
      obfuscate: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          const code = char.charCodeAt(0);
          const start = code >= 97 ? 97 : 65; // a ou A
          return String.fromCharCode(((code - start + 13) % 26) + start);
        });
      },
      deobfuscate: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          const code = char.charCodeAt(0);
          const start = code >= 97 ? 97 : 65; // a ou A
          return String.fromCharCode(((code - start + 13) % 26) + start);
        });
      }
    },
    caesar: {
      name: "César (ROT3)",
      description: "Chiffrement de César avec décalage de 3",
      obfuscate: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          const code = char.charCodeAt(0);
          const start = code >= 97 ? 97 : 65; // a ou A
          return String.fromCharCode(((code - start + 3) % 26) + start);
        });
      },
      deobfuscate: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          const code = char.charCodeAt(0);
          const start = code >= 97 ? 97 : 65; // a ou A
          return String.fromCharCode(((code - start - 3 + 26) % 26) + start);
        });
      }
    },
    unicode: {
      name: "Unicode",
      description: "Conversion en codes Unicode",
      obfuscate: (text: string) => {
        return text.split('').map(char => 
          `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
        ).join('');
      },
      deobfuscate: (text: string) => {
        try {
          return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => 
            String.fromCharCode(parseInt(hex, 16))
          );
        } catch {
          return "Erreur de décodage Unicode";
        }
      }
    },
    reverse: {
      name: "Inversé",
      description: "Inversion du texte",
      obfuscate: (text: string) => text.split('').reverse().join(''),
      deobfuscate: (text: string) => text.split('').reverse().join('')
    },
    leet: {
      name: "Leet Speak",
      description: "Conversion en Leet Speak",
      obfuscate: (text: string) => {
        const leetMap: { [key: string]: string } = {
          'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7',
          'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7'
        };
        return text.replace(/[aeiostAEIOST]/g, char => leetMap[char] || char);
      },
      deobfuscate: (text: string) => {
        const reverseLeetMap: { [key: string]: string } = {
          '4': 'a', '3': 'e', '1': 'i', '0': 'o', '5': 's', '7': 't'
        };
        return text.replace(/[431057]/g, char => reverseLeetMap[char] || char);
      }
    }
  };

  const obfuscatedText = useMemo(() => {
    const method = obfuscationMethods[obfuscationType as keyof typeof obfuscationMethods];
    return method ? method.obfuscate(inputText) : inputText;
  }, [inputText, obfuscationType]);

  const deobfuscatedText = useMemo(() => {
    const method = obfuscationMethods[obfuscationType as keyof typeof obfuscationMethods];
    return method ? method.deobfuscate(obfuscatedText) : obfuscatedText;
  }, [obfuscatedText, obfuscationType]);

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

  const randomizeText = () => {
    const texts = [
      "Hello World!",
      "This is a secret message.",
      "Obfuscation is fun!",
      "Keep your data secure.",
      "Lorem ipsum dolor sit amet.",
      "JavaScript is awesome!",
      "Security matters.",
      "Encrypt everything!"
    ];
    setInputText(texts[Math.floor(Math.random() * texts.length)]);
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Obfuscateur de Texte
          </CardTitle>
          <CardDescription>
            Obfusquez et déobfusquez du texte avec différentes méthodes de chiffrement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contrôles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Méthode d'obfuscation</label>
              <select
                value={obfuscationType}
                onChange={(e) => setObfuscationType(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {Object.entries(obfuscationMethods).map(([key, method]) => (
                  <option key={key} value={key}>
                    {method.name} - {method.description}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={randomizeText}
                  className="flex items-center gap-2"
                >
                  <Shuffle className="h-4 w-4" />
                  Texte aléatoire
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("")}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Effacer
                </Button>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Texte original</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOriginal(!showOriginal)}
              >
                {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showOriginal ? "Masquer" : "Afficher"}
              </Button>
            </div>
            <Textarea
              value={showOriginal ? inputText : inputText.replace(/./g, '•')}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Saisissez le texte à obfusquer..."
              className="min-h-[100px] font-mono text-sm"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Texte obfusqué</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(obfuscatedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadFile(obfuscatedText, 'obfuscated.txt', 'text/plain')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={obfuscatedText}
              readOnly
              className="min-h-[100px] font-mono text-sm bg-muted"
            />
          </div>

          {/* Vérification */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vérification (déobfusqué)</label>
            <Textarea
              value={deobfuscatedText}
              readOnly
              className="min-h-[100px] font-mono text-sm bg-muted"
            />
            <div className="text-xs text-muted-foreground">
              {deobfuscatedText === inputText ? 
                "✅ Le déobfuscage est correct" : 
                "❌ Erreur dans le déobfuscage"
              }
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(obfuscatedText)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le texte obfusqué
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(obfuscatedText, 'obfuscated.txt', 'text/plain')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(inputText, 'original.txt', 'text/plain')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Télécharger original
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Méthodes d'obfuscation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Encodage</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Base64</strong>: Encodage standard, réversible</li>
                <li>• <strong>Hexadécimal</strong>: Conversion en hex, réversible</li>
                <li>• <strong>Binaire</strong>: Conversion en binaire, réversible</li>
                <li>• <strong>Unicode</strong>: Codes Unicode, réversible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Chiffrement</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>ROT13</strong>: Rotation de 13 caractères</li>
                <li>• <strong>César</strong>: Décalage de 3 caractères</li>
                <li>• <strong>Inversé</strong>: Inversion du texte</li>
                <li>• <strong>Leet Speak</strong>: Remplacement de lettres</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Utilisation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Masquer des informations sensibles</li>
                <li>• Obfusquer du code source</li>
                <li>• Créer des énigmes et jeux</li>
                <li>• Protéger des données temporairement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sécurité</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• ⚠️ Ne pas utiliser pour de vraies données sensibles</li>
                <li>• Ces méthodes sont facilement réversibles</li>
                <li>• Utilisez un vrai chiffrement pour la sécurité</li>
                <li>• Parfait pour l'obfuscation de code</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
