# Guide de Déploiement - DevTools Hub

Ce guide vous explique comment déployer DevTools Hub sur votre VPS avec Nginx.

## Prérequis

### Sur votre VPS
- Ubuntu/Debian (recommandé)
- Docker et Docker Compose installés
- Domaine `tools.dlpz.fr` pointant vers votre VPS
- Certificats SSL (Let's Encrypt recommandé)

### Installation de Docker sur Ubuntu/Debian
```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Redémarrer la session
exit
# Se reconnecter à votre VPS
```

## Configuration SSL avec Let's Encrypt

### 1. Installer Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtenir le certificat SSL
```bash
sudo certbot certonly --standalone -d tools.dlpz.fr
```

### 3. Copier les certificats dans le dossier ssl
```bash
sudo mkdir -p ssl
sudo cp /etc/letsencrypt/live/tools.dlpz.fr/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/tools.dlpz.fr/privkey.pem ssl/key.pem
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem
```

## Déploiement

### 1. Cloner le projet sur votre VPS
```bash
git clone <votre-repo-url> devtools-hub
cd devtools-hub
```

### 2. Rendre le script de déploiement exécutable
```bash
chmod +x deploy.sh
```

### 3. Lancer le déploiement
```bash
./deploy.sh
```

## Configuration du Firewall

### Ouvrir les ports nécessaires
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Vérification du déploiement

### 1. Vérifier que les conteneurs tournent
```bash
docker-compose ps
```

### 2. Vérifier les logs
```bash
docker-compose logs -f
```

### 3. Tester l'application
```bash
curl -I https://tools.dlpz.fr
```

## Maintenance

### Mise à jour de l'application
```bash
git pull origin main
./deploy.sh
```

### Sauvegarde des certificats SSL
```bash
sudo cp -r ssl/ backup/ssl-$(date +%Y%m%d)/
```

### Renouvellement automatique des certificats SSL
Ajoutez cette ligne à votre crontab :
```bash
sudo crontab -e
# Ajouter cette ligne :
0 12 * * * /usr/bin/certbot renew --quiet && docker-compose restart nginx
```

## Dépannage

### L'application ne démarre pas
```bash
# Vérifier les logs
docker-compose logs app

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h
```

### Problèmes de SSL
```bash
# Vérifier les certificats
sudo certbot certificates

# Tester la configuration SSL
openssl s_client -connect tools.dlpz.fr:443 -servername tools.dlpz.fr
```

### Problèmes de DNS
```bash
# Vérifier la résolution DNS
nslookup tools.dlpz.fr
dig tools.dlpz.fr
```

## Structure des fichiers

```
devtools-hub/
├── Dockerfile              # Configuration Docker pour l'app
├── docker-compose.yml      # Orchestration des services
├── nginx.conf              # Configuration Nginx
├── deploy.sh               # Script de déploiement
├── .dockerignore           # Fichiers à ignorer lors du build
├── ssl/                    # Certificats SSL
│   ├── cert.pem
│   └── key.pem
└── src/                    # Code source de l'application
```

## Monitoring

### Surveiller les performances
```bash
# Utilisation des ressources
docker stats

# Logs en temps réel
docker-compose logs -f --tail=100
```

### Alertes recommandées
- Surveillance de l'uptime de l'application
- Monitoring de l'utilisation CPU/RAM
- Alertes en cas d'erreur 5xx
- Surveillance de l'expiration des certificats SSL

## Sécurité

### Bonnes pratiques
- Mettre à jour régulièrement Docker et les images
- Utiliser des mots de passe forts
- Configurer un firewall approprié
- Surveiller les logs d'accès
- Sauvegarder régulièrement les données importantes

### Configuration recommandée
- Désactiver l'accès root SSH
- Utiliser des clés SSH au lieu des mots de passe
- Configurer fail2ban pour la protection contre les attaques par force brute
- Mettre en place un système de monitoring (ex: Prometheus + Grafana)
