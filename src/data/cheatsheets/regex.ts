/**
 * Cheatsheet Regex - Expressions régulières
 * Patterns et syntaxe pour les expressions régulières
 */

import { CheatSheet } from "../../types/cheatsheets";

export const regexCheatSheet: CheatSheet = {
  name: "Regex",
  description:
    "Expressions régulières pour la recherche et validation de texte",
  icon: "BookOpen",
  tags: ["regex", "pattern", "validation", "search", "text"],
  sections: [
    {
      title: "Métacaractères de base",
      items: [
        {
          title: "Caractères spéciaux",
          description: "Symboles avec signification spéciale en regex",
          code: ".  # N'importe quel caractère (sauf \\n)\n^  # Début de ligne\n$  # Fin de ligne\n*  # 0 ou plus occurrences\n+  # 1 ou plus occurrences\n?  # 0 ou 1 occurrence\n|  # OU logique\n\\  # Échapper un caractère spécial",
          examples: [
            ".  # N'importe quel caractère",
            "^  # Début de ligne",
            "$  # Fin de ligne",
            "*  # 0 ou plus",
            "+  # 1 ou plus",
            "?  # 0 ou 1",
            "|  # OU logique",
            "\\  # Échapper",
          ],
        },
        {
          title: "Classes de caractères",
          description: "Groupes de caractères prédéfinis",
          code: "[abc]     # a, b ou c\n[^abc]    # Tout sauf a, b, c\n[a-z]     # Lettres minuscules\n[A-Z]     # Lettres majuscules\n[0-9]     # Chiffres\n[a-zA-Z]  # Lettres (maj et min)\n\\w       # Caractère de mot [a-zA-Z0-9_]\n\\d       # Chiffre [0-9]\n\\s       # Espace blanc\n\\W       # Non-caractère de mot\n\\D       # Non-chiffre\n\\S       # Non-espace",
          examples: [
            "[abc]  # a, b ou c",
            "[^abc]  # Tout sauf a, b, c",
            "[a-z]  # Lettres minuscules",
            "[0-9]  # Chiffres",
            "\\w  # Caractère de mot",
            "\\d  # Chiffre",
            "\\s  # Espace blanc",
          ],
        },
      ],
    },
    {
      title: "Quantificateurs",
      items: [
        {
          title: "Quantificateurs de base",
          description: "Contrôler le nombre d'occurrences",
          code: "a*        # 0 ou plus 'a'\na+        # 1 ou plus 'a'\na?        # 0 ou 1 'a'\na{3}      # Exactement 3 'a'\na{2,4}    # Entre 2 et 4 'a'\na{2,}     # Au moins 2 'a'\na{,3}     # Au maximum 3 'a'",
          examples: [
            "a*  # 0 ou plus",
            "a+  # 1 ou plus",
            "a?  # 0 ou 1",
            "a{3}  # Exactement 3",
            "a{2,4}  # Entre 2 et 4",
            "a{2,}  # Au moins 2",
            "a{,3}  # Au maximum 3",
          ],
        },
        {
          title: "Quantificateurs gourmands vs non-gourmands",
          description: "Contrôler le comportement de correspondance",
          code: "a*        # Gourmand (greedy) - correspond le plus possible\na*?       # Non-gourmand (lazy) - correspond le moins possible\na+        # Gourmand\na+?       # Non-gourmand\na{2,4}    # Gourmand\na{2,4}?   # Non-gourmand",
          examples: [
            "a*  # Gourmand",
            "a*?  # Non-gourmand",
            "a+  # Gourmand",
            "a+?  # Non-gourmand",
            "a{2,4}  # Gourmand",
            "a{2,4}?  # Non-gourmand",
          ],
        },
      ],
    },
    {
      title: "Groupes et références",
      items: [
        {
          title: "Groupes de capture",
          description: "Grouper des éléments et capturer des sous-chaînes",
          code: "(abc)     # Groupe de capture\n(?:abc)   # Groupe non-capturant\n(?<name>abc)  # Groupe nommé (lookbehind)\n\n# Références arrière\n\\1       # Référence au premier groupe\n\\2       # Référence au deuxième groupe\n\\k<name> # Référence à un groupe nommé",
          examples: [
            "(abc)  # Groupe de capture",
            "(?:abc)  # Groupe non-capturant",
            "(?<name>abc)  # Groupe nommé",
            "\\1  # Référence au premier groupe",
            "\\2  # Référence au deuxième groupe",
            "\\k<name>  # Référence à un groupe nommé",
          ],
        },
        {
          title: "Assertions de position",
          description: "Conditions sur la position dans le texte",
          code: "(?=abc)   # Lookahead positif - suivi de 'abc'\n(?!abc)   # Lookahead négatif - pas suivi de 'abc'\n(?<=abc)  # Lookbehind positif - précédé de 'abc'\n(?<!abc)  # Lookbehind négatif - pas précédé de 'abc'\n\\b       # Frontière de mot\n\\B       # Non-frontière de mot",
          examples: [
            "(?=abc)  # Lookahead positif",
            "(?!abc)  # Lookahead négatif",
            "(?<=abc)  # Lookbehind positif",
            "(?<!abc)  # Lookbehind négatif",
            "\\b  # Frontière de mot",
            "\\B  # Non-frontière de mot",
          ],
        },
      ],
    },
    {
      title: "Patterns courants",
      items: [
        {
          title: "Validation d'email",
          description: "Pattern pour valider une adresse email",
          code: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\n\n# Explication:\n# ^ - Début de chaîne\n# [a-zA-Z0-9._%+-]+ - Un ou plus caractères alphanumériques, points, underscores, %, +, -\n# @ - Caractère @ obligatoire\n# [a-zA-Z0-9.-]+ - Un ou plus caractères pour le domaine\n# \\. - Point littéral (échappé)\n# [a-zA-Z]{2,} - Au moins 2 lettres pour l'extension\n# $ - Fin de chaîne",
          examples: [
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "user@example.com  # Valide",
            "test.email+tag@domain.co.uk  # Valide",
            "invalid.email  # Invalide",
          ],
        },
        {
          title: "Validation d'URL",
          description: "Pattern pour valider une URL",
          code: "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$\n\n# Version simplifiée:\n^https?:\\/\\/[^\\s]+$",
          examples: [
            "^https?:\\/\\/[^\\s]+$  # Version simplifiée",
            "https://www.example.com  # Valide",
            "http://example.com/path  # Valide",
            "ftp://example.com  # Invalide (pas http/https)",
          ],
        },
        {
          title: "Numéros de téléphone",
          description: "Patterns pour différents formats de téléphone",
          code: "# Téléphone français\n^(?:0[1-9]|\\+33[1-9])(?:[0-9]{8})$\n\n# Téléphone international (format général)\n^\\+?[1-9]\\d{1,14}$\n\n# Format avec espaces et tirets\n^(\\+33|0)[1-9](?:[0-9]{8}|[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2})$",
          examples: [
            "^(?:0[1-9]|\\+33[1-9])(?:[0-9]{8})$  # Téléphone français",
            "^\\+?[1-9]\\d{1,14}$  # International",
            "0123456789  # Valide (français)",
            "+33123456789  # Valide (français international)",
          ],
        },
      ],
    },
    {
      title: "Patterns de validation",
      items: [
        {
          title: "Mots de passe",
          description: "Validation de mots de passe avec critères",
          code: "# Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre\n^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$\n\n# Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial\n^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\n\n# Explication:\n# (?=.*[a-z]) - Lookahead: au moins une minuscule\n# (?=.*[A-Z]) - Lookahead: au moins une majuscule\n# (?=.*\\d) - Lookahead: au moins un chiffre\n# (?=.*[@$!%*?&]) - Lookahead: au moins un caractère spécial",
          examples: [
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
            "Password123  # Valide",
            "password123  # Invalide (pas de majuscule)",
            "PASSWORD123  # Invalide (pas de minuscule)",
          ],
        },
        {
          title: "Codes postaux",
          description: "Validation de codes postaux par pays",
          code: "# Code postal français (5 chiffres)\n^[0-9]{5}$\n\n# Code postal américain (5 chiffres ou 5-4)\n^\\d{5}(-\\d{4})?$\n\n# Code postal canadien (A1A 1A1)\n^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$",
          examples: [
            "^[0-9]{5}$  # Code postal français",
            "^\\d{5}(-\\d{4})?$  # Code postal américain",
            "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$  # Code postal canadien",
            "75001  # Valide (français)",
            "12345-6789  # Valide (américain)",
            "K1A 0A6  # Valide (canadien)",
          ],
        },
      ],
    },
    {
      title: "Patterns de recherche",
      items: [
        {
          title: "Recherche de texte",
          description: "Patterns pour rechercher du texte spécifique",
          code: "# Trouver tous les mots de 3 lettres\n\\b[a-zA-Z]{3}\\b\n\n# Trouver les nombres entiers\n\\b\\d+\\b\n\n# Trouver les nombres décimaux\n\\b\\d+\\.\\d+\\b\n\n# Trouver les adresses IP (version simple)\n\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b\n\n# Trouver les hashtags\n#[a-zA-Z0-9_]+",
          examples: [
            "\\b[a-zA-Z]{3}\\b  # Mots de 3 lettres",
            "\\b\\d+\\b  # Nombres entiers",
            "\\b\\d+\\.\\d+\\b  # Nombres décimaux",
            "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b  # Adresses IP",
            "#[a-zA-Z0-9_]+  # Hashtags",
          ],
        },
        {
          title: "Extraction de données",
          description: "Patterns pour extraire des données structurées",
          code: "# Extraire les dates (format DD/MM/YYYY)\n\\b(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[0-2])/(\\d{4})\\b\n\n# Extraire les heures (format HH:MM)\n\\b([01]?[0-9]|2[0-3]):([0-5][0-9])\\b\n\n# Extraire les prix (€XX.XX)\n€(\\d+(?:\\.\\d{2})?)\n\n# Extraire les numéros de téléphone avec groupes\n(\\+33|0)([1-9])([0-9]{8})",
          examples: [
            "\\b(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[0-2])/(\\d{4})\\b  # Dates",
            "\\b([01]?[0-9]|2[0-3]):([0-5][0-9])\\b  # Heures",
            "€(\\d+(?:\\.\\d{2})?)  # Prix",
            "(\\+33|0)([1-9])([0-9]{8})  # Téléphones français",
          ],
        },
      ],
    },
    {
      title: "Modificateurs et options",
      items: [
        {
          title: "Modificateurs de correspondance",
          description: "Options pour modifier le comportement de la regex",
          code: "# Modificateurs courants\ni  # Insensible à la casse (case-insensitive)\ng  # Global (toutes les correspondances)\nm  # Multiligne (^ et $ correspondent aux débuts/fins de ligne)\ns  # Point correspond à tout (y compris \\n)\nx  # Mode étendu (ignore les espaces et commentaires)\n\n# Exemples d'utilisation:\n/pattern/i  # Insensible à la casse\n/pattern/g  # Toutes les correspondances\n/pattern/m  # Mode multiligne",
          examples: [
            "i  # Insensible à la casse",
            "g  # Global",
            "m  # Multiligne",
            "s  # Point correspond à tout",
            "x  # Mode étendu",
            "/pattern/i  # Insensible à la casse",
            "/pattern/g  # Toutes les correspondances",
          ],
        },
        {
          title: "Ancres et limites",
          description: "Contrôler où la correspondance doit se produire",
          code: "^pattern    # Début de ligne\npattern$    # Fin de ligne\n^pattern$   # Ligne entière\n\\bpattern  # Début de mot\npattern\\b   # Fin de mot\n\\Bpattern  # Pas au début de mot\npattern\\B   # Pas à la fin de mot",
          examples: [
            "^pattern  # Début de ligne",
            "pattern$  # Fin de ligne",
            "^pattern$  # Ligne entière",
            "\\bpattern  # Début de mot",
            "pattern\\b  # Fin de mot",
            "\\Bpattern  # Pas au début de mot",
          ],
        },
      ],
    },
    {
      title: "Exemples pratiques",
      items: [
        {
          title: "Nettoyage de texte",
          description: "Patterns pour nettoyer et formater du texte",
          code: "# Supprimer les espaces multiples\n\\s+  # Remplacer par un seul espace\n\n# Supprimer les caractères non-alphanumériques\n[^a-zA-Z0-9\\s]  # Garder lettres, chiffres et espaces\n\n# Extraire seulement les chiffres\n\\D  # Supprimer tout sauf les chiffres\n\n# Normaliser les espaces en début/fin de ligne\n^\\s+|\\s+$  # Supprimer espaces en début/fin\n\n# Supprimer les lignes vides\n^\\s*$  # Lignes contenant seulement des espaces",
          examples: [
            "\\s+  # Espaces multiples",
            "[^a-zA-Z0-9\\s]  # Caractères non-alphanumériques",
            "\\D  # Tout sauf chiffres",
            "^\\s+|\\s+$  # Espaces début/fin",
            "^\\s*$  # Lignes vides",
          ],
        },
        {
          title: "Validation de formats",
          description: "Patterns pour valider des formats spécifiques",
          code: "# Numéro de carte de crédit (format général)\n^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$\n\n# Code ISBN-13\n^978[0-9]{10}$\n\n# Couleur hexadécimale\n^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$\n\n# Nom d'utilisateur (3-20 caractères, alphanumériques et underscores)\n^[a-zA-Z0-9_]{3,20}$\n\n# Version semver (1.0.0)\n^\\d+\\.\\d+\\.\\d+$",
          examples: [
            "^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$  # Carte de crédit",
            "^978[0-9]{10}$  # ISBN-13",
            "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$  # Couleur hex",
            "^[a-zA-Z0-9_]{3,20}$  # Nom d'utilisateur",
            "^\\d+\\.\\d+\\.\\d+$  # Version semver",
          ],
        },
      ],
    },
  ],
};
