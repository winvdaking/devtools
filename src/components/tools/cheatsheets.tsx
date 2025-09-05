/**
 * Composant principal des cheatsheets pour les technologies de développement
 * Fournit des références rapides pour toutes les technologies de développement
 */

import React, { useState } from "react";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Layers,
  Zap,
  Terminal,
  GitBranch,
  Package,
  Server,
  Smartphone,
  Monitor,
  Cloud,
  Shield,
  Settings,
  Cpu,
  Network,
} from "lucide-react";

interface CheatsheetSection {
  title: string;
  items: Array<{
    title: string;
    description: string;
    code?: string;
    examples?: string[];
  }>;
}

interface TechnologyCheatsheet {
  name: string;
  icon: React.ReactNode;
  sections: CheatsheetSection[];
}

const cheatsheets: TechnologyCheatsheet[] = [
  // Cheatsheets en premier
  {
    name: "Git",
    icon: <GitBranch className="w-5 h-5" />,
    sections: [
      {
        title: "Configuration",
        items: [
          {
            title: "Configuration utilisateur",
            description: "Définir nom et email",
            code: 'git config --global user.name "Votre Nom"\ngit config --global user.email "votre@email.com"',
          },
          {
            title: "Configuration locale",
            description: "Pour un projet spécifique",
            code: 'git config user.name "Votre Nom"\ngit config user.email "votre@email.com"',
          },
        ],
      },
      {
        title: "Commandes de base",
        items: [
          {
            title: "Initialisation et clonage",
            description: "Créer ou récupérer un dépôt",
            code: "git init\ngit clone <url>\ngit clone --depth 1 <url>  # Clone superficiel",
          },
          {
            title: "Ajout et commit",
            description: "Sauvegarder les modifications",
            code: 'git add .\ngit add <fichier>\ngit commit -m "Message"\ngit commit -am "Message"  # Add + commit',
          },
          {
            title: "Status et historique",
            description: "Voir l'état du dépôt",
            code: "git status\ngit log --oneline\ngit log --graph --oneline\ngit diff",
          },
        ],
      },
      {
        title: "Branches",
        items: [
          {
            title: "Gestion des branches",
            description: "Créer, lister et supprimer des branches",
            code: "git branch\ngit branch <nom>\ngit checkout <branche>\ngit checkout -b <nouvelle-branche>\ngit branch -d <branche>",
          },
          {
            title: "Fusion et rebase",
            description: "Intégrer les modifications",
            code: "git merge <branche>\ngit rebase <branche>\ngit rebase -i HEAD~3  # Interactive",
          },
        ],
      },
      {
        title: "Remote et push",
        items: [
          {
            title: "Gestion des remotes",
            description: "Travailler avec des dépôts distants",
            code: "git remote -v\ngit remote add origin <url>\ngit push origin <branche>\ngit push -u origin <branche>  # Set upstream",
          },
          {
            title: "Pull et fetch",
            description: "Récupérer les modifications",
            code: "git pull\ngit fetch\ngit pull --rebase",
          },
        ],
      },
    ],
  },
  {
    name: "Regex",
    icon: <BookOpen className="w-5 h-5" />,
    sections: [
      {
        title: "Métacaractères",
        items: [
          {
            title: "Caractères spéciaux",
            description: "Symboles avec signification spéciale",
            code: ".  # N'importe quel caractère\n^  # Début de ligne\n$  # Fin de ligne\n*  # 0 ou plus\n+  # 1 ou plus\n?  # 0 ou 1",
          },
          {
            title: "Classes de caractères",
            description: "Groupes de caractères",
            code: "[abc]     # a, b ou c\n[^abc]    # Tout sauf a, b, c\n[a-z]     # Lettres minuscules\n[0-9]     # Chiffres\n\\w       # Caractère de mot\n\\d       # Chiffre\n\\s       # Espace",
          },
        ],
      },
      {
        title: "Quantificateurs",
        items: [
          {
            title: "Quantificateurs de base",
            description: "Contrôler le nombre d'occurrences",
            code: "a*        # 0 ou plus 'a'\na+        # 1 ou plus 'a'\na?        # 0 ou 1 'a'\na{3}      # Exactement 3 'a'\na{2,4}    # Entre 2 et 4 'a'\na{2,}     # Au moins 2 'a'",
          },
        ],
      },
      {
        title: "Patterns communs",
        items: [
          {
            title: "Validation courante",
            description: "Expressions pour valider des données",
            code: "# Email\n^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n\n# URL\nhttps?://[^\\s]+\n\n# Téléphone français\n(?:0[1-9]|\\+33[1-9])(?:[0-9]{8})\n\n# Code postal\n^[0-9]{5}$",
          },
        ],
      },
    ],
  },
  // Frameworks et technologies
  {
    name: "Next.js",
    icon: <Globe className="w-5 h-5" />,
    sections: [
      {
        title: "Création de projet",
        items: [
          {
            title: "Nouveau projet",
            description: "Créer une application Next.js",
            code: "npx create-next-app@latest mon-app\nnpx create-next-app@latest mon-app --typescript\nnpx create-next-app@latest mon-app --tailwind --eslint",
          },
          {
            title: "Avec template",
            description: "Utiliser un template spécifique",
            code: "npx create-next-app@latest mon-app --template typescript\nnpx create-next-app@latest mon-app --template tailwind",
          },
        ],
      },
      {
        title: "Commandes de développement",
        items: [
          {
            title: "Scripts npm",
            description: "Commandes essentielles",
            code: "npm run dev        # Serveur de développement\nnpm run build      # Build de production\nnpm run start      # Serveur de production\nnpm run lint       # Vérification ESLint",
          },
          {
            title: "Pages et routing",
            description: "Structure des pages",
            code: "pages/\n  index.js         # /\n  about.js         # /about\n  blog/\n    [slug].js      # /blog/mon-article\n    index.js       # /blog",
          },
        ],
      },
      {
        title: "API Routes",
        items: [
          {
            title: "Créer une API",
            description: "Routes API dans Next.js",
            code: "// pages/api/users.js\nexport default function handler(req, res) {\n  if (req.method === 'GET') {\n    res.status(200).json({ users: [] });\n  }\n}",
          },
        ],
      },
    ],
  },
  {
    name: "React",
    icon: <Code className="w-5 h-5" />,
    sections: [
      {
        title: "Création de projet",
        items: [
          {
            title: "Create React App",
            description: "Créer une application React",
            code: "npx create-react-app mon-app\nnpx create-react-app mon-app --template typescript\nnpx create-react-app mon-app --template redux",
          },
          {
            title: "Vite",
            description: "Alternative rapide à CRA",
            code: "npm create vite@latest mon-app -- --template react\nnpm create vite@latest mon-app -- --template react-ts",
          },
        ],
      },
      {
        title: "Hooks essentiels",
        items: [
          {
            title: "useState et useEffect",
            description: "Hooks de base",
            code: "import { useState, useEffect } from 'react';\n\nfunction MonComposant() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  \n  return <div>{count}</div>;\n}",
          },
        ],
      },
      {
        title: "Composants",
        items: [
          {
            title: "Composant fonctionnel",
            description: "Structure de base",
            code: "import React from 'react';\n\ninterface Props {\n  title: string;\n  children?: React.ReactNode;\n}\n\nconst MonComposant: React.FC<Props> = ({ title, children }) => {\n  return (\n    <div>\n      <h1>{title}</h1>\n      {children}\n    </div>\n  );\n};\n\nexport default MonComposant;",
          },
        ],
      },
    ],
  },
  {
    name: "Vue.js",
    icon: <Layers className="w-5 h-5" />,
    sections: [
      {
        title: "Création de projet",
        items: [
          {
            title: "Vue CLI",
            description: "Créer un projet Vue",
            code: "npm install -g @vue/cli\nvue create mon-app\nvue create mon-app --preset typescript",
          },
          {
            title: "Vite",
            description: "Alternative moderne",
            code: "npm create vue@latest mon-app\nnpm create vite@latest mon-app -- --template vue\nnpm create vite@latest mon-app -- --template vue-ts",
          },
        ],
      },
      {
        title: "Composition API",
        items: [
          {
            title: "Setup et refs",
            description: "Nouvelle API de composition",
            code: "<script setup>\nimport { ref, reactive, computed } from 'vue';\n\nconst count = ref(0);\nconst state = reactive({ name: 'Vue' });\nconst doubleCount = computed(() => count.value * 2);\n</script>",
          },
        ],
      },
    ],
  },
  {
    name: "Node.js",
    icon: <Zap className="w-5 h-5" />,
    sections: [
      {
        title: "Initialisation",
        items: [
          {
            title: "Nouveau projet",
            description: "Créer un projet Node.js",
            code: "npm init\nnpm init -y  # Avec valeurs par défaut\nnpm init -y --scope=@mon-org",
          },
          {
            title: "Gestion des packages",
            description: "Installer et gérer les dépendances",
            code: "npm install express\nnpm install --save-dev nodemon\nnpm install -g typescript\nnpm uninstall package-name",
          },
        ],
      },
      {
        title: "Scripts utiles",
        items: [
          {
            title: "Scripts package.json",
            description: "Scripts courants",
            code: '{\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "test": "jest",\n    "build": "tsc"\n  }\n}',
          },
        ],
      },
    ],
  },
  {
    name: "PHP",
    icon: <Server className="w-5 h-5" />,
    sections: [
      {
        title: "Composer",
        items: [
          {
            title: "Initialisation",
            description: "Créer un projet PHP avec Composer",
            code: "composer init\ncomposer create-project symfony/skeleton mon-app\ncomposer create-project laravel/laravel mon-app",
          },
          {
            title: "Gestion des dépendances",
            description: "Installer et gérer les packages",
            code: "composer install\ncomposer require symfony/http-foundation\ncomposer require --dev phpunit/phpunit\ncomposer update",
          },
        ],
      },
      {
        title: "Laravel",
        items: [
          {
            title: "Commandes Artisan",
            description: "Outils de développement Laravel",
            code: "php artisan make:controller UserController\nphp artisan make:model User -m\nphp artisan make:migration create_users_table\nphp artisan migrate\nphp artisan serve",
          },
        ],
      },
      {
        title: "Symfony",
        items: [
          {
            title: "Console Symfony",
            description: "Commandes de développement",
            code: "php bin/console make:controller\nphp bin/console make:entity\nphp bin/console doctrine:migrations:diff\nphp bin/console doctrine:migrations:migrate\nphp bin/console cache:clear",
          },
        ],
      },
    ],
  },
  {
    name: "Docker",
    icon: <Package className="w-5 h-5" />,
    sections: [
      {
        title: "Images et conteneurs",
        items: [
          {
            title: "Commandes de base",
            description: "Gestion des conteneurs Docker",
            code: "docker build -t mon-app .\ndocker run -p 3000:3000 mon-app\ndocker run -d --name mon-conteneur mon-app\ndocker ps\ndocker ps -a",
          },
          {
            title: "Gestion des images",
            description: "Manipuler les images Docker",
            code: "docker images\ndocker pull nginx\ndocker rmi mon-image\ndocker tag mon-app:latest mon-app:v1.0",
          },
        ],
      },
      {
        title: "Docker Compose",
        items: [
          {
            title: "Services multiples",
            description: "Orchestrer plusieurs conteneurs",
            code: "docker-compose up\ndocker-compose up -d\ndocker-compose down\ndocker-compose logs\ndocker-compose build",
          },
        ],
      },
    ],
  },
  {
    name: "Bash/Shell",
    icon: <Terminal className="w-5 h-5" />,
    sections: [
      {
        title: "Navigation",
        items: [
          {
            title: "Commandes de base",
            description: "Navigation dans le système de fichiers",
            code: "ls -la          # Lister avec détails\ncd /path/to/dir  # Changer de répertoire\npwd             # Répertoire actuel\nmkdir mon-dir   # Créer un dossier\nrm -rf mon-dir  # Supprimer récursivement",
          },
        ],
      },
      {
        title: "Manipulation de fichiers",
        items: [
          {
            title: "Copie et déplacement",
            description: "Gérer les fichiers",
            code: "cp fichier.txt backup/\ncp -r dossier/ backup/\nmv fichier.txt nouveau-nom.txt\nmv dossier/ /nouveau/chemin/",
          },
          {
            title: "Recherche et filtrage",
            description: "Trouver et filtrer des données",
            code: 'find . -name "*.js"\ngrep -r "pattern" .\ngrep -i "pattern" fichier.txt\nhead -n 10 fichier.txt\ntail -f fichier.log',
          },
        ],
      },
      {
        title: "Processus et système",
        items: [
          {
            title: "Gestion des processus",
            description: "Surveiller et contrôler les processus",
            code: "ps aux | grep node\nkill -9 <PID>\ntop\nhtop\njobs\nbg %1\nfg %1",
          },
        ],
      },
    ],
  },
  {
    name: "cURL",
    icon: <Network className="w-5 h-5" />,
    sections: [
      {
        title: "Requêtes HTTP",
        items: [
          {
            title: "Méthodes de base",
            description: "GET, POST, PUT, DELETE",
            code: 'curl https://api.example.com/users\ncurl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John"}\'\ncurl -X PUT https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "Jane"}\'\ncurl -X DELETE https://api.example.com/users/1',
          },
        ],
      },
      {
        title: "Authentification",
        items: [
          {
            title: "Headers et tokens",
            description: "Authentification avec cURL",
            code: 'curl -H "Authorization: Bearer token123" https://api.example.com/protected\ncurl -u username:password https://api.example.com/protected\ncurl -H "X-API-Key: your-api-key" https://api.example.com/data',
          },
        ],
      },
      {
        title: "Options utiles",
        items: [
          {
            title: "Paramètres courants",
            description: "Options fréquemment utilisées",
            code: "curl -v https://api.example.com          # Verbose\ncurl -o fichier.json https://api.example.com  # Sauvegarder\ncurl -L https://example.com                   # Suivre les redirections\ncurl -s https://api.example.com               # Silent mode",
          },
        ],
      },
    ],
  },
  {
    name: "SQL",
    icon: <Database className="w-5 h-5" />,
    sections: [
      {
        title: "Requêtes de base",
        items: [
          {
            title: "CRUD Operations",
            description: "Create, Read, Update, Delete",
            code: "-- SELECT\nSELECT * FROM users;\nSELECT name, email FROM users WHERE age > 18;\n\n-- INSERT\nINSERT INTO users (name, email) VALUES ('John', 'john@example.com');\n\n-- UPDATE\nUPDATE users SET name = 'Jane' WHERE id = 1;\n\n-- DELETE\nDELETE FROM users WHERE id = 1;",
          },
        ],
      },
      {
        title: "Jointures",
        items: [
          {
            title: "Types de jointures",
            description: "Relier des tables",
            code: "-- INNER JOIN\nSELECT u.name, p.title FROM users u\nINNER JOIN posts p ON u.id = p.user_id;\n\n-- LEFT JOIN\nSELECT u.name, p.title FROM users u\nLEFT JOIN posts p ON u.id = p.user_id;\n\n-- RIGHT JOIN\nSELECT u.name, p.title FROM users u\nRIGHT JOIN posts p ON u.id = p.user_id;",
          },
        ],
      },
    ],
  },
  {
    name: "Python",
    icon: <Code className="w-5 h-5" />,
    sections: [
      {
        title: "Environnement virtuel",
        items: [
          {
            title: "Création et activation",
            description: "Gérer les environnements Python",
            code: "python -m venv mon-env\n# Windows\nmon-env\\Scripts\\activate\n# Linux/Mac\nsource mon-env/bin/activate\n\npip install -r requirements.txt\npip freeze > requirements.txt",
          },
        ],
      },
      {
        title: "Frameworks web",
        items: [
          {
            title: "Django et Flask",
            description: "Créer des applications web",
            code: "# Django\ndjango-admin startproject mon-projet\npython manage.py startapp mon-app\npython manage.py runserver\n\n# Flask\npip install flask\npython app.py",
          },
        ],
      },
    ],
  },
  {
    name: "Système",
    icon: <Monitor className="w-5 h-5" />,
    sections: [
      {
        title: "Linux/Unix",
        items: [
          {
            title: "Permissions",
            description: "Gérer les permissions de fichiers",
            code: "chmod 755 fichier.sh    # rwxr-xr-x\nchmod +x script.sh      # Rendre exécutable\nchown user:group fichier # Changer propriétaire\nchgrp group fichier      # Changer groupe",
          },
          {
            title: "Processus et services",
            description: "Gérer les services système",
            code: "systemctl start nginx\nsystemctl stop nginx\nsystemctl restart nginx\nsystemctl status nginx\nsystemctl enable nginx",
          },
        ],
      },
      {
        title: "Réseau",
        items: [
          {
            title: "Diagnostic réseau",
            description: "Tester la connectivité",
            code: "ping google.com\nnslookup google.com\ndig google.com\nnetstat -tulpn\nss -tulpn\ncurl -I https://example.com",
          },
        ],
      },
    ],
  },
  {
    name: "Mobile",
    icon: <Smartphone className="w-5 h-5" />,
    sections: [
      {
        title: "React Native",
        items: [
          {
            title: "Création de projet",
            description: "Développer des apps mobiles",
            code: "npx react-native init MonApp\nnpx react-native run-android\nnpx react-native run-ios\nnpx react-native start",
          },
        ],
      },
      {
        title: "Flutter",
        items: [
          {
            title: "Développement Flutter",
            description: "Framework Google pour mobile",
            code: "flutter create mon_app\nflutter run\nflutter build apk\nflutter build ios",
          },
        ],
      },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5" />,
    sections: [
      {
        title: "AWS CLI",
        items: [
          {
            title: "Commandes de base",
            description: "Interagir avec AWS",
            code: "aws configure\naws s3 ls\naws s3 cp fichier.txt s3://mon-bucket/\naws ec2 describe-instances\naws lambda list-functions",
          },
        ],
      },
      {
        title: "Kubernetes",
        items: [
          {
            title: "Commandes kubectl",
            description: "Gérer des clusters Kubernetes",
            code: "kubectl get pods\nkubectl apply -f deployment.yaml\nkubectl logs <pod-name>\nkubectl exec -it <pod-name> -- /bin/bash",
          },
        ],
      },
    ],
  },
  {
    name: "Sécurité",
    icon: <Shield className="w-5 h-5" />,
    sections: [
      {
        title: "SSL/TLS",
        items: [
          {
            title: "Certificats",
            description: "Gérer les certificats SSL",
            code: "openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\nopenssl x509 -in cert.pem -text -noout\nopenssl s_client -connect example.com:443",
          },
        ],
      },
      {
        title: "Chiffrement",
        items: [
          {
            title: "Hachage et chiffrement",
            description: "Sécuriser les données",
            code: "openssl dgst -sha256 fichier.txt\nopenssl enc -aes-256-cbc -in fichier.txt -out fichier.enc\nopenssl enc -aes-256-cbc -d -in fichier.enc -out fichier.txt",
          },
        ],
      },
    ],
  },
  {
    name: "Outils de développement",
    icon: <Settings className="w-5 h-5" />,
    sections: [
      {
        title: "VS Code",
        items: [
          {
            title: "Extensions essentielles",
            description: "Extensions recommandées",
            code: "# Extensions populaires\n- Prettier - Code formatter\n- ESLint\n- GitLens\n- Auto Rename Tag\n- Bracket Pair Colorizer\n- Live Server\n- Thunder Client",
          },
        ],
      },
      {
        title: "Terminal",
        items: [
          {
            title: "Améliorer le terminal",
            description: "Outils pour terminal",
            code: '# Oh My Zsh (Zsh)\nsh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n\n# Starship (Prompt)\ncurl -sS https://starship.rs/install.sh | sh\n\n# FZF (Fuzzy finder)\ngit clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf\n~/.fzf/install',
          },
        ],
      },
    ],
  },
  {
    name: "Performance",
    icon: <Cpu className="w-5 h-5" />,
    sections: [
      {
        title: "Monitoring",
        items: [
          {
            title: "Surveillance système",
            description: "Outils de monitoring",
            code: "htop                    # Processus en temps réel\niotop                   # I/O par processus\nnethogs                 # Utilisation réseau par processus\nlsof                    # Fichiers ouverts\nstrace -p <PID>         # Appels système",
          },
        ],
      },
      {
        title: "Optimisation",
        items: [
          {
            title: "Performance web",
            description: "Optimiser les performances",
            code: "# Lighthouse (audit web)\nnpx lighthouse https://example.com\n\n# Bundle analyzer (JavaScript)\nnpx webpack-bundle-analyzer dist/stats.json\n\n# Image optimization\nnpx imagemin images/* --out-dir=optimized",
          },
        ],
      },
    ],
  },
  {
    name: "IA & Outils modernes",
    icon: <Zap className="w-5 h-5" />,
    sections: [
      {
        title: "GitHub Copilot",
        items: [
          {
            title: "Utilisation",
            description: "Assistant de codage IA",
            code: "# Raccourcis clavier\nTab              # Accepter la suggestion\nAlt + ]          # Suggestion suivante\nAlt + [          # Suggestion précédente\nCtrl + Enter     # Voir toutes les suggestions",
          },
        ],
      },
      {
        title: "Cursor AI",
        items: [
          {
            title: "Commandes Chat",
            description: "Interagir avec l'IA",
            code: "Cmd/Ctrl + K        # Ouvrir le chat\nCmd/Ctrl + L        # Chat en ligne\nCmd/Ctrl + Shift + L # Chat plein écran",
          },
        ],
      },
    ],
  },
];

export default function Cheatsheets() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-playfair mb-2">Cheatsheets</h2>
        <p className="text-muted-foreground">
          Références rapides pour les technologies de développement
        </p>
      </div>

      {/* Onglets */}
      <div className="flex flex-wrap gap-2 border-b">
        {cheatsheets.map((cheatsheet, index) => (
          <button
            key={cheatsheet.name}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {cheatsheet.icon}
            {cheatsheet.name}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="space-y-6">
        {cheatsheets[activeTab] && (
          <>
            <div className="flex items-center gap-3 mb-6">
              {cheatsheets[activeTab].icon}
              <h3 className="text-xl font-bold font-playfair">
                {cheatsheets[activeTab].name}
              </h3>
            </div>

            <div className="grid gap-6">
              {cheatsheets[activeTab].sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">
                    {section.title}
                  </h4>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-card border rounded-lg p-4"
                      >
                        <h5 className="font-medium mb-2">{item.title}</h5>
                        <p className="text-muted-foreground mb-3">
                          {item.description}
                        </p>

                        {item.code && (
                          <div className="bg-muted rounded p-3 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">
                              {item.code}
                            </pre>
                          </div>
                        )}

                        {item.examples && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">
                              Exemples :
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {item.examples.map((example, exampleIndex) => (
                                <li key={exampleIndex}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
