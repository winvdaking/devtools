/**
 * Cheatsheet Laravel - Framework PHP
 * Commandes Artisan et concepts essentiels de Laravel
 */

import { CheatSheet } from '../../types/cheatsheets';

export const laravelCheatSheet: CheatSheet = {
  name: 'Laravel',
  description: 'Framework PHP pour le développement web',
  icon: 'Server',
  tags: ['php', 'framework', 'laravel', 'artisan'],
  sections: [
    {
      title: 'Installation et configuration',
      items: [
        {
          title: 'Créer un nouveau projet',
          description: 'Créer une nouvelle application Laravel',
          code: 'composer create-project laravel/laravel <nom-projet>',
          examples: [
            'composer create-project laravel/laravel mon-app',
            'composer create-project laravel/laravel mon-app --prefer-dist',
            'laravel new mon-app  # Avec Laravel Installer'
          ]
        },
        {
          title: 'Serveur de développement',
          description: 'Lancer le serveur de développement',
          code: 'php artisan serve',
          examples: [
            'php artisan serve',
            'php artisan serve --host=0.0.0.0 --port=8000',
            'php artisan serve --host=127.0.0.1 --port=3000'
          ]
        },
        {
          title: 'Configuration de l\'environnement',
          description: 'Configurer l\'environnement de l\'application',
          code: 'cp .env.example .env',
          examples: [
            'cp .env.example .env',
            'php artisan key:generate',
            'php artisan config:cache'
          ]
        }
      ]
    },
    {
      title: 'Génération de code',
      items: [
        {
          title: 'Créer un modèle',
          description: 'Générer un modèle Eloquent',
          code: 'php artisan make:model <NomModele>',
          examples: [
            'php artisan make:model User',
            'php artisan make:model User -m  # Avec migration',
            'php artisan make:model User -c  # Avec contrôleur',
            'php artisan make:model User -mcr  # Avec migration, contrôleur et routes'
          ]
        },
        {
          title: 'Créer un contrôleur',
          description: 'Générer un contrôleur',
          code: 'php artisan make:controller <NomControleur>',
          examples: [
            'php artisan make:controller UserController',
            'php artisan make:controller UserController --resource  # Contrôleur ressource',
            'php artisan make:controller UserController --api  # Contrôleur API',
            'php artisan make:controller UserController --model=User  # Avec modèle'
          ]
        },
        {
          title: 'Créer une migration',
          description: 'Générer une migration de base de données',
          code: 'php artisan make:migration <nom_migration>',
          examples: [
            'php artisan make:migration create_users_table',
            'php artisan make:migration add_email_to_users_table --table=users',
            'php artisan make:migration create_posts_table --create=posts'
          ]
        },
        {
          title: 'Créer un seeder',
          description: 'Générer un seeder pour les données de test',
          code: 'php artisan make:seeder <NomSeeder>',
          examples: [
            'php artisan make:seeder UserSeeder',
            'php artisan make:seeder DatabaseSeeder'
          ]
        }
      ]
    },
    {
      title: 'Base de données',
      items: [
        {
          title: 'Exécuter les migrations',
          description: 'Appliquer les migrations à la base de données',
          code: 'php artisan migrate',
          examples: [
            'php artisan migrate',
            'php artisan migrate --force  # En production',
            'php artisan migrate:rollback  # Annuler la dernière migration',
            'php artisan migrate:reset  # Annuler toutes les migrations'
          ]
        },
        {
          title: 'Créer et exécuter les seeders',
          description: 'Peupler la base de données avec des données de test',
          code: 'php artisan db:seed',
          examples: [
            'php artisan db:seed',
            'php artisan db:seed --class=UserSeeder',
            'php artisan migrate:fresh --seed  # Reset et seed'
          ]
        },
        {
          title: 'Tinker - Console interactive',
          description: 'Console interactive pour tester le code Laravel',
          code: 'php artisan tinker',
          examples: [
            'php artisan tinker',
            'User::all()',
            'User::create([\'name\' => \'John\', \'email\' => \'john@example.com\'])',
            'exit  # Quitter Tinker'
          ]
        }
      ]
    },
    {
      title: 'Routes et middleware',
      items: [
        {
          title: 'Définir des routes',
          description: 'Créer des routes dans routes/web.php',
          code: 'Route::<method>(\'<uri>\', [<Controller>::class, \'<method>\']);',
          examples: [
            'Route::get(\'/\', [HomeController::class, \'index\']);',
            'Route::post(\'/users\', [UserController::class, \'store\']);',
            'Route::resource(\'users\', UserController::class);',
            'Route::apiResource(\'users\', UserController::class);'
          ]
        },
        {
          title: 'Middleware',
          description: 'Créer et utiliser des middleware',
          code: 'php artisan make:middleware <NomMiddleware>',
          examples: [
            'php artisan make:middleware CheckAge',
            'Route::middleware([\'auth\'])->group(function () { ... });',
            'Route::get(\'/admin\', [AdminController::class, \'index\'])->middleware(\'admin\');'
          ]
        }
      ]
    },
    {
      title: 'Authentification',
      items: [
        {
          title: 'Scaffolding d\'authentification',
          description: 'Générer les vues et contrôleurs d\'authentification',
          code: 'php artisan make:auth',
          examples: [
            'php artisan make:auth  # Laravel < 6',
            'composer require laravel/ui',
            'php artisan ui vue --auth  # Avec Vue.js',
            'php artisan ui react --auth  # Avec React'
          ]
        },
        {
          title: 'Gestion des utilisateurs',
          description: 'Commandes pour la gestion des utilisateurs',
          code: 'php artisan make:auth',
          examples: [
            'php artisan make:policy UserPolicy',
            'php artisan make:notification WelcomeNotification',
            'php artisan make:listener SendWelcomeEmail'
          ]
        }
      ]
    },
    {
      title: 'Cache et optimisation',
      items: [
        {
          title: 'Gestion du cache',
          description: 'Commandes pour la gestion du cache',
          code: 'php artisan cache:<commande>',
          examples: [
            'php artisan cache:clear',
            'php artisan cache:forget key',
            'php artisan config:cache',
            'php artisan route:cache',
            'php artisan view:cache'
          ]
        },
        {
          title: 'Optimisation pour la production',
          description: 'Optimiser l\'application pour la production',
          code: 'php artisan optimize',
          examples: [
            'php artisan optimize',
            'php artisan config:cache',
            'php artisan route:cache',
            'php artisan view:cache',
            'composer install --optimize-autoloader --no-dev'
          ]
        }
      ]
    },
    {
      title: 'Queues et jobs',
      items: [
        {
          title: 'Créer un job',
          description: 'Générer un job pour les tâches asynchrones',
          code: 'php artisan make:job <NomJob>',
          examples: [
            'php artisan make:job SendEmailJob',
            'php artisan make:job ProcessPayment --sync  # Job synchrone',
            'php artisan queue:work  # Traiter les jobs',
            'php artisan queue:restart  # Redémarrer les workers'
          ]
        },
        {
          title: 'Gestion des queues',
          description: 'Commandes pour la gestion des queues',
          code: 'php artisan queue:<commande>',
          examples: [
            'php artisan queue:work',
            'php artisan queue:listen',
            'php artisan queue:restart',
            'php artisan queue:failed  # Voir les jobs échoués'
          ]
        }
      ]
    },
    {
      title: 'Tests',
      items: [
        {
          title: 'Créer des tests',
          description: 'Générer des tests unitaires et fonctionnels',
          code: 'php artisan make:test <NomTest>',
          examples: [
            'php artisan make:test UserTest',
            'php artisan make:test UserTest --unit  # Test unitaire',
            'php artisan make:test UserTest --feature  # Test fonctionnel',
            'php artisan test  # Exécuter tous les tests'
          ]
        },
        {
          title: 'Exécuter les tests',
          description: 'Lancer les tests de l\'application',
          code: 'php artisan test',
          examples: [
            'php artisan test',
            'php artisan test --filter=UserTest',
            'php artisan test --coverage',
            'vendor/bin/phpunit'
          ]
        }
      ]
    },
    {
      title: 'Commandes personnalisées',
      items: [
        {
          title: 'Créer une commande Artisan',
          description: 'Générer une commande personnalisée',
          code: 'php artisan make:command <NomCommande>',
          examples: [
            'php artisan make:command SendEmails',
            'php artisan make:command ImportUsers --command=import:users',
            'php artisan list  # Voir toutes les commandes disponibles'
          ]
        },
        {
          title: 'Scheduler',
          description: 'Planifier des tâches récurrentes',
          code: 'php artisan schedule:run',
          examples: [
            'php artisan schedule:run',
            'php artisan schedule:list',
            'php artisan schedule:work  # Mode développement'
          ]
        }
      ]
    },
    {
      title: 'Storage et fichiers',
      items: [
        {
          title: 'Gestion du storage',
          description: 'Commandes pour la gestion des fichiers',
          code: 'php artisan storage:link',
          examples: [
            'php artisan storage:link  # Lien symbolique pour le storage',
            'php artisan make:request StoreUserRequest  # Form request',
            'php artisan make:resource UserResource  # API resource'
          ]
        }
      ]
    },
    {
      title: 'Commandes utiles',
      items: [
        {
          title: 'Informations système',
          description: 'Commandes pour obtenir des informations sur l\'application',
          code: 'php artisan <commande>',
          examples: [
            'php artisan about  # Informations sur l\'application',
            'php artisan route:list  # Lister toutes les routes',
            'php artisan config:show  # Voir la configuration',
            'php artisan env  # Voir les variables d\'environnement'
          ]
        },
        {
          title: 'Maintenance',
          description: 'Commandes de maintenance',
          code: 'php artisan down',
          examples: [
            'php artisan down  # Mode maintenance',
            'php artisan up  # Sortir du mode maintenance',
            'php artisan down --message="Maintenance en cours"',
            'php artisan down --allow=127.0.0.1'
          ]
        }
      ]
    }
  ]
};
