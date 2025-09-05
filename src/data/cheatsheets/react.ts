/**
 * Cheatsheet React - Bibliothèque JavaScript pour l'interface utilisateur
 * Concepts essentiels, hooks et patterns React
 */

import { CheatSheet } from "../../types/cheatsheets";

export const reactCheatSheet: CheatSheet = {
  name: "React",
  description:
    "Bibliothèque JavaScript pour construire des interfaces utilisateur",
  icon: "Code",
  tags: ["javascript", "react", "frontend", "hooks", "components"],
  sections: [
    {
      title: "Création de projet",
      items: [
        {
          title: "Create React App",
          description: "Créer une application React avec CRA",
          code: "npx create-react-app <nom-projet>",
          examples: [
            "npx create-react-app mon-app",
            "npx create-react-app mon-app --template typescript",
            "npx create-react-app mon-app --template redux",
          ],
        },
        {
          title: "Vite",
          description: "Alternative rapide à Create React App",
          code: "npm create vite@latest <nom-projet> -- --template react",
          examples: [
            "npm create vite@latest mon-app -- --template react",
            "npm create vite@latest mon-app -- --template react-ts",
            "npm create vite@latest mon-app -- --template react-swc",
          ],
        },
        {
          title: "Next.js",
          description: "Framework React avec SSR",
          code: "npx create-next-app@latest <nom-projet>",
          examples: [
            "npx create-next-app@latest mon-app",
            "npx create-next-app@latest mon-app --typescript",
            "npx create-next-app@latest mon-app --tailwind --eslint",
          ],
        },
      ],
    },
    {
      title: "Composants fonctionnels",
      items: [
        {
          title: "Composant de base",
          description: "Structure d'un composant fonctionnel",
          code: "import React from 'react';\n\nconst MonComposant = () => {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n};\n\nexport default MonComposant;",
          examples: [
            "import React from 'react';",
            "const MonComposant = () => { ... };",
            "export default MonComposant;",
          ],
        },
        {
          title: "Composant avec props",
          description: "Composant recevant des propriétés",
          code: "interface Props {\n  title: string;\n  children?: React.ReactNode;\n}\n\nconst MonComposant: React.FC<Props> = ({ title, children }) => {\n  return (\n    <div>\n      <h1>{title}</h1>\n      {children}\n    </div>\n  );\n};",
          examples: [
            "interface Props { title: string; }",
            "const MonComposant: React.FC<Props> = ({ title }) => { ... };",
            '<MonComposant title="Mon titre" />',
          ],
        },
      ],
    },
    {
      title: "Hooks essentiels",
      items: [
        {
          title: "useState",
          description: "Gérer l'état local d'un composant",
          code: "import { useState } from 'react';\n\nconst [count, setCount] = useState(0);",
          examples: [
            "const [count, setCount] = useState(0);",
            "const [name, setName] = useState('');",
            "const [user, setUser] = useState({ name: '', email: '' });",
            "setCount(prev => prev + 1);  // Mise à jour fonctionnelle",
          ],
        },
        {
          title: "useEffect",
          description: "Gérer les effets de bord et le cycle de vie",
          code: "import { useEffect } from 'react';\n\nuseEffect(() => {\n  // Effet\n}, [dependencies]);",
          examples: [
            "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
            "useEffect(() => {\n  fetchData();\n}, []);  // Montage seulement",
            "useEffect(() => {\n  return () => {\n    // Nettoyage\n  };\n}, []);",
          ],
        },
        {
          title: "useContext",
          description: "Partager des données entre composants",
          code: "import { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext();\nconst theme = useContext(ThemeContext);",
          examples: [
            "const ThemeContext = createContext();",
            "const theme = useContext(ThemeContext);",
            "<ThemeContext.Provider value={theme}>\n  <App />\n</ThemeContext.Provider>",
          ],
        },
      ],
    },
    {
      title: "Hooks avancés",
      items: [
        {
          title: "useReducer",
          description: "Gérer un état complexe avec un reducer",
          code: "import { useReducer } from 'react';\n\nconst [state, dispatch] = useReducer(reducer, initialState);",
          examples: [
            "const [state, dispatch] = useReducer(reducer, initialState);",
            "dispatch({ type: 'INCREMENT' });",
            "dispatch({ type: 'SET_NAME', payload: 'John' });",
          ],
        },
        {
          title: "useMemo",
          description: "Mémoriser des calculs coûteux",
          code: "import { useMemo } from 'react';\n\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);",
          examples: [
            "const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);",
            "const filteredItems = useMemo(() => \n  items.filter(item => item.active), [items]\n);",
          ],
        },
        {
          title: "useCallback",
          description: "Mémoriser des fonctions",
          code: "import { useCallback } from 'react';\n\nconst memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);",
          examples: [
            "const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);",
            "const handleClick = useCallback((id) => {\n  onItemClick(id);\n}, [onItemClick]);",
          ],
        },
      ],
    },
    {
      title: "Gestion d'état",
      items: [
        {
          title: "Context API",
          description: "Partager l'état global avec Context",
          code: "const ThemeContext = createContext();\n\nconst ThemeProvider = ({ children }) => {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n};",
          examples: [
            "const ThemeContext = createContext();",
            "const ThemeProvider = ({ children }) => { ... };",
            "const useTheme = () => useContext(ThemeContext);",
          ],
        },
        {
          title: "Redux Toolkit",
          description: "Gestion d'état prévisible avec Redux",
          code: "import { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; }\n  }\n});",
          examples: [
            "const counterSlice = createSlice({ ... });",
            "const store = configureStore({ reducer: { counter: counterSlice.reducer } });",
            "const { increment } = counterSlice.actions;",
          ],
        },
      ],
    },
    {
      title: "Routing",
      items: [
        {
          title: "React Router",
          description: "Navigation et routing dans React",
          code: 'import { BrowserRouter, Routes, Route } from \'react-router-dom\';\n\n<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>',
          examples: [
            '<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n  </Routes>\n</BrowserRouter>',
            "const navigate = useNavigate();\n  navigate('/about');",
            "const { id } = useParams();",
          ],
        },
        {
          title: "Navigation hooks",
          description: "Hooks pour la navigation",
          code: "import { useNavigate, useParams, useLocation } from 'react-router-dom';\n\nconst navigate = useNavigate();\nconst { id } = useParams();\nconst location = useLocation();",
          examples: [
            "const navigate = useNavigate();",
            "const { id } = useParams();",
            "const location = useLocation();",
            "navigate('/users', { replace: true });",
          ],
        },
      ],
    },
    {
      title: "Formulaires",
      items: [
        {
          title: "Formulaires contrôlés",
          description: "Gérer les formulaires avec React",
          code: "const [formData, setFormData] = useState({ name: '', email: '' });\n\nconst handleChange = (e) => {\n  setFormData({\n    ...formData,\n    [e.target.name]: e.target.value\n  });\n};",
          examples: [
            "const [formData, setFormData] = useState({ name: '', email: '' });",
            "const handleChange = (e) => {\n  setFormData({ ...formData, [e.target.name]: e.target.value });\n};",
            '<input name="name" value={formData.name} onChange={handleChange} />',
          ],
        },
        {
          title: "React Hook Form",
          description: "Bibliothèque pour la gestion des formulaires",
          code: "import { useForm } from 'react-hook-form';\n\nconst { register, handleSubmit, formState: { errors } } = useForm();",
          examples: [
            "const { register, handleSubmit, formState: { errors } } = useForm();",
            "<input {...register('name', { required: true })} />",
            "{errors.name && <span>Ce champ est requis</span>}",
          ],
        },
      ],
    },
    {
      title: "Requêtes HTTP",
      items: [
        {
          title: "Fetch API",
          description: "Effectuer des requêtes HTTP avec fetch",
          code: "useEffect(() => {\n  fetch('/api/users')\n    .then(response => response.json())\n    .then(data => setUsers(data));\n}, []);",
          examples: [
            "fetch('/api/users')\n  .then(response => response.json())\n  .then(data => setUsers(data));",
            "fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(userData)\n});",
          ],
        },
        {
          title: "Axios",
          description: "Client HTTP avec Axios",
          code: "import axios from 'axios';\n\nuseEffect(() => {\n  axios.get('/api/users')\n    .then(response => setUsers(response.data));\n}, []);",
          examples: [
            "axios.get('/api/users').then(response => setUsers(response.data));",
            "axios.post('/api/users', userData);",
            "axios.interceptors.request.use(config => { ... });",
          ],
        },
      ],
    },
    {
      title: "Tests",
      items: [
        {
          title: "Jest et React Testing Library",
          description: "Tester les composants React",
          code: "import { render, screen, fireEvent } from '@testing-library/react';\nimport MyComponent from './MyComponent';\n\ntest('renders component', () => {\n  render(<MyComponent />);\n  expect(screen.getByText('Hello World')).toBeInTheDocument();\n});",
          examples: [
            "import { render, screen, fireEvent } from '@testing-library/react';",
            "test('renders component', () => {\n  render(<MyComponent />);\n  expect(screen.getByText('Hello World')).toBeInTheDocument();\n});",
            "fireEvent.click(screen.getByRole('button'));",
          ],
        },
      ],
    },
    {
      title: "Optimisation",
      items: [
        {
          title: "React.memo",
          description: "Mémoriser les composants pour éviter les re-renders",
          code: "import { memo } from 'react';\n\nconst MyComponent = memo(({ name }) => {\n  return <div>{name}</div>;\n});",
          examples: [
            "const MyComponent = memo(({ name }) => <div>{name}</div>);",
            "const MyComponent = memo(({ user }) => <div>{user.name}</div>, \n  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id\n);",
          ],
        },
        {
          title: "Code splitting",
          description: "Diviser le code pour améliorer les performances",
          code: "import { lazy, Suspense } from 'react';\n\nconst LazyComponent = lazy(() => import('./LazyComponent'));\n\n<Suspense fallback={<div>Loading...</div>}>\n  <LazyComponent />\n</Suspense>",
          examples: [
            "const LazyComponent = lazy(() => import('./LazyComponent'));",
            "<Suspense fallback={<div>Loading...</div>}>\n  <LazyComponent />\n</Suspense>",
          ],
        },
      ],
    },
  ],
};
