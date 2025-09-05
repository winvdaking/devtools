#!/bin/bash

# Script de déploiement pour DevTools Hub
# Usage: ./deploy.sh

set -e

echo "🚀 Début du déploiement de DevTools Hub..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    print_error "Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Arrêter les conteneurs existants
print_status "Arrêt des conteneurs existants..."
docker-compose down || true

# Nettoyer les images inutilisées
print_status "Nettoyage des images Docker inutilisées..."
docker system prune -f

# Construire et démarrer les services
print_status "Construction et démarrage des services..."
docker-compose up --build -d

# Attendre que les services soient prêts
print_status "Attente du démarrage des services..."
sleep 10

# Vérifier le statut des conteneurs
print_status "Vérification du statut des conteneurs..."
docker-compose ps

# Vérifier que l'application répond
print_status "Test de l'application..."
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    print_status "✅ L'application Next.js répond correctement sur le port 3001"
else
    print_warning "⚠️  L'application Next.js ne répond pas encore. Vérifiez les logs avec: docker-compose logs app"
fi

# Afficher les logs récents
print_status "Logs récents de l'application:"
docker-compose logs --tail=20 app

print_status "🎉 Déploiement terminé!"
print_status "Votre application est accessible sur: https://tools.dlpz.fr"
print_status ""
print_status "Commandes utiles:"
print_status "  - Voir les logs: docker-compose logs -f"
print_status "  - Arrêter: docker-compose down"
print_status "  - Redémarrer: docker-compose restart"
print_status "  - Mettre à jour: ./deploy.sh"
