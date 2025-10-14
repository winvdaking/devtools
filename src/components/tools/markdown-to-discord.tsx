"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Eye, EyeOff, RefreshCw } from "lucide-react";
import { DiscordIcon } from "@/components/ui/discord-icon";

// Composant pour l'aperçu Discord ultra-réaliste
const DiscordPreview = ({ content }: { content: string }) => {
  const [revealedSpoilers, setRevealedSpoilers] = useState<Set<number>>(new Set());
  const spoilerCounterRef = React.useRef(0);

  const toggleSpoiler = (index: number) => {
    setRevealedSpoilers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const formatDiscordContent = (text: string) => {
    spoilerCounterRef.current = 0;
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
          elements.push(
            <div key={key++} className="border-l-4 border-[#4f545c] dark:border-[#4f545c] pl-3 my-1 text-[#b9bbbe]">
              {multiQuoteContent.map((quoteLine, idx) => (
                <div key={idx}>{formatInlineText(quoteLine)}</div>
              ))}
            </div>
          );
          multiQuoteContent = [];
          inMultiQuote = false;
        } else {
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
          elements.push(
            <div key={key++} className="bg-[#2f3136] dark:bg-[#2f3136] p-2 rounded my-1 font-mono text-sm overflow-x-auto">
              {codeBlockLanguage && (
                <div className="text-[#b9bbbe] text-xs mb-1 font-sans">
                  {codeBlockLanguage}
                </div>
              )}
              <pre className="text-[#dcddde] whitespace-pre overflow-x-auto"><code>{codeBlockContent.join('\n')}</code></pre>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
          inCodeBlock = false;
        } else {
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
      
      // Headers Discord (# ## ###)
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        elements.push(
          <h3 key={key++} className="text-[#dcddde] text-base font-bold mb-1 mt-2">
            {formatInlineText(title)}
          </h3>
        );
      }
      else if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        elements.push(
          <h2 key={key++} className="text-[#dcddde] text-lg font-bold mb-1 mt-2">
            {formatInlineText(title)}
          </h2>
        );
      }
      else if (line.startsWith('# ')) {
        const title = line.replace('# ', '');
        elements.push(
          <h1 key={key++} className="text-[#dcddde] text-xl font-bold mb-2 mt-2">
            {formatInlineText(title)}
          </h1>
        );
      }
      // Citations simples
      else if (line.startsWith('> ')) {
        const quote = line.replace('> ', '');
        elements.push(
          <div key={key++} className="border-l-4 border-[#4f545c] dark:border-[#4f545c] pl-3 my-1 text-[#b9bbbe]">
            {formatInlineText(quote)}
          </div>
        );
      }
      // Listes non ordonnées
      else if (line.match(/^[\-\*\+] /)) {
        const content = line.replace(/^[\-\*\+] /, '');
        elements.push(
          <div key={key++} className="flex items-start gap-2 my-0.5">
            <span className="text-[#dcddde] mt-0.5">•</span>
            <span className="text-[#dcddde]">{formatInlineText(content)}</span>
          </div>
        );
      }
      // Listes ordonnées
      else if (line.match(/^\d+\. /)) {
        const match = line.match(/^(\d+)\. (.+)/);
        if (match) {
          const [, num, content] = match;
          elements.push(
            <div key={key++} className="flex items-start gap-2 my-0.5">
              <span className="text-[#dcddde]">{num}.</span>
              <span className="text-[#dcddde]">{formatInlineText(content)}</span>
            </div>
          );
        }
      }
      // Lignes vides
      else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-1"></div>);
      }
      // Texte normal avec formatage inline
      else {
        const formattedLine = formatInlineText(line);
        elements.push(
          <div key={key++} className="text-[#dcddde] my-0.5">
            {formattedLine}
          </div>
        );
      }
    }

    return <div className="leading-relaxed">{elements}</div>;
  };

  const formatInlineText = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    let keyCounter = 0;

    // Pattern pour tous les formats Discord dans l'ordre de priorité
    const patterns = [
      // Mentions utilisateur <@ID> ou <@!ID>
      {
        regex: /<@!?(\d+)>/g,
        render: (match: RegExpMatchArray) => (
          <span key={keyCounter++} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-1 rounded cursor-pointer transition-colors">
            @Utilisateur
          </span>
        )
      },
      // Mentions de rôles <@&ID>
      {
        regex: /<@&(\d+)>/g,
        render: (match: RegExpMatchArray) => (
          <span key={keyCounter++} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-1 rounded cursor-pointer transition-colors">
            @Rôle
          </span>
        )
      },
      // Mentions de salons <#ID>
      {
        regex: /<#(\d+)>/g,
        render: (match: RegExpMatchArray) => (
          <span key={keyCounter++} className="bg-[#5865f2] hover:bg-[#4752c4] text-[#00aff4] px-1 rounded cursor-pointer transition-colors">
            #salon
          </span>
        )
      },
      // Timestamps <t:timestamp:format>
      {
        regex: /<t:(\d+)(?::([tTdDfFR]))?>/g,
        render: (match: RegExpMatchArray) => {
          const timestamp = parseInt(match[1]);
          const format = match[2] || 'f';
          const date = new Date(timestamp * 1000);
          
          const formatDate = (fmt: string) => {
            switch (fmt) {
              case 't': return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
              case 'T': return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              case 'd': return date.toLocaleDateString('fr-FR');
              case 'D': return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
              case 'f': return date.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
              case 'F': return date.toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
              case 'R': {
                const diffMs = Date.now() - date.getTime();
                const diffSec = Math.floor(diffMs / 1000);
                const diffMin = Math.floor(diffSec / 60);
                const diffHr = Math.floor(diffMin / 60);
                const diffDay = Math.floor(diffHr / 24);
                
                if (diffSec < 60) return 'à l\'instant';
                if (diffMin < 60) return `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
                if (diffHr < 24) return `il y a ${diffHr} heure${diffHr > 1 ? 's' : ''}`;
                return `il y a ${diffDay} jour${diffDay > 1 ? 's' : ''}`;
              }
              default: return date.toLocaleString('fr-FR');
            }
          };
          
          return (
            <span 
              key={keyCounter++}
              className="bg-[#4e5058] hover:bg-[#5d5f66] text-[#00aff4] px-1 rounded cursor-help transition-colors"
              title={date.toLocaleString('fr-FR')}
            >
              {formatDate(format)}
            </span>
          );
        }
      },
      // Émojis personnalisés <:nom:ID> et <a:nom:ID> (animés)
      {
        regex: /<a?:(\w+):(\d+)>/g,
        render: (match: RegExpMatchArray) => {
          const isAnimated = match[0].startsWith('<a:');
          return (
            <span key={keyCounter++} className="inline-block text-xl mx-0.5" title={`:${match[1]}:`}>
              {isAnimated ? '✨' : '😀'}
            </span>
          );
        }
      },
      // Émojis standard :nom:
      {
        regex: /:(\w+):/g,
        render: (match: RegExpMatchArray) => {
          const emojiMap: Record<string, string> = {
            'smile': '😊', 'heart': '❤️', 'fire': '🔥', 'star': '⭐', 
            'thumbsup': '👍', 'thumbsdown': '👎', 'eyes': '👀', 'thinking': '🤔',
            'joy': '😂', 'sob': '😭', 'wave': '👋', 'clap': '👏',
            'rocket': '🚀', 'tada': '🎉', 'warning': '⚠️', 'check': '✅',
            'x': '❌', 'question': '❓', 'exclamation': '❗', 'zzz': '💤'
          };
          const emoji = emojiMap[match[1].toLowerCase()] || `:${match[1]}:`;
          return <span key={keyCounter++} className="text-xl mx-0.5">{emoji}</span>;
        }
      },
      // Liens masqués [texte](url "titre optionnel")
      {
        regex: /\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]+)")?\)/g,
        render: (match: RegExpMatchArray) => (
          <a 
            key={keyCounter++}
            href={match[2]}
            title={match[3]}
            className="text-[#00aff4] hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        )
      },
      // URLs automatiques (avec suppression d'embed)
      {
        regex: /<(https?:\/\/[^\s>]+)>/g,
        render: (match: RegExpMatchArray) => (
          <a 
            key={keyCounter++}
            href={match[1]}
            className="text-[#00aff4] hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        )
      },
      // URLs simples
      {
        regex: /(https?:\/\/[^\s<]+)/g,
        render: (match: RegExpMatchArray) => (
          <a 
            key={keyCounter++}
            href={match[1]}
            className="text-[#00aff4] hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        )
      },
      // Spoilers ||texte||
      {
        regex: /\|\|(.+?)\|\|/g,
        render: (match: RegExpMatchArray) => {
          const currentSpoilerIdx = spoilerCounterRef.current++;
          const isRevealed = revealedSpoilers.has(currentSpoilerIdx);
          return (
            <span
              key={keyCounter++}
              onClick={() => toggleSpoiler(currentSpoilerIdx)}
              className={`rounded px-1 cursor-pointer transition-all ${
                isRevealed 
                  ? 'bg-[#202225] text-[#dcddde]' 
                  : 'bg-[#202225] text-[#202225] hover:bg-[#3c3f45]'
              }`}
            >
              {match[1]}
            </span>
          );
        }
      },
      // Sous-texte -# texte
      {
        regex: /^-# (.+)$/gm,
        render: (match: RegExpMatchArray) => (
          <div key={keyCounter++} className="text-[#b9bbbe] text-xs italic">
            {match[1]}
          </div>
        )
      },
      // Gras et italique combinés ***texte*** ou ___texte___
      {
        regex: /\*\*\*(.+?)\*\*\*/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold">
            <em className="italic">{match[1]}</em>
          </strong>
        )
      },
      {
        regex: /___(.+?)___/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold">
            <em className="italic">{match[1]}</em>
          </strong>
        )
      },
      // Gras souligné **__texte__** ou __**texte**__
      {
        regex: /\*\*__(.+?)__\*\*/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold underline">
            {match[1]}
          </strong>
        )
      },
      {
        regex: /__\*\*(.+?)\*\*__/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold underline">
            {match[1]}
          </strong>
        )
      },
      // Gras **texte** ou __texte__
      {
        regex: /\*\*(.+?)\*\*/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold">{match[1]}</strong>
        )
      },
      {
        regex: /__(.+?)__/g,
        render: (match: RegExpMatchArray) => (
          <strong key={keyCounter++} className="font-bold">{match[1]}</strong>
        )
      },
      // Italique *texte* ou _texte_
      {
        regex: /\*(.+?)\*/g,
        render: (match: RegExpMatchArray) => (
          <em key={keyCounter++} className="italic">{match[1]}</em>
        )
      },
      {
        regex: /_(.+?)_/g,
        render: (match: RegExpMatchArray) => (
          <em key={keyCounter++} className="italic">{match[1]}</em>
        )
      },
      // Souligné __texte__ (déjà géré dans gras, mais on le garde pour compatibilité)
      // Barré ~~texte~~
      {
        regex: /~~(.+?)~~/g,
        render: (match: RegExpMatchArray) => (
          <span key={keyCounter++} className="line-through opacity-60">{match[1]}</span>
        )
      },
      // Code inline `code`
      {
        regex: /`([^`]+)`/g,
        render: (match: RegExpMatchArray) => (
          <code key={keyCounter++} className="bg-[#2f3136] dark:bg-[#2f3136] px-1.5 py-0.5 rounded text-[#dcddde] font-mono text-sm">
            {match[1]}
          </code>
        )
      }
    ];

    // Trouver tous les matches
    const matches: Array<{
      index: number;
      length: number;
      element: React.ReactNode;
    }> = [];

    patterns.forEach(pattern => {
      const regex = new RegExp(pattern.regex);
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          element: pattern.render(match)
        });
      }
    });

    // Trier par position et filtrer les chevauchements
    matches.sort((a, b) => a.index - b.index);
    
    const filteredMatches: typeof matches = [];
    let lastEnd = 0;
    
    for (const match of matches) {
      if (match.index >= lastEnd) {
        filteredMatches.push(match);
        lastEnd = match.index + match.length;
      }
    }

    // Construire le résultat
    filteredMatches.forEach(match => {
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }
      parts.push(match.element);
      currentIndex = match.index + match.length;
    });

    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="p-4 bg-[#36393f] dark:bg-[#36393f] rounded font-['Whitney','Helvetica_Neue','Helvetica','Arial',sans-serif]">
      {formatDiscordContent(content)}
    </div>
  );
};

