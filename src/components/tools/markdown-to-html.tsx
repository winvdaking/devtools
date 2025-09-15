"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Code, Eye, EyeOff } from "lucide-react";

export function MarkdownToHtml() {
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

  // Fonction de conversion Markdown vers HTML
  const convertMarkdownToHtml = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

    // Tables (basic support)
    const lines = html.split('\n');
    let inTable = false;
    let tableHtml = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes('|') && line.split('|').length > 2) {
        if (!inTable) {
          inTable = true;
          tableHtml = '<table class="border-collapse border border-gray-300 w-full">\n';
        }
        
        const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
        
        if (cells.some(cell => cell.includes('---'))) {
          // Header separator, skip
          continue;
        }
        
        const cellTag = i === 0 || (i > 0 && !lines[i-1].includes('|')) ? 'th' : 'td';
        const cellHtml = cells.map(cell => `<${cellTag} class="border border-gray-300 px-2 py-1">${cell}</${cellTag}>`).join('');
        tableHtml += `<tr>${cellHtml}</tr>\n`;
      } else {
        if (inTable) {
          tableHtml += '</table>';
          html = html.replace(lines.slice(0, i).join('\n'), tableHtml);
          inTable = false;
        }
      }
    }

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  };

  const htmlOutput = useMemo(() => convertMarkdownToHtml(markdown), [markdown]);

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
            <FileText className="h-5 w-5" />
            Markdown vers HTML
          </CardTitle>
          <CardDescription>
            Convertissez votre contenu Markdown en HTML avec un rendu en temps réel
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

            {/* Output HTML */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">HTML</label>
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
                    onClick={() => copyToClipboard(htmlOutput)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(htmlOutput, 'converted.html', 'text/html')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {showPreview ? (
                <div 
                  className="min-h-[400px] p-4 border rounded-md bg-white dark:bg-gray-900 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: htmlOutput }}
                />
              ) : (
                <Textarea
                  value={htmlOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(htmlOutput)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le HTML
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(htmlOutput, 'converted.html', 'text/html')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger HTML
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
            <Code className="h-5 w-5" />
            Syntaxe Markdown supportée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Formatage de texte</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>**gras**</code> ou <code>__gras__</code></li>
                <li><code>*italique*</code> ou <code>_italique_</code></li>
                <li><code>`code inline`</code></li>
                <li><code>```bloc de code```</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Structure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code># Titre 1</code></li>
                <li><code>## Titre 2</code></li>
                <li><code>### Titre 3</code></li>
                <li><code>- Liste à puces</code></li>
                <li><code>1. Liste numérotée</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Liens et médias</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>[texte](url)</code></li>
                <li><code>![alt](url)</code></li>
                <li><code>&gt; Citation</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tableaux</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>| Col1 | Col2 |</code></li>
                <li><code>|------|------|</code></li>
                <li><code>| Data | Data |</code></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
