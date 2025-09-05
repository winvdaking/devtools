/**
 * Cheatsheet Docker - Conteneurisation et orchestration
 * Commandes essentielles pour Docker et Docker Compose
 */

import { CheatSheet } from "../../types/cheatsheets";

export const dockerCheatSheet: CheatSheet = {
  name: "Docker",
  description: "Plateforme de conteneurisation d'applications",
  icon: "Package",
  tags: ["containerization", "devops", "deployment"],
  sections: [
    {
      title: "Images Docker",
      items: [
        {
          title: "Lister les images",
          description: "Voir toutes les images Docker disponibles",
          code: "docker images",
          examples: [
            "docker images",
            "docker images -a  # Toutes les images",
            'docker images --filter "dangling=true"  # Images orphelines',
          ],
        },
        {
          title: "Télécharger une image",
          description: "Récupérer une image depuis Docker Hub",
          code: "docker pull <image>",
          examples: [
            "docker pull nginx",
            "docker pull node:18-alpine",
            "docker pull postgres:15",
          ],
        },
        {
          title: "Construire une image",
          description: "Créer une image à partir d'un Dockerfile",
          code: "docker build -t <nom> <chemin>",
          examples: [
            "docker build -t mon-app .",
            "docker build -t mon-app:latest .",
            "docker build -f Dockerfile.prod -t mon-app:prod .",
          ],
        },
        {
          title: "Supprimer une image",
          description: "Supprimer une image Docker",
          code: "docker rmi <image>",
          examples: [
            "docker rmi mon-app",
            "docker rmi -f mon-app  # Force delete",
            "docker image prune  # Nettoyer les images inutilisées",
          ],
        },
      ],
    },
    {
      title: "Conteneurs",
      items: [
        {
          title: "Lancer un conteneur",
          description: "Démarrer un conteneur à partir d'une image",
          code: "docker run <options> <image>",
          examples: [
            "docker run nginx",
            "docker run -p 3000:3000 mon-app",
            "docker run -d --name mon-conteneur nginx  # En arrière-plan",
            "docker run -it ubuntu bash  # Mode interactif",
          ],
        },
        {
          title: "Lister les conteneurs",
          description: "Voir tous les conteneurs",
          code: "docker ps",
          examples: [
            "docker ps  # Conteneurs en cours",
            "docker ps -a  # Tous les conteneurs",
            "docker ps -q  # IDs seulement",
          ],
        },
        {
          title: "Arrêter un conteneur",
          description: "Arrêter un conteneur en cours",
          code: "docker stop <conteneur>",
          examples: [
            "docker stop mon-conteneur",
            "docker stop $(docker ps -q)  # Arrêter tous les conteneurs",
          ],
        },
        {
          title: "Supprimer un conteneur",
          description: "Supprimer un conteneur",
          code: "docker rm <conteneur>",
          examples: [
            "docker rm mon-conteneur",
            "docker rm -f mon-conteneur  # Force delete",
            "docker container prune  # Nettoyer les conteneurs arrêtés",
          ],
        },
      ],
    },
    {
      title: "Exécution et interaction",
      items: [
        {
          title: "Exécuter une commande",
          description: "Exécuter une commande dans un conteneur en cours",
          code: "docker exec <conteneur> <commande>",
          examples: [
            "docker exec mon-conteneur ls",
            "docker exec -it mon-conteneur bash  # Shell interactif",
            "docker exec mon-conteneur npm install",
          ],
        },
        {
          title: "Voir les logs",
          description: "Consulter les logs d'un conteneur",
          code: "docker logs <conteneur>",
          examples: [
            "docker logs mon-conteneur",
            "docker logs -f mon-conteneur  # Suivre en temps réel",
            "docker logs --tail 100 mon-conteneur  # 100 dernières lignes",
          ],
        },
        {
          title: "Copier des fichiers",
          description: "Copier des fichiers vers/depuis un conteneur",
          code: "docker cp <source> <destination>",
          examples: [
            "docker cp fichier.txt mon-conteneur:/app/",
            "docker cp mon-conteneur:/app/fichier.txt ./",
            "docker cp -r dossier/ mon-conteneur:/app/",
          ],
        },
      ],
    },
    {
      title: "Volumes et réseaux",
      items: [
        {
          title: "Gérer les volumes",
          description: "Créer et gérer les volumes Docker",
          code: "docker volume <commande>",
          examples: [
            "docker volume create mon-volume",
            "docker volume ls",
            "docker volume rm mon-volume",
            "docker run -v mon-volume:/data nginx",
          ],
        },
        {
          title: "Monter des dossiers",
          description: "Monter des dossiers locaux dans le conteneur",
          code: "docker run -v <local>:<conteneur> <image>",
          examples: [
            "docker run -v $(pwd):/app nginx",
            "docker run -v /host/path:/container/path nginx",
            "docker run -v $(pwd):/app:ro nginx  # Lecture seule",
          ],
        },
        {
          title: "Gérer les réseaux",
          description: "Créer et gérer les réseaux Docker",
          code: "docker network <commande>",
          examples: [
            "docker network create mon-reseau",
            "docker network ls",
            "docker run --network mon-reseau nginx",
          ],
        },
      ],
    },
    {
      title: "Docker Compose",
      items: [
        {
          title: "Démarrer les services",
          description:
            "Lancer tous les services définis dans docker-compose.yml",
          code: "docker-compose up",
          examples: [
            "docker-compose up",
            "docker-compose up -d  # En arrière-plan",
            "docker-compose up --build  # Reconstruire les images",
          ],
        },
        {
          title: "Arrêter les services",
          description: "Arrêter tous les services",
          code: "docker-compose down",
          examples: [
            "docker-compose down",
            "docker-compose down -v  # Supprimer aussi les volumes",
            "docker-compose down --rmi all  # Supprimer les images",
          ],
        },
        {
          title: "Voir les logs",
          description: "Consulter les logs des services",
          code: "docker-compose logs",
          examples: [
            "docker-compose logs",
            "docker-compose logs -f  # Suivre en temps réel",
            "docker-compose logs service-name  # Logs d'un service spécifique",
          ],
        },
        {
          title: "Exécuter des commandes",
          description: "Exécuter des commandes dans un service",
          code: "docker-compose exec <service> <commande>",
          examples: [
            "docker-compose exec web bash",
            "docker-compose exec db psql -U user -d database",
            "docker-compose exec web npm install",
          ],
        },
      ],
    },
    {
      title: "Maintenance et nettoyage",
      items: [
        {
          title: "Nettoyer le système",
          description: "Supprimer les ressources inutilisées",
          code: "docker system prune",
          examples: [
            "docker system prune  # Nettoyer les ressources inutilisées",
            "docker system prune -a  # Inclure les images non utilisées",
            "docker system prune -f  # Sans confirmation",
          ],
        },
        {
          title: "Voir l'utilisation des ressources",
          description: "Consulter l'utilisation des ressources Docker",
          code: "docker stats",
          examples: [
            "docker stats  # Tous les conteneurs",
            "docker stats mon-conteneur  # Un conteneur spécifique",
            "docker stats --no-stream  # Une seule fois",
          ],
        },
        {
          title: "Inspecter un conteneur",
          description: "Voir les détails d'un conteneur",
          code: "docker inspect <conteneur>",
          examples: [
            "docker inspect mon-conteneur",
            'docker inspect --format="{{.NetworkSettings.IPAddress}}" mon-conteneur',
          ],
        },
      ],
    },
    {
      title: "Dockerfile",
      items: [
        {
          title: "Dockerfile de base",
          description: "Exemple de Dockerfile simple",
          code: 'FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]',
          examples: [
            "FROM node:18-alpine",
            "WORKDIR /app",
            "COPY package*.json ./",
            "RUN npm install",
            "COPY . .",
            "EXPOSE 3000",
            'CMD ["npm", "start"]',
          ],
        },
        {
          title: "Multi-stage build",
          description: "Dockerfile optimisé avec multi-stage",
          code: "# Build stage\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\n# Production stage\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html",
          examples: [
            "# Build stage",
            "FROM node:18-alpine AS builder",
            "WORKDIR /app",
            "COPY package*.json ./",
            "RUN npm install",
            "COPY . .",
            "RUN npm run build",
            "",
            "# Production stage",
            "FROM nginx:alpine",
            "COPY --from=builder /app/dist /usr/share/nginx/html",
          ],
        },
      ],
    },
  ],
};
