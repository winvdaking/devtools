/**
 * Cheatsheet Bash/Shell - Commandes essentielles du terminal
 * Commandes de base pour la navigation et la manipulation de fichiers
 */

import { CheatSheet } from "../../types/cheatsheets";

export const bashCheatSheet: CheatSheet = {
  name: "Bash/Shell",
  description: "Shell Unix/Linux et commandes de base",
  icon: "Terminal",
  tags: ["shell", "terminal", "unix", "linux"],
  sections: [
    {
      title: "Navigation",
      items: [
        {
          title: "Changer de répertoire",
          description: "Se déplacer dans l'arborescence des dossiers",
          code: "cd <chemin>",
          examples: [
            "cd /home/user",
            "cd ..  # Répertoire parent",
            "cd ~  # Répertoire home",
            "cd -  # Répertoire précédent",
          ],
        },
        {
          title: "Lister les fichiers",
          description: "Afficher le contenu d'un répertoire",
          code: "ls <options>",
          examples: [
            "ls  # Liste simple",
            "ls -la  # Liste détaillée avec fichiers cachés",
            "ls -lh  # Taille lisible par l'homme",
            "ls -t  # Trié par date de modification",
          ],
        },
        {
          title: "Répertoire actuel",
          description: "Afficher le chemin du répertoire courant",
          code: "pwd",
          examples: ["pwd", "echo $PWD  # Variable d'environnement"],
        },
        {
          title: "Créer des répertoires",
          description: "Créer de nouveaux dossiers",
          code: "mkdir <nom>",
          examples: [
            "mkdir nouveau-dossier",
            "mkdir -p chemin/vers/dossier  # Créer l'arborescence",
            "mkdir -m 755 dossier  # Avec permissions spécifiques",
          ],
        },
      ],
    },
    {
      title: "Manipulation de fichiers",
      items: [
        {
          title: "Copier des fichiers",
          description: "Copier des fichiers ou dossiers",
          code: "cp <source> <destination>",
          examples: [
            "cp fichier.txt backup/",
            "cp -r dossier/ backup/  # Copie récursive",
            "cp -p fichier.txt backup/  # Préserver les attributs",
            "cp -u fichier.txt backup/  # Copie si plus récent",
          ],
        },
        {
          title: "Déplacer/renommer",
          description: "Déplacer ou renommer des fichiers",
          code: "mv <source> <destination>",
          examples: [
            "mv fichier.txt nouveau-nom.txt",
            "mv dossier/ /nouveau/chemin/",
            "mv *.txt backup/  # Tous les fichiers .txt",
          ],
        },
        {
          title: "Supprimer des fichiers",
          description: "Supprimer des fichiers ou dossiers",
          code: "rm <fichier>",
          examples: [
            "rm fichier.txt",
            "rm -r dossier/  # Suppression récursive",
            "rm -f fichier.txt  # Force sans confirmation",
            "rm -rf dossier/  # Suppression récursive forcée (DANGEREUX)",
          ],
        },
        {
          title: "Créer des fichiers vides",
          description: "Créer des fichiers vides ou modifier les timestamps",
          code: "touch <fichier>",
          examples: [
            "touch nouveau-fichier.txt",
            "touch -t 202312011200 fichier.txt  # Timestamp spécifique",
            "touch -a fichier.txt  # Modifier seulement l'accès",
          ],
        },
      ],
    },
    {
      title: "Affichage et lecture",
      items: [
        {
          title: "Afficher le contenu",
          description: "Lire le contenu d'un fichier",
          code: "cat <fichier>",
          examples: [
            "cat fichier.txt",
            "cat fichier1.txt fichier2.txt  # Concaténer",
            "cat -n fichier.txt  # Avec numéros de ligne",
          ],
        },
        {
          title: "Afficher le début",
          description: "Afficher les premières lignes d'un fichier",
          code: "head <fichier>",
          examples: [
            "head fichier.txt  # 10 premières lignes",
            "head -n 20 fichier.txt  # 20 premières lignes",
            "head -c 100 fichier.txt  # 100 premiers caractères",
          ],
        },
        {
          title: "Afficher la fin",
          description: "Afficher les dernières lignes d'un fichier",
          code: "tail <fichier>",
          examples: [
            "tail fichier.txt  # 10 dernières lignes",
            "tail -n 20 fichier.txt  # 20 dernières lignes",
            "tail -f fichier.log  # Suivre en temps réel",
          ],
        },
        {
          title: "Pagination",
          description: "Afficher le contenu page par page",
          code: "less <fichier>",
          examples: [
            "less fichier.txt",
            "less +G fichier.txt  # Aller à la fin",
            "less +/pattern fichier.txt  # Rechercher pattern",
          ],
        },
      ],
    },
    {
      title: "Recherche et filtrage",
      items: [
        {
          title: "Rechercher des fichiers",
          description: "Trouver des fichiers par nom ou critères",
          code: "find <chemin> <critères>",
          examples: [
            'find . -name "*.txt"',
            'find /home -type f -name "*.log"',
            "find . -size +100M  # Fichiers > 100MB",
            "find . -mtime -7  # Modifiés dans les 7 derniers jours",
          ],
        },
        {
          title: "Rechercher du texte",
          description: "Chercher des patterns dans des fichiers",
          code: "grep <pattern> <fichier>",
          examples: [
            'grep "pattern" fichier.txt',
            'grep -r "pattern" .  # Recherche récursive',
            'grep -i "pattern" fichier.txt  # Insensible à la casse',
            'grep -n "pattern" fichier.txt  # Avec numéros de ligne',
          ],
        },
        {
          title: "Localiser des fichiers",
          description: "Trouver rapidement des fichiers (base de données)",
          code: "locate <pattern>",
          examples: [
            "locate fichier.txt",
            'locate -i "*.pdf"  # Insensible à la casse',
            "updatedb  # Mettre à jour la base de données",
          ],
        },
        {
          title: "Filtrer et trier",
          description: "Manipuler le flux de données",
          code: "sort <fichier>",
          examples: [
            "sort fichier.txt",
            "sort -r fichier.txt  # Tri inverse",
            "sort -n fichier.txt  # Tri numérique",
            "uniq fichier.txt  # Supprimer les doublons",
          ],
        },
      ],
    },
    {
      title: "Permissions et propriétaires",
      items: [
        {
          title: "Changer les permissions",
          description: "Modifier les permissions d'accès aux fichiers",
          code: "chmod <permissions> <fichier>",
          examples: [
            "chmod 755 script.sh",
            "chmod +x script.sh  # Rendre exécutable",
            "chmod -x script.sh  # Retirer l'exécution",
            "chmod u+x,g-w,o+r fichier.txt  # Permissions spécifiques",
          ],
        },
        {
          title: "Changer le propriétaire",
          description: "Modifier le propriétaire d'un fichier",
          code: "chown <user>:<group> <fichier>",
          examples: [
            "chown user:group fichier.txt",
            "chown -R user:group dossier/  # Récursif",
            "chown user fichier.txt  # Seulement l'utilisateur",
          ],
        },
        {
          title: "Changer le groupe",
          description: "Modifier le groupe d'un fichier",
          code: "chgrp <group> <fichier>",
          examples: [
            "chgrp developers fichier.txt",
            "chgrp -R developers dossier/  # Récursif",
          ],
        },
      ],
    },
    {
      title: "Processus et système",
      items: [
        {
          title: "Lister les processus",
          description: "Voir les processus en cours d'exécution",
          code: "ps <options>",
          examples: [
            "ps aux  # Tous les processus",
            "ps -ef  # Format étendu",
            "ps aux | grep node  # Filtrer par nom",
          ],
        },
        {
          title: "Tuer un processus",
          description: "Arrêter un processus en cours",
          code: "kill <PID>",
          examples: [
            "kill 1234",
            "kill -9 1234  # Force kill",
            "killall node  # Tuer tous les processus node",
          ],
        },
        {
          title: "Surveiller les processus",
          description: "Surveiller les processus en temps réel",
          code: "top",
          examples: [
            "top  # Moniteur interactif",
            "htop  # Version améliorée (si installée)",
            "top -p 1234  # Surveiller un processus spécifique",
          ],
        },
        {
          title: "Tâches en arrière-plan",
          description: "Gérer les tâches en arrière-plan",
          code: "jobs",
          examples: [
            "command &  # Lancer en arrière-plan",
            "jobs  # Lister les tâches",
            "bg %1  # Reprendre en arrière-plan",
            "fg %1  # Ramener au premier plan",
          ],
        },
      ],
    },
    {
      title: "Pipes et redirections",
      items: [
        {
          title: "Pipes",
          description: "Passer la sortie d'une commande à une autre",
          code: "commande1 | commande2",
          examples: [
            'ls -la | grep ".txt"',
            "ps aux | grep node",
            "cat fichier.txt | sort | uniq",
          ],
        },
        {
          title: "Redirection de sortie",
          description: "Rediriger la sortie vers un fichier",
          code: "commande > fichier",
          examples: [
            "ls -la > liste.txt",
            'echo "Hello" >> fichier.txt  # Ajouter à la fin',
            "command 2> erreurs.log  # Rediriger les erreurs",
          ],
        },
        {
          title: "Redirection d'entrée",
          description: "Lire l'entrée depuis un fichier",
          code: "commande < fichier",
          examples: ["sort < fichier.txt", 'grep "pattern" < fichier.txt'],
        },
      ],
    },
    {
      title: "Variables et environnement",
      items: [
        {
          title: "Variables d'environnement",
          description: "Gérer les variables d'environnement",
          code: "export VARIABLE=valeur",
          examples: [
            "export PATH=$PATH:/nouveau/chemin",
            "export NODE_ENV=production",
            "echo $HOME  # Afficher une variable",
            "env  # Lister toutes les variables",
          ],
        },
        {
          title: "Variables locales",
          description: "Définir des variables locales",
          code: "VARIABLE=valeur",
          examples: [
            'NOM="John Doe"',
            "echo $NOM",
            "readonly VARIABLE=valeur  # Variable en lecture seule",
          ],
        },
      ],
    },
    {
      title: "Compression et archives",
      items: [
        {
          title: "Créer une archive tar",
          description: "Créer une archive avec tar",
          code: "tar -czf <archive> <fichiers>",
          examples: [
            "tar -czf backup.tar.gz dossier/",
            "tar -czf backup.tar.gz fichier1.txt fichier2.txt",
            "tar -tf backup.tar.gz  # Lister le contenu",
          ],
        },
        {
          title: "Extraire une archive",
          description: "Extraire le contenu d'une archive",
          code: "tar -xzf <archive>",
          examples: [
            "tar -xzf backup.tar.gz",
            "tar -xzf backup.tar.gz -C /destination/",
            "tar -xzf backup.tar.gz fichier.txt  # Extraire un fichier spécifique",
          ],
        },
        {
          title: "Compression gzip",
          description: "Compresser des fichiers avec gzip",
          code: "gzip <fichier>",
          examples: [
            "gzip fichier.txt",
            "gzip -d fichier.txt.gz  # Décompresser",
            "gzip -9 fichier.txt  # Compression maximale",
          ],
        },
      ],
    },
  ],
};
