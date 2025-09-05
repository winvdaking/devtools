/**
 * Cheatsheet Symfony - Framework PHP
 * Commandes Console et concepts essentiels de Symfony
 */

import { CheatSheet } from "../../types/cheatsheets";

export const symfonyCheatSheet: CheatSheet = {
  name: "Symfony",
  description: "Framework PHP pour le développement web",
  icon: "Server",
  tags: ["php", "framework", "symfony", "console"],
  sections: [
    {
      title: "Installation et configuration",
      items: [
        {
          title: "Créer un nouveau projet",
          description: "Créer une nouvelle application Symfony",
          code: "composer create-project symfony/skeleton <nom-projet>",
          examples: [
            "composer create-project symfony/skeleton mon-app",
            "composer create-project symfony/website-skeleton mon-app",
            "symfony new mon-app  # Avec Symfony CLI",
          ],
        },
        {
          title: "Serveur de développement",
          description: "Lancer le serveur de développement",
          code: "symfony serve",
          examples: [
            "symfony serve",
            "symfony serve -d  # En arrière-plan",
            "symfony serve --port=8000",
            "php -S localhost:8000 -t public/  # Serveur PHP natif",
          ],
        },
        {
          title: "Configuration de l'environnement",
          description: "Configurer l'environnement de l'application",
          code: "cp .env .env.local",
          examples: [
            "cp .env .env.local",
            "symfony console debug:config  # Voir la configuration",
            "symfony console debug:container  # Voir les services",
          ],
        },
      ],
    },
    {
      title: "Console Symfony",
      items: [
        {
          title: "Commandes de base",
          description: "Commandes essentielles de la console Symfony",
          code: "php bin/console <commande>",
          examples: [
            "php bin/console list  # Lister toutes les commandes",
            "php bin/console help <commande>  # Aide sur une commande",
            "php bin/console debug:router  # Voir les routes",
            "php bin/console debug:container  # Voir les services",
          ],
        },
        {
          title: "Cache",
          description: "Gestion du cache Symfony",
          code: "php bin/console cache:clear",
          examples: [
            "php bin/console cache:clear",
            "php bin/console cache:clear --env=prod",
            "php bin/console cache:warmup",
            "php bin/console cache:pool:clear cache.global_clearer",
          ],
        },
      ],
    },
    {
      title: "Génération de code",
      items: [
        {
          title: "Créer un contrôleur",
          description: "Générer un contrôleur",
          code: "php bin/console make:controller <NomControleur>",
          examples: [
            "php bin/console make:controller HomeController",
            "php bin/console make:controller Api/UserController",
            "php bin/console make:controller --no-template UserController",
          ],
        },
        {
          title: "Créer une entité",
          description: "Générer une entité Doctrine",
          code: "php bin/console make:entity <NomEntite>",
          examples: [
            "php bin/console make:entity User",
            "php bin/console make:entity --regenerate User  # Régénérer",
            "php bin/console make:entity --overwrite User  # Écraser",
          ],
        },
        {
          title: "Créer un formulaire",
          description: "Générer un formulaire Symfony",
          code: "php bin/console make:form <NomFormulaire>",
          examples: [
            "php bin/console make:form UserType",
            "php bin/console make:form UserType User  # Avec entité",
          ],
        },
        {
          title: "Créer un subscriber/listener",
          description: "Générer des event subscribers ou listeners",
          code: "php bin/console make:subscriber <NomSubscriber>",
          examples: [
            "php bin/console make:subscriber UserSubscriber",
            "php bin/console make:listener UserListener",
            "php bin/console make:event-subscriber UserEventSubscriber",
          ],
        },
      ],
    },
    {
      title: "Doctrine ORM",
      items: [
        {
          title: "Migrations",
          description: "Gérer les migrations de base de données",
          code: "php bin/console doctrine:migrations:diff",
          examples: [
            "php bin/console doctrine:migrations:diff",
            "php bin/console doctrine:migrations:migrate",
            "php bin/console doctrine:migrations:status",
            "php bin/console doctrine:migrations:rollup",
          ],
        },
        {
          title: "Base de données",
          description: "Commandes pour la gestion de la base de données",
          code: "php bin/console doctrine:database:create",
          examples: [
            "php bin/console doctrine:database:create",
            "php bin/console doctrine:database:drop --force",
            "php bin/console doctrine:schema:create",
            "php bin/console doctrine:schema:update --force",
          ],
        },
        {
          title: "Fixtures",
          description: "Générer et charger des données de test",
          code: "php bin/console make:fixtures",
          examples: [
            "php bin/console make:fixtures UserFixtures",
            "php bin/console doctrine:fixtures:load",
            "php bin/console doctrine:fixtures:load --append",
          ],
        },
      ],
    },
    {
      title: "Routing et contrôleurs",
      items: [
        {
          title: "Définir des routes",
          description: "Créer des routes dans les contrôleurs",
          code: "#[Route('/<uri>', name: '<nom>', methods: ['<method>'])]",
          examples: [
            "#[Route('/', name: 'home')]",
            "#[Route('/users', name: 'user_list', methods: ['GET'])]",
            "#[Route('/users/{id}', name: 'user_show', requirements: ['id' => '\\d+'])]",
          ],
        },
        {
          title: "Annotations de contrôleur",
          description: "Annotations courantes pour les contrôleurs",
          code: "use Symfony\\Component\\HttpFoundation\\Response;",
          examples: [
            "use Symfony\\Component\\HttpFoundation\\Response;",
            "use Symfony\\Component\\HttpFoundation\\JsonResponse;",
            "use Symfony\\Component\\HttpFoundation\\Request;",
            "use Symfony\\Component\\Routing\\Annotation\\Route;",
          ],
        },
      ],
    },
    {
      title: "Formulaires",
      items: [
        {
          title: "Créer un formulaire",
          description: "Créer un formulaire Symfony",
          code: "use Symfony\\Component\\Form\\FormBuilderInterface;",
          examples: [
            "use Symfony\\Component\\Form\\FormBuilderInterface;",
            "use Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType;",
            "use Symfony\\Component\\Form\\Extension\\Core\\Type\\SubmitType;",
            "use Symfony\\Component\\OptionsResolver\\OptionsResolver;",
          ],
        },
        {
          title: "Types de champs",
          description: "Types de champs disponibles dans les formulaires",
          code: "TextType::class",
          examples: [
            "TextType::class  # Champ texte",
            "EmailType::class  # Champ email",
            "PasswordType::class  # Champ mot de passe",
            "ChoiceType::class  # Champ de sélection",
            "SubmitType::class  # Bouton de soumission",
          ],
        },
      ],
    },
    {
      title: "Services et injection de dépendances",
      items: [
        {
          title: "Créer un service",
          description: "Créer un service personnalisé",
          code: "php bin/console make:service <NomService>",
          examples: [
            "php bin/console make:service EmailService",
            "php bin/console make:service Payment/PaymentProcessor",
            "php bin/console debug:container  # Voir tous les services",
          ],
        },
        {
          title: "Configuration des services",
          description: "Configurer les services dans services.yaml",
          code: "services:\n  App\\Service\\:\n    resource: '../src/Service/'",
          examples: [
            "services:\n  App\\Service\\:\n    resource: '../src/Service/'",
            "services:\n  app.email_service:\n    class: App\\Service\\EmailService\n    arguments: ['@mailer']",
          ],
        },
      ],
    },
    {
      title: "Sécurité",
      items: [
        {
          title: "Authentification",
          description: "Configurer l'authentification",
          code: "php bin/console make:user",
          examples: [
            "php bin/console make:user",
            "php bin/console make:auth  # Authentification complète",
            "php bin/console make:registration-form  # Formulaire d'inscription",
          ],
        },
        {
          title: "Firewall et providers",
          description: "Configuration de la sécurité",
          code: "security:\n  firewalls:\n    main:\n      provider: app_user_provider",
          examples: [
            "security:\n  firewalls:\n    main:\n      provider: app_user_provider",
            "security:\n  providers:\n    app_user_provider:\n      entity:\n        class: App\\Entity\\User",
          ],
        },
      ],
    },
    {
      title: "Tests",
      items: [
        {
          title: "Créer des tests",
          description: "Générer des tests unitaires et fonctionnels",
          code: "php bin/console make:test",
          examples: [
            "php bin/console make:test UserTest",
            "php bin/console make:test UserTest --unit  # Test unitaire",
            "php bin/console make:test UserTest --integration  # Test d'intégration",
            "php bin/console make:test UserTest --functional  # Test fonctionnel",
          ],
        },
        {
          title: "Exécuter les tests",
          description: "Lancer les tests de l'application",
          code: "php bin/phpunit",
          examples: [
            "php bin/phpunit",
            "php bin/phpunit tests/UserTest.php",
            "php bin/phpunit --filter=testUserCreation",
            "php bin/phpunit --coverage-html coverage/",
          ],
        },
      ],
    },
    {
      title: "Commandes personnalisées",
      items: [
        {
          title: "Créer une commande",
          description: "Générer une commande personnalisée",
          code: "php bin/console make:command <NomCommande>",
          examples: [
            "php bin/console make:command app:send-emails",
            "php bin/console make:command app:import-users",
            "php bin/console list  # Voir toutes les commandes",
          ],
        },
        {
          title: "Structure d'une commande",
          description: "Structure de base d'une commande Symfony",
          code: "use Symfony\\Component\\Console\\Command\\Command;",
          examples: [
            "use Symfony\\Component\\Console\\Command\\Command;",
            "use Symfony\\Component\\Console\\Input\\InputInterface;",
            "use Symfony\\Component\\Console\\Output\\OutputInterface;",
            "use Symfony\\Component\\Console\\Style\\SymfonyStyle;",
          ],
        },
      ],
    },
    {
      title: "Debug et profiling",
      items: [
        {
          title: "Debug toolbar",
          description: "Activer la barre de debug",
          code: "composer require --dev symfony/profiler-pack",
          examples: [
            "composer require --dev symfony/profiler-pack",
            "composer require --dev symfony/debug-bundle",
            "composer require --dev symfony/var-dumper",
          ],
        },
        {
          title: "Commandes de debug",
          description: "Commandes pour déboguer l'application",
          code: "php bin/console debug:<commande>",
          examples: [
            "php bin/console debug:router",
            "php bin/console debug:container",
            "php bin/console debug:config",
            "php bin/console debug:event-dispatcher",
          ],
        },
      ],
    },
    {
      title: "Bundles et packages",
      items: [
        {
          title: "Bundles populaires",
          description: "Bundles Symfony couramment utilisés",
          code: "composer require <bundle>",
          examples: [
            "composer require symfony/maker-bundle --dev",
            "composer require symfony/security-bundle",
            "composer require doctrine/doctrine-bundle",
            "composer require symfony/twig-bundle",
          ],
        },
        {
          title: "Bundles tiers",
          description: "Bundles de la communauté",
          code: "composer require <vendor>/<bundle>",
          examples: [
            "composer require nelmio/cors-bundle",
            "composer require lexik/jwt-authentication-bundle",
            "composer require knplabs/knp-paginator-bundle",
            "composer require stof/doctrine-extensions-bundle",
          ],
        },
      ],
    },
  ],
};