export function MarkdownToDiscord() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const getDefaultMarkdown = (timestamp: number) => `# Guide complet du formatage Discord

## Formatage de texte basique

**Texte en gras** avec \`**texte**\` ou \`__texte__\`
*Texte en italique* avec \`*texte*\` ou \`_texte_\`
***Texte gras et italique*** avec \`***texte***\`
__**Texte gras et souligné**__ avec \`__**texte**__\`
~~Texte barré~~ avec \`~~texte~~\`
\`Code inline\` avec \`\`code\`\`
||Spoiler masqué|| avec \`||texte||\` (cliquez pour révéler)

## Titres et structure

# Titre niveau 1
## Titre niveau 2  
### Titre niveau 3

## Citations

> Citation simple sur une ligne

>>>
Citation multiligne
sur plusieurs lignes
avec du **formatage** supporté
>>>

## Listes

Listes non ordonnées :
- Premier élément
* Deuxième élément
+ Troisième élément

Listes ordonnées :
1. Premier point
2. Deuxième point
3. Troisième point

## Code avec coloration syntaxique

\`\`\`javascript
function exemple() {
  console.log("Bonjour Discord !");
  return { status: "success" };
}
\`\`\`

\`\`\`python
def exemple():
    print("Support de nombreux langages")
    return True
\`\`\`

\`\`\`css
.discord-style {
  color: #5865f2;
  font-family: Whitney, sans-serif;
}
\`\`\`

## Mentions et interactions

### Mentions utilisateur
<@123456789> - Mention d'un utilisateur
<@!987654321> - Mention d'un utilisateur (format alternatif)

### Mentions de rôles
<@&555555555> - Mention d'un rôle (ex: @Admin, @Modérateur)

### Mentions de salons
<#777777777> - Mention d'un salon (ex: #général, #annonces)

## Émojis

### Émojis standards
:smile: :heart: :fire: :star: :thumbsup: :rocket: :tada:
:wave: :eyes: :thinking: :joy: :clap: :warning: :check:

### Émojis personnalisés
<:nom_emoji:123456789> - Émoji personnalisé statique
<a:nom_anime:987654321> - Émoji personnalisé animé

## Timestamps dynamiques

<t:${timestamp}:t> → Heure courte (ex: 16:20)
<t:${timestamp}:T> → Heure longue (ex: 16:20:30)
<t:${timestamp}:d> → Date courte (ex: 20/12/2023)
<t:${timestamp}:D> → Date longue (ex: 20 décembre 2023)
<t:${timestamp}:f> → Date et heure courtes (ex: 20 décembre 2023 16:20)
<t:${timestamp}:F> → Date et heure longues (ex: mercredi 20 décembre 2023 16:20)
<t:${timestamp}:R> → Temps relatif (ex: il y a 2 minutes)

## Liens et URLs

### Liens avec texte
[Visiter Discord](https://discord.com)
[Documentation Discord](https://discord.com/developers/docs "Documentation officielle")

### URLs directes
https://discord.com - Lien automatique avec aperçu

### Supprimer l'aperçu
<https://discord.com> - Lien sans aperçu embed

## Sous-texte (nouveau format)
-# Ceci est un sous-texte en petit et grisé

## Combinaisons avancées

**Vous pouvez combiner** *plusieurs* ***formats*** ~~ensemble~~ avec \`du code\` et des :fire: émojis !

> Citation avec **gras**, *italique*, \`code\` et <@123456789>

## Formatage dans les listes

1. **Premier** élément avec du gras
2. *Deuxième* élément avec de l'italique
3. \`Troisième\` élément avec du code
4. Liste avec <@123456789> mention
5. Liste avec :star: émoji

## Exemple de message complet

Salut <@123456789> ! :wave:

J'ai mis à jour le canal <#777777777> avec les dernières infos.

**Nouveau** : La fonctionnalité est maintenant disponible !
*Sortie prévue* : <t:${timestamp + 86400}:R>

Détails techniques :
\`\`\`typescript
interface DiscordMessage {
  content: string;
  author: User;
  timestamp: number;
  mentions: User[];
}
\`\`\`

> ⚠️ **Attention** : Pensez à vérifier ||les informations sensibles|| avant de partager.

Plus d'infos sur [Discord.com](https://discord.com) ! :rocket:

-# Message envoyé par le bot • <t:${timestamp}:R>`;

  const [markdown, setMarkdown] = useState(() => getDefaultMarkdown(currentTimestamp));
  const [showPreview, setShowPreview] = useState(true);

  React.useEffect(() => {
    setMarkdown(prev => {
      if (prev.includes('Guide complet du formatage Discord')) {
        return getDefaultMarkdown(currentTimestamp);
      }
      return prev;
    });
  }, [currentTimestamp]);

  const convertMarkdownToDiscord = (md: string): string => {
    // Discord supporte nativement le Markdown, donc on retourne tel quel
    // avec quelques ajustements mineurs si nécessaire
    return md;
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

  const resetToDefault = () => {
    setMarkdown(getDefaultMarkdown(currentTimestamp));
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DiscordIcon className="h-5 w-5" />
            Markdown vers Discord - Format Complet
          </CardTitle>
          <CardDescription>
            Tous les formats Discord supportés avec aperçu en temps réel ultra-réaliste
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Markdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Markdown Discord</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              </div>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Saisissez votre contenu Markdown Discord ici..."
                className="min-h-[600px] font-mono text-sm"
              />
            </div>

            {/* Output Discord */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Aperçu Discord</label>
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
                <div className="min-h-[600px] border rounded-md overflow-auto">
                  <DiscordPreview content={discordOutput} />
                </div>
              ) : (
                <Textarea
                  value={discordOutput}
                  readOnly
                  className="min-h-[600px] font-mono text-sm"
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
              Copier pour Discord
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(discordOutput, 'discord-message.txt', 'text/plain')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger .txt
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(markdown, 'source.md', 'text/markdown')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Télécharger .md
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guide complet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DiscordIcon className="h-5 w-5" />
            Guide de référence complet Discord
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {/* Formatage de texte */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Formatage de texte</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">**gras**</code> → <strong>gras</strong></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">__gras__</code> → <strong>gras</strong></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">*italique*</code> → <em>italique</em></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_italique_</code> → <em>italique</em></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">***gras+italique***</code> → <strong><em>gras+italique</em></strong></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">__**gras+souligné**__</code> → <strong><u>gras+souligné</u></strong></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">~~barré~~</code> → <span className="line-through">barré</span></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">`code`</code> → <code className="bg-muted px-1 py-0.5 rounded">code</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">||spoiler||</code> → spoiler masqué</div>
              </div>
            </div>

            {/* Structure */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Structure</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs"># Titre 1</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">## Titre 2</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">### Titre 3</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&gt; citation</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&gt;&gt;&gt; multiligne</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">- liste</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">1. numérotée</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">-# sous-texte</code></div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">```code```</code></div>
              </div>
            </div>

            {/* Mentions */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Mentions</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;@ID&gt;</code> → mention utilisateur</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;@!ID&gt;</code> → mention (alt.)</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;@&ID&gt;</code> → mention rôle</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;#ID&gt;</code> → mention salon</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">@everyone</code> → tous les membres</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">@here</code> → membres en ligne</div>
              </div>
            </div>

            {/* Émojis */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Émojis</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">:smile:</code> → 😊</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">:heart:</code> → ❤️</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">:fire:</code> → 🔥</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">:star:</code> → ⭐</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">:rocket:</code> → 🚀</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;:nom:ID&gt;</code> → émoji perso</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;a:nom:ID&gt;</code> → émoji animé</div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Timestamps</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:t&gt;</code> → heure courte</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:T&gt;</code> → heure longue</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:d&gt;</code> → date courte</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:D&gt;</code> → date longue</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:f&gt;</code> → date+heure courte</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:F&gt;</code> → date+heure longue</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;t:TS:R&gt;</code> → relatif</div>
              </div>
            </div>

            {/* Liens */}
            <div className="space-y-2">
              <h4 className="font-bold text-base mb-3">Liens et URLs</h4>
              <div className="space-y-1.5">
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">[texte](url)</code> → lien masqué</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">[texte](url "titre")</code> → avec titre</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://...</code> → auto avec embed</div>
                <div><code className="bg-muted px-1.5 py-0.5 rounded text-xs">&lt;https://...&gt;</code> → sans embed</div>
              </div>
            </div>

            {/* Langages de code supportés */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <h4 className="font-bold text-base mb-3">Langages de code supportés</h4>
              <div className="flex flex-wrap gap-2">
                {['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart', 'scala', 'r', 'lua', 'bash', 'shell', 'powershell', 'sql', 'html', 'css', 'scss', 'json', 'yaml', 'xml', 'markdown', 'diff', 'dockerfile'].map(lang => (
                  <code key={lang} className="bg-muted px-2 py-1 rounded text-xs">{lang}</code>
                ))}
              </div>
            </div>
          </div>
          
          {/* Limitations */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-bold mb-2 text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
              ⚠️ Limitations Discord
            </h4>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
              <li>• Messages limités à 2000 caractères (4000 avec Nitro)</li>
              <li>• Blocs de code limités à 2000 caractères</li>
              <li>• Pas de tableaux natifs (utiliser des blocs de code)</li>
              <li>• Pas de HTML ni CSS custom</li>
              <li>• Émojis animés réservés aux membres Nitro</li>
              <li>• Maximum 25 lignes de citation multiligne</li>
              <li>• Le formatage peut être désactivé dans certains salons</li>
            </ul>
          </div>

          {/* Tips et astuces */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold mb-2 text-blue-900 dark:text-blue-200 flex items-center gap-2">
              💡 Astuces Pro
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
              <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">\</code> pour échapper le formatage : <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">\*pas italique\*</code></li>
              <li>• Combinez plusieurs formats : <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">**__*tout*__**</code></li>
              <li>• Utilisez les timestamps pour les événements : ils s'adaptent au fuseau horaire de chaque utilisateur</li>
              <li>• Les spoilers fonctionnent dans les embeds de bots</li>
              <li>• Le sous-texte <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">-#</code> est parfait pour les notes de bas de page</li>
              <li>• Générez des timestamps sur <a href="https://hammertime.cyou" target="_blank" rel="noopener noreferrer" className="underline">hammertime.cyou</a></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
