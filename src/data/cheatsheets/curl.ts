/**
 * Cheatsheet cURL - Client HTTP en ligne de commande
 * Commandes et options essentielles pour cURL
 */

import { CheatSheet } from '../../types/cheatsheets';

export const curlCheatSheet: CheatSheet = {
  name: 'cURL',
  description: 'Client HTTP en ligne de commande pour tester des APIs et télécharger des fichiers',
  icon: 'Network',
  tags: ['curl', 'http', 'api', 'testing', 'download'],
  sections: [
    {
      title: 'Requêtes HTTP de base',
      items: [
        {
          title: 'Méthodes HTTP',
          description: 'Effectuer des requêtes avec différentes méthodes HTTP',
          code: '# GET (par défaut)\ncurl https://api.example.com/users\n\n# POST\ncurl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John", "email": "john@example.com"}\'\n\n# PUT\ncurl -X PUT https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John Updated"}\'\n\n# DELETE\ncurl -X DELETE https://api.example.com/users/1\n\n# PATCH\ncurl -X PATCH https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John Patched"}\'',
          examples: [
            'curl https://api.example.com/users  # GET',
            'curl -X POST https://api.example.com/users  # POST',
            'curl -X PUT https://api.example.com/users/1  # PUT',
            'curl -X DELETE https://api.example.com/users/1  # DELETE',
            'curl -X PATCH https://api.example.com/users/1  # PATCH'
          ]
        },
        {
          title: 'Headers personnalisés',
          description: 'Ajouter des headers HTTP personnalisés',
          code: '# Headers simples\ncurl -H "Accept: application/json" https://api.example.com/users\n\n# Headers multiples\ncurl -H "Content-Type: application/json" \\\n     -H "Accept: application/json" \\\n     -H "User-Agent: MyApp/1.0" \\\n     https://api.example.com/users\n\n# Headers avec espaces (utiliser des guillemets)\ncurl -H "Authorization: Bearer your-token-here" \\\n     https://api.example.com/protected\n\n# Supprimer un header par défaut\ncurl -H "Host:" https://api.example.com',
          examples: [
            'curl -H "Accept: application/json" https://api.example.com/users',
            'curl -H "Content-Type: application/json" -H "Accept: application/json" https://api.example.com/users',
            'curl -H "Authorization: Bearer your-token-here" https://api.example.com/protected',
            'curl -H "Host:" https://api.example.com'
          ]
        }
      ]
    },
    {
      title: 'Authentification',
      items: [
        {
          title: 'Authentification basique',
          description: 'Authentification avec nom d\'utilisateur et mot de passe',
          code: '# Authentification basique\ncurl -u username:password https://api.example.com/protected\n\n# Authentification basique (prompt pour le mot de passe)\ncurl -u username https://api.example.com/protected\n\n# Authentification basique avec token\ncurl -u "token:x-oauth-basic" https://api.github.com/user\n\n# Authentification basique encodée en base64\ncurl -H "Authorization: Basic $(echo -n \'username:password\' | base64)" \\\n     https://api.example.com/protected',
          examples: [
            'curl -u username:password https://api.example.com/protected',
            'curl -u username https://api.example.com/protected',
            'curl -u "token:x-oauth-basic" https://api.github.com/user',
            'curl -H "Authorization: Basic $(echo -n \'username:password\' | base64)" https://api.example.com/protected'
          ]
        },
        {
          title: 'Tokens et API Keys',
          description: 'Authentification avec des tokens et clés API',
          code: '# Bearer Token\ncurl -H "Authorization: Bearer your-jwt-token" \\\n     https://api.example.com/protected\n\n# API Key dans header\ncurl -H "X-API-Key: your-api-key" \\\n     https://api.example.com/data\n\n# API Key dans query parameter\ncurl "https://api.example.com/data?api_key=your-api-key"\n\n# Token dans header personnalisé\ncurl -H "X-Auth-Token: your-token" \\\n     https://api.example.com/protected',
          examples: [
            'curl -H "Authorization: Bearer your-jwt-token" https://api.example.com/protected',
            'curl -H "X-API-Key: your-api-key" https://api.example.com/data',
            'curl "https://api.example.com/data?api_key=your-api-key"',
            'curl -H "X-Auth-Token: your-token" https://api.example.com/protected'
          ]
        }
      ]
    },
    {
      title: 'Envoi de données',
      items: [
        {
          title: 'Données JSON',
          description: 'Envoyer des données JSON dans le corps de la requête',
          code: '# POST avec JSON\ncurl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John", "email": "john@example.com"}\'\n\n# POST avec JSON depuis un fichier\ncurl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d @user.json\n\n# POST avec JSON multiligne\ncurl -X POST https://api.example.com/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "name": "John Doe",\n    "email": "john@example.com",\n    "age": 30\n  }\'\n\n# PUT avec JSON\ncurl -X PUT https://api.example.com/users/1 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "John Updated"}\'',
          examples: [
            'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d \'{"name": "John"}\'',
            'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d @user.json',
            'curl -X PUT https://api.example.com/users/1 -H "Content-Type: application/json" -d \'{"name": "John Updated"}\''
          ]
        },
        {
          title: 'Données de formulaire',
          description: 'Envoyer des données de formulaire (application/x-www-form-urlencoded)',
          code: '# POST avec données de formulaire\ncurl -X POST https://api.example.com/login \\\n  -d "username=john" \\\n  -d "password=secret123"\n\n# POST avec données de formulaire (explicite)\ncurl -X POST https://api.example.com/login \\\n  -H "Content-Type: application/x-www-form-urlencoded" \\\n  -d "username=john&password=secret123"\n\n# POST avec données de formulaire depuis un fichier\ncurl -X POST https://api.example.com/login \\\n  -d @formdata.txt\n\n# POST avec données de formulaire et URL encodées\ncurl -X POST https://api.example.com/search \\\n  -d "query=hello world" \\\n  -d "category=all"',
          examples: [
            'curl -X POST https://api.example.com/login -d "username=john" -d "password=secret123"',
            'curl -X POST https://api.example.com/login -H "Content-Type: application/x-www-form-urlencoded" -d "username=john&password=secret123"',
            'curl -X POST https://api.example.com/login -d @formdata.txt',
            'curl -X POST https://api.example.com/search -d "query=hello world"'
          ]
        },
        {
          title: 'Upload de fichiers',
          description: 'Envoyer des fichiers avec multipart/form-data',
          code: '# Upload d\'un fichier\ncurl -X POST https://api.example.com/upload \\\n  -F "file=@/path/to/file.jpg"\n\n# Upload avec nom de champ personnalisé\ncurl -X POST https://api.example.com/upload \\\n  -F "avatar=@/path/to/photo.jpg"\n\n# Upload multiple\ncurl -X POST https://api.example.com/upload \\\n  -F "file1=@/path/to/file1.jpg" \\\n  -F "file2=@/path/to/file2.jpg"\n\n# Upload avec métadonnées\ncurl -X POST https://api.example.com/upload \\\n  -F "file=@/path/to/file.jpg" \\\n  -F "description=My photo" \\\n  -F "category=personal"',
          examples: [
            'curl -X POST https://api.example.com/upload -F "file=@/path/to/file.jpg"',
            'curl -X POST https://api.example.com/upload -F "avatar=@/path/to/photo.jpg"',
            'curl -X POST https://api.example.com/upload -F "file1=@/path/to/file1.jpg" -F "file2=@/path/to/file2.jpg"',
            'curl -X POST https://api.example.com/upload -F "file=@/path/to/file.jpg" -F "description=My photo"'
          ]
        }
      ]
    },
    {
      title: 'Options utiles',
      items: [
        {
          title: 'Options de sortie',
          description: 'Contrôler la sortie et le comportement de cURL',
          code: '# Mode silencieux (pas de barre de progression)\ncurl -s https://api.example.com/users\n\n# Mode verbeux (détails de la requête)\ncurl -v https://api.example.com/users\n\n# Mode très verbeux (encore plus de détails)\ncurl -vvv https://api.example.com/users\n\n# Sauvegarder la réponse dans un fichier\ncurl -o response.json https://api.example.com/users\n\n# Sauvegarder avec le nom original\ncurl -O https://example.com/file.zip\n\n# Suivre les redirections\ncurl -L https://example.com\n\n# Limiter le nombre de redirections\ncurl -L --max-redirs 5 https://example.com',
          examples: [
            'curl -s https://api.example.com/users  # Silencieux',
            'curl -v https://api.example.com/users  # Verbeux',
            'curl -o response.json https://api.example.com/users  # Sauvegarder',
            'curl -O https://example.com/file.zip  # Nom original',
            'curl -L https://example.com  # Suivre redirections'
          ]
        },
        {
          title: 'Options de performance',
          description: 'Optimiser les performances et la connectivité',
          code: '# Timeout de connexion\ncurl --connect-timeout 30 https://api.example.com/users\n\n# Timeout total\ncurl --max-time 60 https://api.example.com/users\n\n# Limiter la vitesse de téléchargement\ncurl --limit-rate 1M https://example.com/largefile.zip\n\n# Retry automatique\ncurl --retry 3 https://api.example.com/users\n\n# Retry avec délai\ncurl --retry 3 --retry-delay 5 https://api.example.com/users\n\n# Compression (gzip)\ncurl -H "Accept-Encoding: gzip" https://api.example.com/users',
          examples: [
            'curl --connect-timeout 30 https://api.example.com/users',
            'curl --max-time 60 https://api.example.com/users',
            'curl --limit-rate 1M https://example.com/largefile.zip',
            'curl --retry 3 https://api.example.com/users',
            'curl --retry 3 --retry-delay 5 https://api.example.com/users',
            'curl -H "Accept-Encoding: gzip" https://api.example.com/users'
          ]
        }
      ]
    },
    {
      title: 'Cookies et sessions',
      items: [
        {
          title: 'Gestion des cookies',
          description: 'Travailler avec les cookies HTTP',
          code: '# Sauvegarder les cookies\ncurl -c cookies.txt https://api.example.com/login\n\n# Envoyer les cookies\ncurl -b cookies.txt https://api.example.com/protected\n\n# Envoyer un cookie spécifique\ncurl -b "sessionid=abc123" https://api.example.com/protected\n\n# Envoyer plusieurs cookies\ncurl -b "sessionid=abc123; userid=456" https://api.example.com/protected\n\n# Cookie dans un header\ncurl -H "Cookie: sessionid=abc123; userid=456" \\\n     https://api.example.com/protected\n\n# Sauvegarder et envoyer les cookies\ncurl -c cookies.txt -b cookies.txt \\\n     https://api.example.com/login',
          examples: [
            'curl -c cookies.txt https://api.example.com/login',
            'curl -b cookies.txt https://api.example.com/protected',
            'curl -b "sessionid=abc123" https://api.example.com/protected',
            'curl -b "sessionid=abc123; userid=456" https://api.example.com/protected',
            'curl -H "Cookie: sessionid=abc123; userid=456" https://api.example.com/protected'
          ]
        }
      ]
    },
    {
      title: 'SSL/TLS et certificats',
      items: [
        {
          title: 'Options SSL/TLS',
          description: 'Gérer les connexions sécurisées',
          code: '# Ignorer les erreurs de certificat (DANGEREUX)\ncurl -k https://api.example.com/users\n\n# Vérifier le certificat (par défaut)\ncurl https://api.example.com/users\n\n# Utiliser un certificat client\ncurl --cert client.pem --key client.key https://api.example.com/users\n\n# Utiliser un fichier de certificats CA\ncurl --cacert ca-bundle.pem https://api.example.com/users\n\n# Spécifier la version TLS\ncurl --tlsv1.2 https://api.example.com/users\ncurl --tlsv1.3 https://api.example.com/users\n\n# Voir les informations du certificat\ncurl -vI https://api.example.com/users',
          examples: [
            'curl -k https://api.example.com/users  # Ignorer certificat',
            'curl https://api.example.com/users  # Vérifier certificat',
            'curl --cert client.pem --key client.key https://api.example.com/users',
            'curl --cacert ca-bundle.pem https://api.example.com/users',
            'curl --tlsv1.2 https://api.example.com/users',
            'curl -vI https://api.example.com/users  # Infos certificat'
          ]
        }
      ]
    },
    {
      title: 'Exemples pratiques',
      items: [
        {
          title: 'Tests d\'API REST',
          description: 'Exemples concrets pour tester des APIs REST',
          code: '# Test d\'une API REST complète\n\n# 1. GET - Récupérer tous les utilisateurs\ncurl -H "Accept: application/json" \\\n     https://api.example.com/users\n\n# 2. GET - Récupérer un utilisateur spécifique\ncurl -H "Accept: application/json" \\\n     https://api.example.com/users/1\n\n# 3. POST - Créer un nouvel utilisateur\ncurl -X POST \\\n     -H "Content-Type: application/json" \\\n     -H "Accept: application/json" \\\n     -d \'{"name": "John", "email": "john@example.com"}\' \\\n     https://api.example.com/users\n\n# 4. PUT - Mettre à jour un utilisateur\ncurl -X PUT \\\n     -H "Content-Type: application/json" \\\n     -H "Accept: application/json" \\\n     -d \'{"name": "John Updated", "email": "john.updated@example.com"}\' \\\n     https://api.example.com/users/1\n\n# 5. DELETE - Supprimer un utilisateur\ncurl -X DELETE \\\n     -H "Accept: application/json" \\\n     https://api.example.com/users/1',
          examples: [
            'curl -H "Accept: application/json" https://api.example.com/users  # GET',
            'curl -H "Accept: application/json" https://api.example.com/users/1  # GET by ID',
            'curl -X POST -H "Content-Type: application/json" -d \'{"name": "John"}\' https://api.example.com/users  # POST',
            'curl -X PUT -H "Content-Type: application/json" -d \'{"name": "John Updated"}\' https://api.example.com/users/1  # PUT',
            'curl -X DELETE https://api.example.com/users/1  # DELETE'
          ]
        },
        {
          title: 'Scripts et automatisation',
          description: 'Utiliser cURL dans des scripts et pour l\'automatisation',
          code: '# Script bash avec cURL\n#!/bin/bash\n\nAPI_URL="https://api.example.com"\nTOKEN="your-api-token"\n\n# Fonction pour faire une requête GET\nget_data() {\n    local endpoint=$1\n    curl -s -H "Authorization: Bearer $TOKEN" \\\n         -H "Accept: application/json" \\\n         "$API_URL/$endpoint"\n}\n\n# Fonction pour faire une requête POST\npost_data() {\n    local endpoint=$1\n    local data=$2\n    curl -s -X POST \\\n         -H "Authorization: Bearer $TOKEN" \\\n         -H "Content-Type: application/json" \\\n         -H "Accept: application/json" \\\n         -d "$data" \\\n         "$API_URL/$endpoint"\n}\n\n# Utilisation\nusers=$(get_data "users")\necho "Users: $users"\n\nnew_user=$(post_data "users" \'{"name": "John", "email": "john@example.com"}\')\necho "Created user: $new_user"',
          examples: [
            '#!/bin/bash',
            'API_URL="https://api.example.com"',
            'TOKEN="your-api-token"',
            'curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" "$API_URL/users"',
            'curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d \'{"name": "John"}\' "$API_URL/users"'
          ]
        }
      ]
    }
  ]
};
