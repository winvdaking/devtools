/**
 * Convertisseur Docker run vers Docker Compose
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ship, Copy, Check, FileText, RefreshCw, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";

interface DockerRunOptions {
  image: string;
  name?: string;
  container_name?: string;
  ports: string[];
  volumes: string[];
  environment: string[];
  networks: string[];
  restart?: string;
  detach: boolean;
  interactive: boolean;
  tty: boolean;
  user?: string;
  workdir?: string;
  command?: string;
  args: string[];
}

export function DockerConverter() {
  const [dockerRunCommand, setDockerRunCommand] = useState("");
  const [dockerCompose, setDockerCompose] = useState("");
  const [serviceName, setServiceName] = useState("app");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const sampleCommands = [
    {
      name: "Application web simple",
      command:
        "docker run -d --name myapp -p 3000:3000 -e NODE_ENV=production myapp:latest",
    },
    {
      name: "Base de données",
      command:
        "docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=mydb -v postgres_data:/var/lib/postgresql/data postgres:13",
    },
    {
      name: "Application avec volumes",
      command:
        "docker run -d --name nginx -p 80:80 -v ./nginx.conf:/etc/nginx/nginx.conf -v ./html:/usr/share/nginx/html nginx:alpine",
    },
    {
      name: "Container interactif",
      command:
        "docker run -it --rm --name dev -v $(pwd):/app -w /app -p 8080:8080 node:16 bash",
    },
  ];

  const parseDockerRun = (command: string): DockerRunOptions => {
    const options: DockerRunOptions = {
      image: "",
      name: undefined,
      container_name: undefined,
      ports: [],
      volumes: [],
      environment: [],
      networks: [],
      restart: undefined,
      detach: false,
      interactive: false,
      tty: false,
      user: undefined,
      workdir: undefined,
      command: undefined,
      args: [],
    };

    try {
      // Nettoyer la commande
      let cleanCommand = command.trim();
      if (cleanCommand.startsWith("docker run")) {
        cleanCommand = cleanCommand.substring("docker run".length).trim();
      }

      // Analyser les flags
      const parts = cleanCommand.split(/\s+/);
      let i = 0;

      while (i < parts.length) {
        const part = parts[i];

        switch (part) {
          case "-d":
          case "--detach":
            options.detach = true;
            break;
          case "-i":
          case "--interactive":
            options.interactive = true;
            break;
          case "-t":
          case "--tty":
            options.tty = true;
            break;
          case "--rm":
            // Ignorer --rm car pas d'équivalent direct en compose
            break;
          case "--name":
            options.name = parts[++i];
            options.container_name = parts[i];
            break;
          case "-p":
          case "--publish":
            options.ports.push(parts[++i]);
            break;
          case "-v":
          case "--volume":
            options.volumes.push(parts[++i]);
            break;
          case "-e":
          case "--env":
            options.environment.push(parts[++i]);
            break;
          case "--network":
            options.networks.push(parts[++i]);
            break;
          case "--restart":
            options.restart = parts[++i];
            break;
          case "-u":
          case "--user":
            options.user = parts[++i];
            break;
          case "-w":
          case "--workdir":
            options.workdir = parts[++i];
            break;
          default:
            // Si ce n'est pas un flag, c'est probablement l'image ou la commande
            if (!options.image && !part.startsWith("-")) {
              options.image = part;
            } else if (options.image && !part.startsWith("-")) {
              // C'est la commande ou un argument
              if (!options.command) {
                options.command = part;
              } else {
                options.args.push(part);
              }
            }
            break;
        }
        i++;
      }

      // Extraire le nom du service si pas de nom explicite
      if (!options.name && options.image) {
        const imageParts = options.image.split(":")[0].split("/");
        options.name = imageParts[imageParts.length - 1];
      }
    } catch (err) {
      console.error("Erreur lors du parsing:", err);
    }

    return options;
  };

  const generateDockerCompose = (options: DockerRunOptions): string => {
    if (!options.image) {
      throw new Error("Image Docker requise");
    }

    const serviceName = options.name || "app";
    let compose = `version: '3.8'\n\nservices:\n`;

    compose += `  ${serviceName}:\n`;
    compose += `    image: ${options.image}\n`;

    if (options.container_name) {
      compose += `    container_name: ${options.container_name}\n`;
    }

    if (options.ports.length > 0) {
      compose += `    ports:\n`;
      options.ports.forEach((port) => {
        compose += `      - "${port}"\n`;
      });
    }

    if (options.volumes.length > 0) {
      compose += `    volumes:\n`;
      options.volumes.forEach((volume) => {
        compose += `      - ${volume}\n`;
      });
    }

    if (options.environment.length > 0) {
      compose += `    environment:\n`;
      options.environment.forEach((env) => {
        if (env.includes("=")) {
          const [key, value] = env.split("=", 2);
          compose += `      - ${key}=${value}\n`;
        } else {
          compose += `      - ${env}\n`;
        }
      });
    }

    if (options.networks.length > 0) {
      compose += `    networks:\n`;
      options.networks.forEach((network) => {
        compose += `      - ${network}\n`;
      });
    }

    if (options.restart) {
      compose += `    restart: ${options.restart}\n`;
    }

    if (options.user) {
      compose += `    user: ${options.user}\n`;
    }

    if (options.workdir) {
      compose += `    working_dir: ${options.workdir}\n`;
    }

    if (options.command || options.args.length > 0) {
      compose += `    command: `;
      if (options.command) {
        compose += options.command;
        if (options.args.length > 0) {
          compose += ` ${options.args.join(" ")}`;
        }
      } else if (options.args.length > 0) {
        compose += options.args.join(" ");
      }
      compose += `\n`;
    }

    if (options.interactive || options.tty) {
      compose += `    stdin_open: ${options.interactive}\n`;
      compose += `    tty: ${options.tty}\n`;
    }

    // Ajouter les volumes nommés si nécessaire
    const namedVolumes = options.volumes
      .filter((v) => v.includes(":"))
      .map((v) => v.split(":")[0])
      .filter((v) => !v.startsWith(".") && !v.startsWith("/"));

    if (namedVolumes.length > 0) {
      compose += `\nvolumes:\n`;
      namedVolumes.forEach((volume) => {
        compose += `  ${volume}:\n`;
      });
    }

    // Ajouter les réseaux si nécessaire
    if (options.networks.length > 0) {
      compose += `\nnetworks:\n`;
      options.networks.forEach((network) => {
        compose += `  ${network}:\n`;
      });
    }

    return compose;
  };

  const convertCommand = () => {
    if (!dockerRunCommand.trim()) {
      setError("Veuillez entrer une commande docker run");
      return;
    }

    try {
      setError("");
      const options = parseDockerRun(dockerRunCommand);
      const compose = generateDockerCompose(options);
      setDockerCompose(compose);
    } catch (err) {
      setError(
        `Erreur lors de la conversion: ${
          err instanceof Error ? err.message : "Erreur inconnue"
        }`
      );
    }
  };

  const loadSample = (sample: (typeof sampleCommands)[0]) => {
    setDockerRunCommand(sample.command);
    setDockerCompose("");
    setError("");
  };

  const clearAll = () => {
    setDockerRunCommand("");
    setDockerCompose("");
    setError("");
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCompose = () => {
    if (!dockerCompose) return;

    const blob = new Blob([dockerCompose], { type: "text/yaml" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "docker-compose.yml");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Ship className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Docker Converter</h2>
      </div>

      {/* Exemples */}
      <Card>
        <CardHeader>
          <CardTitle>Exemples de commandes</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour le charger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleCommands.map((sample) => (
              <Button
                key={sample.name}
                variant="default"
                size="sm"
                onClick={() => loadSample(sample)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{sample.name}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {sample.command}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Personnalisez la conversion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom du service</label>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="app"
              className="w-48"
            />
            <div className="text-xs text-muted-foreground">
              Nom utilisé pour le service dans docker-compose.yml
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commande docker run */}
      <Card>
        <CardHeader>
          <CardTitle>Commande docker run</CardTitle>
          <CardDescription>
            Collez votre commande docker run ici
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={dockerRunCommand}
            onChange={(e) => setDockerRunCommand(e.target.value)}
            placeholder="docker run -d --name myapp -p 3000:3000 myapp:latest"
            className="min-h-[120px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={convertCommand} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Convertir
            </Button>
            <Button onClick={clearAll} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Erreur */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="text-red-800 dark:text-red-200">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Docker Compose généré */}
      {dockerCompose && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>docker-compose.yml généré</CardTitle>
                <CardDescription>
                  Fichier Docker Compose équivalent
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => copyToClipboard(dockerCompose)}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copier
                </Button>
                <Button variant="default" size="sm" onClick={downloadCompose}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {dockerCompose}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle>Comment utiliser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">1. Copiez votre commande</h4>
                <p className="text-muted-foreground">
                  Collez votre commande{" "}
                  <code className="font-mono">docker run</code> complète dans le
                  champ ci-dessus.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. Cliquez sur Convertir</h4>
                <p className="text-muted-foreground">
                  L'outil analysera automatiquement les options et générera le
                  fichier docker-compose.yml.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3. Téléchargez le fichier</h4>
                <p className="text-muted-foreground">
                  Copiez le contenu ou téléchargez le fichier YAML généré.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  4. Lancez avec docker-compose
                </h4>
                <p className="text-muted-foreground">
                  Utilisez{" "}
                  <code className="font-mono">docker-compose up -d</code> pour
                  démarrer vos services.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options supportées */}
      <Card>
        <CardHeader>
          <CardTitle>Options supportées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Options de base :</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <code className="font-mono">-d, --detach</code> →{" "}
                  <code className="font-mono">detach: true</code>
                </li>
                <li>
                  <code className="font-mono">-i, --interactive</code> →{" "}
                  <code className="font-mono">stdin_open: true</code>
                </li>
                <li>
                  <code className="font-mono">-t, --tty</code> →{" "}
                  <code className="font-mono">tty: true</code>
                </li>
                <li>
                  <code className="font-mono">--name</code> →{" "}
                  <code className="font-mono">container_name</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Options avancées :</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <code className="font-mono">-p, --publish</code> →{" "}
                  <code className="font-mono">ports</code>
                </li>
                <li>
                  <code className="font-mono">-v, --volume</code> →{" "}
                  <code className="font-mono">volumes</code>
                </li>
                <li>
                  <code className="font-mono">-e, --env</code> →{" "}
                  <code className="font-mono">environment</code>
                </li>
                <li>
                  <code className="font-mono">--network</code> →{" "}
                  <code className="font-mono">networks</code>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Ship className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Convertisseur Docker
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Convertissez facilement vos commandes{" "}
                <code className="font-mono">docker run</code> en fichiers
                <code className="font-mono">docker-compose.yml</code> pour une
                meilleure gestion des services et une configuration plus
                maintenable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
