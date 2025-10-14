/**
 * Composant Console Log Beautifier - Formatage et amélioration des logs console
 */
"use client";

import { useState } from "react";
import { Copy, Download, RotateCcw, Eye, Play } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "log" | "info" | "warn" | "error" | "debug";
  message: string;
  data?: any;
  line?: number;
  file?: string;
}

export default function ConsoleLogBeautifier() {
  const [rawLogs, setRawLogs] = useState("");
  const [beautifiedLogs, setBeautifiedLogs] = useState<LogEntry[]>([]);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [showFileInfo, setShowFileInfo] = useState(true);
  const [logLevels, setLogLevels] = useState({
    log: true,
    info: true,
    warn: true,
    error: true,
    debug: true,
  });
  const [copied, setCopied] = useState(false);

  const parseLogs = () => {
    if (!rawLogs.trim()) return;

    const lines = rawLogs.split("\n").filter((line) => line.trim());
    const parsed: LogEntry[] = [];

    lines.forEach((line, index) => {
      // Patterns de logs courants
      const patterns = [
        // console.log("message", data)
        /console\.(log|info|warn|error|debug)\s*\(\s*["'`]([^"'`]+)["'`]\s*(?:,\s*(.+))?\)/,
        // [INFO] message
        /\[(LOG|INFO|WARN|ERROR|DEBUG)\]\s*(.+)/,
        // 2024-01-01 10:00:00 [INFO] message
        /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+\[(LOG|INFO|WARN|ERROR|DEBUG)\]\s*(.+)/,
        // ERROR: message
        /(ERROR|WARN|INFO|DEBUG):\s*(.+)/,
        // Simple message (défaut: log)
        /^(.+)$/,
      ];

      let match = null;
      let level: LogEntry["level"] = "log";
      let message = "";
      let data = null;

      for (const pattern of patterns) {
        match = line.match(pattern);
        if (match) {
          if (
            match[1] &&
            ["LOG", "INFO", "WARN", "ERROR", "DEBUG"].includes(match[1])
          ) {
            level = match[1].toLowerCase() as LogEntry["level"];
            message = match[2] || match[3] || "";
          } else if (match[2]) {
            message = match[2];
            if (match[3]) {
              try {
                data = JSON.parse(match[3]);
              } catch {
                data = match[3];
              }
            }
          } else {
            message = match[1];
          }
          break;
        }
      }

      if (message) {
        parsed.push({
          id: `log-${index}`,
          timestamp: new Date().toISOString(),
          level,
          message: message.trim(),
          data,
          line: index + 1,
          file: "console.log",
        });
      }
    });

    setBeautifiedLogs(parsed);
  };

  const clearLogs = () => {
    setRawLogs("");
    setBeautifiedLogs([]);
  };

  const copyBeautified = async () => {
    const formatted = beautifiedLogs
      .filter((log) => logLevels[log.level])
      .map((log) => {
        let output = "";
        if (showTimestamp) output += `[${log.timestamp}] `;
        output += `[${log.level.toUpperCase()}] `;
        output += log.message;
        if (log.data) output += ` ${JSON.stringify(log.data)}`;
        if (showFileInfo) output += ` (${log.file}:${log.line})`;
        return output;
      })
      .join("\n");

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const downloadLogs = () => {
    const formatted = beautifiedLogs
      .filter((log) => logLevels[log.level])
      .map((log) => {
        let output = "";
        if (showTimestamp) output += `[${log.timestamp}] `;
        output += `[${log.level.toUpperCase()}] `;
        output += log.message;
        if (log.data) output += ` ${JSON.stringify(log.data)}`;
        if (showFileInfo) output += ` (${log.file}:${log.line})`;
        return output;
      })
      .join("\n");

    const blob = new Blob([formatted], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "beautified-logs.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "error":
        return "text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
      case "warn":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
      case "info":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800";
      case "debug":
        return "text-purple-600 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800";
    }
  };

  const getLevelIcon = (level: LogEntry["level"]) => {
    switch (level) {
      case "error":
        return "❌";
      case "warn":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "debug":
        return "🐛";
      default:
        return "📝";
    }
  };

  const loadExampleLogs = () => {
    const example = `console.log("User logged in", { id: 123, name: "John" })
console.error("Failed to connect to database")
console.warn("Deprecated API endpoint used")
console.info("Application started successfully")
console.debug("Processing request", { method: "GET", url: "/api/users" })
[ERROR] Invalid input provided
[WARN] Rate limit approaching
[INFO] Cache updated`;
    setRawLogs(example);
  };

  const filteredLogs = beautifiedLogs.filter((log) => logLevels[log.level]);

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-kantumruy-pro mb-2">
          Console Log Beautifier
        </h1>
        <p className="text-muted-foreground">
          Formatez et améliorez vos logs console pour une meilleure lisibilité
        </p>
      </div>

      {/* Contrôles */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Configuration de l'affichage
          </h3>
          <button
            onClick={loadExampleLogs}
            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Charger des exemples
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show-timestamp"
              checked={showTimestamp}
              onChange={(e) => setShowTimestamp(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="show-timestamp" className="text-sm font-medium">
              Afficher les timestamps
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show-file-info"
              checked={showFileInfo}
              onChange={(e) => setShowFileInfo(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="show-file-info" className="text-sm font-medium">
              Afficher les infos de fichier
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">Niveaux de log :</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(logLevels).map(([level, enabled]) => (
            <div key={level} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`level-${level}`}
                checked={enabled}
                onChange={(e) =>
                  setLogLevels((prev) => ({
                    ...prev,
                    [level]: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor={`level-${level}`}
                className="text-sm font-medium capitalize"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Saisie des logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Logs bruts</h3>
          <textarea
            value={rawLogs}
            onChange={(e) => setRawLogs(e.target.value)}
            placeholder="Collez vos logs console ici..."
            rows={15}
            className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={parseLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Parser les logs</span>
            </button>
            <button
              onClick={clearLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Effacer</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Logs formatés ({filteredLogs.length})
          </h3>

          {filteredLogs.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border ${getLevelColor(
                    log.level
                  )}`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">{getLevelIcon(log.level)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-sm">
                        {showTimestamp && (
                          <span className="text-xs opacity-70">
                            {log.timestamp}
                          </span>
                        )}
                        <span className="font-medium uppercase">
                          {log.level}
                        </span>
                        {showFileInfo && (
                          <span className="text-xs opacity-70">
                            ({log.file}:{log.line})
                          </span>
                        )}
                      </div>
                      <div className="mt-1 font-mono">{log.message}</div>
                      {log.data && (
                        <div className="mt-2 text-xs opacity-70">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 border rounded-lg p-8 text-center text-muted-foreground">
              Aucun log à afficher
            </div>
          )}

          {filteredLogs.length > 0 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={copyBeautified}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? "Copié !" : "Copier"}</span>
              </button>
              <button
                onClick={downloadLogs}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
          Conseils d'utilisation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <strong>Formats supportés :</strong>
            <ul className="mt-1 space-y-1">
              <li>• console.log("message", data)</li>
              <li>• [INFO] message</li>
              <li>• 2024-01-01 [ERROR] message</li>
              <li>• ERROR: message</li>
            </ul>
          </div>
          <div>
            <strong>Fonctionnalités :</strong>
            <ul className="mt-1 space-y-1">
              <li>• Filtrage par niveau de log</li>
              <li>• Formatage automatique des données</li>
              <li>• Export en texte brut</li>
              <li>• Personnalisation de l'affichage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
