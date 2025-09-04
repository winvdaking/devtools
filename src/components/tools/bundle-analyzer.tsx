/**
 * Composant Bundle Analyzer - Analyse de la taille des bundles JavaScript
 */
"use client";

import { useState } from "react";
import { Upload, Trash2, Info } from "lucide-react";

interface BundleFile {
  name: string;
  size: number;
  type: "js" | "css" | "img" | "font" | "other";
  gzippedSize?: number;
}

export default function BundleAnalyzer() {
  const [bundles, setBundles] = useState<BundleFile[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const [gzippedTotal, setGzippedTotal] = useState(0);

  const addBundle = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const size = file.size;
      const gzippedSize = Math.round(size * 0.3); // Estimation gzip

      const bundleFile: BundleFile = {
        name: file.name,
        size,
        type: getFileType(file.name),
        gzippedSize,
      };

      setBundles((prev) => [...prev, bundleFile]);
      setTotalSize((prev) => prev + size);
      setGzippedTotal((prev) => prev + gzippedSize);
    };
    reader.readAsText(file);
  };

  const getFileType = (filename: string): BundleFile["type"] => {
    if (filename.endsWith(".js") || filename.endsWith(".mjs")) return "js";
    if (filename.endsWith(".css")) return "css";
    if (filename.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) return "img";
    if (filename.match(/\.(woff|woff2|ttf|otf|eot)$/i)) return "font";
    return "other";
  };

  const removeBundle = (index: number) => {
    const bundle = bundles[index];
    setBundles((prev) => prev.filter((_, i) => i !== index));
    setTotalSize((prev) => prev - bundle.size);
    setGzippedTotal((prev) => prev - (bundle.gzippedSize || 0));
  };

  const clearAll = () => {
    setBundles([]);
    setTotalSize(0);
    setGzippedTotal(0);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getTypeColor = (type: BundleFile["type"]) => {
    switch (type) {
      case "js":
        return "bg-blue-500";
      case "css":
        return "bg-purple-500";
      case "img":
        return "bg-green-500";
      case "font":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: BundleFile["type"]) => {
    switch (type) {
      case "js":
        return "📄";
      case "css":
        return "🎨";
      case "img":
        return "🖼️";
      case "font":
        return "🔤";
      default:
        return "📁";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair mb-2">
          Bundle Analyzer
        </h1>
        <p className="text-muted-foreground">
          Analysez la taille de vos bundles JavaScript et optimisez vos
          performances
        </p>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">Glissez vos fichiers ici</p>
        <p className="text-muted-foreground mb-4">
          ou cliquez pour sélectionner des fichiers
        </p>
        <input
          type="file"
          multiple
          accept=".js,.mjs,.css,.png,.jpg,.jpeg,.gif,.svg,.webp,.woff,.woff2,.ttf,.otf,.eot"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            files.forEach(addBundle);
          }}
          className="hidden"
          id="bundle-upload"
        />
        <label
          htmlFor="bundle-upload"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer transition-colors"
        >
          Sélectionner des fichiers
        </label>
      </div>

      {/* Statistiques globales */}
      {bundles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {bundles.length}
            </div>
            <div className="text-sm text-muted-foreground">Fichiers</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatBytes(totalSize)}
            </div>
            <div className="text-sm text-muted-foreground">Taille totale</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatBytes(gzippedTotal)}
            </div>
            <div className="text-sm text-muted-foreground">Taille gzippée</div>
          </div>
        </div>
      )}

      {/* Liste des bundles */}
      {bundles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Analyse des bundles</h2>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Effacer tout</span>
            </button>
          </div>

          <div className="space-y-2">
            {bundles.map((bundle, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(bundle.type)}</span>
                  <div>
                    <div className="font-medium">{bundle.name}</div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${getTypeColor(
                          bundle.type
                        )}`}
                      ></span>
                      <span className="capitalize">{bundle.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">
                      {formatBytes(bundle.size)}
                    </div>
                    {bundle.gzippedSize && (
                      <div className="text-sm text-muted-foreground">
                        {formatBytes(bundle.gzippedSize)} gzippé
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeBundle(index)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conseils d'optimisation */}
      {bundles.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Conseils d'optimisation
              </h3>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>
                  • Utilisez la compression gzip/brotli pour réduire la taille
                </li>
                <li>
                  • Implémentez le code splitting pour charger uniquement ce qui
                  est nécessaire
                </li>
                <li>• Optimisez et compressez les images</li>
                <li>• Utilisez des polices web optimisées (WOFF2)</li>
                <li>• Éliminez le code mort avec Tree Shaking</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
