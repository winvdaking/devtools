/**
 * Composant Générateur de QR Code
 */
"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Download, Copy, RefreshCw, Link, Mail, Phone, MapPin, Calendar, User, AlertTriangle } from "lucide-react";

interface QRCodeOptions {
  size: number;
  margin: number;
  color: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export function QRGenerator() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 256,
    margin: 4,
    color: "#000000",
    backgroundColor: "#ffffff",
    errorCorrectionLevel: 'M'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Générer le QR Code
  const generateQRCode = useCallback(async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      const fullText = selectedTemplate.prefix + text;
      
      // Utiliser l'API QR Server pour générer le QR Code
      const params = new URLSearchParams({
        data: fullText,
        size: options.size.toString(),
        margin: options.margin.toString(),
        color: options.color.replace('#', ''),
        bgcolor: options.backgroundColor.replace('#', ''),
        ecc: options.errorCorrectionLevel
      });

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?${params}`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Erreur lors de la génération du QR Code:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [text, options, selectedTemplate]);

  // Télécharger le QR Code
  const downloadQRCode = useCallback(() => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrCodeUrl]);

  // Copier le QR Code dans le presse-papiers
  const copyQRCode = useCallback(async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  }, [qrCodeUrl]);

  // Appliquer un template
  const applyTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setText("");
    setQrCodeUrl("");
  };

  return (
    <div className="space-y-6">
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
                      variant={selectedTemplate.name === template.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => applyTemplate(template)}
                      className="justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
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

            <Button 
              onClick={generateQRCode} 
              disabled={!text.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4 mr-2" />
                  Générer QR Code
                </>
              )}
            </Button>
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
                <option value="H">Très élevé (30%)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Aperçu */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Aperçu</h3>
          
          <div className="flex flex-col items-center space-y-4">
            {qrCodeUrl ? (
              <>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code généré"
                    className="max-w-full h-auto"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={downloadQRCode} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button onClick={copyQRCode} variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <QrCode className="h-16 w-16 mb-4 opacity-50" />
                <p>Votre QR Code apparaîtra ici</p>
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
                niveaux de correction d'erreur configurables, et actions de téléchargement/copie.
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
                Utilisez un niveau de correction élevé pour les petits QR Codes, testez toujours 
                votre QR Code avant utilisation, les QR Codes complexes nécessitent plus d'espace, 
                et évitez les couleurs trop claires pour une meilleure lisibilité.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations techniques */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Link className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                API QR Server
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Ce générateur utilise l'API QR Server gratuite et fiable. Les QR Codes sont générés 
                en temps réel avec les paramètres personnalisés (taille, couleurs, correction d'erreur) 
                et sont disponibles au format PNG haute qualité.
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
