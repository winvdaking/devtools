/**
 * Cheatsheet Next.js - Framework React avec SSR
 * Commandes et concepts essentiels de Next.js
 */

import { CheatSheet } from '../../types/cheatsheets';

export const nextCheatSheet: CheatSheet = {
  name: 'Next.js',
  description: 'Framework React avec rendu côté serveur et génération statique',
  icon: 'Globe',
  tags: ['react', 'nextjs', 'ssr', 'ssg', 'framework'],
  sections: [
    {
      title: 'Création de projet',
      items: [
        {
          title: 'Nouveau projet Next.js',
          description: 'Créer une nouvelle application Next.js',
          code: 'npx create-next-app@latest <nom-projet>',
          examples: [
            'npx create-next-app@latest mon-app',
            'npx create-next-app@latest mon-app --typescript',
            'npx create-next-app@latest mon-app --tailwind --eslint',
            'npx create-next-app@latest mon-app --app  # App Router'
          ]
        },
        {
          title: 'Avec template spécifique',
          description: 'Créer un projet avec un template prédéfini',
          code: 'npx create-next-app@latest <nom-projet> --template <template>',
          examples: [
            'npx create-next-app@latest mon-app --template typescript',
            'npx create-next-app@latest mon-app --template tailwind',
            'npx create-next-app@latest mon-app --template blog-starter'
          ]
        }
      ]
    },
    {
      title: 'Commandes de développement',
      items: [
        {
          title: 'Serveur de développement',
          description: 'Lancer le serveur de développement',
          code: 'npm run dev',
          examples: [
            'npm run dev',
            'npm run dev -- -p 3001  # Port personnalisé',
            'npm run dev -- --turbo  # Mode Turbo (expérimental)'
          ]
        },
        {
          title: 'Build de production',
          description: 'Construire l\'application pour la production',
          code: 'npm run build',
          examples: [
            'npm run build',
            'npm run build && npm run start  # Build puis start',
            'npm run build -- --debug  # Build avec debug'
          ]
        },
        {
          title: 'Serveur de production',
          description: 'Lancer le serveur de production',
          code: 'npm run start',
          examples: [
            'npm run start',
            'npm run start -- -p 3000  # Port personnalisé'
          ]
        },
        {
          title: 'Export statique',
          description: 'Générer une version statique de l\'application',
          code: 'npm run export',
          examples: [
            'npm run build && npm run export',
            'next export  # Commande directe'
          ]
        }
      ]
    },
    {
      title: 'Pages et routing',
      items: [
        {
          title: 'Pages Router (Pages)',
          description: 'Structure des pages avec le Pages Router',
          code: 'pages/\n  index.js         # /\n  about.js         # /about\n  blog/\n    [slug].js      # /blog/mon-article\n    index.js       # /blog',
          examples: [
            'pages/index.js  # Page d\'accueil',
            'pages/about.js  # Page /about',
            'pages/blog/[slug].js  # Page dynamique',
            'pages/api/users.js  # API route'
          ]
        },
        {
          title: 'App Router (App)',
          description: 'Nouveau système de routing avec le App Router',
          code: 'app/\n  page.tsx         # /\n  about/\n    page.tsx       # /about\n  blog/\n    [slug]/\n      page.tsx     # /blog/mon-article',
          examples: [
            'app/page.tsx  # Page d\'accueil',
            'app/about/page.tsx  # Page /about',
            'app/blog/[slug]/page.tsx  # Page dynamique',
            'app/api/users/route.ts  # API route'
          ]
        }
      ]
    },
    {
      title: 'API Routes',
      items: [
        {
          title: 'Pages Router API',
          description: 'Créer des routes API avec Pages Router',
          code: '// pages/api/users.js\nexport default function handler(req, res) {\n  if (req.method === \'GET\') {\n    res.status(200).json({ users: [] });\n  }\n}',
          examples: [
            '// pages/api/users.js',
            'export default function handler(req, res) { ... }',
            'if (req.method === \'GET\') { ... }',
            'res.status(200).json({ data: \'success\' });'
          ]
        },
        {
          title: 'App Router API',
          description: 'Créer des routes API avec App Router',
          code: '// app/api/users/route.ts\nimport { NextRequest, NextResponse } from \'next/server\';\n\nexport async function GET() {\n  return NextResponse.json({ users: [] });\n}',
          examples: [
            '// app/api/users/route.ts',
            'import { NextRequest, NextResponse } from \'next/server\';',
            'export async function GET() { ... }',
            'export async function POST(request: NextRequest) { ... }'
          ]
        }
      ]
    },
    {
      title: 'Rendu et performance',
      items: [
        {
          title: 'Server-Side Rendering (SSR)',
          description: 'Rendu côté serveur avec getServerSideProps',
          code: 'export async function getServerSideProps(context) {\n  const data = await fetchData();\n  return {\n    props: { data }\n  };\n}',
          examples: [
            'export async function getServerSideProps(context) { ... }',
            'const { params, query, req, res } = context;',
            'return { props: { data } };'
          ]
        },
        {
          title: 'Static Site Generation (SSG)',
          description: 'Génération statique avec getStaticProps',
          code: 'export async function getStaticProps() {\n  const data = await fetchData();\n  return {\n    props: { data },\n    revalidate: 60  // ISR\n  };\n}',
          examples: [
            'export async function getStaticProps() { ... }',
            'return { props: { data }, revalidate: 60 };  // ISR',
            'return { notFound: true };  // 404'
          ]
        },
        {
          title: 'Incremental Static Regeneration (ISR)',
          description: 'Régénération statique incrémentale',
          code: 'export async function getStaticProps() {\n  return {\n    props: { data },\n    revalidate: 60  // Revalider toutes les 60 secondes\n  };\n}',
          examples: [
            'revalidate: 60  // 60 secondes',
            'revalidate: false  // Pas de revalidation',
            'revalidate: 0  // Revalidation à chaque requête'
          ]
        }
      ]
    },
    {
      title: 'Optimisation d\'images',
      items: [
        {
          title: 'Image Component',
          description: 'Composant Image optimisé de Next.js',
          code: 'import Image from \'next/image\';\n\n<Image\n  src="/image.jpg"\n  alt="Description"\n  width={500}\n  height={300}\n  priority\n/>',
          examples: [
            'import Image from \'next/image\';',
            '<Image src="/image.jpg" alt="Description" width={500} height={300} />',
            '<Image src="/image.jpg" alt="Description" fill />',
            'priority  // Image prioritaire (above the fold)'
          ]
        },
        {
          title: 'Configuration des images',
          description: 'Configurer les domaines d\'images externes',
          code: '// next.config.js\nmodule.exports = {\n  images: {\n    domains: [\'example.com\'],\n    formats: [\'image/webp\', \'image/avif\']\n  }\n};',
          examples: [
            'domains: [\'example.com\', \'cdn.example.com\']',
            'formats: [\'image/webp\', \'image/avif\']',
            'deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]'
          ]
        }
      ]
    },
    {
      title: 'Styling',
      items: [
        {
          title: 'CSS Modules',
          description: 'Utiliser les CSS Modules avec Next.js',
          code: '// styles/Home.module.css\n.container {\n  padding: 0 2rem;\n}\n\n// components/Home.js\nimport styles from \'../styles/Home.module.css\';\n<div className={styles.container}>',
          examples: [
            '// styles/Home.module.css',
            'import styles from \'../styles/Home.module.css\';',
            '<div className={styles.container}>',
            'styles.container  // Classe CSS automatiquement scoped'
          ]
        },
        {
          title: 'Tailwind CSS',
          description: 'Intégrer Tailwind CSS avec Next.js',
          code: 'npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p',
          examples: [
            'npm install -D tailwindcss postcss autoprefixer',
            'npx tailwindcss init -p',
            '// tailwind.config.js',
            'content: [\'./pages/**/*.{js,ts,jsx,tsx}\', \'./components/**/*.{js,ts,jsx,tsx}\']'
          ]
        },
        {
          title: 'Styled JSX',
          description: 'Styling avec Styled JSX (inclus par défaut)',
          code: '<div>\n  <p>Hello World</p>\n  <style jsx>{`\n    p {\n      color: blue;\n    }\n  `}</style>\n</div>',
          examples: [
            '<style jsx>{` p { color: blue; } `}</style>',
            '<style jsx global>{` body { margin: 0; } `}</style>',
            '<style jsx>{`\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n`}</style>'
          ]
        }
      ]
    },
    {
      title: 'Configuration',
      items: [
        {
          title: 'next.config.js',
          description: 'Configuration de Next.js',
          code: '/** @type {import(\'next\').NextConfig} */\nconst nextConfig = {\n  reactStrictMode: true,\n  swcMinify: true,\n  images: {\n    domains: [\'example.com\']\n  }\n};\n\nmodule.exports = nextConfig;',
          examples: [
            'reactStrictMode: true,  // Mode strict React',
            'swcMinify: true,  // Minification avec SWC',
            'images: { domains: [\'example.com\'] },  // Domaines d\'images',
            'env: { CUSTOM_KEY: \'value\' }  // Variables d\'environnement'
          ]
        },
        {
          title: 'Variables d\'environnement',
          description: 'Gérer les variables d\'environnement',
          code: '# .env.local\nNEXT_PUBLIC_API_URL=https://api.example.com\nDATABASE_URL=postgresql://...',
          examples: [
            'NEXT_PUBLIC_API_URL=https://api.example.com  # Public (client)',
            'DATABASE_URL=postgresql://...  # Privé (serveur seulement)',
            'process.env.NEXT_PUBLIC_API_URL  // Accès côté client',
            'process.env.DATABASE_URL  // Accès côté serveur'
          ]
        }
      ]
    },
    {
      title: 'Déploiement',
      items: [
        {
          title: 'Vercel',
          description: 'Déployer sur Vercel (recommandé)',
          code: 'npm install -g vercel\nvercel',
          examples: [
            'npm install -g vercel',
            'vercel  # Premier déploiement',
            'vercel --prod  # Déploiement en production',
            'vercel env add NEXT_PUBLIC_API_URL  # Ajouter des variables d\'env'
          ]
        },
        {
          title: 'Docker',
          description: 'Déployer avec Docker',
          code: '# Dockerfile\nFROM node:18-alpine AS deps\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm run build\n\nFROM node:18-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\n\nEXPOSE 3000\nCMD ["node", "server.js"]',
          examples: [
            'FROM node:18-alpine AS deps',
            'RUN npm ci --only=production',
            'FROM node:18-alpine AS builder',
            'RUN npm run build',
            'FROM node:18-alpine AS runner',
            'CMD ["node", "server.js"]'
          ]
        }
      ]
    },
    {
      title: 'Outils et extensions',
      items: [
        {
          title: 'ESLint',
          description: 'Configuration ESLint pour Next.js',
          code: 'npm install -D eslint-config-next',
          examples: [
            'npm install -D eslint-config-next',
            '// .eslintrc.json',
            '{\n  "extends": ["next/core-web-vitals"]\n}',
            'npm run lint  # Lancer ESLint'
          ]
        },
        {
          title: 'TypeScript',
          description: 'Configuration TypeScript',
          code: 'npm install -D typescript @types/react @types/node',
          examples: [
            'npm install -D typescript @types/react @types/node',
            'npx tsc --init  # Créer tsconfig.json',
            '// tsconfig.json automatiquement configuré par Next.js'
          ]
        }
      ]
    }
  ]
};
