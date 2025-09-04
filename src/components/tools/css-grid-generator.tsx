/**
 * Composant CSS Grid Generator - Création de grilles CSS interactives
 */
"use client";

import { useState, useEffect } from "react";
import { Copy, Download, Eye, EyeOff, RotateCcw } from "lucide-react";

interface GridItem {
  id: string;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  content: string;
  color: string;
}

interface GridConfig {
  rows: number;
  cols: number;
  gap: number;
  rowHeight: number;
  colWidth: number;
}

export default function CSSGridGenerator() {
  const [config, setConfig] = useState<GridConfig>({
    rows: 4,
    cols: 4,
    gap: 10,
    rowHeight: 100,
    colWidth: 150,
  });

  const [items, setItems] = useState<GridItem[]>([]);
  const [showCode, setShowCode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const colors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
  ];

  useEffect(() => {
    generateDefaultItems();
  }, [config]);

  const generateDefaultItems = () => {
    const newItems: GridItem[] = [];
    const itemCount = Math.min(config.rows, config.cols);

    for (let i = 0; i < itemCount; i++) {
      newItems.push({
        id: `item-${i + 1}`,
        rowStart: i + 1,
        rowEnd: i + 2,
        colStart: i + 1,
        colEnd: i + 2,
        content: `Item ${i + 1}`,
        color: colors[i % colors.length],
      });
    }

    setItems(newItems);
  };

  const addItem = () => {
    const newItem: GridItem = {
      id: `item-${Date.now()}`,
      rowStart: 1,
      rowEnd: 2,
      colStart: 1,
      colEnd: 2,
      content: `Item ${items.length + 1}`,
      color: colors[items.length % colors.length],
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    if (selectedItem === id) {
      setSelectedItem(null);
    }
  };

  const updateItem = (id: string, updates: Partial<GridItem>) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const generateCSS = () => {
    const containerCSS = `.grid-container {
  display: grid;
  grid-template-rows: repeat(${config.rows}, ${config.rowHeight}px);
  grid-template-columns: repeat(${config.cols}, ${config.colWidth}px);
  gap: ${config.gap}px;
  padding: 20px;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}`;

    const itemsCSS = items
      .map(
        (item) => `.${item.id} {
  grid-row: ${item.rowStart} / ${item.rowEnd};
  grid-column: ${item.colStart} / ${item.colEnd};
  background-color: ${item.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
}`
      )
      .join("\n\n");

    return `${containerCSS}\n\n${itemsCSS}`;
  };

  const generateHTML = () => {
    const containerHTML = `<div class="grid-container">`;
    const itemsHTML = items
      .map((item) => `  <div class="${item.id}">${item.content}</div>`)
      .join("\n");
    const closingHTML = `\n</div>`;

    return `${containerHTML}\n${itemsHTML}${closingHTML}`;
  };

  const copyCode = async () => {
    const fullCode = `/* CSS */\n${generateCSS()}\n\n/* HTML */\n${generateHTML()}`;
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const downloadCode = () => {
    const fullCode = `/* CSS */\n${generateCSS()}\n\n/* HTML */\n${generateHTML()}`;
    const blob = new Blob([fullCode], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "css-grid.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetGrid = () => {
    setConfig({
      rows: 4,
      cols: 4,
      gap: 10,
      rowHeight: 100,
      colWidth: 150,
    });
    generateDefaultItems();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair mb-2">
          CSS Grid Generator
        </h1>
        <p className="text-muted-foreground">
          Créez des grilles CSS interactives et générez le code automatiquement
        </p>
      </div>

      {/* Configuration */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Configuration de la grille
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Lignes</label>
            <input
              type="number"
              min="1"
              max="12"
              value={config.rows}
              onChange={(e) =>
                setConfig({ ...config, rows: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Colonnes</label>
            <input
              type="number"
              min="1"
              max="12"
              value={config.cols}
              onChange={(e) =>
                setConfig({ ...config, cols: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Espacement (px)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={config.gap}
              onChange={(e) =>
                setConfig({ ...config, gap: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Hauteur ligne (px)
            </label>
            <input
              type="number"
              min="50"
              max="300"
              value={config.rowHeight}
              onChange={(e) =>
                setConfig({
                  ...config,
                  rowHeight: parseInt(e.target.value) || 100,
                })
              }
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Largeur colonne (px)
            </label>
            <input
              type="number"
              min="50"
              max="300"
              value={config.colWidth}
              onChange={(e) =>
                setConfig({
                  ...config,
                  colWidth: parseInt(e.target.value) || 150,
                })
              }
              className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Prévisualisation et édition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prévisualisation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prévisualisation</h3>
            <button
              onClick={addItem}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              + Ajouter un item
            </button>
          </div>

          <div
            className="border-2 border-dashed border-border rounded-lg p-4"
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${config.rows}, ${config.rowHeight}px)`,
              gridTemplateColumns: `repeat(${config.cols}, ${config.colWidth}px)`,
              gap: `${config.gap}px`,
              padding: "20px",
              backgroundColor: "#f8fafc",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative cursor-pointer transition-all hover:scale-105 ${
                  selectedItem === item.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                style={{
                  gridRow: `${item.rowStart} / ${item.rowEnd}`,
                  gridColumn: `${item.colStart} / ${item.colEnd}`,
                  backgroundColor: item.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
                onClick={() => setSelectedItem(item.id)}
              >
                {item.content}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Édition des items */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Édition des items</h3>

          {selectedItem ? (
            <div className="bg-card border rounded-lg p-4 space-y-4">
              {(() => {
                const item = items.find((i) => i.id === selectedItem);
                if (!item) return null;

                return (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Contenu
                      </label>
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) =>
                          updateItem(item.id, { content: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Début ligne
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={config.rows}
                          value={item.rowStart}
                          onChange={(e) =>
                            updateItem(item.id, {
                              rowStart: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Fin ligne
                        </label>
                        <input
                          type="number"
                          min={item.rowStart}
                          max={config.rows + 1}
                          value={item.rowEnd}
                          onChange={(e) =>
                            updateItem(item.id, {
                              rowEnd:
                                parseInt(e.target.value) || item.rowStart + 1,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Début colonne
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={config.cols}
                          value={item.colStart}
                          onChange={(e) =>
                            updateItem(item.id, {
                              colStart: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Fin colonne
                        </label>
                        <input
                          type="number"
                          min={item.colStart}
                          max={config.cols + 1}
                          value={item.colEnd}
                          onChange={(e) =>
                            updateItem(item.id, {
                              colEnd:
                                parseInt(e.target.value) || item.colStart + 1,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Couleur
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => updateItem(item.id, { color })}
                            className={`w-8 h-8 rounded-full border-2 ${
                              item.color === color
                                ? "border-primary"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="bg-muted/50 border rounded-lg p-8 text-center text-muted-foreground">
              Sélectionnez un item pour l'éditer
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          {showCode ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span>{showCode ? "Masquer le code" : "Afficher le code"}</span>
        </button>

        <button
          onClick={copyCode}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Copy className="h-4 w-4" />
          <span>{copied ? "Copié !" : "Copier le code"}</span>
        </button>

        <button
          onClick={downloadCode}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Télécharger</span>
        </button>

        <button
          onClick={resetGrid}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Code généré */}
      {showCode && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Code généré</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">CSS</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{generateCSS()}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">HTML</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{generateHTML()}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
