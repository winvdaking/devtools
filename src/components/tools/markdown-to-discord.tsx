"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, MessageSquare, Eye, EyeOff } from "lucide-react";

// Composant pour l'aperçu Discord basé sur la documentation officielle
const DiscordPreview = ({ content }: { content: string }) => {
  const formatDiscordContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';
    let inMultiQuote = false;
    let multiQuoteContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Gestion des citations multilignes >>>
      if (line.trim() === '>>>') {
        if (inMultiQuote) {
          // Fin de la citation multiligne
          elements.push(
            <div key={key++} className="border-l-4 border-[#4f545c] pl-3 my-2 text-[#b9bbbe] italic">
              {multiQuoteContent.map((quoteLine, idx) => (
                <div key={idx}>{formatInlineText(quoteLine)}</div>
              ))}
            </div>
          );
          multiQuoteContent = [];
          inMultiQuote = false;
        } else {
          // Début de la citation multiligne
          inMultiQuote = true;
        }
        continue;
      }

      if (inMultiQuote) {
        multiQuoteContent.push(line);
        continue;
      }
      
      // Gestion des blocs de code multi-lignes
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Fin du bloc de code
          elements.push(
            <div key={key++} className="bg-[#2f3136] p-3 rounded my-2 font-mono text-sm text-[#dcddde]">
              {codeBlockLanguage && (
                <div className="text-[#8e9297] text-xs mb-2 border-b border-[#4f545c] pb-1">
                  {codeBlockLanguage}
                </div>
              )}
              <pre className="whitespace-pre-wrap">{codeBlockContent.join('\n')}</pre>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
          inCodeBlock = false;
        } else {
          // Début du bloc de code
          inCodeBlock = true;
          const language = line.trim().replace('```', '').trim();
          if (language) {
            codeBlockLanguage = language;
          }
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }
      
      // Headers
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        elements.push(
          <div key={key++} className="text-[#ffffff] text-lg font-semibold mb-2">
            {formatInlineText(title)}
          </div>
        );
      }
      else if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        elements.push(
          <div key={key++} className="text-[#ffffff] text-xl font-semibold mb-2">
            {formatInlineText(title)}
          </div>
        );
      }
      else if (line.startsWith('# ')) {
        const title = line.replace('# ', '');
        elements.push(
          <div key={key++} className="text-[#ffffff] text-2xl font-bold mb-2">
            {formatInlineText(title)}
          </div>
        );
      }
      // Citations simples
      else if (line.startsWith('> ')) {
        const quote = line.replace('> ', '');
        elements.push(
          <div key={key++} className="border-l-4 border-[#4f545c] pl-3 my-2 text-[#b9bbbe] italic">
            {formatInlineText(quote)}
          </div>
        );
      }
      // Lignes vides
      else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-2"></div>);
      }
      // Texte normal avec formatage
      else {
        const formattedLine = formatInlineText(line);
        elements.push(
          <div key={key++} className="mb-1">
            {formattedLine}
          </div>
        );
      }
    }

    // Gérer le bloc de code restant s'il y en a un
    if (inCodeBlock && codeBlockContent.length > 0) {
      elements.push(
        <div key={key++} className="bg-[#2f3136] p-3 rounded my-2 font-mono text-sm text-[#dcddde]">
          {codeBlockLanguage && (
            <div className="text-[#8e9297] text-xs mb-2 border-b border-[#4f545c] pb-1">
              {codeBlockLanguage}
            </div>
          )}
          <pre className="whitespace-pre-wrap">{codeBlockContent.join('\n')}</pre>
        </div>
      );
    }

    // Gérer la citation multiligne restante
    if (inMultiQuote && multiQuoteContent.length > 0) {
      elements.push(
        <div key={key++} className="border-l-4 border-[#4f545c] pl-3 my-2 text-[#b9bbbe] italic">
          {multiQuoteContent.map((quoteLine, idx) => (
            <div key={idx}>{formatInlineText(quoteLine)}</div>
          ))}
        </div>
      );
    }

    return <div>{elements}</div>;
  };

  const formatInlineText = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let key = 0;

    // Regex pour capturer le formatage Discord (ordre important : du plus spécifique au moins spécifique)
    const patterns = [
      // Mentions utilisateur <@ID>
      { 
        regex: /<@(\d+)>/g, 
        component: (match: string, id: string) => (
          <span key={key++} className="bg-[#5865f2] text-white px-1 rounded text-sm">
            @Utilisateur
          </span>
        )
      },
      // Mentions de rôles <@&ID>
      { 
        regex: /<@&(\d+)>/g, 
        component: (match: string, id: string) => (
          <span key={key++} className="bg-[#5865f2] text-white px-1 rounded text-sm">
            @Rôle
          </span>
        )
      },
      // Mentions de salons <#ID>
      { 
        regex: /<#(\d+)>/g, 
        component: (match: string, id: string) => (
          <span key={key++} className="bg-[#5865f2] text-white px-1 rounded text-sm">
            #salon
          </span>
        )
      },
      // Timestamps <t:timestamp:format>
      { 
        regex: /<t:(\d+):([FRDfrd])>/g, 
        component: (match: string, timestamp: string, format: string) => (
          <span key={key++} className="bg-[#4f545c] text-[#dcddde] px-1 rounded text-sm">
            {new Date(parseInt(timestamp) * 1000).toLocaleString()}
          </span>
        )
      },
      // Émojis :nom:
      { 
        regex: /:(\w+):/g, 
        component: (match: string, name: string) => (
          <span key={key++} className="text-lg">
            :{name}:
          </span>
        )
      },
      // Spoilers (doivent être traités en premier)
      { 
        regex: /\|\|([^|]+)\|\|/g, 
        component: (match: string) => (
          <span key={key++} className="bg-[#202225] text-[#202225] hover:text-[#dcddde] cursor-pointer rounded px-1 transition-colors">
            {match}
          </span>
        )
      },
      // Italique et gras combinés
      { 
        regex: /\*\*\*(.*?)\*\*\*/g, 
        component: (match: string) => (
          <strong key={key++} className="font-bold text-[#ffffff]">
            <em className="italic">{match}</em>
          </strong>
        )
      },
      { 
        regex: /___(.*?)___/g, 
        component: (match: string) => (
          <strong key={key++} className="font-bold text-[#ffffff]">
            <em className="italic">{match}</em>
          </strong>
        )
      },
      // Gras
      { 
        regex: /\*\*(.*?)\*\*/g, 
        component: (match: string) => (
          <strong key={key++} className="font-bold text-[#ffffff]">{match}</strong>
        )
      },
      { 
        regex: /__(.*?)__/g, 
        component: (match: string) => (
          <strong key={key++} className="font-bold text-[#ffffff]">{match}</strong>
        )
      },
      // Italique
      { 
        regex: /\*(.*?)\*/g, 
        component: (match: string) => (
          <em key={key++} className="italic">{match}</em>
        )
      },
      { 
        regex: /_(.*?)_/g, 
        component: (match: string) => (
          <em key={key++} className="italic">{match}</em>
        )
      },
      // Barré
      { 
        regex: /~~(.*?)~~/g, 
        component: (match: string) => (
          <span key={key++} className="line-through text-[#8e9297]">{match}</span>
        )
      },
      // Code inline
      { 
        regex: /`([^`]+)`/g, 
        component: (match: string) => (
          <code key={key++} className="bg-[#2f3136] px-1 py-0.5 rounded text-[#dcddde] font-mono text-sm">
            {match}
          </code>
        )
      },
      // Liens [texte](url)
      { 
        regex: /\[([^\]]+)\]\(([^)]+)\)/g, 
        component: (match: string, text: string, url: string) => (
          <a key={key++} href={url} className="text-[#00aff4] hover:underline" target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
      },
      // URLs (Discord affiche automatiquement les URLs)
      { 
        regex: /(https?:\/\/[^\s]+)/g, 
        component: (match: string) => (
          <a key={key++} href={match} className="text-[#00aff4] hover:underline" target="_blank" rel="noopener noreferrer">
            {match}
          </a>
        )
      }
    ];

    let lastIndex = 0;
    let foundMatches = false;

    // Chercher tous les matches
    const allMatches: Array<{ start: number; end: number; component: JSX.Element; original: string }> = [];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.regex.exec(text)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          component: pattern.component(match[1] || match[0], match[2], match[3]),
          original: match[0]
        });
      }
    });

    // Trier par position
    allMatches.sort((a, b) => a.start - b.start);

    // Construire le résultat
    allMatches.forEach(match => {
      // Ajouter le texte avant le match
      if (match.start > lastIndex) {
        parts.push(text.slice(lastIndex, match.start));
      }
      
      // Ajouter le composant formaté
      parts.push(match.component);
      lastIndex = match.end;
      foundMatches = true;
    });

    // Ajouter le texte restant
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return foundMatches ? parts : text;
  };

  return formatDiscordContent(content);
};

export function MarkdownToDiscord() {
  const [markdown, setMarkdown] = useState(`# Titre principal

