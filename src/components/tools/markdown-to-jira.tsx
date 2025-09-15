"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Bug, Eye, EyeOff } from "lucide-react";

export function MarkdownToJira() {
  const [markdown, setMarkdown] = useState(`# Titre principal

## Sous-titre

Voici un **texte en gras** et un *texte en italique*.

### Liste à puces
- Premier élément
- Deuxième élément
- Troisième élément

### Liste numérotée
1. Premier point
2. Deuxième point
3. Troisième point

### Code
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lien
[Visitez mon site](https://example.com)

### Image
![Image d'exemple](https://via.placeholder.com/300x200)

### Citation
> Ceci est une citation importante.

### Tableau
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1  | Donnée 2  | Donnée 3  |
| Donnée 4  | Donnée 5  | Donnée 6  |`);

  const [showPreview, setShowPreview] = useState(false);

  // Fonction de conversion Markdown vers Jira
  const convertMarkdownToJira = (md: string): string => {
    let jira = md;

    // Headers - Jira utilise h1. h2. h3.
    jira = jira.replace(/^### (.*$)/gim, 'h3. $1');
    jira = jira.replace(/^## (.*$)/gim, 'h2. $1');
    jira = jira.replace(/^# (.*$)/gim, 'h1. $1');

    // Bold - Jira utilise *texte*
    jira = jira.replace(/\*\*(.*?)\*\*/g, '*$1*');
    jira = jira.replace(/__(.*?)__/g, '*$1*');

    // Italic - Jira utilise _texte_
    jira = jira.replace(/\*(.*?)\*/g, '_$1_');
    jira = jira.replace(/_(.*?)_/g, '_$1_');

    // Code blocks - Jira utilise {code:langage}
    jira = jira.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'text';
      return `{code:${language}}\n${code}\n{code}`;
    });

    // Inline code - Jira utilise {{code}}
    jira = jira.replace(/`([^`]+)`/g, '{{$1}}');

    // Links - Jira utilise [texte|url]
    jira = jira.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1|$2]');

    // Images - Jira utilise !url!
    jira = jira.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '!$2!');

    // Blockquotes - Jira utilise bq.
    jira = jira.replace(/^> (.*$)/gim, 'bq. $1');

    // Unordered lists - Jira utilise * pour les listes
    jira = jira.replace(/^\* (.*$)/gim, '* $1');
    jira = jira.replace(/^- (.*$)/gim, '* $1');

    // Ordered lists - Jira utilise # pour les listes numérotées
    jira = jira.replace(/^\d+\. (.*$)/gim, '# $1');

    // Tables - Jira a un support natif des tableaux
    const lines = jira.split('\n');
    let inTable = false;
    let tableLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes('|') && line.split('|').length > 2) {
        if (!inTable) {
          inTable = true;
          tableLines = [];
        }
        
        const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
        
        if (cells.some(cell => cell.includes('---'))) {
          // Header separator, skip
          continue;
        }
        
        // Jira utilise || pour les cellules
        const jiraRow = '|' + cells.join('|') + '|';
        tableLines.push(jiraRow);
      } else {
        if (inTable && tableLines.length > 0) {
          // Convertir le tableau en format Jira
          const tableText = tableLines.join('\n');
          jira = jira.replace(tableLines.join('\n'), tableText);
          inTable = false;
          tableLines = [];
        }
      }
    }

    // Gérer les tableaux restants
    if (inTable && tableLines.length > 0) {
      const tableText = tableLines.join('\n');
      jira = jira.replace(tableLines.join('\n'), tableText);
    }

    return jira;
  };

  const jiraOutput = useMemo(() => convertMarkdownToJira(markdown), [markdown]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Markdown vers Jira
          </CardTitle>
          <CardDescription>
            Convertissez votre contenu Markdown au format Jira avec un aperçu en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Markdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Markdown</label>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Saisissez votre contenu Markdown ici..."
                className="min-h-[400px] font-mono text-sm"
              />
            </div>

            {/* Output Jira */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Format Jira</label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPreview ? "Code" : "Aperçu"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(jiraOutput)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(jiraOutput, 'jira-content.txt', 'text/plain')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {showPreview ? (
                <div className="min-h-[400px] p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-gray-100 font-mono text-sm overflow-auto whitespace-pre-wrap">
                  {jiraOutput}
                </div>
              ) : (
                <Textarea
                  value={jiraOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(jiraOutput)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le texte Jira
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(jiraOutput, 'jira-content.txt', 'text/plain')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger texte
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(markdown, 'source.md', 'text/markdown')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Télécharger Markdown
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Formatage Jira supporté
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Formatage de texte</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>**gras**</code> → <strong>gras</strong></li>
                <li><code>*italique*</code> → <em>italique</em></li>
                <li><code>`code inline`</code> → <code>code inline</code></li>
                <li><code>```bloc de code```</code> → bloc de code</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Structure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code># Titre</code> → h1. Titre</li>
                <li><code>## Sous-titre</code> → h2. Sous-titre</li>
                <li><code>### Titre 3</code> → h3. Titre 3</li>
                <li><code>- Liste</code> → * Liste</li>
                <li><code>1. Liste</code> → # Liste</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Liens et médias</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>[texte](url)</code> → [texte|url]</li>
                <li><code>![alt](url)</code> → !url!</li>
                <li><code>&gt; Citation</code> → bq. Citation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fonctionnalités Jira</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Issues: <code>PROJ-123</code></li>
                <li>• Utilisateurs: <code>[~username]</code></li>
                <li>• Tableaux natifs supportés</li>
                <li>• Macros Jira disponibles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
