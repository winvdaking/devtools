/**
 * Calculateur de permissions chmod
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Copy,
  Check,
  FileText,
  Folder,
  User,
  Users,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Permission {
  read: boolean;
  write: boolean;
  execute: boolean;
}

interface ChmodPermissions {
  owner: Permission;
  group: Permission;
  others: Permission;
  special: {
    setuid: boolean;
    setgid: boolean;
    sticky: boolean;
  };
}

export function ChmodCalculator() {
  const [permissions, setPermissions] = useState<ChmodPermissions>({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    others: { read: true, write: false, execute: false },
    special: { setuid: false, setgid: false, sticky: false },
  });

  const [octalValue, setOctalValue] = useState("644");
  const [symbolicValue, setSymbolicValue] = useState("rw-r--r--");
  const [copied, setCopied] = useState<string | null>(null);

  const commonPermissions = [
    {
      name: "Fichier standard",
      octal: "644",
      symbolic: "rw-r--r--",
      desc: "Lecture/écriture pour le propriétaire, lecture pour les autres",
    },
    {
      name: "Fichier exécutable",
      octal: "755",
      symbolic: "rwxr-xr-x",
      desc: "Lecture/écriture/exécution pour le propriétaire, lecture/exécution pour les autres",
    },
    {
      name: "Fichier privé",
      octal: "600",
      symbolic: "rw-------",
      desc: "Lecture/écriture pour le propriétaire uniquement",
    },
    {
      name: "Dossier standard",
      octal: "755",
      symbolic: "rwxr-xr-x",
      desc: "Lecture/écriture/exécution pour le propriétaire, lecture/exécution pour les autres",
    },
    {
      name: "Dossier partagé",
      octal: "775",
      symbolic: "rwxrwxr-x",
      desc: "Lecture/écriture/exécution pour le propriétaire et le groupe",
    },
    {
      name: "Dossier privé",
      octal: "700",
      symbolic: "rwx------",
      desc: "Lecture/écriture/exécution pour le propriétaire uniquement",
    },
    {
      name: "Script exécutable",
      octal: "755",
      symbolic: "rwxr-xr-x",
      desc: "Exécutable par tous, modifiable par le propriétaire",
    },
    {
      name: "Fichier de configuration",
      octal: "640",
      symbolic: "rw-r-----",
      desc: "Lecture/écriture pour le propriétaire, lecture pour le groupe",
    },
  ];

  const calculateOctal = (perms: ChmodPermissions): string => {
    let octal = 0;

    // Permissions spéciales
    if (perms.special.setuid) octal += 4000;
    if (perms.special.setgid) octal += 2000;
    if (perms.special.sticky) octal += 1000;

    // Propriétaire
    if (perms.owner.read) octal += 400;
    if (perms.owner.write) octal += 200;
    if (perms.owner.execute) octal += 100;

    // Groupe
    if (perms.group.read) octal += 40;
    if (perms.group.write) octal += 20;
    if (perms.group.execute) octal += 10;

    // Autres
    if (perms.others.read) octal += 4;
    if (perms.others.write) octal += 2;
    if (perms.others.execute) octal += 1;

    return octal.toString();
  };

  const calculateSymbolic = (perms: ChmodPermissions): string => {
    let symbolic = "";

    // Permissions spéciales
    if (perms.special.setuid) symbolic += "s";
    else if (perms.owner.execute) symbolic += "x";
    else symbolic += "-";

    if (perms.special.setgid) symbolic += "s";
    else if (perms.group.execute) symbolic += "x";
    else symbolic += "-";

    if (perms.special.sticky) symbolic += "t";
    else if (perms.others.execute) symbolic += "x";
    else symbolic += "-";

    // Propriétaire
    symbolic += perms.owner.read ? "r" : "-";
    symbolic += perms.owner.write ? "w" : "-";
    symbolic += perms.owner.execute ? "x" : "-";

    // Groupe
    symbolic += perms.group.read ? "r" : "-";
    symbolic += perms.group.write ? "w" : "-";
    symbolic += perms.group.execute ? "x" : "-";

    // Autres
    symbolic += perms.others.read ? "r" : "-";
    symbolic += perms.others.write ? "w" : "-";
    symbolic += perms.others.execute ? "x" : "-";

    return symbolic;
  };

  const parseOctal = (octal: string): ChmodPermissions => {
    const num = parseInt(octal, 8);
    if (isNaN(num)) return permissions;

    const perms: ChmodPermissions = {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      others: { read: false, write: false, execute: false },
      special: { setuid: false, setgid: false, sticky: false },
    };

    // Permissions spéciales
    perms.special.setuid = (num & 4000) !== 0;
    perms.special.setgid = (num & 2000) !== 0;
    perms.special.sticky = (num & 1000) !== 0;

    // Propriétaire
    perms.owner.read = (num & 400) !== 0;
    perms.owner.write = (num & 200) !== 0;
    perms.owner.execute = (num & 100) !== 0;

    // Groupe
    perms.group.read = (num & 40) !== 0;
    perms.group.write = (num & 20) !== 0;
    perms.group.execute = (num & 10) !== 0;

    // Autres
    perms.others.read = (num & 4) !== 0;
    perms.others.write = (num & 2) !== 0;
    perms.others.execute = (num & 1) !== 0;

    return perms;
  };

  const updatePermission = (
    section: keyof ChmodPermissions,
    permission: keyof Permission,
    value: boolean
  ) => {
    if (section === "special") {
      setPermissions((prev) => ({
        ...prev,
        special: { ...prev.special, [permission]: value },
      }));
    } else {
      setPermissions((prev) => ({
        ...prev,
        [section]: { ...prev[section], [permission]: value },
      }));
    }
  };

  const loadPreset = (preset: (typeof commonPermissions)[0]) => {
    setOctalValue(preset.octal);
    setPermissions(parseOctal(preset.octal));
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getPermissionDescription = (perms: ChmodPermissions): string => {
    const descriptions = [];

    if (perms.special.setuid) descriptions.push("SetUID activé");
    if (perms.special.setgid) descriptions.push("SetGID activé");
    if (perms.special.sticky) descriptions.push("Sticky bit activé");

    const ownerPerms = [];
    if (perms.owner.read) ownerPerms.push("lecture");
    if (perms.owner.write) ownerPerms.push("écriture");
    if (perms.owner.execute) ownerPerms.push("exécution");

    const groupPerms = [];
    if (perms.group.read) groupPerms.push("lecture");
    if (perms.group.write) groupPerms.push("écriture");
    if (perms.group.execute) groupPerms.push("exécution");

    const othersPerms = [];
    if (perms.others.read) othersPerms.push("lecture");
    if (perms.others.write) othersPerms.push("écriture");
    if (perms.others.execute) othersPerms.push("exécution");

    return `Propriétaire: ${ownerPerms.join(", ") || "aucune"}; Groupe: ${
      groupPerms.join(", ") || "aucune"
    }; Autres: ${othersPerms.join(", ") || "aucune"}`;
  };

  useEffect(() => {
    const newOctal = calculateOctal(permissions);
    const newSymbolic = calculateSymbolic(permissions);
    setOctalValue(newOctal);
    setSymbolicValue(newSymbolic);
  }, [permissions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Chmod Calculator</h2>
      </div>

      {/* Permissions communes */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions communes</CardTitle>
          <CardDescription>
            Cliquez sur un preset pour l'appliquer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonPermissions.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => loadPreset(preset)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {preset.octal} ({preset.symbolic})
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {preset.desc}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interface de permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration des permissions</CardTitle>
          <CardDescription>
            Cliquez sur les cases pour modifier les permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Permissions spéciales */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Permissions spéciales</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={permissions.special.setuid}
                    onChange={(e) =>
                      updatePermission("special", "setuid", e.target.checked)
                    }
                    className="rounded"
                  />
                  <span>SetUID</span>
                </label>
                <div className="text-xs text-muted-foreground">
                  Exécute avec les permissions du propriétaire
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={permissions.special.setgid}
                    onChange={(e) =>
                      updatePermission("special", "setgid", e.target.checked)
                    }
                    className="rounded"
                  />
                  <span>SetGID</span>
                </label>
                <div className="text-xs text-muted-foreground">
                  Exécute avec les permissions du groupe
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={permissions.special.sticky}
                    onChange={(e) =>
                      updatePermission("special", "sticky", e.target.checked)
                    }
                    className="rounded"
                  />
                  <span>Sticky</span>
                </label>
                <div className="text-xs text-muted-foreground">
                  Seul le propriétaire peut supprimer
                </div>
              </div>
            </div>
          </div>

          {/* Permissions standard */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Permissions standard</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Propriétaire */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">Propriétaire</span>
                </div>
                <div className="space-y-2">
                  {(["read", "write", "execute"] as const).map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions.owner[perm]}
                        onChange={(e) =>
                          updatePermission("owner", perm, e.target.checked)
                        }
                        className="rounded"
                      />
                      <span className="text-sm capitalize">
                        {perm === "read"
                          ? "Lecture"
                          : perm === "write"
                          ? "Écriture"
                          : "Exécution"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Groupe */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">Groupe</span>
                </div>
                <div className="space-y-2">
                  {(["read", "write", "execute"] as const).map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions.group[perm]}
                        onChange={(e) =>
                          updatePermission("group", perm, e.target.checked)
                        }
                        className="rounded"
                      />
                      <span className="text-sm capitalize">
                        {perm === "read"
                          ? "Lecture"
                          : perm === "write"
                          ? "Écriture"
                          : "Exécution"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Autres */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-sm">Autres</span>
                </div>
                <div className="space-y-2">
                  {(["read", "write", "execute"] as const).map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions.others[perm]}
                        onChange={(e) =>
                          updatePermission("others", perm, e.target.checked)
                        }
                        className="rounded"
                      />
                      <span className="text-sm capitalize">
                        {perm === "read"
                          ? "Lecture"
                          : perm === "write"
                          ? "Écriture"
                          : "Exécution"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <Card>
        <CardHeader>
          <CardTitle>Résultats</CardTitle>
          <CardDescription>
            {getPermissionDescription(permissions)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Valeur octale */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Valeur octale</label>
            <div className="flex items-center space-x-2">
              <Input
                value={octalValue}
                onChange={(e) => {
                  const newPerms = parseOctal(e.target.value);
                  setPermissions(newPerms);
                }}
                className="font-mono text-lg"
                placeholder="644"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(octalValue, "octal")}
              >
                {copied === "octal" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier
              </Button>
            </div>
          </div>

          {/* Valeur symbolique */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Valeur symbolique</label>
            <div className="flex items-center space-x-2">
              <Input
                value={symbolicValue}
                readOnly
                className="font-mono text-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(symbolicValue, "symbolic")}
              >
                {copied === "symbolic" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier
              </Button>
            </div>
          </div>

          {/* Commande chmod */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Commande chmod</label>
            <div className="flex items-center space-x-2">
              <Input
                value={`chmod ${octalValue} fichier`}
                readOnly
                className="font-mono text-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(`chmod ${octalValue} fichier`, "command")
                }
              >
                {copied === "command" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Représentation visuelle */}
      <Card>
        <CardHeader>
          <CardTitle>Représentation visuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fichier */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Fichier</span>
              </div>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                {symbolicValue}
              </div>
            </div>

            {/* Dossier */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Folder className="h-5 w-5 text-green-600" />
                <span className="font-medium">Dossier</span>
              </div>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                d{symbolicValue.slice(1)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Calculateur chmod
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Calculez facilement les permissions Unix/Linux avec l'interface
                visuelle. Convertissez entre notation octale et symbolique, et
                générez les commandes chmod.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
