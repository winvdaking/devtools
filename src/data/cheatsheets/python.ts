/**
 * Cheatsheet Python - Langage de programmation
 * Commandes et concepts essentiels de Python
 */

import { CheatSheet } from "../../types/cheatsheets";

export const pythonCheatSheet: CheatSheet = {
  name: "Python",
  description: "Langage de programmation interprété et orienté objet",
  icon: "Code",
  tags: ["python", "programming", "scripting", "data-science"],
  sections: [
    {
      title: "Installation et environnement",
      items: [
        {
          title: "Installer Python",
          description: "Installer Python sur différents systèmes",
          code: "# Ubuntu/Debian\nsudo apt update\nsudo apt install python3 python3-pip\n\n# macOS (avec Homebrew)\nbrew install python3\n\n# Windows\n# Télécharger depuis python.org",
          examples: [
            "sudo apt install python3 python3-pip  # Ubuntu/Debian",
            "brew install python3  # macOS",
            "python3 --version  # Vérifier la version",
            "pip3 --version  # Vérifier pip",
          ],
        },
        {
          title: "Environnement virtuel",
          description: "Créer et gérer des environnements virtuels",
          code: "# Créer un environnement virtuel\npython3 -m venv mon-env\n\n# Activer (Linux/Mac)\nsource mon-env/bin/activate\n\n# Activer (Windows)\nmon-env\\Scripts\\activate\n\n# Désactiver\ndeactivate",
          examples: [
            "python3 -m venv mon-env  # Créer",
            "source mon-env/bin/activate  # Activer (Linux/Mac)",
            "mon-env\\Scripts\\activate  # Activer (Windows)",
            "deactivate  # Désactiver",
          ],
        },
      ],
    },
    {
      title: "Gestion des packages",
      items: [
        {
          title: "pip - Gestionnaire de packages",
          description: "Installer et gérer les packages Python",
          code: "# Installer un package\npip install <package>\n\n# Installer depuis requirements.txt\npip install -r requirements.txt\n\n# Lister les packages installés\npip list\n\n# Créer requirements.txt\npip freeze > requirements.txt",
          examples: [
            "pip install requests  # Installer un package",
            "pip install -r requirements.txt  # Installer depuis fichier",
            "pip list  # Lister les packages",
            "pip freeze > requirements.txt  # Sauvegarder les dépendances",
            "pip uninstall requests  # Désinstaller",
          ],
        },
        {
          title: "Packages populaires",
          description: "Packages Python couramment utilisés",
          code: "# Web et API\npip install requests flask django fastapi\n\n# Data Science\npip install numpy pandas matplotlib seaborn\n\n# Machine Learning\npip install scikit-learn tensorflow pytorch\n\n# Outils de développement\npip install pytest black flake8 mypy",
          examples: [
            "pip install requests  # Requêtes HTTP",
            "pip install flask  # Framework web léger",
            "pip install django  # Framework web complet",
            "pip install numpy pandas  # Data science",
            "pip install pytest  # Tests",
          ],
        },
      ],
    },
    {
      title: "Syntaxe de base",
      items: [
        {
          title: "Variables et types",
          description: "Déclarer des variables et types de données",
          code: "# Variables\name = \"John\"\nage = 25\nheight = 1.75\nis_student = True\n\n# Types\ntype(name)  # <class 'str'>\ntype(age)   # <class 'int'>\ntype(height)  # <class 'float'>\ntype(is_student)  # <class 'bool'>",
          examples: [
            'name = "John"  # String',
            "age = 25  # Integer",
            "height = 1.75  # Float",
            "is_student = True  # Boolean",
            "type(variable)  # Vérifier le type",
          ],
        },
        {
          title: "Collections",
          description: "Listes, tuples, dictionnaires et sets",
          code: '# Liste (mutable)\nfruits = ["apple", "banana", "orange"]\nfruits.append("grape")\n\n# Tuple (immutable)\ncoordinates = (10, 20)\n\n# Dictionnaire\nperson = {"name": "John", "age": 25}\nperson["city"] = "Paris"\n\n# Set (unique elements)\nunique_numbers = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}',
          examples: [
            'fruits = ["apple", "banana"]  # Liste',
            "coordinates = (10, 20)  # Tuple",
            'person = {"name": "John"}  # Dictionnaire',
            "unique_numbers = {1, 2, 3}  # Set",
          ],
        },
      ],
    },
    {
      title: "Structures de contrôle",
      items: [
        {
          title: "Conditions",
          description: "Instructions conditionnelles",
          code: '# if/elif/else\nage = 18\n\nif age < 18:\n    print("Mineur")\nelif age == 18:\n    print("Majeur")\nelse:\n    print("Adulte")\n\n# Opérateurs de comparaison\n# ==, !=, <, >, <=, >=, in, not in',
          examples: [
            'if age < 18: print("Mineur")',
            'elif age == 18: print("Majeur")',
            'else: print("Adulte")',
            'if "apple" in fruits: print("Found")',
          ],
        },
        {
          title: "Boucles",
          description: "Boucles for et while",
          code: "# Boucle for\nfor fruit in fruits:\n    print(fruit)\n\n# Boucle avec range\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Boucle while\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1",
          examples: [
            "for fruit in fruits: print(fruit)",
            "for i in range(5): print(i)",
            "while count < 5: count += 1",
            "for key, value in person.items(): print(key, value)",
          ],
        },
      ],
    },
    {
      title: "Fonctions",
      items: [
        {
          title: "Définir des fonctions",
          description: "Créer et utiliser des fonctions",
          code: '# Fonction simple\ndef greet(name):\n    return f"Hello, {name}!"\n\n# Fonction avec paramètres par défaut\ndef greet_with_title(name, title="Mr"):\n    return f"Hello, {title} {name}!"\n\n# Fonction avec *args et **kwargs\ndef flexible_function(*args, **kwargs):\n    print("Args:", args)\n    print("Kwargs:", kwargs)',
          examples: [
            'def greet(name): return f"Hello, {name}!"',
            'def greet_with_title(name, title="Mr"): ...',
            "def flexible_function(*args, **kwargs): ...",
            'greet("John")  # Appel de fonction',
          ],
        },
        {
          title: "Lambda et fonctions d'ordre supérieur",
          description: "Fonctions anonymes et fonctions comme paramètres",
          code: "# Lambda (fonction anonyme)\nsquare = lambda x: x ** 2\n\n# Utilisation avec map, filter, reduce\nnumbers = [1, 2, 3, 4, 5]\n\n# map\nsquared = list(map(lambda x: x**2, numbers))\n\n# filter\neven_numbers = list(filter(lambda x: x % 2 == 0, numbers))\n\n# reduce (nécessite import)\nfrom functools import reduce\nsum_all = reduce(lambda x, y: x + y, numbers)",
          examples: [
            "square = lambda x: x ** 2",
            "list(map(lambda x: x**2, numbers))",
            "list(filter(lambda x: x % 2 == 0, numbers))",
            "reduce(lambda x, y: x + y, numbers)",
          ],
        },
      ],
    },
    {
      title: "Classes et objets",
      items: [
        {
          title: "Définir une classe",
          description: "Programmation orientée objet avec Python",
          code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, I\'m {self.name}"\n    \n    def __str__(self):\n        return f"Person(name={self.name}, age={self.age})"\n\n# Utilisation\nperson = Person("John", 25)\nprint(person.greet())',
          examples: [
            "class Person:\n    def __init__(self, name, age): ...",
            'def greet(self): return f"Hello, I\'m {self.name}"',
            'person = Person("John", 25)',
            "person.greet()  # Appel de méthode",
          ],
        },
        {
          title: "Héritage",
          description: "Héritage de classes",
          code: 'class Student(Person):\n    def __init__(self, name, age, student_id):\n        super().__init__(name, age)\n        self.student_id = student_id\n    \n    def study(self):\n        return f"{self.name} is studying"\n\n# Utilisation\nstudent = Student("Alice", 20, "12345")\nprint(student.greet())  # Méthode héritée\nprint(student.study())  # Méthode propre',
          examples: [
            "class Student(Person): ...",
            "super().__init__(name, age)  # Appel constructeur parent",
            'student = Student("Alice", 20, "12345")',
            "student.greet()  # Méthode héritée",
          ],
        },
      ],
    },
    {
      title: "Gestion des fichiers",
      items: [
        {
          title: "Lire et écrire des fichiers",
          description: "Manipuler des fichiers avec Python",
          code: '# Lire un fichier\nwith open("file.txt", "r") as file:\n    content = file.read()\n    print(content)\n\n# Écrire dans un fichier\nwith open("output.txt", "w") as file:\n    file.write("Hello, World!")\n\n# Lire ligne par ligne\nwith open("file.txt", "r") as file:\n    for line in file:\n        print(line.strip())',
          examples: [
            'with open("file.txt", "r") as file: content = file.read()',
            'with open("output.txt", "w") as file: file.write("Hello!")',
            "for line in file: print(line.strip())",
            'with open("file.txt", "a") as file: file.write("Append")',
          ],
        },
        {
          title: "JSON",
          description: "Travailler avec des fichiers JSON",
          code: 'import json\n\n# Lire un fichier JSON\nwith open("data.json", "r") as file:\n    data = json.load(file)\n\n# Écrire un fichier JSON\nwith open("output.json", "w") as file:\n    json.dump(data, file, indent=2)\n\n# Convertir string JSON en objet\njson_string = \'{"name": "John", "age": 25}\'\ndata = json.loads(json_string)',
          examples: [
            "import json",
            "data = json.load(file)  # Lire JSON",
            "json.dump(data, file, indent=2)  # Écrire JSON",
            "data = json.loads(json_string)  # String vers objet",
          ],
        },
      ],
    },
    {
      title: "Gestion des erreurs",
      items: [
        {
          title: "try/except",
          description: "Gérer les exceptions et erreurs",
          code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Division par zéro!")\nexcept Exception as e:\n    print(f"Erreur: {e}")\nelse:\n    print("Aucune erreur")\nfinally:\n    print("Toujours exécuté")\n\n# Lever une exception\nif age < 0:\n    raise ValueError("L\'âge ne peut pas être négatif")',
          examples: [
            "try: ... except ZeroDivisionError: ...",
            'except Exception as e: print(f"Erreur: {e}")',
            'else: print("Aucune erreur")',
            'finally: print("Toujours exécuté")',
            'raise ValueError("Message d\'erreur")',
          ],
        },
      ],
    },
    {
      title: "Modules et packages",
      items: [
        {
          title: "Importer des modules",
          description: "Utiliser des modules et packages",
          code: '# Importer un module\nimport math\nprint(math.pi)\n\n# Importer avec alias\nimport numpy as np\n\n# Importer des fonctions spécifiques\nfrom datetime import datetime, timedelta\n\n# Importer tout\nfrom math import *\n\n# Créer un module personnalisé\n# mymodule.py\ndef my_function():\n    return "Hello from my module"\n\n# main.py\nimport mymodule\nprint(mymodule.my_function())',
          examples: [
            "import math  # Importer module",
            "import numpy as np  # Avec alias",
            "from datetime import datetime  # Fonction spécifique",
            "import mymodule  # Module personnalisé",
          ],
        },
      ],
    },
    {
      title: "Frameworks web",
      items: [
        {
          title: "Flask",
          description: "Framework web léger",
          code: 'from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello, World!"\n\n@app.route("/user/<name>")\ndef user(name):\n    return f"Hello, {name}!"\n\n@app.route("/api/data", methods=["POST"])\ndef api_data():\n    data = request.get_json()\n    return {"status": "success", "data": data}\n\nif __name__ == "__main__":\n    app.run(debug=True)',
          examples: [
            "from flask import Flask",
            '@app.route("/")',
            'def home(): return "Hello, World!"',
            "app.run(debug=True)",
          ],
        },
        {
          title: "Django",
          description: "Framework web complet",
          code: "# Créer un projet Django\ndjango-admin startproject myproject\ncd myproject\npython manage.py startapp myapp\n\n# Modèle\ndef models.py\nfrom django.db import models\n\nclass User(models.Model):\n    name = models.CharField(max_length=100)\n    email = models.EmailField()\n    created_at = models.DateTimeField(auto_now_add=True)\n\n# Vue\ndef views.py\nfrom django.shortcuts import render\nfrom .models import User\n\ndef user_list(request):\n    users = User.objects.all()\n    return render(request, 'user_list.html', {'users': users})",
          examples: [
            "django-admin startproject myproject",
            "python manage.py startapp myapp",
            "class User(models.Model): ...",
            "def user_list(request): ...",
          ],
        },
      ],
    },
    {
      title: "Data Science",
      items: [
        {
          title: "NumPy",
          description: "Calculs numériques avec NumPy",
          code: "import numpy as np\n\n# Créer des arrays\narr = np.array([1, 2, 3, 4, 5])\nmatrix = np.array([[1, 2], [3, 4]])\n\n# Opérations\nresult = arr * 2\nsum_result = np.sum(arr)\nmean_result = np.mean(arr)\n\n# Array de zéros et uns\nzeros = np.zeros((3, 3))\nones = np.ones((2, 2))",
          examples: [
            "import numpy as np",
            "arr = np.array([1, 2, 3, 4, 5])",
            "result = arr * 2",
            "np.sum(arr), np.mean(arr)",
          ],
        },
        {
          title: "Pandas",
          description: "Manipulation de données avec Pandas",
          code: "import pandas as pd\n\n# Créer un DataFrame\ndata = {\n    'Name': ['John', 'Alice', 'Bob'],\n    'Age': [25, 30, 35],\n    'City': ['Paris', 'London', 'New York']\n}\ndf = pd.DataFrame(data)\n\n# Opérations\nprint(df.head())\nprint(df.describe())\nfiltered = df[df['Age'] > 25]\n\n# Lire/écrire des fichiers\ndf = pd.read_csv('data.csv')\ndf.to_csv('output.csv', index=False)",
          examples: [
            "import pandas as pd",
            "df = pd.DataFrame(data)",
            "df.head(), df.describe()",
            "df[df['Age'] > 25]  # Filtrage",
            "pd.read_csv('data.csv')",
          ],
        },
      ],
    },
    {
      title: "Tests",
      items: [
        {
          title: "pytest",
          description: "Tester le code avec pytest",
          code: '# test_example.py\ndef test_addition():\n    assert 2 + 2 == 4\n\ndef test_string():\n    assert "hello".upper() == "HELLO"\n\n# Test avec fixtures\nimport pytest\n\n@pytest.fixture\ndef sample_data():\n    return [1, 2, 3, 4, 5]\n\ndef test_sum(sample_data):\n    assert sum(sample_data) == 15\n\n# Lancer les tests\n# pytest test_example.py',
          examples: [
            "def test_addition(): assert 2 + 2 == 4",
            "@pytest.fixture",
            "def test_sum(sample_data): ...",
            "pytest test_example.py  # Lancer les tests",
          ],
        },
      ],
    },
  ],
};
