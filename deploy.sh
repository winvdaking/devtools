#!/bin/bash

# Script de déploiement complet - DevTools Hub + dlpz.fr
# Usage: sudo ./deploy.sh

set -e

echo "🚀 Déploiement complet - DevTools Hub + dlpz.fr"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Vérifier root
if [ "$EUID" -ne 0 ]; then
    print_error "Ce script doit être exécuté en tant que root (utilisez sudo)"
    exit 1
fi

print_step "1. Installation des dépendances"
apt update

print_step "2. Configuration du répertoire dlpz.fr"
# Vérifier si le répertoire existe déjà
if [ -d "/var/www/dlpz/frontend/app" ]; then
    print_status "Répertoire existant détecté - conservation de votre projet Git"
    # Ajuster seulement les permissions sans toucher au contenu
    chown -R www-data:www-data /var/www/dlpz/frontend/app
    chmod -R 755 /var/www/dlpz/frontend/app
else
    print_status "Création du répertoire"
    mkdir -p /var/www/dlpz/frontend/app
    chown -R www-data:www-data /var/www/dlpz/frontend/app
    chmod -R 755 /var/www/dlpz/frontend/app
    
    # Créer index.html de base seulement si le répertoire était vide
    cat > /var/www/dlpz/frontend/app/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dlpz.fr</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
        h1 { color: #333; margin-bottom: 20px; }
        .status { background: #e8f5e8; color: #2d5a2d; padding: 15px; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 dlpz.fr</h1>
        <div class="status">
            <strong>✅ Application déployée avec succès !</strong>
        </div>
        <p>Votre application frontend est maintenant accessible sur <strong>https://dlpz.fr</strong></p>
    </div>
</body>
</html>
EOF
    chown www-data:www-data /var/www/dlpz/frontend/app/index.html
fi

print_step "3. Configuration nginx"
# Sauvegarder config existante
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Installer la nouvelle config
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1000;
    gzip_types
        application/atom+xml
        application/geo+json
        application/javascript
        application/x-javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rdf+xml
        application/rss+xml
        application/xhtml+xml
        application/xml
        font/eot
        font/otf
        font/ttf
        image/svg+xml
        text/css
        text/javascript
        text/plain
        text/xml;

    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=5r/s;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=static_cache:10m max_size=1g inactive=60m use_temp_path=off;

    # tools.dlpz.fr
    server {
        listen 80;
        server_name tools.dlpz.fr;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name tools.dlpz.fr;

        ssl_certificate /etc/letsencrypt/live/tools.dlpz.fr/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/tools.dlpz.fr/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        limit_req zone=general burst=10 nodelay;

        location / {
            proxy_pass http://127.0.0.1:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
            
            proxy_buffering on;
            proxy_buffer_size 4k;
            proxy_buffers 8 4k;
            proxy_busy_buffers_size 8k;
        }

        location /_next/static/ {
            proxy_pass http://127.0.0.1:3001;
            proxy_cache static_cache;
            proxy_cache_valid 200 1y;
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
            proxy_cache_lock on;
            add_header Cache-Control "public, immutable";
            add_header X-Cache-Status $upstream_cache_status;
        }

        location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
            proxy_pass http://127.0.0.1:3001;
            proxy_cache static_cache;
            proxy_cache_valid 200 30d;
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
            add_header Cache-Control "public, max-age=2592000";
            add_header X-Cache-Status $upstream_cache_status;
        }

        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://127.0.0.1:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # dlpz.fr
    server {
        listen 80;
        server_name dlpz.fr www.dlpz.fr;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name dlpz.fr www.dlpz.fr;

        ssl_certificate /etc/letsencrypt/live/dlpz.fr/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/dlpz.fr/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        limit_req zone=general burst=10 nodelay;
        client_max_body_size 15M;

        location / {
            root /var/www/dlpz/frontend/app/dist;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
            
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }

        # Types MIME pour les fichiers modernes
        location ~* \.jsx$ {
            root /var/www/dlpz/frontend/app;
            add_header Content-Type "application/javascript";
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        location ~* \.tsx$ {
            root /var/www/dlpz/frontend/app;
            add_header Content-Type "application/javascript";
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        location ~* \.ts$ {
            root /var/www/dlpz/frontend/app;
            add_header Content-Type "application/javascript";
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            root /var/www/dlpz/frontend/app;
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header X-Cache-Status "STATIC";
        }

        error_page 404 /index.html;
        error_page 500 502 503 504 /50x.html;
        
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
EOF

print_step "4. Configuration SSL"
# Arrêter nginx temporairement
systemctl stop nginx 2>/dev/null || true

# Obtenir les certificats
certbot certonly --standalone -d tools.dlpz.fr --non-interactive --agree-tos --email admin@dlpz.fr
certbot certonly --standalone -d dlpz.fr -d www.dlpz.fr --non-interactive --agree-tos --email admin@dlpz.fr

print_step "5. Déploiement Docker"
# Arrêter les conteneurs existants
docker-compose down 2>/dev/null || true

# Nettoyer
docker system prune -f

# Démarrer les services
docker-compose up --build -d

# Attendre le démarrage
sleep 15

print_step "6. Démarrage des services"
# Créer le cache nginx
mkdir -p /var/cache/nginx
chown www-data:www-data /var/cache/nginx

# Démarrer nginx
systemctl enable nginx
systemctl start nginx

print_step "7. Configuration du renouvellement SSL"
cat > /etc/cron.d/certbot-renewal << 'EOF'
# Renouvellement automatique des certificats SSL
0 12 * * * root /usr/bin/certbot renew --quiet && systemctl reload nginx
EOF

print_step "8. Finalisation"
# Créer script de monitoring
cat > /usr/local/bin/monitor.sh << 'EOF'
#!/bin/bash
echo "=== Status des services ==="
echo "Nginx: $(systemctl is-active nginx)"
echo "Docker: $(systemctl is-active docker)"
echo ""
echo "=== Conteneurs Docker ==="
docker-compose ps
echo ""
echo "=== Logs récents nginx ==="
tail -5 /var/log/nginx/access.log
echo ""
echo "=== Logs récents application ==="
docker-compose logs --tail=5 app
EOF

chmod +x /usr/local/bin/monitor.sh

print_status ""
print_status "🎉 Déploiement terminé avec succès!"
print_status ""
print_status "📋 Résumé:"
print_status "  ✅ Nginx configuré et actif"
print_status "  ✅ Application Docker déployée"
print_status "  ✅ SSL/TLS configuré pour les deux domaines"
print_status "  ✅ Application dlpz.fr déployée"
print_status "  ✅ Monitoring configuré"
print_status ""
print_status "🌐 Accès:"
print_status "  - DevTools: https://tools.dlpz.fr"
print_status "  - Site principal: https://dlpz.fr"
print_status ""
print_status "🔧 Commandes utiles:"
print_status "  - Monitoring: /usr/local/bin/monitor.sh"
print_status "  - Logs app: docker-compose logs -f"
print_status "  - Logs nginx: tail -f /var/log/nginx/access.log"
print_status "  - Redémarrer: docker-compose restart && systemctl restart nginx"
print_status ""
print_status "⚠️  N'oubliez pas de:"
print_status "  1. Configurer votre DNS pour pointer les domaines vers ce serveur"
print_status "  2. Déployer votre application frontend dans /var/www/dlpz/frontend/app"
print_status "  3. Tester l'accès depuis l'extérieur"