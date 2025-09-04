/**
 * Composant Mock Data Generator - Génération de données de test
 */
"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Settings, EyeOff } from "lucide-react";

interface FieldConfig {
  id: string;
  name: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "date"
    | "email"
    | "phone"
    | "url"
    | "array"
    | "object";
  required: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  options?: string[];
  arrayLength?: number;
  objectFields?: FieldConfig[];
}

interface GeneratedData {
  id: string;
  data: any;
}

export default function MockDataGenerator() {
  const [fields, setFields] = useState<FieldConfig[]>([
    {
      id: "1",
      name: "id",
      type: "number",
      required: true,
      minValue: 1,
      maxValue: 1000,
    },
    {
      id: "2",
      name: "name",
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    {
      id: "3",
      name: "email",
      type: "email",
      required: true,
    },
    {
      id: "4",
      name: "age",
      type: "number",
      required: false,
      minValue: 18,
      maxValue: 80,
    },
    {
      id: "5",
      name: "active",
      type: "boolean",
      required: false,
    },
  ]);

  const [recordCount, setRecordCount] = useState(10);
  const [generatedData, setGeneratedData] = useState<GeneratedData[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const firstNames = [
    "Jean",
    "Marie",
    "Pierre",
    "Sophie",
    "Paul",
    "Julie",
    "Thomas",
    "Camille",
    "Nicolas",
    "Léa",
  ];
  const lastNames = [
    "Martin",
    "Bernard",
    "Dubois",
    "Thomas",
    "Robert",
    "Richard",
    "Petit",
    "Durand",
    "Leroy",
    "Moreau",
  ];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
  ];

  const generateRandomString = (minLength: number, maxLength: number) => {
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomEmail = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  };

  const generateRandomPhone = () => {
    return `0${Math.floor(Math.random() * 9) + 1}${Math.floor(
      Math.random() * 100000000
    )
      .toString()
      .padStart(8, "0")}`;
  };

  const generateRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };

  const generateRandomUrl = () => {
    const protocols = ["https://", "http://"];
    const domains = ["example.com", "test.org", "demo.net", "sample.io"];
    const paths = ["", "/api", "/users", "/products", "/blog"];

    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];

    return `${protocol}${domain}${path}`;
  };

  const generateFieldValue = (field: FieldConfig): any => {
    if (!field.required && Math.random() < 0.3) {
      return null;
    }

    switch (field.type) {
      case "string":
        const min = field.minLength || 5;
        const max = field.maxLength || 20;
        return generateRandomString(min, max);

      case "number":
        const minVal = field.minValue || 0;
        const maxVal = field.maxValue || 100;
        return generateRandomNumber(minVal, maxVal);

      case "boolean":
        return Math.random() > 0.5;

      case "date":
        return generateRandomDate();

      case "email":
        return generateRandomEmail();

      case "phone":
        return generateRandomPhone();

      case "url":
        return generateRandomUrl();

      case "array":
        const length = field.arrayLength || Math.floor(Math.random() * 5) + 1;
        if (field.objectFields) {
          return Array.from({ length }, () => {
            const obj: any = {};
            field.objectFields!.forEach((f) => {
              obj[f.name] = generateFieldValue(f);
            });
            return obj;
          });
        }
        return Array.from({ length }, () => generateRandomString(3, 10));

      case "object":
        if (field.objectFields) {
          const obj: any = {};
          field.objectFields.forEach((f) => {
            obj[f.name] = generateFieldValue(f);
          });
          return obj;
        }
        return {};

      default:
        return "";
    }
  };

  const generateData = () => {
    const newData: GeneratedData[] = [];

    for (let i = 0; i < recordCount; i++) {
      const record: any = {};

      fields.forEach((field) => {
        record[field.name] = generateFieldValue(field);
      });

      newData.push({
        id: `record-${i + 1}`,
        data: record,
      });
    }

    setGeneratedData(newData);
  };

  const addField = () => {
    const newField: FieldConfig = {
      id: Date.now().toString(),
      name: `field_${fields.length + 1}`,
      type: "string",
      required: false,
      minLength: 3,
      maxLength: 20,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<FieldConfig>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const copyData = async () => {
    const jsonData = JSON.stringify(
      generatedData.map((item) => item.data),
      null,
      2
    );
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const downloadData = () => {
    const jsonData = JSON.stringify(
      generatedData.map((item) => item.data),
      null,
      2
    );
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setFields([
      {
        id: "1",
        name: "id",
        type: "number",
        required: true,
        minValue: 1,
        maxValue: 1000,
      },
      {
        id: "2",
        name: "name",
        type: "string",
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      {
        id: "3",
        name: "email",
        type: "email",
        required: true,
      },
      {
        id: "4",
        name: "age",
        type: "number",
        required: false,
        minValue: 18,
        maxValue: 80,
      },
      {
        id: "5",
        name: "active",
        type: "boolean",
        required: false,
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair mb-2">
          Mock Data Generator
        </h1>
        <p className="text-muted-foreground">
          Générez des données de test réalistes pour vos projets
        </p>
      </div>

      {/* Configuration */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Configuration des champs</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {showSettings ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Settings className="h-4 w-4" />
              )}
              <span>{showSettings ? "Masquer" : "Paramètres"}</span>
            </button>
            <button
              onClick={addField}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              + Ajouter un champ
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre d'enregistrements
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={recordCount}
                  onChange={(e) =>
                    setRecordCount(parseInt(e.target.value) || 1)
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetFields}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom du champ
                  </label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      updateField(field.id, { name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(field.id, {
                        type: e.target.value as FieldConfig["type"],
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="string">Texte</option>
                    <option value="number">Nombre</option>
                    <option value="boolean">Booléen</option>
                    <option value="date">Date</option>
                    <option value="email">Email</option>
                    <option value="phone">Téléphone</option>
                    <option value="url">URL</option>
                    <option value="array">Tableau</option>
                    <option value="object">Objet</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`required-${field.id}`}
                    checked={field.required}
                    onChange={(e) =>
                      updateField(field.id, { required: e.target.checked })
                    }
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Requis
                  </label>
                </div>

                {field.type === "string" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Longueur min
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={field.minLength || 3}
                        onChange={(e) =>
                          updateField(field.id, {
                            minLength: parseInt(e.target.value) || 3,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Longueur max
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={field.maxLength || 20}
                        onChange={(e) =>
                          updateField(field.id, {
                            maxLength: parseInt(e.target.value) || 20,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {field.type === "number" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Valeur min
                      </label>
                      <input
                        type="number"
                        value={field.minValue || 0}
                        onChange={(e) =>
                          updateField(field.id, {
                            minValue: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Valeur max
                      </label>
                      <input
                        type="number"
                        value={field.maxValue || 100}
                        onChange={(e) =>
                          updateField(field.id, {
                            maxValue: parseInt(e.target.value) || 100,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => removeField(field.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Génération */}
      <div className="text-center">
        <button
          onClick={generateData}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
        >
          Générer {recordCount} enregistrements
        </button>
      </div>

      {/* Résultats */}
      {generatedData.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Données générées ({generatedData.length} enregistrements)
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyData}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? "Copié !" : "Copier JSON"}</span>
              </button>
              <button
                onClick={downloadData}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm">
              <code>
                {JSON.stringify(
                  generatedData.map((item) => item.data),
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
