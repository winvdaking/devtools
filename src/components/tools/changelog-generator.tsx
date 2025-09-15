"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Calendar, Plus, Trash2, Edit3 } from "lucide-react";

export function ChangelogGenerator() {
  const [projectData, setProjectData] = useState({
    name: "Mon Projet",
    description: "Journal des modifications de votre projet",
    url: "https://github.com/username/repo",
    maintainer: "Votre Nom",
    email: "votre.email@example.com"
  });

  const [releases, setReleases] = useState([
    {
      version: "1.0.0",
      date: new Date().toISOString().split('T')[0],
      type: "major",
      changes: [
        { type: "added", description: "Fonctionnalité majeure ajoutée" },
        { type: "changed", description: "Amélioration de l'interface" },
        { type: "fixed", description: "Correction de bugs critiques" }
      ],
      yanked: false
    },
    {
      version: "0.9.0",
      date: "2024-01-15",
      type: "minor",
      changes: [
        { type: "added", description: "Nouvelle fonctionnalité" },
        { type: "deprecated", description: "Ancienne API dépréciée" }
      ],
      yanked: false
    }
  ]);

  const [newChange, setNewChange] = useState({ type: "added", description: "" });

  const changeTypes = {
    added: { label: "Ajouté", emoji: "✨", color: "text-green-600" },
    changed: { label: "Modifié", emoji: "🔄", color: "text-blue-600" },
    fixed: { label: "Corrigé", emoji: "🐛", color: "text-red-600" },
    deprecated: { label: "Déprécié", emoji: "⚠️", color: "text-yellow-600" },
    removed: { label: "Supprimé", emoji: "🗑️", color: "text-gray-600" },
    security: { label: "Sécurité", emoji: "🔒", color: "text-purple-600" },
    performance: { label: "Performance", emoji: "⚡", color: "text-orange-600" }
  };

  const releaseTypes = {
    major: { label: "Version majeure", emoji: "🚀" },
    minor: { label: "Version mineure", emoji: "🆕" },
    patch: { label: "Correctif", emoji: "🔧" },
    prerelease: { label: "Pré-version", emoji: "🧪" }
  };

  // Génération du changelog
  const generateChangelog = () => {
    let changelog = `# Changelog\n\n`;
    changelog += `Toutes les modifications notables de ce projet seront documentées dans ce fichier.\n\n`;
    changelog += `Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),\n`;
    changelog += `et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n`;

    // Table des matières
    changelog += `## [Non publié]\n\n`;
    changelog += `### Ajouté\n`;
    changelog += `- Fonctionnalités en cours de développement\n\n`;

    // Versions
    releases.forEach((release, index) => {
      const releaseType = releaseTypes[release.type as keyof typeof releaseTypes];
      changelog += `## [${release.version}] - ${release.date}`;
      if (release.yanked) {
        changelog += ` [YANKED]`;
      }
      changelog += `\n\n`;

      // Grouper les changements par type
      const groupedChanges = release.changes.reduce((acc, change) => {
        if (!acc[change.type]) {
          acc[change.type] = [];
        }
        acc[change.type].push(change.description);
        return acc;
      }, {} as Record<string, string[]>);

      // Afficher les changements groupés
      Object.entries(changeTypes).forEach(([type, typeInfo]) => {
        if (groupedChanges[type]) {
          changelog += `### ${typeInfo.emoji} ${typeInfo.label}\n\n`;
          groupedChanges[type].forEach(description => {
            changelog += `- ${description}\n`;
          });
          changelog += `\n`;
        }
      });

      if (index < releases.length - 1) {
        changelog += `---\n\n`;
      }
    });

    // Lien vers les versions
    changelog += `[Unreleased]: ${projectData.url}/compare/v${releases[0]?.version || '1.0.0'}...HEAD\n`;
    for (let i = 0; i < releases.length - 1; i++) {
      const current = releases[i];
      const next = releases[i + 1];
      changelog += `[${current.version}]: ${projectData.url}/compare/v${next.version}...v${current.version}\n`;
    }
    if (releases.length > 0) {
      const last = releases[releases.length - 1];
      changelog += `[${last.version}]: ${projectData.url}/releases/tag/v${last.version}\n`;
    }

    changelog += `\n`;
    changelog += `---\n\n`;
    changelog += `**Maintenu par:** ${projectData.maintainer} (${projectData.email})\n`;

    return changelog;
  };

  const changelogContent = useMemo(() => generateChangelog(), [projectData, releases]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addRelease = () => {
    const newVersion = `0.${releases.length}.0`;
    setReleases([{
      version: newVersion,
      date: new Date().toISOString().split('T')[0],
      type: "minor",
      changes: [],
      yanked: false
    }, ...releases]);
  };

  const removeRelease = (index: number) => {
    setReleases(releases.filter((_, i) => i !== index));
  };

  const updateRelease = (index: number, field: string, value: any) => {
    const updated = [...releases];
    updated[index] = { ...updated[index], [field]: value };
    setReleases(updated);
  };

  const addChange = (releaseIndex: number) => {
    if (newChange.description.trim()) {
      const updated = [...releases];
      updated[releaseIndex].changes.push({ ...newChange });
      setReleases(updated);
      setNewChange({ type: "added", description: "" });
    }
  };

  const removeChange = (releaseIndex: number, changeIndex: number) => {
    const updated = [...releases];
    updated[releaseIndex].changes = updated[releaseIndex].changes.filter((_, i) => i !== changeIndex);
    setReleases(updated);
  };

  const updateChange = (releaseIndex: number, changeIndex: number, field: string, value: string) => {
    const updated = [...releases];
    updated[releaseIndex].changes[changeIndex] = {
      ...updated[releaseIndex].changes[changeIndex],
      [field]: value
    };
    setReleases(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Générateur de Changelog
          </CardTitle>
          <CardDescription>
            Créez des changelogs professionnels pour vos projets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informations du projet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du projet</label>
              <Input
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                placeholder="Mon Projet"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">URL du repository</label>
              <Input
                value={projectData.url}
                onChange={(e) => setProjectData({...projectData, url: e.target.value})}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mainteneur</label>
              <Input
                value={projectData.maintainer}
                onChange={(e) => setProjectData({...projectData, maintainer: e.target.value})}
                placeholder="Votre Nom"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={projectData.email}
                onChange={(e) => setProjectData({...projectData, email: e.target.value})}
                placeholder="votre.email@example.com"
                type="email"
              />
            </div>
          </div>

          {/* Versions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Versions</label>
              <Button variant="outline" size="sm" onClick={addRelease}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une version
              </Button>
            </div>

            {releases.map((release, releaseIndex) => (
              <div key={releaseIndex} className="p-4 border rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Version {release.version}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRelease(releaseIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Version</label>
                    <Input
                      value={release.version}
                      onChange={(e) => updateRelease(releaseIndex, 'version', e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={release.date}
                      onChange={(e) => updateRelease(releaseIndex, 'date', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      value={release.type}
                      onChange={(e) => updateRelease(releaseIndex, 'type', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      {Object.entries(releaseTypes).map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.emoji} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Changements */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Changements</label>
                  
                  {release.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex gap-2 items-center">
                      <select
                        value={change.type}
                        onChange={(e) => updateChange(releaseIndex, changeIndex, 'type', e.target.value)}
                        className="p-2 border rounded-md bg-background"
                      >
                        {Object.entries(changeTypes).map(([key, type]) => (
                          <option key={key} value={key}>
                            {type.emoji} {type.label}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={change.description}
                        onChange={(e) => updateChange(releaseIndex, changeIndex, 'description', e.target.value)}
                        placeholder="Description du changement"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeChange(releaseIndex, changeIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Ajouter un changement */}
                  <div className="flex gap-2 items-center">
                    <select
                      value={newChange.type}
                      onChange={(e) => setNewChange({...newChange, type: e.target.value})}
                      className="p-2 border rounded-md bg-background"
                    >
                      {Object.entries(changeTypes).map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.emoji} {type.label}
                        </option>
                      ))}
                    </select>
                    <Input
                      value={newChange.description}
                      onChange={(e) => setNewChange({...newChange, description: e.target.value})}
                      placeholder="Description du changement"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addChange(releaseIndex)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`yanked-${releaseIndex}`}
                    checked={release.yanked}
                    onChange={(e) => updateRelease(releaseIndex, 'yanked', e.target.checked)}
                  />
                  <label htmlFor={`yanked-${releaseIndex}`} className="text-sm">
                    Version retirée (YANKED)
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => copyToClipboard(changelogContent)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le changelog
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(changelogContent, 'CHANGELOG.md', 'text/markdown')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aperçu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Aperçu du Changelog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={changelogContent}
            readOnly
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
