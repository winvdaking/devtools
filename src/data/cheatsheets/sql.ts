/**
 * Cheatsheet SQL - Structured Query Language
 * Requêtes et commandes essentielles SQL
 */

import { CheatSheet } from "../../types/cheatsheets";

export const sqlCheatSheet: CheatSheet = {
  name: "SQL",
  description: "Langage de requête structuré pour les bases de données",
  icon: "Database",
  tags: ["sql", "database", "queries", "mysql", "postgresql"],
  sections: [
    {
      title: "Commandes de base",
      items: [
        {
          title: "SELECT - Sélectionner des données",
          description: "Récupérer des données d'une table",
          code: "-- Sélectionner toutes les colonnes\nSELECT * FROM users;\n\n-- Sélectionner des colonnes spécifiques\nSELECT name, email FROM users;\n\n-- Avec alias\nSELECT name AS nom, email AS courriel FROM users;\n\n-- Limiter les résultats\nSELECT * FROM users LIMIT 10;",
          examples: [
            "SELECT * FROM users;",
            "SELECT name, email FROM users;",
            "SELECT name AS nom FROM users;",
            "SELECT * FROM users LIMIT 10;",
          ],
        },
        {
          title: "WHERE - Conditions",
          description: "Filtrer les résultats avec des conditions",
          code: "-- Conditions de base\nSELECT * FROM users WHERE age > 18;\nSELECT * FROM users WHERE name = 'John';\nSELECT * FROM users WHERE email LIKE '%@gmail.com';\n\n-- Opérateurs logiques\nSELECT * FROM users WHERE age > 18 AND city = 'Paris';\nSELECT * FROM users WHERE age < 18 OR age > 65;\nSELECT * FROM users WHERE NOT active = 0;\n\n-- Valeurs NULL\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;",
          examples: [
            "SELECT * FROM users WHERE age > 18;",
            "SELECT * FROM users WHERE name = 'John';",
            "SELECT * FROM users WHERE email LIKE '%@gmail.com';",
            "SELECT * FROM users WHERE age > 18 AND city = 'Paris';",
            "SELECT * FROM users WHERE phone IS NULL;",
          ],
        },
        {
          title: "ORDER BY - Tri",
          description: "Trier les résultats",
          code: "-- Tri ascendant (par défaut)\nSELECT * FROM users ORDER BY name;\n\n-- Tri descendant\nSELECT * FROM users ORDER BY created_at DESC;\n\n-- Tri multiple\nSELECT * FROM users ORDER BY city ASC, name DESC;\n\n-- Tri avec position\nSELECT * FROM users ORDER BY 2;  -- Trier par la 2ème colonne",
          examples: [
            "SELECT * FROM users ORDER BY name;",
            "SELECT * FROM users ORDER BY created_at DESC;",
            "SELECT * FROM users ORDER BY city ASC, name DESC;",
            "SELECT * FROM users ORDER BY 2;",
          ],
        },
      ],
    },
    {
      title: "Fonctions d'agrégation",
      items: [
        {
          title: "Fonctions de base",
          description: "Fonctions pour calculer des statistiques",
          code: "-- Compter les enregistrements\nSELECT COUNT(*) FROM users;\nSELECT COUNT(email) FROM users;  -- Ignore les NULL\n\n-- Somme et moyenne\nSELECT SUM(price) FROM products;\nSELECT AVG(rating) FROM reviews;\n\n-- Minimum et maximum\nSELECT MIN(price) FROM products;\nSELECT MAX(created_at) FROM orders;\n\n-- Avec GROUP BY\nSELECT city, COUNT(*) FROM users GROUP BY city;",
          examples: [
            "SELECT COUNT(*) FROM users;",
            "SELECT SUM(price) FROM products;",
            "SELECT AVG(rating) FROM reviews;",
            "SELECT MIN(price), MAX(price) FROM products;",
            "SELECT city, COUNT(*) FROM users GROUP BY city;",
          ],
        },
        {
          title: "GROUP BY et HAVING",
          description: "Grouper et filtrer les groupes",
          code: "-- Grouper par colonne\nSELECT department, COUNT(*) FROM employees GROUP BY department;\n\n-- Grouper par plusieurs colonnes\nSELECT department, position, COUNT(*) FROM employees \nGROUP BY department, position;\n\n-- Filtrer les groupes avec HAVING\nSELECT department, COUNT(*) FROM employees \nGROUP BY department \nHAVING COUNT(*) > 5;\n\n-- Différence WHERE vs HAVING\nSELECT department, AVG(salary) FROM employees \nWHERE hire_date > '2020-01-01'  -- Filtre les lignes\nGROUP BY department \nHAVING AVG(salary) > 50000;  -- Filtre les groupes",
          examples: [
            "SELECT department, COUNT(*) FROM employees GROUP BY department;",
            "SELECT department, position, COUNT(*) FROM employees GROUP BY department, position;",
            "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
            "WHERE hire_date > '2020-01-01'  -- Filtre lignes",
            "HAVING AVG(salary) > 50000  -- Filtre groupes",
          ],
        },
      ],
    },
    {
      title: "Jointures (JOIN)",
      items: [
        {
          title: "INNER JOIN",
          description: "Jointure interne - seulement les correspondances",
          code: "-- Jointure simple\nSELECT u.name, o.order_date, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- Jointure multiple\nSELECT u.name, o.order_date, p.product_name\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nINNER JOIN order_items oi ON o.id = oi.order_id\nINNER JOIN products p ON oi.product_id = p.id;",
          examples: [
            "SELECT u.name, o.order_date FROM users u INNER JOIN orders o ON u.id = o.user_id;",
            "SELECT u.name, o.order_date, p.product_name FROM users u INNER JOIN orders o ON u.id = o.user_id INNER JOIN products p ON o.product_id = p.id;",
          ],
        },
        {
          title: "LEFT JOIN et RIGHT JOIN",
          description: "Jointures externes",
          code: "-- LEFT JOIN - Toutes les lignes de la table gauche\nSELECT u.name, o.order_date\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\n-- RIGHT JOIN - Toutes les lignes de la table droite\nSELECT u.name, o.order_date\nFROM users u\nRIGHT JOIN orders o ON u.id = o.user_id;\n\n-- FULL OUTER JOIN (PostgreSQL)\nSELECT u.name, o.order_date\nFROM users u\nFULL OUTER JOIN orders o ON u.id = o.user_id;",
          examples: [
            "SELECT u.name, o.order_date FROM users u LEFT JOIN orders o ON u.id = o.user_id;",
            "SELECT u.name, o.order_date FROM users u RIGHT JOIN orders o ON u.id = o.user_id;",
            "SELECT u.name, o.order_date FROM users u FULL OUTER JOIN orders o ON u.id = o.user_id;",
          ],
        },
      ],
    },
    {
      title: "Sous-requêtes",
      items: [
        {
          title: "Sous-requêtes dans WHERE",
          description: "Utiliser des sous-requêtes comme conditions",
          code: "-- Utilisateur avec le plus grand nombre de commandes\nSELECT name FROM users \nWHERE id = (\n    SELECT user_id FROM orders \n    GROUP BY user_id \n    ORDER BY COUNT(*) DESC \n    LIMIT 1\n);\n\n-- Utilisateurs qui ont passé des commandes\nSELECT * FROM users \nWHERE id IN (\n    SELECT DISTINCT user_id FROM orders\n);\n\n-- Utilisateurs qui n'ont jamais passé de commande\nSELECT * FROM users \nWHERE id NOT IN (\n    SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL\n);",
          examples: [
            "SELECT name FROM users WHERE id = (SELECT user_id FROM orders GROUP BY user_id ORDER BY COUNT(*) DESC LIMIT 1);",
            "SELECT * FROM users WHERE id IN (SELECT DISTINCT user_id FROM orders);",
            "SELECT * FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);",
          ],
        },
        {
          title: "Sous-requêtes dans SELECT",
          description: "Sous-requêtes comme colonnes calculées",
          code: "-- Nombre de commandes par utilisateur\nSELECT \n    name,\n    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count\nFROM users;\n\n-- Prix moyen des produits par catégorie\nSELECT \n    category,\n    (SELECT AVG(price) FROM products p2 WHERE p2.category = p1.category) as avg_price\nFROM products p1\nGROUP BY category;",
          examples: [
            "SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count FROM users;",
            "SELECT category, (SELECT AVG(price) FROM products p2 WHERE p2.category = p1.category) as avg_price FROM products p1 GROUP BY category;",
          ],
        },
      ],
    },
    {
      title: "INSERT, UPDATE, DELETE",
      items: [
        {
          title: "INSERT - Insérer des données",
          description: "Ajouter de nouveaux enregistrements",
          code: "-- Insérer une ligne\nINSERT INTO users (name, email, age) \nVALUES ('John Doe', 'john@example.com', 25);\n\n-- Insérer plusieurs lignes\nINSERT INTO users (name, email, age) \nVALUES \n    ('Alice', 'alice@example.com', 30),\n    ('Bob', 'bob@example.com', 35);\n\n-- Insérer depuis une autre table\nINSERT INTO users_backup (name, email)\nSELECT name, email FROM users WHERE created_at < '2020-01-01';",
          examples: [
            "INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 25);",
            "INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30), ('Bob', 'bob@example.com', 35);",
            "INSERT INTO users_backup (name, email) SELECT name, email FROM users WHERE created_at < '2020-01-01';",
          ],
        },
        {
          title: "UPDATE - Modifier des données",
          description: "Mettre à jour des enregistrements existants",
          code: "-- Mettre à jour une colonne\nUPDATE users SET email = 'newemail@example.com' WHERE id = 1;\n\n-- Mettre à jour plusieurs colonnes\nUPDATE users \nSET name = 'John Smith', age = 26 \nWHERE id = 1;\n\n-- Mettre à jour avec une sous-requête\nUPDATE products \nSET price = price * 1.1 \nWHERE category = 'Electronics';\n\n-- Mettre à jour avec JOIN (MySQL)\nUPDATE users u\nJOIN orders o ON u.id = o.user_id\nSET u.last_order_date = o.order_date\nWHERE o.order_date > u.last_order_date;",
          examples: [
            "UPDATE users SET email = 'newemail@example.com' WHERE id = 1;",
            "UPDATE users SET name = 'John Smith', age = 26 WHERE id = 1;",
            "UPDATE products SET price = price * 1.1 WHERE category = 'Electronics';",
            "UPDATE users u JOIN orders o ON u.id = o.user_id SET u.last_order_date = o.order_date;",
          ],
        },
        {
          title: "DELETE - Supprimer des données",
          description: "Supprimer des enregistrements",
          code: "-- Supprimer avec condition\nDELETE FROM users WHERE id = 1;\n\n-- Supprimer plusieurs enregistrements\nDELETE FROM orders WHERE order_date < '2020-01-01';\n\n-- Supprimer avec sous-requête\nDELETE FROM users \nWHERE id NOT IN (\n    SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL\n);\n\n-- Supprimer avec JOIN (MySQL)\nDELETE u FROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.user_id IS NULL;",
          examples: [
            "DELETE FROM users WHERE id = 1;",
            "DELETE FROM orders WHERE order_date < '2020-01-01';",
            "DELETE FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);",
            "DELETE u FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.user_id IS NULL;",
          ],
        },
      ],
    },
    {
      title: "Création et modification de tables",
      items: [
        {
          title: "CREATE TABLE",
          description: "Créer une nouvelle table",
          code: "-- Table simple\nCREATE TABLE users (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    age INT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Table avec clés étrangères\nCREATE TABLE orders (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    user_id INT NOT NULL,\n    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    total DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);",
          examples: [
            "CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL);",
            "CREATE TABLE orders (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id));",
          ],
        },
        {
          title: "ALTER TABLE",
          description: "Modifier la structure d'une table",
          code: "-- Ajouter une colonne\nALTER TABLE users ADD COLUMN phone VARCHAR(20);\n\n-- Modifier une colonne\nALTER TABLE users MODIFY COLUMN age INT NOT NULL;\n\n-- Supprimer une colonne\nALTER TABLE users DROP COLUMN phone;\n\n-- Ajouter une contrainte\nALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);\n\n-- Supprimer une contrainte\nALTER TABLE users DROP CONSTRAINT chk_age;",
          examples: [
            "ALTER TABLE users ADD COLUMN phone VARCHAR(20);",
            "ALTER TABLE users MODIFY COLUMN age INT NOT NULL;",
            "ALTER TABLE users DROP COLUMN phone;",
            "ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);",
          ],
        },
      ],
    },
    {
      title: "Index et performance",
      items: [
        {
          title: "Créer des index",
          description: "Améliorer les performances avec des index",
          code: "-- Index simple\nCREATE INDEX idx_user_email ON users(email);\n\n-- Index composite\nCREATE INDEX idx_user_city_age ON users(city, age);\n\n-- Index unique\nCREATE UNIQUE INDEX idx_user_email_unique ON users(email);\n\n-- Index sur une expression\nCREATE INDEX idx_user_name_lower ON users(LOWER(name));\n\n-- Supprimer un index\nDROP INDEX idx_user_email ON users;",
          examples: [
            "CREATE INDEX idx_user_email ON users(email);",
            "CREATE INDEX idx_user_city_age ON users(city, age);",
            "CREATE UNIQUE INDEX idx_user_email_unique ON users(email);",
            "DROP INDEX idx_user_email ON users;",
          ],
        },
        {
          title: "EXPLAIN - Analyser les requêtes",
          description: "Comprendre l'exécution des requêtes",
          code: "-- Analyser une requête\nEXPLAIN SELECT * FROM users WHERE email = 'john@example.com';\n\n-- Avec plus de détails (MySQL)\nEXPLAIN FORMAT=JSON SELECT * FROM users WHERE email = 'john@example.com';\n\n-- Analyser avec coût estimé (PostgreSQL)\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';",
          examples: [
            "EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';",
            "EXPLAIN FORMAT=JSON SELECT * FROM users WHERE email = 'john@example.com';",
            "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';",
          ],
        },
      ],
    },
    {
      title: "Fonctions et opérateurs",
      items: [
        {
          title: "Fonctions de chaînes",
          description: "Manipuler les chaînes de caractères",
          code: "-- Concaténation\nSELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;\n\n-- Longueur\nSELECT LENGTH(name) FROM users;\n\n-- Majuscules/minuscules\nSELECT UPPER(name), LOWER(email) FROM users;\n\n-- Substring\nSELECT SUBSTRING(name, 1, 3) FROM users;\n\n-- Recherche\nSELECT * FROM users WHERE name LIKE '%John%';\nSELECT * FROM users WHERE name REGEXP '^[A-Z]';",
          examples: [
            "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;",
            "SELECT LENGTH(name) FROM users;",
            "SELECT UPPER(name), LOWER(email) FROM users;",
            "SELECT SUBSTRING(name, 1, 3) FROM users;",
            "SELECT * FROM users WHERE name LIKE '%John%';",
          ],
        },
        {
          title: "Fonctions de dates",
          description: "Travailler avec les dates",
          code: "-- Date actuelle\nSELECT NOW(), CURDATE(), CURTIME();\n\n-- Extraction de parties de date\nSELECT YEAR(order_date), MONTH(order_date), DAY(order_date) FROM orders;\n\n-- Calculs de dates\nSELECT DATE_ADD(order_date, INTERVAL 30 DAY) FROM orders;\nSELECT DATEDIFF(NOW(), order_date) FROM orders;\n\n-- Formatage de dates\nSELECT DATE_FORMAT(order_date, '%Y-%m-%d') FROM orders;\nSELECT DATE_FORMAT(order_date, '%d/%m/%Y') FROM orders;",
          examples: [
            "SELECT NOW(), CURDATE(), CURTIME();",
            "SELECT YEAR(order_date), MONTH(order_date), DAY(order_date) FROM orders;",
            "SELECT DATE_ADD(order_date, INTERVAL 30 DAY) FROM orders;",
            "SELECT DATEDIFF(NOW(), order_date) FROM orders;",
            "SELECT DATE_FORMAT(order_date, '%Y-%m-%d') FROM orders;",
          ],
        },
      ],
    },
    {
      title: "Vues et procédures stockées",
      items: [
        {
          title: "Vues (VIEW)",
          description: "Créer des vues pour simplifier les requêtes",
          code: "-- Créer une vue\nCREATE VIEW user_orders AS\nSELECT \n    u.name,\n    u.email,\n    o.order_date,\n    o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- Utiliser une vue\nSELECT * FROM user_orders WHERE total > 100;\n\n-- Modifier une vue\nALTER VIEW user_orders AS\nSELECT \n    u.name,\n    u.email,\n    COUNT(o.id) as order_count,\n    SUM(o.total) as total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name, u.email;\n\n-- Supprimer une vue\nDROP VIEW user_orders;",
          examples: [
            "CREATE VIEW user_orders AS SELECT u.name, u.email, o.order_date, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;",
            "SELECT * FROM user_orders WHERE total > 100;",
            "ALTER VIEW user_orders AS SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id;",
            "DROP VIEW user_orders;",
          ],
        },
        {
          title: "Procédures stockées",
          description: "Créer des procédures stockées (MySQL)",
          code: "-- Créer une procédure\nDELIMITER //\nCREATE PROCEDURE GetUserOrders(IN user_id INT)\nBEGIN\n    SELECT o.*, u.name \n    FROM orders o\n    INNER JOIN users u ON o.user_id = u.id\n    WHERE o.user_id = user_id;\nEND //\nDELIMITER ;\n\n-- Appeler une procédure\nCALL GetUserOrders(1);\n\n-- Supprimer une procédure\nDROP PROCEDURE GetUserOrders;",
          examples: [
            "DELIMITER //",
            "CREATE PROCEDURE GetUserOrders(IN user_id INT) BEGIN ... END //",
            "CALL GetUserOrders(1);",
            "DROP PROCEDURE GetUserOrders;",
          ],
        },
      ],
    },
  ],
};
