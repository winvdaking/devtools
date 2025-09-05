/**
 * Cheatsheet Nuxt.js - Framework Vue.js avec SSR
 * Commandes et concepts essentiels de Nuxt.js
 */

import { CheatSheet } from "../../types/cheatsheets";

export const nuxtCheatSheet: CheatSheet = {
  name: "Nuxt.js",
  description:
    "Framework Vue.js avec rendu côté serveur et génération statique",
  icon: "Globe",
  tags: ["vue", "nuxt", "ssr", "ssg", "framework"],
  sections: [
    {
      title: "Création de projet",
      items: [
        {
          title: "Nouveau projet Nuxt",
          description: "Créer une nouvelle application Nuxt.js",
          code: "npx nuxi@latest init <nom-projet>",
          examples: [
            "npx nuxi@latest init mon-app",
            "npx nuxi@latest init mon-app --force  # Forcer la création",
            "npx nuxi@latest init mon-app --package-manager yarn",
          ],
        },
        {
          title: "Avec Nuxt CLI",
          description: "Créer un projet avec Nuxt CLI",
          code: "npx nuxi@latest init <nom-projet>",
          examples: [
            "npx nuxi@latest init mon-app",
            "npx nuxi@latest init mon-app --force",
            "npx nuxi@latest init mon-app --package-manager pnpm",
          ],
        },
      ],
    },
    {
      title: "Commandes de développement",
      items: [
        {
          title: "Serveur de développement",
          description: "Lancer le serveur de développement",
          code: "npm run dev",
          examples: [
            "npm run dev",
            "npm run dev -- --port 3001  # Port personnalisé",
            "npm run dev -- --host 0.0.0.0  # Écouter sur toutes les interfaces",
          ],
        },
        {
          title: "Build de production",
          description: "Construire l'application pour la production",
          code: "npm run build",
          examples: [
            "npm run build",
            "npm run build -- --analyze  # Analyser le bundle",
            "npm run build -- --preset node-server  # Preset serveur Node",
          ],
        },
        {
          title: "Serveur de production",
          description: "Lancer le serveur de production",
          code: "npm run start",
          examples: [
            "npm run start",
            "npm run start -- --port 3000  # Port personnalisé",
          ],
        },
        {
          title: "Génération statique",
          description: "Générer une version statique de l'application",
          code: "npm run generate",
          examples: [
            "npm run generate",
            "npm run generate -- --preset static  # Preset statique",
            "npm run generate -- --analyze  # Analyser le bundle",
          ],
        },
      ],
    },
    {
      title: "Structure des dossiers",
      items: [
        {
          title: "Structure Nuxt 3",
          description: "Organisation des fichiers dans Nuxt 3",
          code: "nuxt-app/\n  pages/          # Pages (file-based routing)\n  components/     # Composants Vue\n  layouts/        # Layouts\n  middleware/     # Middleware\n  plugins/        # Plugins\n  server/         # API routes\n  composables/    # Composables\n  utils/          # Utilitaires",
          examples: [
            "pages/  # Routing automatique",
            "components/  # Composants auto-importés",
            "layouts/  # Layouts de page",
            "middleware/  # Middleware de navigation",
            "plugins/  # Plugins Nuxt",
            "server/  # API routes et middleware serveur",
          ],
        },
        {
          title: "Pages et routing",
          description: "Système de routing basé sur les fichiers",
          code: "pages/\n  index.vue       # /\n  about.vue       # /about\n  blog/\n    index.vue     # /blog\n    [slug].vue    # /blog/mon-article",
          examples: [
            "pages/index.vue  # Page d'accueil",
            "pages/about.vue  # Page /about",
            "pages/blog/[slug].vue  # Page dynamique",
            "pages/blog/[...slug].vue  # Catch-all route",
          ],
        },
      ],
    },
    {
      title: "Composables et API",
      items: [
        {
          title: "Composables Nuxt",
          description: "Composables fournis par Nuxt",
          code: "// useFetch\nconst { data, error, pending } = await useFetch('/api/users');\n\n// useAsyncData\nconst { data, error, pending } = await useAsyncData('users', () => $fetch('/api/users'));",
          examples: [
            "const { data, error, pending } = await useFetch('/api/users');",
            "const { data } = await useAsyncData('users', () => $fetch('/api/users'));",
            "const { data } = await useLazyFetch('/api/users');",
            "const { data } = await useLazyAsyncData('users', () => $fetch('/api/users'));",
          ],
        },
        {
          title: "Navigation",
          description: "Navigation programmatique avec Nuxt",
          code: "const router = useRouter();\nconst route = useRoute();\n\n// Navigation\nawait navigateTo('/about');\nawait navigateTo('/blog', { replace: true });",
          examples: [
            "const router = useRouter();",
            "const route = useRoute();",
            "await navigateTo('/about');",
            "await navigateTo('/blog', { replace: true });",
            "await navigateTo('https://example.com', { external: true });",
          ],
        },
      ],
    },
    {
      title: "Server API",
      items: [
        {
          title: "API Routes",
          description: "Créer des routes API avec Nuxt",
          code: "// server/api/users.get.ts\nexport default defineEventHandler(async (event) => {\n  return {\n    users: []\n  };\n});",
          examples: [
            "// server/api/users.get.ts",
            "export default defineEventHandler(async (event) => { ... });",
            "// server/api/users.post.ts",
            "export default defineEventHandler(async (event) => { ... });",
            "// server/api/users/[id].get.ts",
            "const id = getRouterParam(event, 'id');",
          ],
        },
        {
          title: "Middleware serveur",
          description: "Middleware pour les routes API",
          code: "// server/middleware/auth.ts\nexport default defineEventHandler(async (event) => {\n  // Logique d'authentification\n});",
          examples: [
            "// server/middleware/auth.ts",
            "export default defineEventHandler(async (event) => { ... });",
            "// server/middleware/cors.ts",
            "export default defineEventHandler(async (event) => { ... });",
          ],
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "nuxt.config.ts",
          description: "Configuration principale de Nuxt",
          code: "export default defineNuxtConfig({\n  devtools: { enabled: true },\n  modules: ['@nuxtjs/tailwindcss'],\n  css: ['~/assets/css/main.css'],\n  runtimeConfig: {\n    public: {\n      apiBase: 'https://api.example.com'\n    }\n  }\n});",
          examples: [
            "export default defineNuxtConfig({ ... });",
            "modules: ['@nuxtjs/tailwindcss'],",
            "css: ['~/assets/css/main.css'],",
            "runtimeConfig: { public: { apiBase: 'https://api.example.com' } }",
          ],
        },
        {
          title: "Variables d'environnement",
          description: "Gérer les variables d'environnement",
          code: "# .env\nNUXT_PUBLIC_API_URL=https://api.example.com\nDATABASE_URL=postgresql://...",
          examples: [
            "NUXT_PUBLIC_API_URL=https://api.example.com  # Public",
            "DATABASE_URL=postgresql://...  # Privé",
            "useRuntimeConfig().public.apiBase  // Accès côté client",
            "useRuntimeConfig().databaseUrl  // Accès côté serveur",
          ],
        },
      ],
    },
    {
      title: "Modules et plugins",
      items: [
        {
          title: "Modules populaires",
          description: "Modules Nuxt couramment utilisés",
          code: "npm install @nuxtjs/tailwindcss @pinia/nuxt @nuxtjs/color-mode",
          examples: [
            "npm install @nuxtjs/tailwindcss  # Tailwind CSS",
            "npm install @pinia/nuxt  # State management",
            "npm install @nuxtjs/color-mode  # Mode sombre",
            "npm install @nuxtjs/google-fonts  # Google Fonts",
          ],
        },
        {
          title: "Plugins",
          description: "Créer des plugins Nuxt",
          code: "// plugins/my-plugin.client.ts\nexport default defineNuxtPlugin((nuxtApp) => {\n  // Plugin côté client seulement\n});",
          examples: [
            "// plugins/my-plugin.client.ts  # Côté client",
            "// plugins/my-plugin.server.ts  # Côté serveur",
            "export default defineNuxtPlugin((nuxtApp) => { ... });",
            "nuxtApp.provide('hello', (name: string) => `Hello ${name}!`);",
          ],
        },
      ],
    },
    {
      title: "State Management",
      items: [
        {
          title: "Pinia avec Nuxt",
          description: "Gestion d'état avec Pinia",
          code: "// stores/user.ts\nexport const useUserStore = defineStore('user', () => {\n  const user = ref(null);\n  const setUser = (newUser) => {\n    user.value = newUser;\n  };\n  return { user, setUser };\n});",
          examples: [
            "// stores/user.ts",
            "export const useUserStore = defineStore('user', () => { ... });",
            "const userStore = useUserStore();",
            "userStore.setUser(newUser);",
          ],
        },
        {
          title: "Composables personnalisés",
          description: "Créer des composables réutilisables",
          code: "// composables/useAuth.ts\nexport const useAuth = () => {\n  const user = ref(null);\n  const login = async (credentials) => {\n    // Logique de connexion\n  };\n  return { user, login };\n};",
          examples: [
            "// composables/useAuth.ts",
            "export const useAuth = () => { ... };",
            "const { user, login } = useAuth();",
            "// Auto-importé dans tous les composants",
          ],
        },
      ],
    },
    {
      title: "SEO et Meta",
      items: [
        {
          title: "Meta tags",
          description: "Gérer les meta tags et SEO",
          code: "useHead({\n  title: 'Mon Site',\n  meta: [\n    { name: 'description', content: 'Description du site' },\n    { property: 'og:title', content: 'Mon Site' }\n  ]\n});",
          examples: [
            "useHead({ title: 'Mon Site' });",
            "useSeoMeta({ title: 'Mon Site', description: 'Description' });",
            "useServerSeoMeta({ title: 'Mon Site' });  # Côté serveur seulement",
          ],
        },
        {
          title: "Sitemap et robots",
          description: "Générer sitemap et robots.txt",
          code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  modules: ['@nuxtjs/sitemap'],\n  sitemap: {\n    hostname: 'https://example.com'\n  }\n});",
          examples: [
            "modules: ['@nuxtjs/sitemap'],",
            "sitemap: { hostname: 'https://example.com' },",
            "robots: { UserAgent: '*', Allow: '/' }",
          ],
        },
      ],
    },
    {
      title: "Déploiement",
      items: [
        {
          title: "Vercel",
          description: "Déployer sur Vercel",
          code: "npm install -g vercel\nvercel",
          examples: [
            "npm install -g vercel",
            "vercel  # Premier déploiement",
            "vercel --prod  # Déploiement en production",
          ],
        },
        {
          title: "Netlify",
          description: "Déployer sur Netlify",
          code: '# netlify.toml\n[build]\n  command = "npm run generate"\n  publish = "dist"',
          examples: [
            "# netlify.toml",
            '[build]\n  command = "npm run generate"\n  publish = "dist"',
            '[build.environment]\n  NODE_VERSION = "18"',
          ],
        },
        {
          title: "Docker",
          description: "Déployer avec Docker",
          code: '# Dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD ["npm", "run", "start"]',
          examples: [
            "FROM node:18-alpine",
            "RUN npm run build",
            "EXPOSE 3000",
            'CMD ["npm", "run", "start"]',
          ],
        },
      ],
    },
  ],
};
