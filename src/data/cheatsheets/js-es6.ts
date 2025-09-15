/**
 * Cheatsheet JavaScript ES6 - Fonctionnalités modernes de JavaScript
 * Syntaxe et concepts essentiels d'ES6 et versions ultérieures
 */

import { CheatSheet } from "../../types/cheatsheets";

export const jsEs6CheatSheet: CheatSheet = {
  name: "JavaScript ES6+",
  description: "Fonctionnalités modernes de JavaScript (ES6 et versions ultérieures)",
  icon: "Code",
  tags: ["javascript", "es6", "es2015", "modern-js", "programming", "frontend", "backend"],
  sections: [
    {
      title: "Variables et déclarations",
      items: [
        {
          title: "let et const",
          description: "Nouvelles déclarations de variables avec portée de bloc",
          code: "let variable = 'modifiable';\nconst constante = 'immutable';\n\nif (true) {\n  let bloc = 'portée de bloc';\n  const blocConst = 'portée de bloc';\n}",
          examples: [
            "let count = 0;",
            "const PI = 3.14159;",
            "const user = { name: 'John' }; // L'objet peut être modifié",
            "user.name = 'Jane'; // OK",
            "// user = {}; // Erreur - réassignation interdite"
          ],
        },
        {
          title: "Template literals",
          description: "Chaînes de caractères avec interpolation",
          code: "const name = 'John';\nconst age = 30;\nconst message = `Bonjour ${name}, vous avez ${age} ans`;",
          examples: [
            "const name = 'John';",
            "const message = `Bonjour ${name}`;",
            "const multiLine = `Ligne 1\nLigne 2\nLigne 3`;",
            "const expression = `Résultat: ${2 + 3}`;"
          ],
        },
      ],
    },
    {
      title: "Fonctions",
      items: [
        {
          title: "Arrow functions",
          description: "Syntaxe concise pour les fonctions",
          code: "// Fonction traditionnelle\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\nconst square = x => x * x;",
          examples: [
            "const add = (a, b) => a + b;",
            "const square = x => x * x;",
            "const greet = name => `Bonjour ${name}`;",
            "const noParams = () => 'Hello World';",
            "const multiLine = (x, y) => {\n  const result = x + y;\n  return result * 2;\n};"
          ],
        },
        {
          title: "Paramètres par défaut",
          description: "Valeurs par défaut pour les paramètres de fonction",
          code: "function greet(name = 'Utilisateur', greeting = 'Bonjour') {\n  return `${greeting} ${name}`;\n}",
          examples: [
            "function greet(name = 'Utilisateur') { ... }",
            "const add = (a = 0, b = 0) => a + b;",
            "function createUser(name, age = 18, active = true) { ... }",
            "greet(); // 'Bonjour Utilisateur'",
            "greet('John'); // 'Bonjour John'"
          ],
        },
        {
          title: "Rest parameters",
          description: "Capturer un nombre variable d'arguments",
          code: "function sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}",
          examples: [
            "function sum(...numbers) { ... }",
            "sum(1, 2, 3, 4); // 10",
            "function log(level, ...messages) { ... }",
            "log('info', 'Message 1', 'Message 2');"
          ],
        },
        {
          title: "Spread operator",
          description: "Étaler les éléments d'un tableau ou objet",
          code: "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];\n\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\nconst merged = { ...obj1, ...obj2 };",
          examples: [
            "const combined = [...arr1, ...arr2];",
            "const merged = { ...obj1, ...obj2 };",
            "Math.max(...numbers);",
            "const newArray = [...oldArray, newItem];",
            "const newObject = { ...oldObject, newProperty: value };"
          ],
        },
      ],
    },
    {
      title: "Destructuring",
      items: [
        {
          title: "Destructuring de tableaux",
          description: "Extraire des valeurs d'un tableau",
          code: "const colors = ['rouge', 'vert', 'bleu'];\nconst [first, second, third] = colors;\nconst [primary, ...others] = colors;",
          examples: [
            "const [first, second] = colors;",
            "const [primary, ...others] = colors;",
            "const [a, , c] = [1, 2, 3]; // Ignorer le deuxième élément",
            "const [x = 0, y = 0] = [1]; // Valeurs par défaut"
          ],
        },
        {
          title: "Destructuring d'objets",
          description: "Extraire des propriétés d'un objet",
          code: "const user = { name: 'John', age: 30, city: 'Paris' };\nconst { name, age } = user;\nconst { name: userName, age: userAge } = user;",
          examples: [
            "const { name, age } = user;",
            "const { name: userName, age: userAge } = user;",
            "const { name, ...rest } = user;",
            "const { name = 'Anonyme', age = 0 } = user;",
            "function greet({ name, age }) { ... }"
          ],
        },
      ],
    },
    {
      title: "Classes",
      items: [
        {
          title: "Déclaration de classe",
          description: "Syntaxe orientée objet moderne",
          code: "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  greet() {\n    return `Bonjour, je suis ${this.name}`;\n  }\n}",
          examples: [
            "class Person {\n  constructor(name, age) { ... }\n  greet() { ... }\n}",
            "const person = new Person('John', 30);",
            "person.greet(); // 'Bonjour, je suis John'"
          ],
        },
        {
          title: "Héritage",
          description: "Étendre une classe avec extends",
          code: "class Student extends Person {\n  constructor(name, age, grade) {\n    super(name, age);\n    this.grade = grade;\n  }\n  \n  study() {\n    return `${this.name} étudie`;\n  }\n}",
          examples: [
            "class Student extends Person {\n  constructor(name, age, grade) {\n    super(name, age);\n    this.grade = grade;\n  }\n}",
            "const student = new Student('Jane', 20, 'A');",
            "student.greet(); // Hérité de Person",
            "student.study(); // Méthode propre"
          ],
        },
        {
          title: "Méthodes statiques",
          description: "Méthodes liées à la classe, pas à l'instance",
          code: "class MathUtils {\n  static add(a, b) {\n    return a + b;\n  }\n  \n  static multiply(a, b) {\n    return a * b;\n  }\n}",
          examples: [
            "class MathUtils {\n  static add(a, b) { return a + b; }\n}",
            "MathUtils.add(2, 3); // 5",
            "// Pas besoin d'instancier la classe"
          ],
        },
      ],
    },
    {
      title: "Modules",
      items: [
        {
          title: "Export et import",
          description: "Système de modules ES6",
          code: "// math.js\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;\nexport default class Calculator { ... }\n\n// main.js\nimport Calculator, { add, subtract } from './math.js';",
          examples: [
            "export const add = (a, b) => a + b;",
            "export default class Calculator { ... }",
            "import Calculator, { add, subtract } from './math.js';",
            "import * as math from './math.js';",
            "import { add as addition } from './math.js';"
          ],
        },
        {
          title: "Import dynamique",
          description: "Charger des modules de manière asynchrone",
          code: "async function loadModule() {\n  const module = await import('./math.js');\n  return module.add(2, 3);\n}",
          examples: [
            "const module = await import('./math.js');",
            "import('./math.js').then(module => { ... });",
            "const { add } = await import('./math.js');"
          ],
        },
      ],
    },
    {
      title: "Promises et async/await",
      items: [
        {
          title: "Promises",
          description: "Gérer les opérations asynchrones",
          code: "const fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('Données récupérées');\n    }, 1000);\n  });\n};\n\nfetchData()\n  .then(data => console.log(data))\n  .catch(error => console.error(error));",
          examples: [
            "const promise = new Promise((resolve, reject) => { ... });",
            "promise.then(result => { ... }).catch(error => { ... });",
            "Promise.all([promise1, promise2]).then(results => { ... });",
            "Promise.race([promise1, promise2]).then(result => { ... });"
          ],
        },
        {
          title: "async/await",
          description: "Syntaxe synchrone pour les opérations asynchrones",
          code: "async function fetchUserData() {\n  try {\n    const response = await fetch('/api/user');\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error('Erreur:', error);\n  }\n}",
          examples: [
            "async function fetchData() {\n  const data = await apiCall();\n  return data;\n}",
            "try {\n  const result = await asyncOperation();\n} catch (error) {\n  console.error(error);\n}",
            "const results = await Promise.all([api1(), api2()]);"
          ],
        },
      ],
    },
    {
      title: "Méthodes de tableau",
      items: [
        {
          title: "map, filter, reduce",
          description: "Méthodes fonctionnelles pour manipuler les tableaux",
          code: "const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);",
          examples: [
            "const doubled = numbers.map(n => n * 2);",
            "const evens = numbers.filter(n => n % 2 === 0);",
            "const sum = numbers.reduce((acc, n) => acc + n, 0);",
            "const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];",
            "const names = users.map(user => user.name);",
            "const adults = users.filter(user => user.age >= 18);"
          ],
        },
        {
          title: "find, some, every",
          description: "Méthodes de recherche et de test",
          code: "const users = [\n  { id: 1, name: 'John', active: true },\n  { id: 2, name: 'Jane', active: false }\n];\n\nconst user = users.find(u => u.id === 1);\nconst hasActive = users.some(u => u.active);\nconst allActive = users.every(u => u.active);",
          examples: [
            "const user = users.find(u => u.id === 1);",
            "const hasActive = users.some(u => u.active);",
            "const allActive = users.every(u => u.active);",
            "const index = users.findIndex(u => u.name === 'John');"
          ],
        },
      ],
    },
    {
      title: "Objets et propriétés",
      items: [
        {
          title: "Shorthand properties",
          description: "Syntaxe raccourcie pour les propriétés d'objet",
          code: "const name = 'John';\nconst age = 30;\nconst user = { name, age };\n\n// Équivalent à:\nconst user = { name: name, age: age };",
          examples: [
            "const user = { name, age };",
            "const config = { apiUrl, timeout, retries };",
            "const { name, age } = user; // Destructuring",
            "const newUser = { ...user, id: 1 }; // Spread"
          ],
        },
        {
          title: "Computed property names",
          description: "Noms de propriétés calculés dynamiquement",
          code: "const prop = 'name';\nconst user = {\n  [prop]: 'John',\n  [`${prop}Length`]: 'John'.length\n};",
          examples: [
            "const user = { [prop]: 'John' };",
            "const config = { [`api_${env}`]: url };",
            "const handlers = {\n  [`handle${event}`]: callback\n};"
          ],
        },
        {
          title: "Object.assign et spread",
          description: "Copier et fusionner des objets",
          code: "const obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n\n// Object.assign\nconst merged1 = Object.assign({}, obj1, obj2);\n\n// Spread operator\nconst merged2 = { ...obj1, ...obj2 };",
          examples: [
            "const merged = { ...obj1, ...obj2 };",
            "const updated = { ...user, name: 'New Name' };",
            "const cloned = { ...original };",
            "const withDefaults = { ...defaults, ...userInput };"
          ],
        },
      ],
    },
    {
      title: "Symbols et Iterators",
      items: [
        {
          title: "Symbols",
          description: "Type primitif unique pour les clés d'objet",
          code: "const sym1 = Symbol('description');\nconst sym2 = Symbol('description');\n\nconst obj = {\n  [sym1]: 'valeur1',\n  [sym2]: 'valeur2'\n};",
          examples: [
            "const sym = Symbol('unique');",
            "const obj = { [sym]: 'value' };",
            "Symbol.for('key') === Symbol.for('key'); // true",
            "const iterator = Symbol.iterator;"
          ],
        },
        {
          title: "Iterators et for...of",
          description: "Parcourir les collections de manière uniforme",
          code: "const iterable = [1, 2, 3];\n\nfor (const value of iterable) {\n  console.log(value);\n}\n\n// Avec Map et Set\nconst map = new Map([['a', 1], ['b', 2]]);\nfor (const [key, value] of map) {\n  console.log(key, value);\n}",
          examples: [
            "for (const value of array) { ... }",
            "for (const [key, value] of map) { ... }",
            "for (const value of set) { ... }",
            "const iterator = array[Symbol.iterator]();"
          ],
        },
      ],
    },
    {
      title: "Map et Set",
      items: [
        {
          title: "Map",
          description: "Collection de paires clé-valeur",
          code: "const map = new Map();\nmap.set('name', 'John');\nmap.set('age', 30);\n\nconsole.log(map.get('name')); // 'John'\nconsole.log(map.has('age')); // true\nconsole.log(map.size); // 2",
          examples: [
            "const map = new Map();",
            "map.set('key', 'value');",
            "map.get('key'); // 'value'",
            "map.has('key'); // true",
            "map.delete('key');",
            "map.clear();",
            "for (const [key, value] of map) { ... }"
          ],
        },
        {
          title: "Set",
          description: "Collection de valeurs uniques",
          code: "const set = new Set();\nset.add(1);\nset.add(2);\nset.add(1); // Ignoré car déjà présent\n\nconsole.log(set.size); // 2\nconsole.log(set.has(1)); // true",
          examples: [
            "const set = new Set();",
            "set.add('value');",
            "set.has('value'); // true",
            "set.delete('value');",
            "set.clear();",
            "const uniqueArray = [...new Set(array)];",
            "for (const value of set) { ... }"
          ],
        },
      ],
    },
    {
      title: "Proxy et Reflect",
      items: [
        {
          title: "Proxy",
          description: "Intercepter et personnaliser les opérations sur les objets",
          code: "const target = { name: 'John' };\nconst proxy = new Proxy(target, {\n  get(target, prop) {\n    console.log(`Accès à ${prop}`);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    console.log(`Définition de ${prop} = ${value}`);\n    target[prop] = value;\n    return true;\n  }\n});",
          examples: [
            "const proxy = new Proxy(target, {\n  get(target, prop) { ... },\n  set(target, prop, value) { ... }\n});",
            "proxy.name; // Déclenche le handler get",
            "proxy.age = 30; // Déclenche le handler set"
          ],
        },
        {
          title: "Reflect",
          description: "Méthodes pour les opérations métaprogrammation",
          code: "const obj = { name: 'John' };\n\n// Au lieu de obj.prop\nReflect.get(obj, 'name');\n\n// Au lieu de obj.prop = value\nReflect.set(obj, 'age', 30);\n\n// Au lieu de 'prop' in obj\nReflect.has(obj, 'name');",
          examples: [
            "Reflect.get(obj, 'prop');",
            "Reflect.set(obj, 'prop', value);",
            "Reflect.has(obj, 'prop');",
            "Reflect.deleteProperty(obj, 'prop');",
            "Reflect.ownKeys(obj);"
          ],
        },
      ],
    },
  ],
};
