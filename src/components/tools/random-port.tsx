/**
 * Générateur de port aléatoire
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Network, Copy, Check, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RandomPortGenerator() {
  const [generatedPorts, setGeneratedPorts] = useState<number[]>([]);
  const [minPort, setMinPort] = useState(3000);
  const [maxPort, setMaxPort] = useState(65535);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState<string | null>(null);

  const wellKnownPorts = [
    { port: 80, service: "HTTP" },
    { port: 443, service: "HTTPS" },
    { port: 22, service: "SSH" },
    { port: 21, service: "FTP" },
    { port: 25, service: "SMTP" },
    { port: 53, service: "DNS" },
    { port: 110, service: "POP3" },
    { port: 143, service: "IMAP" },
    { port: 993, service: "IMAPS" },
    { port: 995, service: "POP3S" },
    { port: 3306, service: "MySQL" },
    { port: 5432, service: "PostgreSQL" },
    { port: 6379, service: "Redis" },
    { port: 27017, service: "MongoDB" },
    { port: 3000, service: "Node.js dev" },
    { port: 8000, service: "Python dev" },
    { port: 8080, service: "HTTP alt" },
    { port: 9000, service: "PHP-FPM" },
  ];

  const generateRandomPort = (): number => {
    return Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
  };

  const isPortInUse = (port: number): boolean => {
    return wellKnownPorts.some((p) => p.port === port);
  };

  const generatePorts = () => {
    const ports: number[] = [];
    const maxAttempts = count * 10; // Éviter les boucles infinies
    let attempts = 0;

    while (ports.length < count && attempts < maxAttempts) {
      const port = generateRandomPort();
      if (!ports.includes(port)) {
        ports.push(port);
      }
      attempts++;
    }

    setGeneratedPorts(ports.sort((a, b) => a - b));
  };

  const generateSinglePort = () => {
    const port = generateRandomPort();
    setGeneratedPorts([port]);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllPorts = async () => {
    const portsText = generatedPorts.join(", ");
    await navigator.clipboard.writeText(portsText);
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  const getPortCategory = (port: number): string => {
    if (port < 1024) return "Well-known ports (0-1023)";
    if (port < 49152) return "Registered ports (1024-49151)";
    return "Dynamic/Private ports (49152-65535)";
  };

  const getPortStatus = (
    port: number
  ): { status: string; color: string; service?: string } => {
    const wellKnown = wellKnownPorts.find((p) => p.port === port);
    if (wellKnown) {
      return {
        status: "Réservé",
        color: "text-red-600",
        service: wellKnown.service,
      };
    }
    if (port < 1024) {
      return { status: "Privilégié", color: "text-orange-600" };
    }
    return { status: "Disponible", color: "text-green-600" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Network className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Random port generator</h2>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Définissez la plage de ports et le nombre à générer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Port minimum</label>
              <Input
                type="number"
                value={minPort}
                onChange={(e) =>
                  setMinPort(Math.max(1, parseInt(e.target.value) || 1))
                }
                min={1}
                max={65535}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Port maximum</label>
              <Input
                type="number"
                value={maxPort}
                onChange={(e) =>
                  setMaxPort(
                    Math.min(
                      65535,
                      Math.max(minPort, parseInt(e.target.value) || 65535)
                    )
                  )
                }
                min={minPort}
                max={65535}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de ports</label>
              <Input
                type="number"
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.max(1, Math.min(50, parseInt(e.target.value) || 5))
                  )
                }
                min={1}
                max={50}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={generatePorts} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Générer {count} ports
            </Button>
            <Button onClick={generateSinglePort} variant="outline">
              Port unique
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ports générés */}
      {generatedPorts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ports générés</CardTitle>
                <CardDescription>
                  {generatedPorts.length} port
                  {generatedPorts.length > 1 ? "s" : ""} dans la plage {minPort}
                  -{maxPort}
                </CardDescription>
              </div>
              {generatedPorts.length > 1 && (
                <Button onClick={copyAllPorts} variant="outline" size="sm">
                  {copied === "all" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copier tous
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {generatedPorts.map((port, index) => {
                const portStatus = getPortStatus(port);
                return (
                  <div
                    key={`${port}-${index}`}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-lg font-bold">
                          {port}
                        </span>
                        <span
                          className={`text-xs font-medium ${portStatus.color}`}
                        >
                          {portStatus.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getPortCategory(port)}
                      </div>
                      {portStatus.service && (
                        <div className="text-xs text-muted-foreground">
                          Service: {portStatus.service}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(port.toString(), `port-${index}`)
                      }
                    >
                      {copied === `port-${index}` ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ports bien connus */}
      <Card>
        <CardHeader>
          <CardTitle>Ports bien connus</CardTitle>
          <CardDescription>
            Ports réservés à éviter pour vos applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {wellKnownPorts.map((portInfo) => (
              <div
                key={portInfo.port}
                className="flex items-center justify-between p-2 bg-muted rounded text-sm"
              >
                <div>
                  <div className="font-mono font-medium">{portInfo.port}</div>
                  <div className="text-xs text-muted-foreground">
                    {portInfo.service}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Raccourcis rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Raccourcis rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "Développement", min: 3000, max: 3999 },
              { label: "Test", min: 4000, max: 4999 },
              { label: "Staging", min: 5000, max: 5999 },
              { label: "Haute plage", min: 8000, max: 9999 },
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => {
                  setMinPort(preset.min);
                  setMaxPort(preset.max);
                }}
                className="text-xs"
              >
                {preset.label}
                <br />
                <span className="text-xs text-muted-foreground">
                  {preset.min}-{preset.max}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Network className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                À propos des ports
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Les ports 1-1023 sont réservés aux services système. Les ports
                1024-49151 sont enregistrés pour des applications spécifiques.
                Les ports 49152-65535 sont dynamiques et libres.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
