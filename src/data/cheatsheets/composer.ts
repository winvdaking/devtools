/**
 * Cheatsheet Composer - Gestionnaire de dépendances PHP
 * Commandes essentielles pour la gestion des packages PHP
 */

import { CheatSheet } from "../../types/cheatsheets";

export const composerCheatSheet: CheatSheet = {
  name: "Composer",
  description: "Gestionnaire de dépendances pour PHP",
  icon: "Package",
  tags: ["php", "dependencies", "package-manager"],
  sections: [
    {
      title: "Installation et configuration",
      items: [
        {
          title: "Installer Composer",
          description: "Installer Composer sur le système",
          code: "curl -sS https://getcomposer.org/installer | php",
          examples: [
            "curl -sS https://getcomposer.org/installer | php",
            "sudo mv composer.phar /usr/local/bin/composer",
            "composer --version  # Vérifier l'installation",
          ],
        },
        {
          title: "Configuration globale",
          description: "Configurer Composer globalement",
          code: "composer config --global <option> <valeur>",
          examples: [
            "composer config --global repo.packagist composer https://packagist.org",
            "composer config --global github-oauth.github.com token",
            "composer config --global cache-dir /path/to/cache",
          ],
        },
      ],
    },
    {
      title: "Initialisation de projet",
      items: [
        {
          title: "Initialiser un projet",
          description: "Créer un nouveau projet avec composer.json",
          code: "composer init",
          examples: [
            "composer init",
            'composer init --name="vendor/package"',
            'composer init --type="project"',
          ],
        },
        {
          title: "Créer un projet",
          description: "Créer un projet à partir d'un package",
          code: "composer create-project <package> <directory>",
          examples: [
            "composer create-project symfony/skeleton mon-projet",
            "composer create-project laravel/laravel mon-projet",
            "composer create-project --prefer-dist symfony/skeleton mon-projet",
          ],
        },
      ],
    },
    {
      title: "Gestion des dépendances",
      items: [
        {
          title: "Installer les dépendances",
          description: "Installer toutes les dépendances du projet",
          code: "composer install",
          examples: [
            "composer install",
            "composer install --no-dev  # Sans les dépendances de développement",
            "composer install --optimize-autoloader  # Optimiser l'autoloader",
          ],
        },
        {
          title: "Ajouter une dépendance",
          description: "Ajouter un nouveau package au projet",
          code: "composer require <package>",
          examples: [
            "composer require symfony/http-foundation",
            "composer require --dev phpunit/phpunit",
            "composer require monolog/monolog:^2.0",
          ],
        },
        {
          title: "Supprimer une dépendance",
          description: "Supprimer un package du projet",
          code: "composer remove <package>",
          examples: [
            "composer remove symfony/http-foundation",
            "composer remove --dev phpunit/phpunit",
          ],
        },
        {
          title: "Mettre à jour les dépendances",
          description:
            "Mettre à jour les packages vers leurs dernières versions",
          code: "composer update",
          examples: [
            "composer update",
            "composer update symfony/http-foundation",
            "composer update --with-dependencies",
          ],
        },
      ],
    },
    {
      title: "Autoloader",
      items: [
        {
          title: "Régénérer l'autoloader",
          description: "Régénérer les fichiers d'autoloading",
          code: "composer dump-autoload",
          examples: [
            "composer dump-autoload",
            "composer dump-autoload --optimize  # Optimiser pour la production",
            "composer dump-autoload --classmap-authoritative",
          ],
        },
        {
          title: "Autoloader optimisé",
          description: "Optimiser l'autoloader pour de meilleures performances",
          code: "composer dump-autoload --optimize",
          examples: [
            "composer dump-autoload --optimize",
            "composer dump-autoload --classmap-authoritative",
            "composer dump-autoload --apcu",
          ],
        },
      ],
    },
    {
      title: "Scripts et commandes",
      items: [
        {
          title: "Exécuter des scripts",
          description: "Exécuter des scripts définis dans composer.json",
          code: "composer run-script <script>",
          examples: [
            "composer run-script test",
            "composer run-script cs-fix",
            "composer test  # Alias pour run-script test",
          ],
        },
        {
          title: "Scripts prédéfinis",
          description: "Scripts automatiques de Composer",
          code: "composer <event>",
          examples: [
            "composer post-install-cmd",
            "composer pre-update-cmd",
            "composer post-autoload-dump",
          ],
        },
      ],
    },
    {
      title: "Validation et diagnostic",
      items: [
        {
          title: "Valider composer.json",
          description: "Vérifier la validité du fichier composer.json",
          code: "composer validate",
          examples: [
            "composer validate",
            "composer validate --strict  # Validation stricte",
            "composer validate --no-check-publish",
          ],
        },
        {
          title: "Diagnostiquer les problèmes",
          description: "Diagnostiquer les problèmes de dépendances",
          code: "composer diagnose",
          examples: [
            "composer diagnose",
            "composer show --installed  # Voir les packages installés",
            "composer why-not symfony/http-foundation",
          ],
        },
        {
          title: "Vérifier les dépendances",
          description: "Vérifier l'état des dépendances",
          code: "composer check-platform-reqs",
          examples: [
            "composer check-platform-reqs",
            "composer check-platform-reqs --no-dev",
          ],
        },
      ],
    },
    {
      title: "Gestion des versions",
      items: [
        {
          title: "Contraintes de version",
          description: "Spécifier les versions des packages",
          code: "composer require <package>:<constraint>",
          examples: [
            "composer require symfony/http-foundation:^5.0",
            "composer require monolog/monolog:~2.0",
            "composer require phpunit/phpunit:>=9.0 <10.0",
          ],
        },
        {
          title: "Mettre à jour vers une version",
          description: "Mettre à jour vers une version spécifique",
          code: "composer require <package>:<version>",
          examples: [
            "composer require symfony/http-foundation:5.4.0",
            "composer require laravel/framework:^9.0",
          ],
        },
      ],
    },
    {
      title: "Repositories et sources",
      items: [
        {
          title: "Ajouter un repository",
          description: "Ajouter une source de packages personnalisée",
          code: "composer config repositories.<name> <type> <url>",
          examples: [
            "composer config repositories.packagist composer https://packagist.org",
            "composer config repositories.local path /path/to/packages",
            "composer config repositories.github vcs https://github.com/user/repo",
          ],
        },
        {
          title: "Packages privés",
          description: "Gérer les packages privés",
          code: "composer config github-oauth.github.com <token>",
          examples: [
            "composer config github-oauth.github.com ghp_xxxxxxxxxxxx",
            "composer config gitlab-oauth.gitlab.com <token>",
          ],
        },
      ],
    },
    {
      title: "Commandes utiles",
      items: [
        {
          title: "Rechercher des packages",
          description: "Rechercher des packages sur Packagist",
          code: "composer search <terme>",
          examples: [
            "composer search symfony",
            'composer search "http client"',
            "composer show symfony/http-foundation  # Détails d'un package",
          ],
        },
        {
          title: "Nettoyer le cache",
          description: "Nettoyer le cache de Composer",
          code: "composer clear-cache",
          examples: [
            "composer clear-cache",
            "composer clear-cache --gc  # Nettoyage complet",
          ],
        },
        {
          title: "Informations système",
          description: "Afficher les informations sur l'environnement",
          code: "composer about",
          examples: [
            "composer about",
            "composer --version",
            "composer config --list  # Configuration actuelle",
          ],
        },
      ],
    },
  ],
};
