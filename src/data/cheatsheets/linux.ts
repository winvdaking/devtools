/**
 * Cheatsheet Linux - Système d'exploitation
 * Commandes système et administration Linux
 */

import { CheatSheet } from '../../types/cheatsheets';

export const linuxCheatSheet: CheatSheet = {
  name: 'Linux',
  description: 'Système d\'exploitation Unix-like et commandes système',
  icon: 'Monitor',
  tags: ['linux', 'unix', 'system', 'administration', 'server'],
  sections: [
    {
      title: 'Gestion des services',
      items: [
        {
          title: 'systemctl - Gestionnaire de services',
          description: 'Contrôler les services système avec systemd',
          code: '# Démarrer/arrêter/redémarrer un service\nsudo systemctl start nginx\nsudo systemctl stop nginx\nsudo systemctl restart nginx\n\n# Vérifier le statut\nsudo systemctl status nginx\n\n# Activer/désactiver au démarrage\nsudo systemctl enable nginx\nsudo systemctl disable nginx\n\n# Recharger la configuration\nsudo systemctl reload nginx',
          examples: [
            'sudo systemctl start nginx',
            'sudo systemctl stop nginx',
            'sudo systemctl restart nginx',
            'sudo systemctl status nginx',
            'sudo systemctl enable nginx',
            'sudo systemctl disable nginx'
          ]
        },
        {
          title: 'service - Ancien gestionnaire de services',
          description: 'Commandes legacy pour les services (SysV init)',
          code: '# Contrôler un service\nsudo service nginx start\nsudo service nginx stop\nsudo service nginx restart\n\n# Vérifier le statut\nsudo service nginx status\n\n# Lister tous les services\nsudo service --status-all',
          examples: [
            'sudo service nginx start',
            'sudo service nginx stop',
            'sudo service nginx restart',
            'sudo service nginx status',
            'sudo service --status-all'
          ]
        }
      ]
    },
    {
      title: 'Gestion des utilisateurs',
      items: [
        {
          title: 'Créer et gérer les utilisateurs',
          description: 'Commandes pour la gestion des utilisateurs',
          code: '# Créer un utilisateur\nsudo useradd -m -s /bin/bash username\nsudo useradd -m -s /bin/bash -G sudo username  # Avec sudo\n\n# Définir un mot de passe\nsudo passwd username\n\n# Modifier un utilisateur\nsudo usermod -a -G groupname username  # Ajouter à un groupe\nsudo usermod -s /bin/zsh username  # Changer le shell\n\n# Supprimer un utilisateur\nsudo userdel username\nsudo userdel -r username  # Supprimer aussi le home',
          examples: [
            'sudo useradd -m -s /bin/bash username',
            'sudo useradd -m -s /bin/bash -G sudo username',
            'sudo passwd username',
            'sudo usermod -a -G groupname username',
            'sudo userdel -r username'
          ]
        },
        {
          title: 'Gestion des groupes',
          description: 'Créer et gérer les groupes d\'utilisateurs',
          code: '# Créer un groupe\nsudo groupadd groupname\n\n# Ajouter un utilisateur à un groupe\nsudo usermod -a -G groupname username\n\n# Supprimer un utilisateur d\'un groupe\nsudo gpasswd -d username groupname\n\n# Supprimer un groupe\nsudo groupdel groupname\n\n# Voir les groupes d\'un utilisateur\ngroups username\nid username',
          examples: [
            'sudo groupadd groupname',
            'sudo usermod -a -G groupname username',
            'sudo gpasswd -d username groupname',
            'sudo groupdel groupname',
            'groups username',
            'id username'
          ]
        }
      ]
    },
    {
      title: 'Permissions et propriétaires',
      items: [
        {
          title: 'chmod - Modifier les permissions',
          description: 'Changer les permissions de fichiers et dossiers',
          code: '# Permissions numériques\nchmod 755 fichier.sh    # rwxr-xr-x\nchmod 644 fichier.txt   # rw-r--r--\nchmod 600 fichier.key   # rw-------\nchmod 777 dossier/      # rwxrwxrwx\n\n# Permissions symboliques\nchmod u+x script.sh     # Ajouter exécution pour le propriétaire\nchmod g-w fichier.txt   # Retirer écriture pour le groupe\nchmod o+r fichier.txt   # Ajouter lecture pour les autres\nchmod a+x script.sh     # Ajouter exécution pour tous\n\n# Récursif\nchmod -R 755 dossier/',
          examples: [
            'chmod 755 fichier.sh  # rwxr-xr-x',
            'chmod 644 fichier.txt  # rw-r--r--',
            'chmod 600 fichier.key  # rw-------',
            'chmod u+x script.sh  # Ajouter exécution propriétaire',
            'chmod -R 755 dossier/  # Récursif'
          ]
        },
        {
          title: 'chown - Changer le propriétaire',
          description: 'Modifier le propriétaire et le groupe d\'un fichier',
          code: '# Changer le propriétaire\nsudo chown username fichier.txt\n\n# Changer le propriétaire et le groupe\nsudo chown username:groupname fichier.txt\n\n# Changer seulement le groupe\nsudo chown :groupname fichier.txt\n\n# Récursif\nsudo chown -R username:groupname dossier/\n\n# Changer le propriétaire en gardant le groupe\nsudo chown username: fichier.txt',
          examples: [
            'sudo chown username fichier.txt',
            'sudo chown username:groupname fichier.txt',
            'sudo chown :groupname fichier.txt',
            'sudo chown -R username:groupname dossier/',
            'sudo chown username: fichier.txt'
          ]
        },
        {
          title: 'chgrp - Changer le groupe',
          description: 'Modifier le groupe d\'un fichier',
          code: '# Changer le groupe\nsudo chgrp groupname fichier.txt\n\n# Récursif\nsudo chgrp -R groupname dossier/\n\n# Voir les permissions détaillées\nls -la fichier.txt\n\n# Voir les permissions en octal\nstat -c "%a %n" fichier.txt',
          examples: [
            'sudo chgrp groupname fichier.txt',
            'sudo chgrp -R groupname dossier/',
            'ls -la fichier.txt',
            'stat -c "%a %n" fichier.txt'
          ]
        }
      ]
    },
    {
      title: 'Réseau et connectivité',
      items: [
        {
          title: 'Configuration réseau',
          description: 'Commandes pour la configuration réseau',
          code: '# Voir les interfaces réseau\nip addr show\nifconfig  # Ancienne commande\n\n# Voir les routes\nip route show\nroute -n  # Ancienne commande\n\n# Tester la connectivité\nping google.com\nping -c 4 google.com  # 4 pings seulement\n\n# Résolution DNS\nnslookup google.com\ndig google.com\nhost google.com',
          examples: [
            'ip addr show',
            'ifconfig  # Ancienne commande',
            'ip route show',
            'ping google.com',
            'ping -c 4 google.com',
            'nslookup google.com',
            'dig google.com'
          ]
        },
        {
          title: 'Ports et connexions',
          description: 'Gérer les ports et connexions réseau',
          code: '# Voir les ports en écoute\nnetstat -tulpn\nss -tulpn  # Commande moderne\n\n# Voir les connexions actives\nnetstat -an\nss -an\n\n# Tester un port\ntelnet hostname port\nnc -zv hostname port\n\n# Scanner les ports (nmap)\nnmap -p 80,443 hostname\nnmap -p 1-1000 hostname',
          examples: [
            'netstat -tulpn',
            'ss -tulpn  # Commande moderne',
            'netstat -an',
            'telnet hostname port',
            'nc -zv hostname port',
            'nmap -p 80,443 hostname'
          ]
        }
      ]
    },
    {
      title: 'Téléchargement et transfert',
      items: [
        {
          title: 'curl - Client HTTP',
          description: 'Télécharger des fichiers et tester des APIs',
          code: '# Télécharger un fichier\ncurl -O https://example.com/file.zip\ncurl -o monfichier.zip https://example.com/file.zip\n\n# Suivre les redirections\ncurl -L https://example.com\n\n# Avec headers personnalisés\ncurl -H "Authorization: Bearer token" https://api.example.com\n\n# POST avec données\ncurl -X POST -d "name=value" https://api.example.com\ncurl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com\n\n# Sauvegarder les cookies\ncurl -c cookies.txt https://example.com\ncurl -b cookies.txt https://example.com',
          examples: [
            'curl -O https://example.com/file.zip',
            'curl -o monfichier.zip https://example.com/file.zip',
            'curl -L https://example.com',
            'curl -H "Authorization: Bearer token" https://api.example.com',
            'curl -X POST -d "name=value" https://api.example.com',
            'curl -c cookies.txt https://example.com'
          ]
        },
        {
          title: 'wget - Téléchargeur web',
          description: 'Télécharger des fichiers avec wget',
          code: '# Télécharger un fichier\nwget https://example.com/file.zip\n\n# Télécharger en arrière-plan\nwget -b https://example.com/file.zip\n\n# Télécharger récursivement\nwget -r https://example.com/\n\n# Limiter la vitesse\nwget --limit-rate=200k https://example.com/file.zip\n\n# Reprendre un téléchargement interrompu\nwget -c https://example.com/file.zip\n\n# Télécharger avec authentification\nwget --user=username --password=password https://example.com/file.zip',
          examples: [
            'wget https://example.com/file.zip',
            'wget -b https://example.com/file.zip',
            'wget -r https://example.com/',
            'wget --limit-rate=200k https://example.com/file.zip',
            'wget -c https://example.com/file.zip',
            'wget --user=username --password=password https://example.com/file.zip'
          ]
        }
      ]
    },
    {
      title: 'Surveillance système',
      items: [
        {
          title: 'journalctl - Logs système',
          description: 'Consulter les logs système avec systemd',
          code: '# Voir tous les logs\nsudo journalctl\n\n# Logs en temps réel\nsudo journalctl -f\n\n# Logs d\'un service spécifique\nsudo journalctl -u nginx\nsudo journalctl -u nginx -f  # En temps réel\n\n# Logs depuis une date\nsudo journalctl --since "2023-01-01"\nsudo journalctl --since "1 hour ago"\n\n# Logs avec priorité\nsudo journalctl -p err  # Erreurs seulement\nsudo journalctl -p warning  # Warnings et erreurs\n\n# Nettoyer les logs\nsudo journalctl --vacuum-time=7d  # Garder 7 jours\nsudo journalctl --vacuum-size=100M  # Limiter à 100MB',
          examples: [
            'sudo journalctl',
            'sudo journalctl -f  # Temps réel',
            'sudo journalctl -u nginx',
            'sudo journalctl --since "1 hour ago"',
            'sudo journalctl -p err',
            'sudo journalctl --vacuum-time=7d'
          ]
        },
        {
          title: 'Surveillance des processus',
          description: 'Surveiller les processus et les ressources',
          code: '# Voir les processus\nps aux\nps aux | grep nginx\n\n# Surveillance en temps réel\ntop\nhtop  # Version améliorée\n\n# Utilisation des ressources\niostat  # I/O\nvmstat  # Mémoire virtuelle\nfree -h  # Mémoire\n\n# Surveillance des fichiers ouverts\nlsof\nlsof -p PID  # Pour un processus\nlsof -i :80  # Port 80\n\n# Surveillance réseau\niftop  # Trafic réseau par interface\nnethogs  # Trafic par processus',
          examples: [
            'ps aux',
            'ps aux | grep nginx',
            'top',
            'htop  # Version améliorée',
            'iostat',
            'vmstat',
            'free -h',
            'lsof',
            'lsof -p PID',
            'lsof -i :80'
          ]
        }
      ]
    },
    {
      title: 'Gestion des paquets',
      items: [
        {
          title: 'APT - Gestionnaire de paquets (Debian/Ubuntu)',
          description: 'Installer et gérer les paquets avec APT',
          code: '# Mettre à jour la liste des paquets\nsudo apt update\n\n# Mettre à jour les paquets installés\nsudo apt upgrade\nsudo apt full-upgrade  # Avec résolution de dépendances\n\n# Installer un paquet\nsudo apt install package-name\nsudo apt install package1 package2  # Plusieurs paquets\n\n# Supprimer un paquet\nsudo apt remove package-name\nsudo apt purge package-name  # Supprimer aussi la config\n\n# Rechercher un paquet\napt search keyword\n\n# Voir les informations d\'un paquet\napt show package-name\n\n# Nettoyer le cache\nsudo apt clean\nsudo apt autoremove  # Supprimer les paquets inutilisés',
          examples: [
            'sudo apt update',
            'sudo apt upgrade',
            'sudo apt install package-name',
            'sudo apt remove package-name',
            'sudo apt purge package-name',
            'apt search keyword',
            'apt show package-name',
            'sudo apt clean',
            'sudo apt autoremove'
          ]
        },
        {
          title: 'YUM/DNF - Gestionnaire de paquets (RHEL/CentOS/Fedora)',
          description: 'Installer et gérer les paquets avec YUM/DNF',
          code: '# Mettre à jour les paquets\nsudo yum update\nsudo dnf update  # Fedora 22+\n\n# Installer un paquet\nsudo yum install package-name\nsudo dnf install package-name\n\n# Supprimer un paquet\nsudo yum remove package-name\nsudo dnf remove package-name\n\n# Rechercher un paquet\nsudo yum search keyword\nsudo dnf search keyword\n\n# Voir les informations d\'un paquet\nsudo yum info package-name\nsudo dnf info package-name\n\n# Lister les paquets installés\nsudo yum list installed\nsudo dnf list installed',
          examples: [
            'sudo yum update',
            'sudo dnf update  # Fedora 22+',
            'sudo yum install package-name',
            'sudo dnf install package-name',
            'sudo yum remove package-name',
            'sudo yum search keyword',
            'sudo yum info package-name',
            'sudo yum list installed'
          ]
        }
      ]
    },
    {
      title: 'Sauvegarde et compression',
      items: [
        {
          title: 'tar - Archives',
          description: 'Créer et extraire des archives tar',
          code: '# Créer une archive\ntar -czf archive.tar.gz dossier/\ntar -cjf archive.tar.bz2 dossier/  # Compression bzip2\n\n# Extraire une archive\ntar -xzf archive.tar.gz\ntar -xjf archive.tar.bz2\n\n# Lister le contenu\ntar -tzf archive.tar.gz\n\n# Extraire dans un dossier spécifique\ntar -xzf archive.tar.gz -C /destination/\n\n# Créer une archive avec exclusion\ntar -czf backup.tar.gz --exclude=\'*.log\' dossier/',
          examples: [
            'tar -czf archive.tar.gz dossier/',
            'tar -cjf archive.tar.bz2 dossier/',
            'tar -xzf archive.tar.gz',
            'tar -tzf archive.tar.gz',
            'tar -xzf archive.tar.gz -C /destination/',
            'tar -czf backup.tar.gz --exclude=\'*.log\' dossier/'
          ]
        },
        {
          title: 'rsync - Synchronisation',
          description: 'Synchroniser des fichiers et dossiers',
          code: '# Synchronisation locale\nrsync -av source/ destination/\n\n# Synchronisation distante\nrsync -av -e ssh user@host:/source/ /destination/\n\n# Synchronisation avec suppression\nrsync -av --delete source/ destination/\n\n# Synchronisation en mode dry-run\nrsync -av --dry-run source/ destination/\n\n# Exclure des fichiers\nrsync -av --exclude=\'*.log\' source/ destination/\n\n# Synchronisation avec compression\nrsync -avz source/ destination/',
          examples: [
            'rsync -av source/ destination/',
            'rsync -av -e ssh user@host:/source/ /destination/',
            'rsync -av --delete source/ destination/',
            'rsync -av --dry-run source/ destination/',
            'rsync -av --exclude=\'*.log\' source/ destination/',
            'rsync -avz source/ destination/'
          ]
        }
      ]
    },
    {
      title: 'Sécurité et authentification',
      items: [
        {
          title: 'SSH - Connexion sécurisée',
          description: 'Se connecter et configurer SSH',
          code: '# Se connecter à un serveur distant\nssh user@hostname\nssh -p 2222 user@hostname  # Port personnalisé\n\n# Se connecter avec une clé\nssh -i /path/to/key user@hostname\n\n# Copier des fichiers avec SCP\nscp file.txt user@hostname:/remote/path/\nscp -r dossier/ user@hostname:/remote/path/\n\n# Copier des fichiers avec RSYNC\nrsync -av -e ssh file.txt user@hostname:/remote/path/\n\n# Générer une paire de clés SSH\nssh-keygen -t rsa -b 4096\nssh-keygen -t ed25519  # Plus moderne\n\n# Copier la clé publique\nssh-copy-id user@hostname',
          examples: [
            'ssh user@hostname',
            'ssh -p 2222 user@hostname',
            'ssh -i /path/to/key user@hostname',
            'scp file.txt user@hostname:/remote/path/',
            'scp -r dossier/ user@hostname:/remote/path/',
            'ssh-keygen -t rsa -b 4096',
            'ssh-keygen -t ed25519',
            'ssh-copy-id user@hostname'
          ]
        },
        {
          title: 'Firewall - iptables',
          description: 'Configurer le pare-feu avec iptables',
          code: '# Voir les règles actuelles\nsudo iptables -L\nsudo iptables -L -n  # Sans résolution DNS\n\n# Autoriser le trafic entrant sur le port 80\nsudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT\n\n# Bloquer une IP\nsudo iptables -A INPUT -s 192.168.1.100 -j DROP\n\n# Autoriser SSH (port 22)\nsudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT\n\n# Politique par défaut\nsudo iptables -P INPUT DROP\nsudo iptables -P FORWARD DROP\nsudo iptables -P OUTPUT ACCEPT\n\n# Sauvegarder les règles\nsudo iptables-save > /etc/iptables/rules.v4\n\n# Restaurer les règles\nsudo iptables-restore < /etc/iptables/rules.v4',
          examples: [
            'sudo iptables -L',
            'sudo iptables -L -n',
            'sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT',
            'sudo iptables -A INPUT -s 192.168.1.100 -j DROP',
            'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
            'sudo iptables -P INPUT DROP',
            'sudo iptables-save > /etc/iptables/rules.v4'
          ]
        }
      ]
    }
  ]
};
