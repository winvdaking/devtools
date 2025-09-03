/**
 * Aide-mémoire Git
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Copy, Check, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GitCommand {
  command: string;
  description: string;
  category: string;
  example?: string;
}

export function GitCheatsheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const gitCommands: GitCommand[] = [
    // Configuration
    { command: "git config --global user.name \"Name\"", description: "Définir le nom d'utilisateur", category: "Configuration" },
    { command: "git config --global user.email \"email@example.com\"", description: "Définir l'email", category: "Configuration" },
    { command: "git config --list", description: "Afficher la configuration", category: "Configuration" },
    
    // Initialisation
    { command: "git init", description: "Initialiser un dépôt Git", category: "Initialisation" },
    { command: "git clone <url>", description: "Cloner un dépôt distant", category: "Initialisation", example: "git clone https://github.com/user/repo.git" },
    
    // Modifications
    { command: "git add <file>", description: "Ajouter un fichier à l'index", category: "Modifications", example: "git add index.html" },
    { command: "git add .", description: "Ajouter tous les fichiers à l'index", category: "Modifications" },
    { command: "git add -A", description: "Ajouter tous les fichiers (y compris supprimés)", category: "Modifications" },
    { command: "git commit -m \"message\"", description: "Créer un commit avec message", category: "Modifications", example: "git commit -m \"Fix login bug\"" },
    { command: "git commit -am \"message\"", description: "Ajouter et commiter en une fois", category: "Modifications" },
    { command: "git commit --amend", description: "Modifier le dernier commit", category: "Modifications" },
    
    // Status et historique
    { command: "git status", description: "Afficher le statut du dépôt", category: "Status" },
    { command: "git log", description: "Afficher l'historique des commits", category: "Status" },
    { command: "git log --oneline", description: "Historique condensé", category: "Status" },
    { command: "git log --graph", description: "Historique avec graphique", category: "Status" },
    { command: "git diff", description: "Voir les modifications non indexées", category: "Status" },
    { command: "git diff --staged", description: "Voir les modifications indexées", category: "Status" },
    
    // Branches
    { command: "git branch", description: "Lister les branches locales", category: "Branches" },
    { command: "git branch -a", description: "Lister toutes les branches", category: "Branches" },
    { command: "git branch <name>", description: "Créer une nouvelle branche", category: "Branches", example: "git branch feature/login" },
    { command: "git checkout <branch>", description: "Changer de branche", category: "Branches", example: "git checkout main" },
    { command: "git checkout -b <branch>", description: "Créer et changer de branche", category: "Branches", example: "git checkout -b feature/new-ui" },
    { command: "git branch -d <branch>", description: "Supprimer une branche", category: "Branches", example: "git branch -d feature/old" },
    { command: "git merge <branch>", description: "Fusionner une branche", category: "Branches", example: "git merge feature/login" },
    
    // Remote
    { command: "git remote -v", description: "Lister les dépôts distants", category: "Remote" },
    { command: "git remote add origin <url>", description: "Ajouter un dépôt distant", category: "Remote" },
    { command: "git push origin <branch>", description: "Pousser vers le dépôt distant", category: "Remote", example: "git push origin main" },
    { command: "git pull", description: "Récupérer et fusionner depuis distant", category: "Remote" },
    { command: "git fetch", description: "Récupérer depuis distant sans fusionner", category: "Remote" },
    { command: "git push -u origin <branch>", description: "Pousser et définir upstream", category: "Remote" },
    
    // Annulation
    { command: "git reset HEAD <file>", description: "Retirer un fichier de l'index", category: "Annulation", example: "git reset HEAD index.html" },
    { command: "git reset --soft HEAD~1", description: "Annuler le dernier commit (garder les changements)", category: "Annulation" },
    { command: "git reset --hard HEAD~1", description: "Annuler le dernier commit (perdre les changements)", category: "Annulation" },
    { command: "git checkout -- <file>", description: "Annuler les modifications d'un fichier", category: "Annulation" },
    { command: "git revert <commit>", description: "Créer un commit qui annule un autre", category: "Annulation" },
    
    // Stash
    { command: "git stash", description: "Sauvegarder temporairement les modifications", category: "Stash" },
    { command: "git stash pop", description: "Restaurer les modifications sauvegardées", category: "Stash" },
    { command: "git stash list", description: "Lister les stash", category: "Stash" },
    { command: "git stash drop", description: "Supprimer un stash", category: "Stash" },
    
    // Tags
    { command: "git tag", description: "Lister les tags", category: "Tags" },
    { command: "git tag <name>", description: "Créer un tag", category: "Tags", example: "git tag v1.0.0" },
    { command: "git tag -a <name> -m \"message\"", description: "Créer un tag annoté", category: "Tags" },
    { command: "git push origin <tag>", description: "Pousser un tag", category: "Tags" },
  ];

  const filteredCommands = gitCommands.filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(gitCommands.map(cmd => cmd.category))).sort();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getCommandsByCategory = (category: string) => {
    return filteredCommands.filter(cmd => cmd.category === category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <GitBranch className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Git cheatsheet</h2>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une commande Git..."
              className="pl-10"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredCommands.length} commandes trouvées sur {gitCommands.length}
          </div>
        </CardContent>
      </Card>

      {/* Commandes par catégorie */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryCommands = getCommandsByCategory(category);
          if (categoryCommands.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {categoryCommands.length} commande{categoryCommands.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryCommands.map((cmd, index) => (
                    <div
                      key={`${cmd.command}-${index}`}
                      className="flex items-start justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm font-medium mb-1 break-all">
                          {cmd.command}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {cmd.description}
                        </div>
                        {cmd.example && (
                          <div className="text-xs text-muted-foreground font-mono bg-background p-2 rounded">
                            Exemple: {cmd.example}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(cmd.command, `${cmd.command}-${index}`)}
                        className="ml-4 flex-shrink-0"
                      >
                        {copied === `${cmd.command}-${index}` ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCommands.length === 0 && searchTerm && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-muted-foreground">
              Aucune commande trouvée pour "{searchTerm}"
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <GitBranch className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Aide-mémoire Git
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Collection des commandes Git les plus utilisées pour le développement quotidien. 
                Cliquez sur une commande pour la copier dans le presse-papiers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
