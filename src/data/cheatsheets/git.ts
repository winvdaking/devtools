/**
 * Cheatsheet Git - Commandes essentielles pour la gestion de version
 * Contient toutes les commandes Git les plus utilisées pour le développement
 */

import { CheatSheet } from "../../types/cheatsheets";

export const gitCheatSheet: CheatSheet = {
  name: "Git",
  description: "Système de contrôle de version distribué",
  icon: "GitBranch",
  tags: ["version-control", "vcs", "collaboration"],
  sections: [
    {
      title: "Configuration",
      items: [
        {
          title: "Configuration utilisateur globale",
          description: "Définir le nom et email pour tous les dépôts",
          code: 'git config --global user.name "Votre Nom"\ngit config --global user.email "votre@email.com"',
          examples: [
            'git config --global user.name "John Doe"',
            'git config --global user.email "john.doe@example.com"',
          ],
        },
        {
          title: "Configuration locale",
          description: "Configuration spécifique à un projet",
          code: 'git config user.name "Votre Nom"\ngit config user.email "votre@email.com"',
          examples: [
            'git config user.name "John Doe"',
            'git config user.email "john.doe@company.com"',
          ],
        },
        {
          title: "Configuration de l'éditeur",
          description: "Définir l'éditeur par défaut pour les commits",
          code: 'git config --global core.editor "code --wait"',
          examples: [
            'git config --global core.editor "vim"',
            'git config --global core.editor "nano"',
            'git config --global core.editor "code --wait"',
          ],
        },
      ],
    },
    {
      title: "Initialisation et clonage",
      items: [
        {
          title: "Initialiser un dépôt",
          description: "Créer un nouveau dépôt Git local",
          code: "git init",
          examples: ["git init", "git init --bare  # Dépôt nu pour serveur"],
        },
        {
          title: "Cloner un dépôt",
          description: "Récupérer un dépôt distant",
          code: "git clone <url>",
          examples: [
            "git clone https://github.com/user/repo.git",
            "git clone --depth 1 https://github.com/user/repo.git  # Clone superficiel",
            "git clone -b develop https://github.com/user/repo.git  # Cloner une branche spécifique",
          ],
        },
        {
          title: "Ajouter un remote",
          description: "Connecter un dépôt local à un dépôt distant",
          code: "git remote add <nom> <url>",
          examples: [
            "git remote add origin https://github.com/user/repo.git",
            "git remote add upstream https://github.com/original/repo.git",
          ],
        },
      ],
    },
    {
      title: "Commandes de base",
      items: [
        {
          title: "Vérifier le statut",
          description: "Voir l'état des fichiers dans le dépôt",
          code: "git status",
          examples: [
            "git status",
            "git status --short  # Format court",
            "git status --porcelain  # Format machine",
          ],
        },
        {
          title: "Ajouter des fichiers",
          description: "Stager des fichiers pour le commit",
          code: "git add <fichier>",
          examples: [
            "git add .  # Tous les fichiers",
            "git add fichier.txt",
            "git add src/  # Dossier entier",
            "git add -A  # Tous les fichiers (y compris supprimés)",
          ],
        },
        {
          title: "Créer un commit",
          description: "Sauvegarder les modifications",
          code: 'git commit -m "Message"',
          examples: [
            'git commit -m "Ajout fonctionnalité utilisateur"',
            'git commit -am "Message"  # Add + commit en une fois',
            "git commit --amend  # Modifier le dernier commit",
          ],
        },
        {
          title: "Voir l'historique",
          description: "Consulter les commits précédents",
          code: "git log",
          examples: [
            "git log --oneline  # Format court",
            "git log --graph --oneline  # Avec graphique",
            "git log -p  # Avec diff",
            'git log --since="2 weeks ago"',
          ],
        },
      ],
    },
    {
      title: "Branches",
      items: [
        {
          title: "Lister les branches",
          description: "Voir toutes les branches disponibles",
          code: "git branch",
          examples: [
            "git branch  # Branches locales",
            "git branch -a  # Toutes les branches",
            "git branch -r  # Branches distantes",
          ],
        },
        {
          title: "Créer une branche",
          description: "Créer une nouvelle branche",
          code: "git branch <nom>",
          examples: [
            "git branch feature/nouvelle-fonctionnalite",
            "git branch -b feature/nouvelle-fonctionnalite  # Créer et basculer",
          ],
        },
        {
          title: "Changer de branche",
          description: "Basculer vers une autre branche",
          code: "git checkout <branche>",
          examples: [
            "git checkout main",
            "git checkout -b nouvelle-branche  # Créer et basculer",
            "git switch main  # Nouvelle syntaxe (Git 2.23+)",
          ],
        },
        {
          title: "Supprimer une branche",
          description: "Supprimer une branche locale ou distante",
          code: "git branch -d <branche>",
          examples: [
            "git branch -d feature/terminee",
            "git branch -D feature/terminee  # Force delete",
            "git push origin --delete feature/terminee  # Supprimer branche distante",
          ],
        },
      ],
    },
    {
      title: "Fusion et rebase",
      items: [
        {
          title: "Fusionner des branches",
          description: "Intégrer les modifications d'une branche",
          code: "git merge <branche>",
          examples: [
            "git merge feature/nouvelle-fonctionnalite",
            "git merge --no-ff feature/nouvelle-fonctionnalite  # Merge commit explicite",
            "git merge --squash feature/nouvelle-fonctionnalite  # Squash merge",
          ],
        },
        {
          title: "Rebase interactif",
          description: "Réorganiser l'historique des commits",
          code: "git rebase -i <commit>",
          examples: [
            "git rebase -i HEAD~3  # 3 derniers commits",
            "git rebase -i main  # Rebase sur main",
            "git rebase --continue  # Continuer après résolution conflit",
          ],
        },
        {
          title: "Rebase simple",
          description: "Rejouer les commits sur une autre base",
          code: "git rebase <branche>",
          examples: [
            "git rebase main",
            "git rebase --onto main feature/ancienne feature/nouvelle",
          ],
        },
      ],
    },
    {
      title: "Remote et synchronisation",
      items: [
        {
          title: "Pousser vers le remote",
          description: "Envoyer les commits vers le dépôt distant",
          code: "git push <remote> <branche>",
          examples: [
            "git push origin main",
            "git push -u origin main  # Set upstream",
            "git push --force-with-lease  # Push sécurisé",
          ],
        },
        {
          title: "Récupérer les modifications",
          description: "Télécharger les changements du remote",
          code: "git fetch <remote>",
          examples: [
            "git fetch origin",
            "git fetch --all  # Tous les remotes",
            "git fetch --prune  # Nettoyer les branches supprimées",
          ],
        },
        {
          title: "Pull avec merge",
          description: "Récupérer et fusionner les modifications",
          code: "git pull <remote> <branche>",
          examples: [
            "git pull origin main",
            "git pull --rebase origin main  # Pull avec rebase",
            "git pull --ff-only origin main  # Fast-forward seulement",
          ],
        },
      ],
    },
    {
      title: "Stash et reset",
      items: [
        {
          title: "Mettre de côté temporairement",
          description: "Sauvegarder temporairement les modifications",
          code: "git stash",
          examples: [
            "git stash  # Stash simple",
            'git stash push -m "Message"  # Avec message',
            "git stash list  # Lister les stashes",
            "git stash pop  # Appliquer et supprimer",
          ],
        },
        {
          title: "Annuler des modifications",
          description: "Revenir à un état précédent",
          code: "git reset <mode> <commit>",
          examples: [
            "git reset --soft HEAD~1  # Annuler commit, garder changements",
            "git reset --mixed HEAD~1  # Annuler commit et staging",
            "git reset --hard HEAD~1  # Annuler tout (DANGEREUX)",
          ],
        },
        {
          title: "Annuler des modifications de fichier",
          description: "Revenir à l'état du dernier commit",
          code: "git checkout -- <fichier>",
          examples: [
            "git checkout -- fichier.txt",
            "git restore fichier.txt  # Nouvelle syntaxe (Git 2.23+)",
          ],
        },
      ],
    },
    {
      title: "Tags et releases",
      items: [
        {
          title: "Créer un tag",
          description: "Marquer un commit spécifique",
          code: "git tag <nom>",
          examples: [
            "git tag v1.0.0",
            'git tag -a v1.0.0 -m "Version 1.0.0"  # Tag annoté',
            "git tag -l  # Lister les tags",
          ],
        },
        {
          title: "Pousser les tags",
          description: "Envoyer les tags vers le remote",
          code: "git push <remote> <tag>",
          examples: [
            "git push origin v1.0.0",
            "git push origin --tags  # Tous les tags",
          ],
        },
      ],
    },
    {
      title: "Commandes avancées",
      items: [
        {
          title: "Cherry-pick",
          description: "Appliquer un commit spécifique",
          code: "git cherry-pick <commit>",
          examples: [
            "git cherry-pick abc1234",
            "git cherry-pick --no-commit abc1234  # Sans créer de commit",
          ],
        },
        {
          title: "Bisect",
          description: "Trouver le commit qui a introduit un bug",
          code: "git bisect start",
          examples: [
            "git bisect start",
            "git bisect bad HEAD  # Commit actuel est bugué",
            "git bisect good v1.0.0  # Cette version fonctionne",
          ],
        },
        {
          title: "Submodules",
          description: "Gérer des dépôts dans des dépôts",
          code: "git submodule add <url> <path>",
          examples: [
            "git submodule add https://github.com/user/lib.git lib",
            "git submodule update --init --recursive",
            "git submodule update --remote  # Mettre à jour",
          ],
        },
      ],
    },
  ],
};
