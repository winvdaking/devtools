# 🛠️ DevTools Hub

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Une collection complète d'outils de développement web modernes et pratiques**

DevTools Hub est une application web Next.js qui regroupe une multitude d'outils essentiels pour les développeurs, designers et administrateurs système. Interface moderne, responsive et intuitive pour accélérer votre workflow de développement.

## ✨ Fonctionnalités

### 🔧 Outils de Formatage

- **JSON Formatter** - Formatage et validation JSON
- **XML Formatter** - Formatage et validation XML
- **YAML Formatter** - Formatage et validation YAML
- **SQL Formatter** - Formatage de requêtes SQL
- **Text Converter** - Conversion de casse et formatage de texte
- **Spell Checker** - Vérification orthographique
- **Text Reformulator** - Reformulation de texte
- **JSON to CSV** - Conversion JSON vers CSV

### 🔐 Outils d'Encodage & Sécurité

- **Hash & Encrypt** - Génération de hash (MD5, SHA-1, SHA-256, etc.)
- **Base64** - Encodage/décodage Base64
- **URL Encoder** - Encodage/décodage URL
- **HTML Escape** - Échappement HTML
- **Basic Auth Generator** - Génération d'en-têtes d'authentification
- **JWT Parser** - Analyse et décodage de tokens JWT

### 🎲 Générateurs

- **UUID Generator** - Génération d'identifiants uniques
- **Random Port Generator** - Génération de ports aléatoires
- **Crontab Generator** - Génération d'expressions cron
- **Slugify** - Conversion de texte en slug
- **Mock Data Generator** - Génération de données de test
- **Color Palette Generator** - Génération de palettes de couleurs

### 🛠️ Utilitaires

- **Date Formatter** - Formatage et manipulation de dates
- **URL Parser** - Analyse d'URLs
- **Device Information** - Informations sur l'appareil
- **Email Normalizer** - Normalisation d'adresses email
- **Chmod Calculator** - Calculatrice de permissions Unix
- **Docker Converter** - Conversion de commandes Docker

### 📚 Références & Aide-mémoire

- **MIME Types** - Référence des types MIME
- **Keycode Info** - Informations sur les codes de touches
- **HTTP Status Codes** - Codes de statut HTTP
- **Git Cheatsheet** - Aide-mémoire Git
- **Regex Cheatsheet** - Aide-mémoire expressions régulières
- **Regex Tester** - Testeur d'expressions régulières

### 🚀 Outils de Développement

- **Bundle Analyzer** - Analyse de bundles
- **GraphQL Playground** - Playground GraphQL
- **CSS Grid Generator** - Générateur de grilles CSS
- **Console Log Beautifier** - Formatage des logs console
- **Error Stack Parser** - Analyse de stack traces
- **Cheatsheets** - Collection d'aide-mémoires technologiques

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/winvdaking/devtools.git
cd devtools

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Installation avec Docker

```bash
# Construire l'image Docker
docker build -t devtools .

# Lancer le conteneur
docker run -p 3000:3000 devtools
```

## 🎯 Utilisation

1. **Navigation** : Utilisez la sidebar pour naviguer entre les différents outils
2. **Interface responsive** : L'application s'adapte automatiquement à votre écran
3. **Mode sombre/clair** : Basculez entre les thèmes selon vos préférences
4. **Copie rapide** : La plupart des outils proposent des boutons de copie en un clic

## 🏗️ Architecture

```
src/
├── app/                    # Pages Next.js App Router
├── components/
│   ├── tools/             # Composants d'outils individuels
│   ├── ui/                # Composants UI réutilisables
│   └── sidebar.tsx        # Navigation principale
├── lib/                   # Utilitaires et helpers
└── types/                 # Définitions TypeScript
```

## 🛠️ Technologies

- **Framework** : Next.js 14 avec App Router
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Radix UI
- **Icons** : Lucide React
- **Animations** : Framer Motion
- **Theme** : next-themes

## 📦 Scripts disponibles

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Construction pour la production
npm run start    # Démarrage en mode production
npm run lint     # Vérification du code avec ESLint
```

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker-compose up -d
```

### Serveur traditionnel

```bash
npm run build
npm run start
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md) pour plus de détails.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Radix UI](https://www.radix-ui.com/) - Composants UI
- [Lucide](https://lucide.dev/) - Icônes
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 📞 Support

- 🐛 **Bugs** : [Ouvrir une issue](https://github.com/winvdaking/devtools/issues)
- 💡 **Suggestions** : [Discussions](https://github.com/winvdaking/devtools/discussions)
- 📧 **Contact** : hello@dorianlopez.fr

---

[@Dorian](https://github.com/winvdaking)
