# Configuration Nginx Externe - dlpz.fr

## 🎯 Objectif

Cette configuration permet de gérer plusieurs applications sur le même serveur :

- **tools.dlpz.fr** → Application devtools (Docker)
- **dlpz.fr** → Votre autre application

## 🏗️ Architecture

```
Internet → Nginx Externe (ports 80/443) → Applications
                                    ├── tools.dlpz.fr → Docker (port 3001)
                                    └── dlpz.fr → Votre autre app
```

## 📋 Fichiers modifiés

### 1. `docker-compose.yml`

- ✅ Suppression des ports 80/443 du conteneur nginx
- ✅ L'application reste accessible sur le port 3001

### 2. `nginx-main.conf`

- ✅ Configuration nginx externe complète
- ✅ Gestion des deux domaines
- ✅ SSL/TLS configuré
- ✅ Headers de sécurité
- ✅ Rate limiting

## 🚀 Déploiement

### Option 1 : Script automatique

```bash
chmod +x deploy-nginx-external.sh
./deploy-nginx-external.sh
```

### Option 2 : Déploiement manuel

1. **Installer nginx** (si pas déjà fait) :

```bash
sudo apt update && sudo apt install nginx
```

2. **Sauvegarder la config actuelle** :

```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
```

3. **Installer la nouvelle config** :

```bash
sudo cp nginx-main.conf /etc/nginx/nginx.conf
```

4. **Vérifier la configuration** :

```bash
sudo nginx -t
```

5. **Redémarrer nginx** :

```bash
sudo systemctl restart nginx
```

6. **Redémarrer Docker** :

```bash
docker-compose down && docker-compose up -d
```

## 🔧 Configuration de votre autre application

Pour configurer `dlpz.fr`, modifiez la section dans `nginx-main.conf` :

### Application sur un port spécifique :

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;  # Port de votre app
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

### Application statique :

```nginx
location / {
    root /var/www/dlpz.fr;
    index index.html index.htm;
    try_files $uri $uri/ =404;
}
```

## 🔍 Vérification

### Vérifier nginx :

```bash
sudo systemctl status nginx
sudo nginx -t
```

### Vérifier Docker :

```bash
docker-compose ps
```

### Tester les domaines :

```bash
curl -I https://tools.dlpz.fr
curl -I https://dlpz.fr
```

## 📊 Monitoring

### Logs nginx :

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Logs Docker :

```bash
docker-compose logs -f
```

## 🔒 SSL/TLS

La configuration utilise Let's Encrypt. Assurez-vous que vos certificats sont présents :

- `/etc/letsencrypt/live/tools.dlpz.fr/`
- `/etc/letsencrypt/live/dlpz.fr/`

## 🆘 Dépannage

### Nginx ne démarre pas :

```bash
sudo nginx -t  # Vérifier la config
sudo systemctl status nginx
```

### Docker ne répond pas :

```bash
docker-compose ps
docker-compose logs
```

### Restaurer l'ancienne config :

```bash
sudo cp /etc/nginx/nginx.conf.backup /etc/nginx/nginx.conf
sudo systemctl restart nginx
```

## ✅ Avantages de cette configuration

1. **Isolation** : Chaque application peut être redémarrée indépendamment
2. **Sécurité** : Nginx externe gère SSL et les headers de sécurité
3. **Performance** : Cache et compression optimisés
4. **Flexibilité** : Facile d'ajouter de nouvelles applications
5. **Monitoring** : Logs centralisés dans nginx

## 🎉 Résultat

- ✅ `tools.dlpz.fr` fonctionne via Docker
- ✅ `dlpz.fr` prêt pour votre autre application
- ✅ SSL/TLS configuré pour les deux domaines
- ✅ Plus de conflit de ports
- ✅ Configuration maintenable et évolutive
