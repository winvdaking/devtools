/**
 * Composant Error Stack Parser - Analyse des traces d'erreur
 */
"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Copy,
  Download,
  RotateCcw,
  Play,
  FileText,
  MapPin,
  Info,
} from "lucide-react";

interface StackFrame {
  functionName: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  source?: string;
  isNative: boolean;
  isEval: boolean;
  isAsync: boolean;
}

interface ParsedError {
  message: string;
  stack: StackFrame[];
  type?: string;
  timestamp: string;
}

export default function ErrorStackParser() {
  const [rawStack, setRawStack] = useState("");
  const [parsedError, setParsedError] = useState<ParsedError | null>(null);
  const [showSource, setShowSource] = useState(true);
  const [showNative, setShowNative] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseStack = () => {
    if (!rawStack.trim()) return;

    const lines = rawStack.split("\n").filter((line) => line.trim());
    const error: ParsedError = {
      message: "",
      stack: [],
      timestamp: new Date().toISOString(),
    };

    // Première ligne = message d'erreur
    if (lines.length > 0) {
      error.message = lines[0]
        .replace(/^Error:\s*/, "")
        .replace(/^TypeError:\s*/, "")
        .replace(/^ReferenceError:\s*/, "");

      if (lines[0].includes("TypeError:")) error.type = "TypeError";
      else if (lines[0].includes("ReferenceError:"))
        error.type = "ReferenceError";
      else if (lines[0].includes("Error:")) error.type = "Error";
    }

    // Parser la stack trace
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Pattern: at FunctionName (filename:line:column)
      const frameMatch = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
      if (frameMatch) {
        const [, functionName, fileName, lineNumber, columnNumber] = frameMatch;
        error.stack.push({
          functionName: functionName.trim(),
          fileName: fileName.trim(),
          lineNumber: parseInt(lineNumber),
          columnNumber: parseInt(columnNumber),
          isNative:
            fileName.includes("native") || fileName.includes("node_modules"),
          isEval: fileName.includes("eval"),
          isAsync:
            functionName.includes("async") || functionName.includes("Promise"),
        });
        continue;
      }

      // Pattern: at filename:line:column
      const simpleMatch = line.match(/at\s+(.+?):(\d+):(\d+)/);
      if (simpleMatch) {
        const [, fileName, lineNumber, columnNumber] = simpleMatch;
        error.stack.push({
          functionName: "<anonymous>",
          fileName: fileName.trim(),
          lineNumber: parseInt(lineNumber),
          columnNumber: parseInt(columnNumber),
          isNative:
            fileName.includes("native") || fileName.includes("node_modules"),
          isEval: fileName.includes("eval"),
          isAsync: false,
        });
        continue;
      }

      // Pattern: FunctionName@filename:line:column (Firefox)
      const firefoxMatch = line.match(/(.+?)@(.+?):(\d+):(\d+)/);
      if (firefoxMatch) {
        const [, functionName, fileName, lineNumber, columnNumber] =
          firefoxMatch;
        error.stack.push({
          functionName: functionName.trim(),
          fileName: fileName.trim(),
          lineNumber: parseInt(lineNumber),
          columnNumber: parseInt(columnNumber),
          isNative:
            fileName.includes("native") || fileName.includes("node_modules"),
          isEval: fileName.includes("eval"),
          isAsync:
            functionName.includes("async") || functionName.includes("Promise"),
        });
        continue;
      }

      // Pattern: in FunctionName (Chrome DevTools)
      const chromeMatch = line.match(/in\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
      if (chromeMatch) {
        const [, functionName, fileName, lineNumber, columnNumber] =
          chromeMatch;
        error.stack.push({
          functionName: functionName.trim(),
          fileName: fileName.trim(),
          lineNumber: parseInt(lineNumber),
          columnNumber: parseInt(columnNumber),
          isNative:
            fileName.includes("native") || fileName.includes("node_modules"),
          isEval: fileName.includes("eval"),
          isAsync:
            functionName.includes("async") || functionName.includes("Promise"),
        });
      }
    }

    setParsedError(error);
  };

  const clearStack = () => {
    setRawStack("");
    setParsedError(null);
  };

  const copyParsed = async () => {
    if (!parsedError) return;

    const formatted = formatErrorForCopy();
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const downloadParsed = () => {
    if (!parsedError) return;

    const formatted = formatErrorForCopy();
    const blob = new Blob([formatted], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "parsed-error-stack.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatErrorForCopy = () => {
    if (!parsedError) return "";

    let output = "";
    if (parsedError.type) {
      output += `${parsedError.type}: ${parsedError.message}\n`;
    } else {
      output += `Error: ${parsedError.message}\n`;
    }
    output += `Timestamp: ${parsedError.timestamp}\n\n`;
    output += "Stack Trace:\n";

    parsedError.stack
      .filter((frame) => showNative || !frame.isNative)
      .forEach((frame, index) => {
        output += `${index + 1}. ${frame.functionName}\n`;
        output += `   ${frame.fileName}:${frame.lineNumber}:${frame.columnNumber}\n`;
        if (frame.isNative) output += `   [Native Code]\n`;
        if (frame.isEval) output += `   [Eval Code]\n`;
        if (frame.isAsync) output += `   [Async]\n`;
        output += "\n";
      });

    return output;
  };

  const loadExampleStack = () => {
    const example = `TypeError: Cannot read property 'length' of undefined
    at processData (app.js:15:25)
    at async fetchUserData (api.js:42:18)
    at async handleRequest (server.js:78:5)
    at processTicksAndRejections (node:internal/process/task_queues:95:35)
    at emitTwo (events.js:126:13)
    at EventEmitter.emit (events.js:214:7)
    at Server.emit (node:internal/events:315:20)`;
    setRawStack(example);
  };

  const getFrameIcon = (frame: StackFrame) => {
    if (frame.isNative) return "🔧";
    if (frame.isEval) return "⚡";
    if (frame.isAsync) return "🔄";
    return "📄";
  };

  const getFrameColor = (frame: StackFrame) => {
    if (frame.isNative)
      return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600";
    if (frame.isEval)
      return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700";
    if (frame.isAsync)
      return "bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700";
    return "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700";
  };

  const filteredStack =
    parsedError?.stack.filter((frame) => showNative || !frame.isNative) || [];

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-kantumruy-pro mb-2">
          Error Stack Parser
        </h1>
        <p className="text-muted-foreground">
          Analysez et formatez vos traces d'erreur pour un débogage plus
          efficace
        </p>
      </div>

      {/* Contrôles */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Configuration de l'affichage
          </h3>
          <button
            onClick={loadExampleStack}
            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Charger un exemple
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show-source"
              checked={showSource}
              onChange={(e) => setShowSource(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="show-source" className="text-sm font-medium">
              Afficher les détails source
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show-native"
              checked={showNative}
              onChange={(e) => setShowNative(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="show-native" className="text-sm font-medium">
              Inclure le code natif
            </label>
          </div>
        </div>
      </div>

      {/* Saisie de la stack trace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stack trace brute</h3>
          <textarea
            value={rawStack}
            onChange={(e) => setRawStack(e.target.value)}
            placeholder="Collez votre stack trace d'erreur ici..."
            rows={15}
            className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={parseStack}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Parser la stack trace</span>
            </button>
            <button
              onClick={clearStack}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Effacer</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analyse de l'erreur</h3>

          {parsedError ? (
            <div className="space-y-4">
              {/* Message d'erreur */}
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-red-900 dark:text-red-100">
                      {parsedError.type || "Error"}: {parsedError.message}
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Timestamp: {parsedError.timestamp}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack trace */}
              <div>
                <h4 className="font-medium mb-3">
                  Stack Trace ({filteredStack.length} frames)
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredStack.map((frame, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getFrameColor(
                        frame
                      )}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getFrameIcon(frame)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">
                              {frame.functionName}
                            </span>
                            {frame.isAsync && (
                              <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                                Async
                              </span>
                            )}
                            {frame.isNative && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                                Native
                              </span>
                            )}
                            {frame.isEval && (
                              <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                                Eval
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span className="font-mono">{frame.fileName}</span>
                            <MapPin className="h-3 w-3" />
                            <span>
                              Ligne {frame.lineNumber}, Colonne{" "}
                              {frame.columnNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={copyParsed}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>
                <button
                  onClick={downloadParsed}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 border rounded-lg p-8 text-center text-muted-foreground">
              Aucune erreur analysée
            </div>
          )}
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
              Formats supportés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-800 dark:text-orange-200">
              <div>
                <strong>Chrome/Node.js:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• at FunctionName (file:line:column)</li>
                  <li>• at file:line:column</li>
                </ul>
              </div>
              <div>
                <strong>Firefox:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• FunctionName@file:line:column</li>
                  <li>• in FunctionName (file:line:column)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
