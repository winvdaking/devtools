"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Hash, Eye, EyeOff } from "lucide-react";

export function MarkdownToSlack() {
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

  // Fonction de conversion Markdown vers Slack
  const convertMarkdownToSlack = (md: string): string => {
    let slack = md;

    // Headers - Slack utilise des caractères spéciaux
    slack = slack.replace(/^### (.*$)/gim, '• *$1*');
    slack = slack.replace(/^## (.*$)/gim, '• *$1*');
    slack = slack.replace(/^# (.*$)/gim, '• *$1*');

    // Bold - Slack utilise *texte*
    slack = slack.replace(/\*\*(.*?)\*\*/g, '*$1*');
    slack = slack.replace(/__(.*?)__/g, '*$1*');

    // Italic - Slack utilise _texte_
    slack = slack.replace(/\*(.*?)\*/g, '_$1_');
    slack = slack.replace(/_(.*?)_/g, '_$1_');

    // Code blocks - Slack utilise ```langage
    slack = slack.replace(/```([\s\S]*?)```/g, '```\n$1\n```');

    // Inline code - Slack utilise `code`
    slack = slack.replace(/`([^`]+)`/g, '`$1`');

    // Links - Slack utilise <url|texte>
    slack = slack.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<$2|$1>');

    // Images - Slack affiche automatiquement les images
    slack = slack.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$2');

    // Blockquotes - Slack utilise > pour les citations
    slack = slack.replace(/^> (.*$)/gim, '> $1');

    // Unordered lists - Slack utilise des tirets
    slack = slack.replace(/^\* (.*$)/gim, '• $1');
    slack = slack.replace(/^- (.*$)/gim, '• $1');

    // Ordered lists - Slack utilise des numéros
    slack = slack.replace(/^\d+\. (.*$)/gim, (match, content) => {
      const numberMatch = match.match(/^\d+/);
      const number = numberMatch ? numberMatch[0] : '1';
      return `${number}. ${content}`;
    });

    // Tables - Slack ne supporte pas les tableaux, on les convertit en format texte
    const lines = slack.split('\n');
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
        
        tableLines.push(cells.join(' | '));
      } else {
        if (inTable && tableLines.length > 0) {
          // Convertir le tableau en format texte
          const tableText = tableLines.join('\n');
          slack = slack.replace(tableLines.join('\n'), `\`\`\`\n${tableText}\n\`\`\``);
          inTable = false;
          tableLines = [];
        }
      }
    }

    // Gérer les tableaux restants
    if (inTable && tableLines.length > 0) {
      const tableText = tableLines.join('\n');
      slack = slack.replace(tableLines.join('\n'), `\`\`\`\n${tableText}\n\`\`\``);
    }

    return slack;
  };

  const slackOutput = useMemo(() => convertMarkdownToSlack(markdown), [markdown]);

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
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Markdown vers Slack
          </CardTitle>
          <CardDescription>
            Convertissez votre contenu Markdown au format Slack avec un aperçu en temps réel
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

            {/* Output Slack */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Format Slack</label>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={() => setShowPreview(!showPreview)}
                    icon={showPreview ? EyeOff : Eye}
                  >
                    {showPreview ? "Code" : "Aperçu"}
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => copyToClipboard(slackOutput)}
                    icon={Copy}
                  >
                  </Button>
                  <Button
                    variant="default"
                    icon={Download}
                    onClick={() => downloadFile(slackOutput, 'slack-message.txt', 'text/plain')}
                  >
                  </Button>
                </div>
              </div>
              
              {showPreview ? (
                <div className="min-h-[400px] p-4 border rounded-md bg-white text-gray-900 font-mono text-sm overflow-auto whitespace-pre-wrap">
                  {slackOutput}
                </div>
              ) : (
                <Textarea
                  value={slackOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(slackOutput)}
              className="flex items-center gap-2"
              icon={Copy}
            >
              Copier le texte Slack
            </Button>
            <Button
              variant="default"
              onClick={() => downloadFile(slackOutput, 'slack-message.txt', 'text/plain')}
              className="flex items-center gap-2"
              icon={Download}
            >
              Télécharger texte
            </Button>
            <Button
              variant="default"
              onClick={() => downloadFile(markdown, 'source.md', 'text/markdown')}
              className="flex items-center gap-2"
              icon={FileText}
            >
              Télécharger Markdown
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Formatage Slack supporté
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
                <li><code># Titre</code> → • <strong>Titre</strong></li>
                <li><code>## Sous-titre</code> → • <strong>Sous-titre</strong></li>
                <li><code>### Titre 3</code> → • <strong>Titre 3</strong></li>
                <li><code>- Liste</code> → • Liste</li>
                <li><code>1. Liste</code> → 1. Liste</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Liens et médias</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>[texte](url)</code> → &lt;url|texte&gt;</li>
                <li><code>![alt](url)</code> → url (image affichée)</li>
                <li><code>&gt; Citation</code> → &gt; Citation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fonctionnalités Slack</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Mentions: <code>@nom</code></li>
                <li>• Canaux: <code>#canal</code></li>
                <li>• Émojis: <code>:emoji:</code></li>
                <li>• Pas de tableaux natifs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
