"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, FileText, Smile, Search, Grid, List } from "lucide-react";

export function EmojiPicker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  // Base de données d'émojis organisés par catégories
  const emojiCategories = {
    all: "Tous",
    faces: "Visages",
    gestures: "Gestes",
    people: "Personnes",
    animals: "Animaux",
    food: "Nourriture",
    travel: "Voyage",
    activities: "Activités",
    objects: "Objets",
    symbols: "Symboles",
    flags: "Drapeaux",
    nature: "Nature"
  };

  const emojis = {
    faces: [
      "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
      "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
      "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
      "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
      "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
      "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐"
    ],
    gestures: [
      "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤏", "✌", "🤞", "🤟",
      "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝", "👍", "👎",
      "👊", "✊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏",
      "✍", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻",
      "👃", "🧠", "🦷", "🦴", "👀", "👁", "👅", "👄", "💋", "🩸"
    ],
    people: [
      "👶", "🧒", "👦", "👧", "🧑", "👨", "👩", "🧓", "👴", "👵",
      "👤", "👥", "🫂", "👪", "👨‍👩‍👧‍👦", "👨‍👨‍👧", "👩‍👩‍👧", "👨‍👧", "👩‍👧", "👨‍👧‍👦",
      "👩‍👧‍👦", "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦", "👨‍👨‍👦", "👩‍👩‍👦", "👨‍👦", "👩‍👦", "👨‍👦‍👦", "👩‍👦‍👦", "👨‍👧‍👧",
      "👩‍👧‍👧", "👨‍👨‍👧", "👩‍👩‍👧", "👨‍👧", "👩‍👧", "👨‍👧‍👦", "👩‍👧‍👦", "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦", "👨‍👨‍👦",
      "👩‍👩‍👦", "👨‍👦", "👩‍👦", "👨‍👦‍👦", "👩‍👦‍👦", "👨‍👧‍👧", "👩‍👧‍👧", "👨‍👨‍👧", "👩‍👩‍👧", "👨‍👧"
    ],
    animals: [
      "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
      "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🦍",
      "🦧", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🦄", "🐎", "🦓",
      "🦌", "🐂", "🐃", "🐄", "🐪", "🐫", "🦙", "🦒", "🐘", "🦏",
      "🦛", "🐐", "🐑", "🐏", "🐎", "🦓", "🦌", "🐂", "🐃", "🐄",
      "🐪", "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐐", "🐑", "🐏"
    ],
    food: [
      "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈",
      "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦",
      "🥬", "🥒", "🌶", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔",
      "🍠", "🥐", "🥖", "🍞", "🥨", "🥯", "🧀", "🥚", "🍳", "🧈",
      "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟"
    ],
    travel: [
      "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐",
      "🛻", "🚚", "🚛", "🚜", "🏍", "🛵", "🚲", "🛴", "🛹", "🛼",
      "🚁", "✈", "🛩", "🛫", "🛬", "🪂", "💺", "🚀", "🛸", "🚉",
      "🚊", "🚝", "🚞", "🚋", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅",
      "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈", "🛩", "🛫", "🛬"
    ],
    activities: [
      "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🪀",
      "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁",
      "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸", "🥌",
      "🎿", "⛷", "🏂", "🪂", "🏋", "🤼", "🤸", "⛹", "🤺", "🤾",
      "🏌", "🏇", "🧘", "🏄", "🏊", "🤽", "🏊", "🚣", "🧗", "🚵"
    ],
    objects: [
      "⌚", "📱", "📲", "💻", "⌨", "🖥", "🖨", "🖱", "🖲", "🕹",
      "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥",
      "📽", "🎞", "📞", "☎", "📟", "📠", "📺", "📻", "🎙", "🎚",
      "🎛", "🧭", "⏱", "⏲", "⏰", "🕰", "⌛", "⏳", "📡", "🔋",
      "🔌", "💡", "🔦", "🕯", "🪔", "🧯", "🛢", "💸", "💵", "💴"
    ],
    symbols: [
      "❤", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮",
      "✝", "☪", "🕉", "☸", "✡", "🔯", "🕎", "☯", "☦", "🛐",
      "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐",
      "♑", "♒", "♓", "🆔", "⚛", "🉑", "☢", "☣", "📴", "📳"
    ],
    flags: [
      "🏁", "🚩", "🎌", "🏴", "🏳", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇦🇨", "🇦🇩",
      "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸",
      "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫",
      "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷",
      "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫"
    ],
    nature: [
      "🌱", "🌿", "🍀", "🌾", "🌵", "🌲", "🌳", "🌴", "🌰", "🌱",
      "🌿", "🍀", "🌾", "🌵", "🌲", "🌳", "🌴", "🌰", "🌱", "🌿",
      "🍀", "🌾", "🌵", "🌲", "🌳", "🌴", "🌰", "🌱", "🌿", "🍀",
      "🌾", "🌵", "🌲", "🌳", "🌴", "🌰", "🌱", "🌿", "🍀", "🌾",
      "🌵", "🌲", "🌳", "🌴", "🌰", "🌱", "🌿", "🍀", "🌾", "🌵"
    ]
  };

  // Filtrer les émojis selon la recherche et la catégorie
  const filteredEmojis = useMemo(() => {
    let emojiList: string[] = [];
    
    if (selectedCategory === "all") {
      emojiList = Object.values(emojis).flat();
    } else {
      emojiList = emojis[selectedCategory as keyof typeof emojis] || [];
    }
    
    if (searchTerm) {
      // Recherche simple par caractère (pas de traduction des noms)
      emojiList = emojiList.filter(emoji => 
        emoji.includes(searchTerm) || 
        emoji.charCodeAt(0).toString().includes(searchTerm)
      );
    }
    
    return emojiList;
  }, [selectedCategory, searchTerm]);

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

  const addToSelection = (emoji: string) => {
    setSelectedEmojis(prev => [...prev, emoji]);
  };

  const removeFromSelection = (index: number) => {
    setSelectedEmojis(prev => prev.filter((_, i) => i !== index));
  };

  const clearSelection = () => {
    setSelectedEmojis([]);
  };

  const copySelection = () => {
    copyToClipboard(selectedEmojis.join(''));
  };

  const downloadSelection = () => {
    downloadFile(selectedEmojis.join(''), 'emojis.txt', 'text/plain');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            Sélecteur d'Émojis
          </CardTitle>
          <CardDescription>
            Parcourez et sélectionnez des émojis et icônes pour vos projets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contrôles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un émoji..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {Object.entries(emojiCategories).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Affichage</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Grille d'émojis */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Émojis ({filteredEmojis.length})
              </label>
            </div>
            
            <div className={`grid gap-2 p-4 border rounded-md max-h-[400px] overflow-auto ${
              viewMode === "grid" 
                ? "grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20" 
                : "grid-cols-1"
            }`}>
              {filteredEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addToSelection(emoji)}
                  className={`p-2 rounded-md hover:bg-accent transition-colors text-2xl ${
                    viewMode === "list" ? "flex items-center gap-2" : ""
                  }`}
                  title={`Cliquer pour ajouter: ${emoji}`}
                >
                  {emoji}
                  {viewMode === "list" && (
                    <span className="text-sm text-muted-foreground">
                      {emoji}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sélection */}
          {selectedEmojis.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Sélection ({selectedEmojis.length})
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copySelection}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadSelection}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                  >
                    Effacer
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-muted">
                <div className="flex flex-wrap gap-2">
                  {selectedEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => removeFromSelection(index)}
                      className="p-1 rounded hover:bg-background transition-colors text-2xl"
                      title="Cliquer pour supprimer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {selectedEmojis.length > 0 && (
              <>
                <Button
                  onClick={copySelection}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copier la sélection
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadSelection}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            Guide d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Navigation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez les catégories pour filtrer</li>
                <li>• Recherchez par caractère ou code</li>
                <li>• Basculez entre vue grille et liste</li>
                <li>• Cliquez sur un émoji pour l'ajouter</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sélection</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Cliquez sur un émoji pour l'ajouter</li>
                <li>• Cliquez sur un émoji sélectionné pour le supprimer</li>
                <li>• Copiez ou téléchargez votre sélection</li>
                <li>• Utilisez "Effacer" pour vider la sélection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Catégories</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Visages</strong>: Expressions et émotions</li>
                <li>• <strong>Gestes</strong>: Mains et signes</li>
                <li>• <strong>Animaux</strong>: Créatures et animaux</li>
                <li>• <strong>Nourriture</strong>: Aliments et boissons</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Utilisation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Parfait pour les messages et documents</li>
                <li>• Idéal pour les interfaces utilisateur</li>
                <li>• Utile pour les présentations</li>
                <li>• Compatible avec tous les systèmes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