## Sous-titre

Voici un **texte en gras** et un *texte en italique*.

### Formatage Discord complet
- **Gras** : \`**texte**\` ou \`__texte__\`
- *Italique* : \`*texte*\` ou \`_texte_\`
- ***Gras et italique*** : \`***texte***\` ou \`___texte___\`
- ~~Barré~~ : \`~~texte~~\`
- \`Code inline\` : \`\`code\`\`
- ||Spoiler|| : \`||texte||\`

### Code avec coloration syntaxique
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
  return "Discord formatting!";
}
\`\`\`

### Citations
> Ceci est une citation simple.

>>>
Citation multiligne
sur plusieurs lignes
avec du formatage
>>>

### Mentions et émojis
@Utilisateur123 → <@123456789>
@&Admin → <@&987654321>
#général → <#123456789>
:star: :heart: :fire:

### Timestamps
<t:1685542800:F> → Timestamp formaté

### Listes
- Premier élément
- Deuxième élément
- Troisième élément

1. Premier point
2. Deuxième point
3. Troisième point

### Liens et URLs
[Discord](https://discord.com) → Lien avec texte
https://discord.com → URL directe

### Tableau (converti en code)
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1  | Donnée 2  | Donnée 3  |
| Donnée 4  | Donnée 5  | Donnée 6  |`);

  const [showPreview, setShowPreview] = useState(false);

  // Fonction de conversion Markdown vers Discord basée sur la documentation officielle
  const convertMarkdownToDiscord = (md: string): string => {
    let discord = md;

    // 1. Headers - Discord supporte les headers avec # ## ###
    discord = discord.replace(/^### (.*$)/gim, '### $1');
    discord = discord.replace(/^## (.*$)/gim, '## $1');
    discord = discord.replace(/^# (.*$)/gim, '# $1');

    // 2. Bold - Discord utilise **texte** ou __texte__
    discord = discord.replace(/\*\*(.*?)\*\*/g, '**$1**');
    discord = discord.replace(/__(.*?)__/g, '__$1__');

    // 3. Italic - Discord utilise *texte* ou _texte_
    discord = discord.replace(/\*(.*?)\*/g, '*$1*');
    discord = discord.replace(/_(.*?)_/g, '_$1_');

    // 4. Italic et gras combinés - Discord utilise ***texte*** ou ___texte___
    discord = discord.replace(/\*\*\*(.*?)\*\*\*/g, '***$1***');
    discord = discord.replace(/___(.*?)___/g, '___$1___');

    // 5. Souligné - Discord utilise __texte__ (déjà traité plus haut)
    // 6. Barré - Discord utilise ~~texte~~
    discord = discord.replace(/~~(.*?)~~/g, '~~$1~~');

    // 7. Code blocks - Discord utilise ```langage ou ```
    discord = discord.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      if (lang) {
        return `\`\`\`${lang}\n${code}\n\`\`\``;
      }
      return `\`\`\`\n${code}\n\`\`\``;
    });

    // 8. Inline code - Discord utilise `code`
    discord = discord.replace(/`([^`]+)`/g, '`$1`');

    // 9. Spoilers - Discord utilise ||texte||
    discord = discord.replace(/\|\|([^|]+)\|\|/g, '||$1||');

    // 10. Citations simples - Discord utilise > pour les citations
    discord = discord.replace(/^> (.*$)/gim, '> $1');
    
    // 11. Citations multilignes - Discord utilise >>>
    discord = discord.replace(/^>>>\s*\n([\s\S]*?)\n>>>/gim, '>>>\n$1\n>>>');

    // 12. Liens - Discord supporte [texte](url)
    discord = discord.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1]($2)');

    // 13. Images - Discord affiche automatiquement les images
    discord = discord.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '![$1]($2)');

    // 14. Listes non ordonnées - Discord utilise -, *, ou +
    discord = discord.replace(/^\* (.*$)/gim, '- $1');
    discord = discord.replace(/^- (.*$)/gim, '- $1');
    discord = discord.replace(/^\+ (.*$)/gim, '- $1');

    // 15. Listes ordonnées - Discord utilise des numéros
    discord = discord.replace(/^\d+\. (.*$)/gim, (match, content) => {
      const numberMatch = match.match(/^\d+/);
      const number = numberMatch ? numberMatch[0] : '1';
      return `${number}. ${content}`;
    });

    // 16. Mentions utilisateur - Discord utilise <@ID>
    discord = discord.replace(/@(\w+)/g, '<@$1>');

    // 17. Mentions de rôles - Discord utilise <@&ID>
    discord = discord.replace(/@&(\w+)/g, '<@&$1>');

    // 18. Mentions de salons - Discord utilise <#ID>
    discord = discord.replace(/#(\w+)/g, '<#$1>');

    // 19. Émojis - Discord utilise :nom:
    discord = discord.replace(/:(\w+):/g, ':$1:');

    // 20. Timestamps - Discord utilise <t:timestamp:format>
    discord = discord.replace(/<t:(\d+):([FRDfrd])>/g, '<t:$1:$2>');

    // 21. Tables - Discord ne supporte pas les tableaux, on les convertit en format texte
    const lines = discord.split('\n');
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
          discord = discord.replace(tableLines.join('\n'), `\`\`\`\n${tableText}\n\`\`\``);
          inTable = false;
          tableLines = [];
        }
      }
    }

    // Gérer les tableaux restants
    if (inTable && tableLines.length > 0) {
      const tableText = tableLines.join('\n');
      discord = discord.replace(tableLines.join('\n'), `\`\`\`\n${tableText}\n\`\`\``);
    }

    return discord;
  };

  const discordOutput = useMemo(() => convertMarkdownToDiscord(markdown), [markdown]);

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
            <MessageSquare className="h-5 w-5" />
            Markdown vers Discord
          </CardTitle>
          <CardDescription>
            Convertissez votre contenu Markdown au format Discord avec un aperçu en temps réel
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

            {/* Output Discord */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Format Discord</label>
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
                    onClick={() => copyToClipboard(discordOutput)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(discordOutput, 'discord-message.txt', 'text/plain')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {showPreview ? (
                <div className="min-h-[400px] p-4 border rounded-md bg-[#36393f] text-[#dcddde] overflow-auto">
                  <DiscordPreview content={discordOutput} />
                </div>
              ) : (
                <Textarea
                  value={discordOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(discordOutput)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier le texte Discord
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(discordOutput, 'discord-message.txt', 'text/plain')}
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
            <MessageSquare className="h-5 w-5" />
            Formatage Discord officiel complet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Formatage de texte</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>**gras**</code> ou <code>__gras__</code> → <strong>gras</strong></li>
                <li><code>*italique*</code> ou <code>_italique_</code> → <em>italique</em></li>
                <li><code>***gras italique***</code> → <strong><em>gras italique</em></strong></li>
                <li><code>~~barré~~</code> → <span className="line-through">barré</span></li>
                <li><code>`code inline`</code> → <code>code inline</code></li>
                <li><code>||spoiler||</code> → <span className="bg-gray-200 text-gray-200 hover:text-gray-800 cursor-pointer rounded px-1">spoiler</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Blocs et structure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code># Titre</code> → <strong>Titre</strong></li>
                <li><code>```langage</code> → bloc de code avec coloration</li>
                <li><code>&gt; citation</code> → <span className="border-l-4 border-gray-300 pl-2 italic">citation</span></li>
                <li><code>&gt;&gt;&gt; multiligne</code> → citation multiligne</li>
                <li><code>- liste</code> → • liste</li>
                <li><code>1. liste</code> → 1. liste</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Mentions et émojis</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>&lt;@ID&gt;</code> → <span className="bg-blue-500 text-white px-1 rounded text-xs">@Utilisateur</span></li>
                <li><code>&lt;@&ID&gt;</code> → <span className="bg-blue-500 text-white px-1 rounded text-xs">@Rôle</span></li>
                <li><code>&lt;#ID&gt;</code> → <span className="bg-blue-500 text-white px-1 rounded text-xs">#Salon</span></li>
                <li><code>:nom:</code> → :star: :heart: :fire:</li>
                <li><code>&lt;t:timestamp:F&gt;</code> → timestamp formaté</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Liens et médias</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>[texte](url)</code> → <a href="#" className="text-blue-500 hover:underline">texte</a></li>
                <li><code>![alt](url)</code> → image affichée</li>
                <li><code>https://url.com</code> → lien automatique</li>
                <li><code>&lt;url&gt;</code> → lien sans aperçu</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">⚠️ Limitations Discord</h4>
            <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>• Pas de tableaux natifs (convertis en blocs de code)</li>
              <li>• Limite de 2000 caractères par message</li>
              <li>• Pas de formatage de texte avancé (couleurs, tailles)</li>
              <li>• Les émojis personnalisés nécessitent Nitro</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
