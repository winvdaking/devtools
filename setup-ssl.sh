#!/bin/bash

# Script pour configurer automatiquement les certificats SSL
# Usage: ./setup-ssl.sh

set -e

echo "🔐 Configuration des certificats SSL pour tools.dlpz.fr..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que le script est exécuté en tant que root
if [ "$EUID" -ne 0 ]; then
    print_error "Ce script doit être exécuté en tant que root (utilisez sudo)"
    exit 1
fi

# Vérifier que Certbot est installé
if ! command -v certbot &> /dev/null; then
    print_status "Installation de Certbot..."
    apt update
    apt install -y certbot
fi

# Arrêter temporairement Nginx s'il tourne
print_status "Arrêt temporaire de Nginx..."
systemctl stop nginx 2>/dev/null || true

# Obtenir le certificat SSL
print_status "Obtention du certificat SSL pour tools.dlpz.fr..."
certbot certonly --standalone -d tools.dlpz.fr --non-interactive --agree-tos --email admin@dlpz.fr

# Créer le dossier ssl
print_status "Création du dossier ssl..."
mkdir -p ssl

# Copier les certificats
print_status "Copie des certificats..."
cp /etc/letsencrypt/live/tools.dlpz.fr/fullchain.pem ssl/cert.pem
cp /etc/letsencrypt/live/tools.dlpz.fr/privkey.pem ssl/key.pem

# Définir les permissions appropriées
chmod 644 ssl/cert.pem
chmod 600 ssl/key.pem

print_status "✅ Certificats SSL configurés avec succès!"
print_status "Les certificats sont maintenant disponibles dans le dossier ssl/"

# Créer un script de renouvellement automatique
print_status "Configuration du renouvellement automatique..."
cat > /etc/cron.d/certbot-renewal << EOF
# Renouvellement automatique des certificats SSL
0 12 * * * root /usr/bin/certbot renew --quiet && docker-compose -f $(pwd)/docker-compose.yml restart nginx
EOF

print_status "✅ Renouvellement automatique configuré!"
print_status ""
print_status "Prochaines étapes:"
print_status "1. Vérifiez que votre domaine tools.dlpz.fr pointe vers ce serveur"
print_status "2. Lancez le déploiement avec: ./deploy.sh"
print_status "3. Votre site sera accessible sur: https://tools.dlpz.fr"
