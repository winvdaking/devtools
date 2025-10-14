"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Settings, Github, Star, Eye, GitBranch } from "lucide-react";

export function ReadmeGenerator() {
  const [projectData, setProjectData] = useState({
    name: "Mon Projet",
    description: "Une description courte de votre projet",
    longDescription: "Une description plus détaillée de ce que fait votre projet et pourquoi il est utile.",
    author: "Votre Nom",
    email: "votre.email@example.com",
    github: "https://github.com/votre-username/votre-projet",
    website: "https://votre-projet.com",
    license: "MIT",
    version: "1.0.0",
    language: "JavaScript",
    framework: "React",
    features: [
      "Fonctionnalité 1",
      "Fonctionnalité 2", 
      "Fonctionnalité 3"
    ],
    installation: "npm install",
    usage: "npm start",
    contributing: "Les contributions sont les bienvenues !",
    screenshots: [],
    badges: ["build", "version", "license", "stars"],
    toc: true
  });

  const [customSections, setCustomSections] = useState([
    { title: "Configuration", content: "Instructions de configuration..." },
    { title: "Déploiement", content: "Guide de déploiement..." }
  ]);

  // Templates de badges
  const badgeTemplates = {
    build: "[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/username/repo)",
    version: "[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/username/repo)",
    license: "[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/username/repo)",
    stars: "[![Stars](https://img.shields.io/github/stars/username/repo?style=social)](https://github.com/username/repo)",
    downloads: "[![Downloads](https://img.shields.io/npm/dm/package-name)](https://www.npmjs.com/package/package-name)",
    issues: "[![Issues](https://img.shields.io/github/issues/username/repo)](https://github.com/username/repo/issues)",
    prs: "[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/username/repo/pulls)",
    coverage: "[![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)](https://github.com/username/repo)"
  };

  // Génération du README
  const generateReadme = () => {
    let readme = `# ${projectData.name}\n\n`;
    
    // Badges
    if (projectData.badges.length > 0) {
      readme += projectData.badges.map(badge => badgeTemplates[badge as keyof typeof badgeTemplates] || "").join(" ") + "\n\n";
    }
    
    // Description
    readme += `${projectData.description}\n\n`;
    readme += `${projectData.longDescription}\n\n`;
    
    // Table des matières
    if (projectData.toc) {
      readme += `## 📋 Table des matières\n\n`;
      readme += `- [Installation](#-installation)\n`;
      readme += `- [Utilisation](#-utilisation)\n`;
      readme += `- [Fonctionnalités](#-fonctionnalités)\n`;
      readme += `- [Configuration](#-configuration)\n`;
      readme += `- [Déploiement](#-déploiement)\n`;
      readme += `- [Contribution](#-contribution)\n`;
      readme += `- [Licence](#-licence)\n\n`;
    }
    
    // Fonctionnalités
    if (projectData.features.length > 0) {
      readme += `## ✨ Fonctionnalités\n\n`;
      projectData.features.forEach(feature => {
        readme += `- ${feature}\n`;
      });
      readme += `\n`;
    }
    
    // Installation
    readme += `## 🚀 Installation\n\n`;
    readme += `\`\`\`bash\n${projectData.installation}\n\`\`\`\n\n`;
    
    // Utilisation
    readme += `## 📖 Utilisation\n\n`;
    readme += `\`\`\`bash\n${projectData.usage}\n\`\`\`\n\n`;
    
    // Sections personnalisées
    customSections.forEach(section => {
      readme += `## ${section.title}\n\n`;
      readme += `${section.content}\n\n`;
    });
    
    // Contribution
    readme += `## 🤝 Contribution\n\n`;
    readme += `${projectData.contributing}\n\n`;
    readme += `1. Fork le projet\n`;
    readme += `2. Créez votre branche feature (\`git checkout -b feature/AmazingFeature\`)\n`;
    readme += `3. Committez vos changements (\`git commit -m 'Add some AmazingFeature'\`)\n`;
    readme += `4. Push vers la branche (\`git push origin feature/AmazingFeature\`)\n`;
    readme += `5. Ouvrez une Pull Request\n\n`;
    
    // Licence
    readme += `## 📄 Licence\n\n`;
    readme += `Distribué sous la licence ${projectData.license}. Voir \`LICENSE\` pour plus d'informations.\n\n`;
    
    // Auteur
    readme += `## 👨‍💻 Auteur\n\n`;
    readme += `**${projectData.author}**\n\n`;
    if (projectData.email) {
      readme += `- Email: ${projectData.email}\n`;
    }
    if (projectData.github) {
      readme += `- GitHub: [@${projectData.github.split('/').pop()}](${projectData.github})\n`;
    }
    if (projectData.website) {
      readme += `- Site web: [${projectData.website}](${projectData.website})\n`;
    }
    readme += `\n`;
    
    // Liens
    readme += `## 🔗 Liens\n\n`;
    if (projectData.github) {
      readme += `- [Repository GitHub](${projectData.github})\n`;
    }
    if (projectData.website) {
      readme += `- [Site web](${projectData.website})\n`;
    }
    readme += `\n`;
    
    return readme;
  };

  const readmeContent = useMemo(() => generateReadme(), [projectData, customSections]);

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

  const addCustomSection = () => {
    setCustomSections([...customSections, { title: "Nouvelle Section", content: "Contenu de la section..." }]);
  };

  const removeCustomSection = (index: number) => {
    setCustomSections(customSections.filter((_, i) => i !== index));
  };

  const updateCustomSection = (index: number, field: 'title' | 'content', value: string) => {
    const updated = [...customSections];
    updated[index][field] = value;
    setCustomSections(updated);
  };

  const addFeature = () => {
    setProjectData({
      ...projectData,
      features: [...projectData.features, "Nouvelle fonctionnalité"]
    });
  };

  const removeFeature = (index: number) => {
    setProjectData({
      ...projectData,
      features: projectData.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...projectData.features];
    updated[index] = value;
    setProjectData({
      ...projectData,
      features: updated
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Générateur de README
          </CardTitle>
          <CardDescription>
            Créez des fichiers README professionnels pour vos projets GitHub
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
              <label className="text-sm font-medium">Version</label>
              <Input
                value={projectData.version}
                onChange={(e) => setProjectData({...projectData, version: e.target.value})}
                placeholder="1.0.0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Auteur</label>
              <Input
                value={projectData.author}
                onChange={(e) => setProjectData({...projectData, author: e.target.value})}
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

            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub URL</label>
              <Input
                value={projectData.github}
                onChange={(e) => setProjectData({...projectData, github: e.target.value})}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Site web</label>
              <Input
                value={projectData.website}
                onChange={(e) => setProjectData({...projectData, website: e.target.value})}
                placeholder="https://votre-projet.com"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description courte</label>
            <Input
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value})}
              placeholder="Une description courte de votre projet"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description détaillée</label>
            <Textarea
              value={projectData.longDescription}
              onChange={(e) => setProjectData({...projectData, longDescription: e.target.value})}
              placeholder="Une description plus détaillée..."
              rows={3}
            />
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fonctionnalités</label>
              <Button variant="default" size="sm" onClick={addFeature}>
                Ajouter
              </Button>
            </div>
            {projectData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Fonctionnalité"
                />
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Badges</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(badgeTemplates).map(badge => (
                <label key={badge} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={projectData.badges.includes(badge)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProjectData({
                          ...projectData,
                          badges: [...projectData.badges, badge]
                        });
                      } else {
                        setProjectData({
                          ...projectData,
                          badges: projectData.badges.filter(b => b !== badge)
                        });
                      }
                    }}
                  />
                  <span className="text-sm capitalize">{badge}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sections personnalisées */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sections personnalisées</label>
              <Button variant="default" size="sm" onClick={addCustomSection}>
                Ajouter
              </Button>
            </div>
            {customSections.map((section, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-md">
                <div className="flex gap-2">
                  <Input
                    value={section.title}
                    onChange={(e) => updateCustomSection(index, 'title', e.target.value)}
                    placeholder="Titre de la section"
                  />
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => removeCustomSection(index)}
                  >
                    Supprimer
                  </Button>
                </div>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateCustomSection(index, 'content', e.target.value)}
                  placeholder="Contenu de la section..."
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="toc"
                checked={projectData.toc}
                onChange={(e) => setProjectData({...projectData, toc: e.target.checked})}
              />
              <label htmlFor="toc" className="text-sm">
                Inclure la table des matières
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => copyToClipboard(readmeContent)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le README
            </Button>
            <Button
              variant="default"
              onClick={() => downloadFile(readmeContent, 'README.md', 'text/markdown')}
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
            <Eye className="h-5 w-5" />
            Aperçu du README
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={readmeContent}
            readOnly
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
