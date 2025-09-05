# 🤝 Guide de Contribution

Merci de votre intérêt à contribuer à DevTools Hub ! Ce guide vous aidera à comprendre comment contribuer efficacement au projet.

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Processus de développement](#processus-de-développement)
- [Standards de code](#standards-de-code)
- [Tests](#tests)
- [Documentation](#documentation)
- [Questions fréquentes](#questions-fréquentes)

## 📜 Code de conduite

### Comportements attendus

- Utiliser un langage accueillant et inclusif
- Respecter les points de vue et expériences différents
- Accepter gracieusement les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres de la communauté

## 🚀 Comment contribuer

### Types de contributions

- 🐛 **Correction de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📚 **Amélioration de la documentation**
- 🎨 **Amélioration de l'interface utilisateur**
- ⚡ **Optimisations de performance**
- 🧪 **Tests**

### Processus de contribution

1. **Fork** le repository
2. **Clone** votre fork localement
3. **Créez** une branche pour votre fonctionnalité
4. **Commitez** vos changements
5. **Pushez** vers votre fork
6. **Ouvrez** une Pull Request

## 🛠️ Processus de développement

### Configuration de l'environnement

```bash
# 1. Fork et clone du repository
git clone https://github.com/winvdaking/devtools.git
cd devtools

# 2. Installation des dépendances
npm install

# 3. Lancement en mode développement
npm run dev
```

### Structure des branches

- `main` - Branche principale (production)
- `develop` - Branche de développement
- `feature/nom-fonctionnalite` - Nouvelles fonctionnalités
- `fix/nom-bug` - Corrections de bugs
- `docs/nom-documentation` - Améliorations de documentation

### Convention de nommage des branches

```bash
feature/ajout-nouvel-outil
fix/correction-json-formatter
docs/amelioration-readme
refactor/optimisation-sidebar
```

## 📝 Standards de code

### TypeScript

- Utiliser TypeScript strict
- Définir des types explicites
- Éviter `any` autant que possible
- Documenter les interfaces complexes

```typescript
/**
 * Interface pour les outils de formatage
 */
interface FormatterTool {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
}
```

### React

- Utiliser des composants fonctionnels avec hooks
- Implémenter la prop `key` pour les listes
- Gérer les états de chargement et d'erreur
- Utiliser des composants réutilisables

```typescript
/**
 * Composant d'outil de formatage JSON
 */
export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Logique du composant...
};
```

### CSS/Styling

- Utiliser Tailwind CSS
- Respecter la cohérence des classes
- Utiliser les variables CSS pour les thèmes
- Optimiser pour mobile-first

```tsx
<div className="flex flex-col space-y-4 p-6 bg-background border rounded-lg">
  <h2 className="text-xl font-semibold text-foreground">Titre de l'outil</h2>
</div>
```

### Structure des fichiers

```
src/components/tools/
├── nom-outil/
│   ├── index.tsx          # Composant principal
│   ├── types.ts           # Types spécifiques
│   ├── utils.ts           # Utilitaires
│   └── __tests__/         # Tests
│       └── index.test.tsx
```

## 🧪 Tests

### Types de tests

- **Tests unitaires** - Fonctions et composants individuels
- **Tests d'intégration** - Interactions entre composants
- **Tests E2E** - Flux utilisateur complets

### Écrire des tests

```typescript
/**
 * Tests pour le composant JsonFormatter
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { JsonFormatter } from "./json-formatter";

describe("JsonFormatter", () => {
  it("devrait formater un JSON valide", () => {
    render(<JsonFormatter />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: '{"test": "value"}' } });

    expect(screen.getByText(/formatted/i)).toBeInTheDocument();
  });
});
```

### Lancer les tests

```bash
npm test              # Tests unitaires
npm run test:watch    # Mode watch
npm run test:coverage # Avec couverture
```

## 📚 Documentation

### Documentation du code

- **Docstrings** pour toutes les fonctions publiques
- **Commentaires** pour la logique complexe
- **Types** explicites et documentés
- **Exemples** d'utilisation

````typescript
/**
 * Formate une chaîne JSON avec indentation
 * @param jsonString - Chaîne JSON à formater
 * @param indent - Nombre d'espaces pour l'indentation (défaut: 2)
 * @returns Chaîne JSON formatée ou null si invalide
 * @throws {Error} Si la chaîne JSON est invalide
 *
 * @example
 * ```typescript
 * const formatted = formatJson('{"name":"John","age":30}');
 * console.log(formatted);
 * // {
 * //   "name": "John",
 * //   "age": 30
 * // }
 * ```
 */
export function formatJson(
  jsonString: string,
  indent: number = 2
): string | null {
  // Implémentation...
}
````

### Documentation des composants

- **Props** documentées avec JSDoc
- **Exemples** d'utilisation
- **Accessibilité** documentée
- **Responsive** behavior

## 🔍 Processus de review

### Avant de soumettre une PR

- [ ] Code testé localement
- [ ] Tests passent
- [ ] Linting sans erreurs
- [ ] Documentation mise à jour
- [ ] Commit messages clairs

### Checklist pour les reviewers

- [ ] Code respecte les standards
- [ ] Fonctionnalité testée
- [ ] Performance acceptable
- [ ] Accessibilité respectée
- [ ] Documentation complète

## 🐛 Signaler un bug

### Template d'issue

```markdown
## 🐛 Description du bug

Description claire et concise du problème.

## 🔄 Étapes pour reproduire

1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## ✅ Comportement attendu

Description de ce qui devrait se passer.

## 📱 Environnement

- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome 91]
- Version: [ex: 0.1.0]

## 📎 Captures d'écran

Si applicable, ajoutez des captures d'écran.

## 📝 Informations supplémentaires

Toute autre information pertinente.
```

## ✨ Proposer une fonctionnalité

### Template de feature request

```markdown
## 🚀 Fonctionnalité demandée

Description claire de la fonctionnalité souhaitée.

## 💡 Motivation

Pourquoi cette fonctionnalité serait-elle utile ?

## 📋 Description détaillée

Description complète de la fonctionnalité.

## 🎯 Cas d'usage

Exemples concrets d'utilisation.

## 🔄 Alternatives considérées

Autres solutions envisagées.

## 📎 Informations supplémentaires

Mockups, liens, références, etc.
```

## ❓ Questions fréquentes

### Comment ajouter un nouvel outil ?

1. Créer le composant dans `src/components/tools/`
2. Ajouter l'export dans `src/components/tools/index.ts`
3. Définir le type dans `src/types/tools.ts`
4. Ajouter le mapping dans `src/app/page.tsx`
5. Mettre à jour la sidebar

### Comment tester les changements ?

```bash
npm run dev          # Mode développement
npm run build        # Test de build
npm run lint         # Vérification du code
npm test             # Tests unitaires
```

### Comment contribuer à la documentation ?

- Améliorer les commentaires de code
- Ajouter des exemples d'utilisation
- Corriger les fautes de frappe
- Traduire en d'autres langues

## 📞 Contact

- 💬 **Discussions** : [GitHub Discussions](https://github.com/winvdaking/devtools/discussions)
- 📧 **Email** : hello@dorianlopez.fr

## 🙏 Remerciements

Merci à tous les contributeurs qui rendent ce projet possible !

---

[@Dorian](https://github.com/winvdaking)
