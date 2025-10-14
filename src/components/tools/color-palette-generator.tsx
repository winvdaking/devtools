/**
 * Composant Color Palette Generator - Génération de palettes de couleurs harmonieuses
 */
"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RefreshCw, Eye, EyeOff } from "lucide-react";

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name: string;
  contrast: "light" | "dark";
}

type PaletteType =
  | "monochromatic"
  | "analogous"
  | "triadic"
  | "complementary"
  | "split-complementary"
  | "tetradic";

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteType, setPaletteType] = useState<PaletteType>("monochromatic");
  const [colors, setColors] = useState<Color[]>([]);
  const [showNames, setShowNames] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    generatePalette();
  }, [baseColor, paletteType]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 1) {
      r = c;
      g = x;
      b = 0;
    } else if (1 <= h && h < 2) {
      r = x;
      g = c;
      b = 0;
    } else if (2 <= h && h < 3) {
      r = 0;
      g = c;
      b = x;
    } else if (3 <= h && h < 4) {
      r = 0;
      g = x;
      b = c;
    } else if (4 <= h && h < 5) {
      r = x;
      g = 0;
      b = c;
    } else if (5 <= h && h < 6) {
      r = c;
      g = 0;
      b = x;
    }

    const rHex = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const gHex = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const bHex = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
  };

  const getContrast = (hex: string) => {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "dark" : "light";
  };

  const getColorName = (hex: string) => {
    const colorNames: { [key: string]: string } = {
      "#FF0000": "Rouge",
      "#00FF00": "Vert",
      "#0000FF": "Bleu",
      "#FFFF00": "Jaune",
      "#FF00FF": "Magenta",
      "#00FFFF": "Cyan",
      "#FFA500": "Orange",
      "#800080": "Violet",
      "#008000": "Vert",
      "#FFC0CB": "Rose",
      "#A52A2A": "Marron",
      "#808080": "Gris",
    };
    return colorNames[hex.toUpperCase()] || "Couleur personnalisée";
  };

  const generatePalette = () => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const newColors: Color[] = [];

    // Couleur de base
    newColors.push({
      hex: baseColor,
      rgb: baseRgb,
      hsl: baseHsl,
      name: getColorName(baseColor),
      contrast: getContrast(baseColor),
    });

    switch (paletteType) {
      case "monochromatic":
        for (let i = 1; i < 5; i++) {
          const newL = Math.max(10, Math.min(90, baseHsl.l + i * 15 - 30));
          const newHex = hslToHex(baseHsl.h, baseHsl.s, newL);
          const newRgb = hexToRgb(newHex);
          newColors.push({
            hex: newHex,
            rgb: newRgb,
            hsl: { h: baseHsl.h, s: baseHsl.s, l: newL },
            name: getColorName(newHex),
            contrast: getContrast(newHex),
          });
        }
        break;

      case "analogous":
        for (let i = 1; i < 5; i++) {
          const newH = (baseHsl.h + i * 30 - 60 + 360) % 360;
          const newHex = hslToHex(newH, baseHsl.s, baseHsl.l);
          const newRgb = hexToRgb(newHex);
          newColors.push({
            hex: newHex,
            rgb: newRgb,
            hsl: { h: newH, s: baseHsl.s, l: baseHsl.l },
            name: getColorName(newHex),
            contrast: getContrast(newHex),
          });
        }
        break;

      case "triadic":
        for (let i = 1; i < 3; i++) {
          const newH = (baseHsl.h + i * 120) % 360;
          const newHex = hslToHex(newH, baseHsl.s, baseHsl.l);
          const newRgb = hexToRgb(newHex);
          newColors.push({
            hex: newHex,
            rgb: newRgb,
            hsl: { h: newH, s: baseHsl.s, l: baseHsl.l },
            name: getColorName(newHex),
            contrast: getContrast(newHex),
          });
        }
        break;

      case "complementary":
        const compH = (baseHsl.h + 180) % 360;
        const compHex = hslToHex(compH, baseHsl.s, baseHsl.l);
        const compRgb = hexToRgb(compHex);
        newColors.push({
          hex: compHex,
          rgb: compRgb,
          hsl: { h: compH, s: baseHsl.s, l: baseHsl.l },
          name: getColorName(compHex),
          contrast: getContrast(compHex),
        });
        break;

      case "split-complementary":
        for (let i = 1; i < 3; i++) {
          const newH = (baseHsl.h + 180 + i * 30 - 15 + 360) % 360;
          const newHex = hslToHex(newH, baseHsl.s, baseHsl.l);
          const newRgb = hexToRgb(newHex);
          newColors.push({
            hex: newHex,
            rgb: newRgb,
            hsl: { h: newH, s: baseHsl.s, l: baseHsl.l },
            name: getColorName(newHex),
            contrast: getContrast(newHex),
          });
        }
        break;

      case "tetradic":
        for (let i = 1; i < 4; i++) {
          const newH = (baseHsl.h + i * 90) % 360;
          const newHex = hslToHex(newH, baseHsl.s, baseHsl.l);
          const newRgb = hexToRgb(newHex);
          newColors.push({
            hex: newHex,
            rgb: newRgb,
            hsl: { h: newH, s: baseHsl.s, l: baseHsl.l },
            name: getColorName(newHex),
            contrast: getContrast(newHex),
          });
        }
        break;
    }

    setColors(newColors);
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const downloadPalette = () => {
    const css = colors
      .map(
        (color) =>
          `/* ${color.name} */\n--color-${color.name
            .toLowerCase()
            .replace(/\s+/g, "-")}: ${color.hex};\n--color-${color.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-rgb: ${color.rgb.r}, ${color.rgb.g}, ${
            color.rgb.b
          };`
      )
      .join("\n\n");

    const blob = new Blob([`:root {\n${css}\n}`], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-palette.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBaseColor(color);
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-kantumruy-pro mb-2">
          Color Palette Generator
        </h1>
        <p className="text-muted-foreground">
          Générez des palettes de couleurs harmonieuses pour vos projets
        </p>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Couleur de base
          </label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-10 border rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg bg-background font-mono text-sm"
              placeholder="#3B82F6"
            />
            <button
              onClick={randomColor}
              className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              title="Couleur aléatoire"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Type de palette
          </label>
          <select
            value={paletteType}
            onChange={(e) => setPaletteType(e.target.value as PaletteType)}
            className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="monochromatic">Monochromatique</option>
            <option value="analogous">Analogue</option>
            <option value="triadic">Triadique</option>
            <option value="complementary">Complémentaire</option>
            <option value="split-complementary">Split-complémentaire</option>
            <option value="tetradic">Tétradique</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setShowNames(!showNames)}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            {showNames ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>{showNames ? "Masquer noms" : "Afficher noms"}</span>
          </button>
        </div>
      </div>

      {/* Palette de couleurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="h-24 w-full relative group cursor-pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyColor(color.hex)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Copy className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {copiedColor === color.hex && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Copié !
                </div>
              )}
            </div>

            <div className="p-3 space-y-2">
              {showNames && (
                <div className="text-sm font-medium text-center">
                  {color.name}
                </div>
              )}
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HEX:</span>
                  <span className="font-mono">{color.hex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RGB:</span>
                  <span className="font-mono">
                    {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HSL:</span>
                  <span className="font-mono">
                    {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-3">
        <button
          onClick={downloadPalette}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Télécharger CSS</span>
        </button>
      </div>

      {/* Informations sur les types de palettes */}
      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-3">
          Types de palettes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-800 dark:text-orange-200">
          <div>
            <strong>Monochromatique:</strong> Variations d'une même couleur
          </div>
          <div>
            <strong>Analogue:</strong> Couleurs adjacentes sur le cercle
            chromatique
          </div>
          <div>
            <strong>Triadique:</strong> Trois couleurs équidistantes
          </div>
          <div>
            <strong>Complémentaire:</strong> Couleurs opposées sur le cercle
          </div>
        </div>
      </div>
    </div>
  );
}
