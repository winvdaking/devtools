/**
 * Cheatsheet Vue.js - Framework JavaScript progressif
 * Concepts essentiels, directives et Composition API
 */

import { CheatSheet } from '../../types/cheatsheets';

export const vueCheatSheet: CheatSheet = {
  name: 'Vue.js',
  description: 'Framework JavaScript progressif pour construire des interfaces utilisateur',
  icon: 'Layers',
  tags: ['javascript', 'vue', 'frontend', 'composition-api', 'directives'],
  sections: [
    {
      title: 'Création de projet',
      items: [
        {
          title: 'Vue CLI',
          description: 'Créer un projet avec Vue CLI',
          code: 'npm install -g @vue/cli\nvue create <nom-projet>',
          examples: [
            'npm install -g @vue/cli',
            'vue create mon-app',
            'vue create mon-app --preset typescript',
            'vue create mon-app --preset default'
          ]
        },
        {
          title: 'Vite',
          description: 'Alternative moderne et rapide',
          code: 'npm create vue@latest <nom-projet>',
          examples: [
            'npm create vue@latest mon-app',
            'npm create vite@latest mon-app -- --template vue',
            'npm create vite@latest mon-app -- --template vue-ts'
          ]
        },
        {
          title: 'CDN',
          description: 'Utiliser Vue.js via CDN',
          code: '<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>',
          examples: [
            '<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>',
            '<script src="https://unpkg.com/vue@3/dist/vue.esm-browser.js" type="module"></script>'
          ]
        }
      ]
    },
    {
      title: 'Composants de base',
      items: [
        {
          title: 'Composant SFC (Single File Component)',
          description: 'Structure d\'un composant Vue',
          code: '<template>\n  <div>\n    <h1>{{ title }}</h1>\n    <button @click="increment">Count: {{ count }}</button>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from \'vue\';\n\nconst title = \'Hello Vue!\';\nconst count = ref(0);\n\nconst increment = () => {\n  count.value++;\n};\n</script>\n\n<style scoped>\nh1 {\n  color: #42b883;\n}\n</style>',
          examples: [
            '<template>...</template>',
            '<script setup>...</script>',
            '<style scoped>...</style>',
            'const count = ref(0);  // Réactivité'
          ]
        },
        {
          title: 'Options API',
          description: 'Syntaxe classique avec Options API',
          code: '<template>\n  <div>{{ message }}</div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: \'Hello Vue!\'\n    };\n  },\n  methods: {\n    updateMessage() {\n      this.message = \'Updated!\';\n    }\n  }\n};\n</script>',
          examples: [
            'data() { return { message: \'Hello Vue!\' }; }',
            'methods: { updateMessage() { ... } }',
            'computed: { reversedMessage() { ... } }',
            'mounted() { ... }'
          ]
        }
      ]
    },
    {
      title: 'Composition API',
      items: [
        {
          title: 'Réactivité avec ref et reactive',
          description: 'Gérer l\'état réactif avec Composition API',
          code: 'import { ref, reactive } from \'vue\';\n\n// Pour les valeurs primitives\nconst count = ref(0);\n\n// Pour les objets\nconst state = reactive({\n  name: \'Vue\',\n  version: \'3.0\'\n});',
          examples: [
            'const count = ref(0);  // Valeur primitive',
            'const state = reactive({ name: \'Vue\' });  // Objet',
            'count.value++;  // Accès avec .value pour ref',
            'state.name = \'Vue 3\';  // Accès direct pour reactive'
          ]
        },
        {
          title: 'Computed et watch',
          description: 'Propriétés calculées et observateurs',
          code: 'import { computed, watch } from \'vue\';\n\nconst doubleCount = computed(() => count.value * 2);\n\nwatch(count, (newValue, oldValue) => {\n  console.log(`Count changed from ${oldValue} to ${newValue}`);\n});',
          examples: [
            'const doubleCount = computed(() => count.value * 2);',
            'watch(count, (newValue, oldValue) => { ... });',
            'watchEffect(() => { console.log(count.value); });',
            'watch([count, name], ([newCount, newName]) => { ... });'
          ]
        }
      ]
    },
    {
      title: 'Directives Vue',
      items: [
        {
          title: 'Directives de base',
          description: 'Directives essentielles de Vue',
          code: '<!-- Interpolation -->\n<div>{{ message }}</div>\n\n<!-- v-bind (liaison d\'attribut) -->\n<img v-bind:src="imageSrc" :alt="imageAlt">\n\n<!-- v-on (événements) -->\n<button v-on:click="handleClick" @click="handleClick">Click me</button>\n\n<!-- v-model (liaison bidirectionnelle) -->\n<input v-model="inputValue">',
          examples: [
            '{{ message }}  # Interpolation',
            ':src="imageSrc"  # v-bind (liaison d\'attribut)',
            '@click="handleClick"  # v-on (événements)',
            'v-model="inputValue"  # Liaison bidirectionnelle'
          ]
        },
        {
          title: 'Directives conditionnelles',
          description: 'Rendu conditionnel avec v-if et v-show',
          code: '<!-- v-if (ajout/suppression du DOM) -->\n<div v-if="isVisible">Contenu conditionnel</div>\n<div v-else-if="isLoading">Chargement...</div>\n<div v-else>Contenu par défaut</div>\n\n<!-- v-show (affichage/masquage CSS) -->\n<div v-show="isVisible">Contenu avec v-show</div>',
          examples: [
            'v-if="isVisible"  # Ajout/suppression du DOM',
            'v-else-if="isLoading"  # Condition alternative',
            'v-else  # Condition par défaut',
            'v-show="isVisible"  # Affichage/masquage CSS'
          ]
        },
        {
          title: 'Directives de boucle',
          description: 'Rendu de listes avec v-for',
          code: '<!-- Boucle simple -->\n<li v-for="item in items" :key="item.id">\n  {{ item.name }}\n</li>\n\n<!-- Boucle avec index -->\n<li v-for="(item, index) in items" :key="item.id">\n  {{ index }}: {{ item.name }}\n</li>\n\n<!-- Boucle sur objet -->\n<li v-for="(value, key) in object" :key="key">\n  {{ key }}: {{ value }}\n</li>',
          examples: [
            'v-for="item in items" :key="item.id"',
            'v-for="(item, index) in items" :key="item.id"',
            'v-for="(value, key) in object" :key="key"',
            'v-for="n in 10" :key="n"  # Boucle numérique'
          ]
        }
      ]
    },
    {
      title: 'Gestion des événements',
      items: [
        {
          title: 'Événements de base',
          description: 'Gérer les événements utilisateur',
          code: '<!-- Méthode simple -->\n<button @click="handleClick">Click me</button>\n\n<!-- Méthode avec paramètres -->\n<button @click="handleClick(\'param\')">Click with param</button>\n\n<!-- Événement avec $event -->\n<input @input="handleInput($event)">\n\n<!-- Modificateurs d\'événements -->\n<form @submit.prevent="handleSubmit">\n  <input @keyup.enter="handleEnter">\n</form>',
          examples: [
            '@click="handleClick"  # Événement simple',
            '@click="handleClick(\'param\')"  # Avec paramètres',
            '@input="handleInput($event)"  # Avec objet événement',
            '@submit.prevent="handleSubmit"  # Modificateur .prevent'
          ]
        },
        {
          title: 'Modificateurs d\'événements',
          description: 'Modificateurs pour contrôler le comportement des événements',
          code: '<!-- Modificateurs de clé -->\n<input @keyup.enter="handleEnter">\n<input @keyup.ctrl.enter="handleCtrlEnter">\n\n<!-- Modificateurs de souris -->\n<div @click.right="handleRightClick">\n<div @click.middle="handleMiddleClick">\n\n<!-- Modificateurs de formulaire -->\n<form @submit.prevent="handleSubmit">\n<input @input.lazy="handleLazyInput">',
          examples: [
            '@keyup.enter  # Touche Entrée',
            '@keyup.ctrl.enter  # Ctrl + Entrée',
            '@click.right  # Clic droit',
            '@submit.prevent  # Empêcher le comportement par défaut',
            '@input.lazy  # Événement sur blur'
          ]
        }
      ]
    },
    {
      title: 'Formulaires',
      items: [
        {
          title: 'v-model avec différents inputs',
          description: 'Liaison bidirectionnelle avec les formulaires',
          code: '<!-- Input texte -->\n<input v-model="text" type="text">\n\n<!-- Textarea -->\n<textarea v-model="message"></textarea>\n\n<!-- Checkbox -->\n<input v-model="checked" type="checkbox">\n\n<!-- Radio -->\n<input v-model="selected" type="radio" value="option1">\n\n<!-- Select -->\n<select v-model="selectedOption">\n  <option value="option1">Option 1</option>\n  <option value="option2">Option 2</option>\n</select>',
          examples: [
            '<input v-model="text" type="text">',
            '<textarea v-model="message"></textarea>',
            '<input v-model="checked" type="checkbox">',
            '<input v-model="selected" type="radio" value="option1">',
            '<select v-model="selectedOption">...</select>'
          ]
        },
        {
          title: 'Modificateurs v-model',
          description: 'Modificateurs pour v-model',
          code: '<!-- .lazy (événement sur blur) -->\n<input v-model.lazy="text">\n\n<!-- .number (conversion en nombre) -->\n<input v-model.number="age" type="number">\n\n<!-- .trim (suppression des espaces) -->\n<input v-model.trim="text">',
          examples: [
            'v-model.lazy="text"  # Événement sur blur',
            'v-model.number="age"  # Conversion en nombre',
            'v-model.trim="text"  # Suppression des espaces'
          ]
        }
      ]
    },
    {
      title: 'Composants',
      items: [
        {
          title: 'Props',
          description: 'Passer des données aux composants enfants',
          code: '<!-- Composant parent -->\n<ChildComponent :title="pageTitle" :user="currentUser" />\n\n<!-- Composant enfant -->\n<script setup>\nconst props = defineProps({\n  title: String,\n  user: Object,\n  count: {\n    type: Number,\n    default: 0\n  }\n});\n</script>',
          examples: [
            ':title="pageTitle"  # Passer une prop',
            'const props = defineProps({ title: String });',
            'const props = defineProps({\n  count: { type: Number, default: 0 }\n});',
            'const props = defineProps<{ title: string }>();  # TypeScript'
          ]
        },
        {
          title: 'Événements personnalisés',
          description: 'Émettre des événements vers le composant parent',
          code: '<!-- Composant enfant -->\n<script setup>\nconst emit = defineEmits([\'update\', \'delete\']);\n\nconst handleClick = () => {\n  emit(\'update\', { id: 1, name: \'Updated\' });\n};\n</script>\n\n<!-- Composant parent -->\n<ChildComponent @update="handleUpdate" @delete="handleDelete" />',
          examples: [
            'const emit = defineEmits([\'update\', \'delete\']);',
            'emit(\'update\', data);',
            '@update="handleUpdate"  # Écouter l\'événement',
            'const emit = defineEmits<{ update: [data: any] }>();  # TypeScript'
          ]
        }
      ]
    },
    {
      title: 'Slots',
      items: [
        {
          title: 'Slots de base',
          description: 'Contenu projeté avec les slots',
          code: '<!-- Composant avec slot -->\n<template>\n  <div class="card">\n    <h3>{{ title }}</h3>\n    <slot></slot>\n  </div>\n</template>\n\n<!-- Utilisation -->\n<Card title="Mon titre">\n  <p>Contenu du slot</p>\n</Card>',
          examples: [
            '<slot></slot>  # Slot par défaut',
            '<Card>Contenu du slot</Card>',
            '<slot name="header"></slot>  # Slot nommé',
            '<template #header>Contenu header</template>'
          ]
        },
        {
          title: 'Slots nommés',
          description: 'Slots avec des noms spécifiques',
          code: '<!-- Composant avec slots nommés -->\n<template>\n  <div class="layout">\n    <header>\n      <slot name="header"></slot>\n    </header>\n    <main>\n      <slot></slot>\n    </main>\n    <footer>\n      <slot name="footer"></footer>\n    </footer>\n  </div>\n</template>\n\n<!-- Utilisation -->\n<Layout>\n  <template #header>\n    <h1>Mon Header</h1>\n  </template>\n  <p>Contenu principal</p>\n  <template #footer>\n    <p>Mon Footer</p>\n  </template>\n</Layout>',
          examples: [
            '<slot name="header"></slot>  # Slot nommé',
            '<template #header>Contenu</template>  # Syntaxe courte',
            '<template v-slot:header>Contenu</template>  # Syntaxe complète'
          ]
        }
      ]
    },
    {
      title: 'Routing avec Vue Router',
      items: [
        {
          title: 'Configuration Vue Router',
          description: 'Configurer le routing dans Vue',
          code: 'import { createRouter, createWebHistory } from \'vue-router\';\n\nconst routes = [\n  { path: \'/\', component: Home },\n  { path: \'/about\', component: About },\n  { path: \'/user/:id\', component: User }\n];\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes\n});',
          examples: [
            'import { createRouter, createWebHistory } from \'vue-router\';',
            '{ path: \'/\', component: Home }',
            '{ path: \'/user/:id\', component: User }',
            'history: createWebHistory()  # Mode HTML5'
          ]
        },
        {
          title: 'Navigation',
          description: 'Navigation programmatique et déclarative',
          code: '<!-- Navigation déclarative -->\n<router-link to="/">Home</router-link>\n<router-link to="/about">About</router-link>\n\n<!-- Navigation programmatique -->\n<script setup>\nimport { useRouter, useRoute } from \'vue-router\';\n\nconst router = useRouter();\nconst route = useRoute();\n\nconst goToAbout = () => {\n  router.push(\'/about\');\n};\n</script>',
          examples: [
            '<router-link to="/">Home</router-link>',
            'router.push(\'/about\');',
            'router.replace(\'/about\');  # Remplace l\'historique',
            'const { id } = route.params;  # Paramètres de route'
          ]
        }
      ]
    },
    {
      title: 'State Management avec Pinia',
      items: [
        {
          title: 'Store Pinia',
          description: 'Créer un store avec Pinia',
          code: '// stores/user.js\nimport { defineStore } from \'pinia\';\n\nexport const useUserStore = defineStore(\'user\', () => {\n  const user = ref(null);\n  const isLoggedIn = computed(() => !!user.value);\n  \n  const login = async (credentials) => {\n    // Logique de connexion\n    user.value = await api.login(credentials);\n  };\n  \n  return { user, isLoggedIn, login };\n});',
          examples: [
            'import { defineStore } from \'pinia\';',
            'export const useUserStore = defineStore(\'user\', () => { ... });',
            'const userStore = useUserStore();',
            'userStore.login(credentials);'
          ]
        }
      ]
    },
    {
      title: 'Tests',
      items: [
        {
          title: 'Tests avec Vitest',
          description: 'Tester les composants Vue',
          code: 'import { mount } from \'@vue/test-utils\';\nimport MyComponent from \'./MyComponent.vue\';\n\ndescribe(\'MyComponent\', () => {\n  test(\'renders correctly\', () => {\n    const wrapper = mount(MyComponent, {\n      props: { title: \'Test Title\' }\n    });\n    \n    expect(wrapper.text()).toContain(\'Test Title\');\n  });\n});',
          examples: [
            'import { mount } from \'@vue/test-utils\';',
            'const wrapper = mount(MyComponent, { props: { title: \'Test\' } });',
            'expect(wrapper.text()).toContain(\'Test Title\');',
            'await wrapper.find(\'button\').trigger(\'click\');'
          ]
        }
      ]
    }
  ]
};
