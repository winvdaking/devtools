/**
 * Cheatsheet Node.js/npm - Runtime JavaScript et gestionnaire de packages
 * Commandes essentielles pour Node.js, npm et yarn
 */

import { CheatSheet } from "../../types/cheatsheets";

export const nodeCheatSheet: CheatSheet = {
  name: "Node.js/npm",
  description: "Runtime JavaScript et gestionnaire de packages",
  icon: "Zap",
  tags: ["javascript", "nodejs", "npm", "yarn", "package-manager"],
  sections: [
    {
      title: "Initialisation de projet",
      items: [
        {
          title: "Initialiser un projet npm",
          description: "Créer un nouveau projet Node.js",
          code: "npm init",
          examples: [
            "npm init",
            "npm init -y  # Avec valeurs par défaut",
            "npm init --scope=@mon-org  # Avec scope",
            "npm init -f  # Force avec valeurs par défaut",
          ],
        },
        {
          title: "Créer un projet avec template",
          description: "Créer un projet à partir d'un template",
          code: "npm create <template> <nom-projet>",
          examples: [
            "npm create vite mon-app",
            "npm create react-app mon-app",
            "npm create next-app mon-app",
            "npm create @vitejs/app mon-app",
          ],
        },
      ],
    },
    {
      title: "Gestion des packages",
      items: [
        {
          title: "Installer des dépendances",
          description: "Installer des packages npm",
          code: "npm install <package>",
          examples: [
            "npm install express",
            "npm install --save-dev nodemon  # Dépendance de développement",
            "npm install -g typescript  # Installation globale",
            "npm install --save-exact express  # Version exacte",
          ],
        },
        {
          title: "Installer toutes les dépendances",
          description: "Installer les dépendances du package.json",
          code: "npm install",
          examples: [
            "npm install",
            "npm ci  # Installation propre (pour CI/CD)",
            "npm install --production  # Seulement les dépendances de production",
          ],
        },
        {
          title: "Supprimer des packages",
          description: "Désinstaller des packages",
          code: "npm uninstall <package>",
          examples: [
            "npm uninstall express",
            "npm uninstall --save-dev nodemon",
            "npm uninstall -g typescript",
          ],
        },
        {
          title: "Mettre à jour les packages",
          description: "Mettre à jour les dépendances",
          code: "npm update",
          examples: [
            "npm update",
            "npm update express",
            "npm outdated  # Voir les packages obsolètes",
            "npm audit  # Vérifier les vulnérabilités",
          ],
        },
      ],
    },
    {
      title: "Scripts npm",
      items: [
        {
          title: "Exécuter des scripts",
          description: "Exécuter les scripts définis dans package.json",
          code: "npm run <script>",
          examples: [
            "npm run start",
            "npm run dev",
            "npm run build",
            "npm run test",
            "npm start  # Alias pour npm run start",
          ],
        },
        {
          title: "Scripts courants",
          description: "Scripts typiques dans package.json",
          code: '{\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "build": "tsc",\n    "test": "jest"\n  }\n}',
          examples: [
            '"start": "node index.js"',
            '"dev": "nodemon index.js"',
            '"build": "tsc"',
            '"test": "jest"',
            '"lint": "eslint ."',
          ],
        },
      ],
    },
    {
      title: "NPX - Exécution de packages",
      items: [
        {
          title: "Exécuter des packages",
          description: "Exécuter des packages sans les installer",
          code: "npx <package>",
          examples: [
            "npx create-react-app mon-app",
            "npx typescript --version",
            "npx eslint .",
            "npx --yes create-next-app mon-app  # Sans confirmation",
          ],
        },
        {
          title: "Exécuter des versions spécifiques",
          description: "Exécuter une version particulière d'un package",
          code: "npx <package>@<version>",
          examples: [
            "npx typescript@4.9.5 --version",
            "npx create-react-app@latest mon-app",
          ],
        },
      ],
    },
    {
      title: "Yarn - Alternative à npm",
      items: [
        {
          title: "Installation de Yarn",
          description: "Installer Yarn comme alternative à npm",
          code: "npm install -g yarn",
          examples: [
            "npm install -g yarn",
            "yarn --version  # Vérifier l'installation",
          ],
        },
        {
          title: "Commandes Yarn de base",
          description: "Commandes équivalentes à npm avec Yarn",
          code: "yarn <commande>",
          examples: [
            "yarn init  # Initialiser un projet",
            "yarn add express  # Ajouter une dépendance",
            "yarn add -D nodemon  # Dépendance de développement",
            "yarn remove express  # Supprimer une dépendance",
            "yarn install  # Installer les dépendances",
          ],
        },
        {
          title: "Scripts avec Yarn",
          description: "Exécuter des scripts avec Yarn",
          code: "yarn <script>",
          examples: ["yarn start", "yarn dev", "yarn build", "yarn test"],
        },
      ],
    },
    {
      title: "Gestion des versions Node.js",
      items: [
        {
          title: "NVM - Node Version Manager",
          description: "Gérer plusieurs versions de Node.js",
          code: "nvm <commande>",
          examples: [
            "nvm install 18  # Installer Node.js 18",
            "nvm use 18  # Utiliser Node.js 18",
            "nvm list  # Lister les versions installées",
            "nvm alias default 18  # Version par défaut",
          ],
        },
        {
          title: "Vérifier les versions",
          description: "Vérifier les versions installées",
          code: "node --version",
          examples: [
            "node --version  # Version de Node.js",
            "npm --version  # Version de npm",
            "yarn --version  # Version de Yarn",
          ],
        },
      ],
    },
    {
      title: "Configuration et cache",
      items: [
        {
          title: "Configuration npm",
          description: "Configurer npm globalement ou localement",
          code: "npm config <commande>",
          examples: [
            "npm config set registry https://registry.npmjs.org/",
            "npm config get registry",
            "npm config list  # Voir toute la configuration",
            "npm config delete registry  # Supprimer une configuration",
          ],
        },
        {
          title: "Gestion du cache",
          description: "Gérer le cache npm",
          code: "npm cache <commande>",
          examples: [
            "npm cache clean --force",
            "npm cache verify",
            "npm cache ls",
          ],
        },
      ],
    },
    {
      title: "Publishing et registry",
      items: [
        {
          title: "Publier un package",
          description: "Publier un package sur npm",
          code: "npm publish",
          examples: [
            "npm publish",
            "npm publish --access public  # Package public",
            "npm publish --tag beta  # Avec un tag spécifique",
          ],
        },
        {
          title: "Gestion des versions",
          description: "Gérer les versions des packages",
          code: "npm version <type>",
          examples: [
            "npm version patch  # 1.0.0 -> 1.0.1",
            "npm version minor  # 1.0.0 -> 1.1.0",
            "npm version major  # 1.0.0 -> 2.0.0",
            "npm version prerelease  # Version pre-release",
          ],
        },
      ],
    },
    {
      title: "Outils de développement",
      items: [
        {
          title: "Nodemon",
          description: "Redémarrage automatique du serveur",
          code: "npx nodemon <fichier>",
          examples: [
            "npx nodemon index.js",
            "npx nodemon --watch src index.js",
            'npx nodemon --exec "node index.js"',
          ],
        },
        {
          title: "PM2",
          description: "Gestionnaire de processus pour Node.js",
          code: "pm2 <commande>",
          examples: [
            "pm2 start index.js",
            "pm2 list",
            "pm2 stop index",
            "pm2 restart index",
            "pm2 logs",
          ],
        },
        {
          title: "TypeScript",
          description: "Compilation TypeScript",
          code: "tsc <options>",
          examples: [
            "tsc index.ts",
            "tsc --init  # Créer tsconfig.json",
            "tsc --watch  # Mode watch",
            "tsc --build  # Build incrémental",
          ],
        },
      ],
    },
    {
      title: "Debugging et profiling",
      items: [
        {
          title: "Debug avec Node.js",
          description: "Déboguer une application Node.js",
          code: "node --inspect <fichier>",
          examples: [
            "node --inspect index.js",
            "node --inspect-brk index.js  # Pause au démarrage",
            "node --inspect=0.0.0.0:9229 index.js  # Écouter sur toutes les interfaces",
          ],
        },
        {
          title: "Profiling",
          description: "Analyser les performances",
          code: "node --prof <fichier>",
          examples: [
            "node --prof index.js",
            "node --prof-process isolate-*.log  # Analyser les logs",
          ],
        },
      ],
    },
  ],
};
