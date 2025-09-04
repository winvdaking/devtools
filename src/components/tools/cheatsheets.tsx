/**
 * Composant principal des cheatsheets pour les technologies de développement
 * Fournit des références rapides pour Node.js, PHP, React, Nuxt, Laravel et Symfony
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
  {
    name: "Node.js",
    icon: <Zap className="w-5 h-5" />,
    sections: [
      {
        title: "Gestion des packages",
        items: [
          {
            title: "Initialiser un projet",
            description: "Créer un package.json",
            code: "npm init -y",
          },
          {
            title: "Installer des dépendances",
            description: "Installation normale et développement",
            code: "npm install package-name\nnpm install --save-dev package-name",
          },
          {
            title: "Scripts npm",
            description: "Scripts courants",
            code: "npm start\nnpm test\nnpm run build\nnpm run dev",
          },
        ],
      },
      {
        title: "Modules ES6",
        items: [
          {
            title: "Import/Export",
            description: "Syntaxe moderne",
            code: 'import { func } from "./module";\nexport default class;\nexport { func };',
          },
          {
            title: "Import dynamique",
            description: "Chargement à la demande",
            code: 'const module = await import("./module");',
          },
        ],
      },
      {
        title: "Async/Await",
        items: [
          {
            title: "Gestion des promesses",
            description: "Syntaxe moderne pour les opérations asynchrones",
            code: "async function fetchData() {\n  try {\n    const data = await fetch(url);\n    return data.json();\n  } catch (error) {\n    console.error(error);\n  }\n}",
          },
        ],
      },
    ],
  },
  {
    name: "PHP",
    icon: <Code className="w-5 h-5" />,
    sections: [
      {
        title: "Syntaxe de base",
        items: [
          {
            title: "Variables",
            description: "Déclaration et types",
            code: '$variable = "valeur";\n$nombre = 42;\n$tableau = [1, 2, 3];\n$assoc = ["key" => "value"];',
          },
          {
            title: "Fonctions",
            description: "Définition et appel",
            code: "function maFonction($param) {\n  return $param * 2;\n}\n\n$resultat = maFonction(5);",
          },
        ],
      },
      {
        title: "Classes et objets",
        items: [
          {
            title: "Classe simple",
            description: "Définition de classe avec constructeur",
            code: "class MaClasse {\n  private $propriete;\n  \n  public function __construct($valeur) {\n    $this->propriete = $valeur;\n  }\n  \n  public function getPropriete() {\n    return $this->propriete;\n  }\n}",
          },
        ],
      },
      {
        title: "Base de données",
        items: [
          {
            title: "PDO - Connexion",
            description: "Connexion à une base MySQL",
            code: 'try {\n  $pdo = new PDO("mysql:host=localhost;dbname=test", "user", "pass");\n  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n} catch(PDOException $e) {\n  echo "Erreur: " . $e->getMessage();\n}',
          },
        ],
      },
    ],
  },
  {
    name: "React",
    icon: <Globe className="w-5 h-5" />,
    sections: [
      {
        title: "Composants",
        items: [
          {
            title: "Composant fonctionnel",
            description: "Composant moderne avec hooks",
            code: 'import React, { useState, useEffect } from "react";\n\nfunction MonComposant({ titre }) {\n  const [compteur, setCompteur] = useState(0);\n  \n  useEffect(() => {\n    document.title = `${titre} - ${compteur}`;\n  }, [titre, compteur]);\n  \n  return (\n    <div>\n      <h1>{titre}</h1>\n      <p>Compteur: {compteur}</p>\n      <button onClick={() => setCompteur(c => c + 1)}>\n        Incrémenter\n      </button>\n    </div>\n  );\n}',
          },
        ],
      },
      {
        title: "Hooks courants",
        items: [
          {
            title: "useState",
            description: "Gestion de l'état local",
            code: 'const [valeur, setValeur] = useState(initialValue);\nconst [obj, setObj] = useState({ prop: "valeur" });\n\nsetObj(prev => ({ ...prev, prop: "nouvelle" }));',
          },
          {
            title: "useEffect",
            description: "Effets de bord",
            code: "useEffect(() => {\n  // Code à exécuter\n  return () => {\n    // Nettoyage\n  };\n}, [dependencies]);",
          },
        ],
      },
      {
        title: "Props et enfants",
        items: [
          {
            title: "Passage de props",
            description: "Communication entre composants",
            code: 'function Parent() {\n  return <Enfant titre="Mon titre" compteur={42} />;\n}\n\nfunction Enfant({ titre, compteur, children }) {\n  return (\n    <div>\n      <h2>{titre}</h2>\n      <p>Compteur: {compteur}</p>\n      {children}\n    </div>\n  );\n}',
          },
        ],
      },
    ],
  },
  {
    name: "Nuxt",
    icon: <Layers className="w-5 h-5" />,
    sections: [
      {
        title: "Structure des dossiers",
        items: [
          {
            title: "Pages",
            description: "Routage automatique basé sur les fichiers",
            code: "pages/\n  index.vue          # / (accueil)\n  about.vue          # /about\n  users/\n    [id].vue         # /users/123\n    index.vue        # /users",
          },
        ],
      },
      {
        title: "Composables",
        items: [
          {
            title: "useState",
            description: "État partagé entre composants",
            code: '// composables/useCounter.js\nexport const useCounter = () => {\n  return useState("counter", () => 0);\n};\n\n// Dans un composant\nconst counter = useCounter();\ncounter.value++;',
          },
        ],
      },
      {
        title: "API routes",
        items: [
          {
            title: "Route API",
            description: "API côté serveur",
            code: "// server/api/users.js\nexport default defineEventHandler(async (event) => {\n  const users = await fetchUsers();\n  return users;\n});",
          },
        ],
      },
    ],
  },
  {
    name: "Laravel",
    icon: <Database className="w-5 h-5" />,
    sections: [
      {
        title: "Artisan CLI",
        items: [
          {
            title: "Commandes courantes",
            description: "Outils de développement Laravel",
            code: "php artisan make:controller UserController\nphp artisan make:model User -m\nphp artisan make:migration create_users_table\nphp artisan migrate\nphp artisan serve",
          },
        ],
      },
      {
        title: "Eloquent ORM",
        items: [
          {
            title: "Relations",
            description: "Définition des relations entre modèles",
            code: 'class User extends Model {\n  public function posts() {\n    return $this->hasMany(Post::class);\n  }\n  \n  public function profile() {\n    return $this->hasOne(Profile::class);\n  }\n}\n\n// Utilisation\n$user = User::with("posts")->find(1);\n$posts = $user->posts;',
          },
        ],
      },
      {
        title: "Blade Templates",
        items: [
          {
            title: "Syntaxe Blade",
            description: "Moteur de template Laravel",
            code: '@if($condition)\n  <p>Vrai</p>\n@else\n  <p>Faux</p>\n@endif\n\n@foreach($items as $item)\n  <li>{{ $item->name }}</li>\n@endforeach\n\n@include("partials.header")',
          },
        ],
      },
    ],
  },
  {
    name: "Symfony",
    icon: <BookOpen className="w-5 h-5" />,
    sections: [
      {
        title: "Console",
        items: [
          {
            title: "Commandes Symfony",
            description: "Outils de développement",
            code: "php bin/console make:controller\nphp bin/console make:entity\nphp bin/console doctrine:migrations:diff\nphp bin/console doctrine:migrations:migrate\nphp bin/console cache:clear",
          },
        ],
      },
      {
        title: "Doctrine ORM",
        items: [
          {
            title: "Entités",
            description: "Définition des modèles de données",
            code: "use Doctrine\\ORM\\Mapping as ORM;\n\n#[ORM\\Entity]\nclass User\n{\n    #[ORM\\Id]\n    #[ORM\\GeneratedValue]\n    #[ORM\\Column]\n    private ?int $id = null;\n    \n    #[ORM\\Column(length: 255)]\n    private ?string $email = null;\n    \n    // Getters et setters...\n}",
          },
        ],
      },
      {
        title: "Twig Templates",
        items: [
          {
            title: "Syntaxe Twig",
            description: "Moteur de template Symfony",
            code: '{% if user %}\n  <h1>Bonjour {{ user.name }}!</h1>\n{% endif %}\n\n{% for item in items %}\n  <li>{{ item.title }}</li>\n{% endfor %}\n\n{% include "partials/header.html.twig" %}',
          },
        ],
      },
    ],
  },
  {
    name: "Cursor AI",
    icon: <Terminal className="w-5 h-5" />,
    sections: [
      {
        title: "Commandes Chat",
        items: [
          {
            title: "Chat avec l'IA",
            description: "Interagir avec Claude dans Cursor",
            code: "Cmd/Ctrl + K : Ouvrir le chat\nCmd/Ctrl + L : Chat en ligne\nCmd/Ctrl + Shift + L : Chat en plein écran",
          },
          {
            title: "Génération de code",
            description: "Demander du code à l'IA",
            code: '// Exemples de prompts :\n"Crée une fonction pour valider un email"\n"Génère un composant React avec TypeScript"\n"Écris un test unitaire pour cette fonction"',
          },
        ],
      },
      {
        title: "Édition intelligente",
        items: [
          {
            title: "Complétion de code",
            description: "Aide à la saisie automatique",
            code: "Tab : Accepter la suggestion\nCtrl + ] : Prochaine suggestion\nCtrl + [ : Suggestion précédente",
          },
          {
            title: "Refactoring",
            description: "Modification intelligente du code",
            code: "Cmd/Ctrl + Shift + R : Refactoriser\nCmd/Ctrl + . : Actions rapides\nCmd/Ctrl + Shift + P : Palette de commandes",
          },
        ],
      },
      {
        title: "Fonctionnalités avancées",
        items: [
          {
            title: "Debugging IA",
            description: "Aide au débogage",
            code: '// Demander à l\'IA d\'expliquer une erreur :\n"Pourquoi cette erreur se produit ?"\n"Comment corriger ce bug ?"\n"Explique-moi ce code"',
          },
          {
            title: "Documentation",
            description: "Génération de documentation",
            code: '// Prompts utiles :\n"Documente cette fonction"\n"Crée un README pour ce projet"\n"Génère des commentaires JSDoc"',
          },
        ],
      },
    ],
  },
  {
    name: "Claude & IA",
    icon: <Zap className="w-5 h-5" />,
    sections: [
      {
        title: "Prompts efficaces",
        items: [
          {
            title: "Structure d'un prompt",
            description: "Format recommandé pour de meilleurs résultats",
            code: "1. CONTEXTE : Décris le projet/technologie\n2. OBJECTIF : Ce que tu veux accomplir\n3. CONTRAINTES : Limites techniques\n4. EXEMPLE : Code existant si applicable\n5. FORMAT : Comment tu veux la réponse",
          },
          {
            title: "Exemples de prompts",
            description: "Prompts efficaces pour le développement",
            code: '// Pour du code :\n"Crée une API REST avec Node.js et Express qui gère les utilisateurs avec authentification JWT"\n\n// Pour du debug :\n"J\'ai cette erreur [erreur]. Mon code fait [description]. Comment la résoudre ?"\n\n// Pour de l\'optimisation :\n"Comment optimiser cette fonction pour améliorer les performances ?"',
          },
        ],
      },
      {
        title: "Bonnes pratiques",
        items: [
          {
            title: "Communication claire",
            description: "Comment bien communiquer avec l'IA",
            code: "- Sois spécifique et précis\n- Donne du contexte\n- Une question = une réponse\n- Vérifie et teste le code généré\n- Itère sur les réponses",
          },
          {
            title: "Limitations",
            description: "Ce que l'IA ne peut pas faire",
            code: "- Ne peut pas accéder à ton code local\n- Ne connaît pas les dernières mises à jour\n- Peut faire des erreurs de logique\n- Toujours vérifier la sécurité",
          },
        ],
      },
      {
        title: "Intégration workflow",
        items: [
          {
            title: "Dans le développement",
            description: "Comment intégrer l'IA dans ton workflow",
            code: "1. Planification : Demande des architectures\n2. Développement : Génération de code\n3. Debug : Résolution de problèmes\n4. Tests : Génération de tests\n5. Documentation : Explication du code",
          },
        ],
      },
    ],
  },
  {
    name: "GitHub Copilot",
    icon: <GitBranch className="w-5 h-5" />,
    sections: [
      {
        title: "Activation",
        items: [
          {
            title: "Comment activer",
            description: "Activer GitHub Copilot dans ton éditeur",
            code: "1. Installer l'extension GitHub Copilot\n2. Se connecter avec ton compte GitHub\n3. Vérifier l'abonnement (gratuit pour étudiants)\n4. Redémarrer l'éditeur",
          },
        ],
      },
      {
        title: "Utilisation",
        items: [
          {
            title: "Complétion automatique",
            description: "Comment utiliser les suggestions",
            code: "Tab : Accepter la suggestion\nAlt + ] : Suggestion suivante\nAlt + [ : Suggestion précédente\nCtrl + Enter : Voir toutes les suggestions",
          },
          {
            title: "Prompts en commentaires",
            description: "Guider Copilot avec des commentaires",
            code: "// Crée une fonction qui calcule la factorielle\n// Génère un composant React avec hooks\n// Écris un test unitaire pour cette fonction\n// Optimise cette boucle pour de meilleures performances",
          },
        ],
      },
      {
        title: "Astuces",
        items: [
          {
            title: "Améliorer les suggestions",
            description: "Comment obtenir de meilleurs résultats",
            code: "- Écris des commentaires clairs\n- Donne des noms explicites aux variables\n- Utilise des types TypeScript\n- Fournis des exemples d'utilisation",
          },
        ],
      },
    ],
  },
  {
    name: "Outils Modernes",
    icon: <Globe className="w-5 h-5" />,
    sections: [
      {
        title: "VS Code Extensions",
        items: [
          {
            title: "Extensions essentielles",
            description: "Extensions recommandées pour le développement",
            code: "- Prettier : Formatage automatique\n- ESLint : Linting JavaScript/TypeScript\n- GitLens : Historique Git avancé\n- Auto Rename Tag : HTML/JSX\n- Bracket Pair Colorizer : Parenthèses colorées",
          },
        ],
      },
      {
        title: "Terminal & Shell",
        items: [
          {
            title: "Commandes utiles",
            description: "Commandes terminal pour développeurs",
            code: 'ls -la : Lister tous les fichiers\ngrep -r "pattern" . : Recherche récursive\nfind . -name "*.js" : Trouver fichiers JS\nchmod +x script.sh : Rendre exécutable\nps aux | grep node : Processus Node.js',
          },
        ],
      },
      {
        title: "Docker & Containers",
        items: [
          {
            title: "Commandes Docker",
            description: "Commandes Docker essentielles",
            code: "docker build -t monapp . : Construire une image\ndocker run -p 3000:3000 monapp : Lancer un conteneur\ndocker ps : Lister les conteneurs actifs\ndocker-compose up -d : Lancer avec docker-compose\ndocker logs conteneur_id : Voir les logs",
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
