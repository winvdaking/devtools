/**
 * Composant Générateur de QR Code
 */
"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/v1/winv";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Download, Copy, RefreshCw, Link, Mail, Phone, MapPin, Calendar, User, AlertTriangle, Image as ImageIcon, X } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeOptions {
  size: number;
  margin: number;
  color: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoImage: string | null;
  logoSize: number;
  excavate: boolean; // Creuser le QR code autour du logo
}

export function QRGenerator() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 256,
    margin: 4,
    color: "#000000",
    backgroundColor: "#ffffff",
    errorCorrectionLevel: 'H', // Niveau élevé pour permettre l'ajout d'un logo
    logoImage: null,
    logoSize: 60,
    excavate: true // Activer le creusement par défaut
  });
  const qrRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Templates prédéfinis
  const templates = [
    {
      name: "URL",
      icon: Link,
      placeholder: "https://example.com",
      prefix: ""
    },
    {
      name: "Email",
      icon: Mail,
      placeholder: "contact@example.com",
      prefix: "mailto:"
    },
    {
      name: "Téléphone",
      icon: Phone,
      placeholder: "+33123456789",
      prefix: "tel:"
    },
    {
      name: "Localisation",
      icon: MapPin,
      placeholder: "Paris, France",
      prefix: "geo:48.8566,2.3522,100"
    },
    {
      name: "Événement",
      icon: Calendar,
      placeholder: "Titre de l'événement",
      prefix: "BEGIN:VEVENT\nSUMMARY:"
    },
    {
      name: "Contact",
      icon: User,
      placeholder: "Nom,Prénom,Email,Téléphone",
      prefix: "BEGIN:VCARD\nVERSION:3.0\nFN:"
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [grayscaleLogoUrl, setGrayscaleLogoUrl] = useState<string | null>(null);

  // Convertir une image en noir et blanc
  const convertToGrayscale = useCallback((imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject('Impossible de créer le contexte canvas');
          return;
        }

        // Dessiner l'image
        ctx.drawImage(img, 0, 0);
        
        // Obtenir les données de l'image
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Convertir en noir et blanc
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = gray;     // R
          data[i + 1] = gray; // G
          data[i + 2] = gray; // B
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => reject('Erreur de chargement de l\'image');
      img.src = imageUrl;
    });
  }, []);

  // Télécharger le QR Code
  const downloadQRCode = useCallback(() => {
    if (!qrRef.current || !text.trim()) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = options.size;
    canvas.height = options.size;

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }, [text, options.size]);

  // Copier le QR Code dans le presse-papiers
  const copyQRCode = useCallback(async () => {
    if (!qrRef.current || !text.trim()) return;

    try {
      const svg = qrRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = options.size;
      canvas.height = options.size;

      img.onload = async () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
            }
          });
        }
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  }, [text, options.size]);

  // Appliquer un template
  const applyTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setText("");
  };

  // Gérer l'upload d'une image et la convertir en noir et blanc
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string;
      try {
        // Convertir l'image en noir et blanc
        const bwImageUrl = await convertToGrayscale(imageUrl);
        setGrayscaleLogoUrl(bwImageUrl);
        setOptions(prev => ({ ...prev, logoImage: imageUrl }));
      } catch (error) {
        console.error('Erreur lors de la conversion en noir et blanc:', error);
      }
    };
    reader.readAsDataURL(file);
  }, [convertToGrayscale]);

  // Supprimer l'image logo
  const removeLogoImage = useCallback(() => {
    setOptions(prev => ({ ...prev, logoImage: null }));
    setGrayscaleLogoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <QrCode className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-playfair">
            Générateur de QR Code
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Générez des QR Codes personnalisés pour vos URLs, contacts, événements et plus encore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contenu</h3>
            
            {/* Templates */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de contenu</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Button
                      key={template.name}
                      variant={selectedTemplate.name === template.name ? "default" : "secondary"}
                      size="sm"
                      onClick={() => applyTemplate(template)}
                      className="justify-start"
                      icon={Icon}
                    >
                      {template.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Champ de texte */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {selectedTemplate.name === "Contact" ? "Données du contact" : "Texte"}
              </label>
              {selectedTemplate.name === "Contact" ? (
                <Textarea
                  placeholder={selectedTemplate.placeholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  placeholder={selectedTemplate.placeholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              )}
            </div>

          </div>

          {/* Options d'apparence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Apparence</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Taille</label>
                <Input
                  type="number"
                  min="100"
                  max="1000"
                  value={options.size}
                  onChange={(e) => setOptions(prev => ({ ...prev, size: parseInt(e.target.value) || 256 }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Marge</label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={options.margin}
                  onChange={(e) => setOptions(prev => ({ ...prev, margin: parseInt(e.target.value) || 4 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Couleur</label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={options.color}
                    onChange={(e) => setOptions(prev => ({ ...prev, color: e.target.value }))}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={options.color}
                    onChange={(e) => setOptions(prev => ({ ...prev, color: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Arrière-plan</label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={options.backgroundColor}
                    onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={options.backgroundColor}
                    onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Niveau de correction d'erreur</label>
              <select
                value={options.errorCorrectionLevel}
                onChange={(e) => setOptions(prev => ({ ...prev, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' }))}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="L">Faible (7%)</option>
                <option value="M">Moyen (15%)</option>
                <option value="Q">Élevé (25%)</option>
                <option value="H">Très élevé (30%) - Recommandé avec logo</option>
              </select>
            </div>
          </div>

          {/* Logo au centre */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-semibold">Logo au centre (optionnel)</h3>
            
            {options.logoImage ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-2 border border-border rounded-md bg-muted">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-sm">Image chargée</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeLogoImage}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Taille du logo</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="range"
                      min="30"
                      max="100"
                      value={options.logoSize}
                      onChange={(e) => setOptions(prev => ({ ...prev, logoSize: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{options.logoSize}px</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="excavate"
                    checked={options.excavate}
                    onChange={(e) => setOptions(prev => ({ ...prev, excavate: e.target.checked }))}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor="excavate" className="text-sm font-medium cursor-pointer">
                    Creuser le QR code autour du logo (recommandé)
                  </label>
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">
                    ℹ️ Le logo est automatiquement converti en noir et blanc et intégré dans la structure du QR Code. 
                    Le mode "excavate" creuse le QR code autour de l'image (comme Valorant Champions ou Coinbase One) 
                    pour une meilleure scannabilité. Le QR Code se met à jour en temps réel.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    icon={ImageIcon}
                  >
                    <span>
                      Ajouter un logo
                    </span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground">
                  Ajoutez une image qui sera convertie en noir et blanc et intégrée dans le QR Code 
                  (le QR code sera creusé autour de l'image).
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Aperçu */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Aperçu</h3>
          
          <div className="flex flex-col items-center space-y-4">
            {text.trim() ? (
              <>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <QRCodeSVG
                    ref={qrRef}
                    value={selectedTemplate.prefix + text}
                    size={options.size}
                    level={options.errorCorrectionLevel}
                    marginSize={options.margin}
                    fgColor={options.color}
                    bgColor={options.backgroundColor}
                    imageSettings={grayscaleLogoUrl ? {
                      src: grayscaleLogoUrl,
                      height: options.logoSize,
                      width: options.logoSize,
                      excavate: options.excavate,
                    } : undefined}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={downloadQRCode} variant="default" icon={Download}>
                    Télécharger
                  </Button>
                  <Button onClick={copyQRCode} variant="default" icon={Copy}>
                    Copier
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <QrCode className="h-16 w-16 mb-4 opacity-50" />
                <p>Entrez du texte pour générer votre QR Code</p>
              </div>
            )}
          </div>

          {/* Informations sur le contenu */}
          {text && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Contenu généré :</h4>
              <div className="p-3 bg-muted rounded-md">
                <code className="text-xs break-all">
                  {selectedTemplate.prefix + text}
                </code>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Informations sur les fonctionnalités */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <QrCode className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Générateur de QR Code avancé
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Créez des QR Codes personnalisés avec des templates prédéfinis (URL, Email, Téléphone, 
                Localisation, Événement, Contact), personnalisation complète des couleurs et taille, 
                niveaux de correction d'erreur configurables, intégration d'un logo au centre (converti automatiquement 
                en noir et blanc et intégré dans la structure du QR Code), génération en temps réel et actions de téléchargement/copie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conseils d'utilisation */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <RefreshCw className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Conseils d'optimisation
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Utilisez un niveau de correction élevé (H - 30%) lorsque vous ajoutez un logo au centre, 
                testez toujours votre QR Code avant utilisation, les QR Codes complexes nécessitent plus d'espace, 
                évitez les couleurs trop claires pour une meilleure lisibilité, et privilégiez des logos simples 
                et contrastés pour un meilleur résultat.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations techniques */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <ImageIcon className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Génération côté client avec intégration d'image
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Ce générateur utilise la bibliothèque qrcode.react pour générer les QR Codes directement 
                dans votre navigateur avec une intégration native des images. L'option "excavate" creuse 
                le QR Code autour de votre logo (comme sur <a href="https://zpao.github.io/qrcode.react/?demo=full" target="_blank" rel="noopener noreferrer" className="underline">qrcode.react</a>), 
                ce qui garantit une meilleure scannabilité. Vos données ne sont jamais envoyées à un serveur externe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations sur la pérennité */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Pérennité des QR Codes
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                <strong>Les QR Codes générés n'expirent jamais</strong> car ils contiennent directement 
                le contenu (URL, texte, etc.). Cependant, téléchargez toujours votre QR Code pour 
                éviter toute dépendance à l'API externe. Si une URL change, le QR Code deviendra 
                obsolète même s'il reste scannable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
