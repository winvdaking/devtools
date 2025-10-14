/**
 * Template de composant pour la page de test
 * 
 * Ce fichier sert d'exemple pour créer vos propres composants de test.
 * Copiez ce fichier et modifiez-le selon vos besoins.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";

interface TestComponentTemplateProps {
  title?: string;
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

export default function TestComponentTemplate({
  title = "Mon Composant de Test",
  initialValue = "",
  onValueChange
}: TestComponentTemplateProps) {
  const [value, setValue] = useState(initialValue);
  const [clickCount, setClickCount] = useState(0);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="space-y-4">
        {/* Zone de saisie */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Valeur de test :
          </label>
          <Input
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="Tapez quelque chose..."
            className="w-full"
          />
        </div>

        {/* Bouton d'action */}
        <div>
          <Button onClick={handleClick} className="w-full">
            Cliquez-moi ! (Compteur: {clickCount})
          </Button>
        </div>

        {/* Affichage des données */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">État du composant :</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Valeur actuelle :</strong> {value || "(vide)"}</p>
            <p><strong>Nombre de clics :</strong> {clickCount}</p>
            <p><strong>Longueur du texte :</strong> {value.length} caractères</p>
          </div>
        </div>

        {/* Zone d'événements */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
            Événements déclenchés :
          </h4>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p>• Changement de valeur : {value ? "✅" : "❌"}</p>
            <p>• Clic sur le bouton : {clickCount > 0 ? "✅" : "❌"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Exemple d'utilisation dans la page de test :
/*
import TestComponentTemplate from "@/components/test/TestComponentTemplate";

// Dans votre JSX :
<TestComponentTemplate 
  title="Mon Test Personnalisé"
  initialValue="Valeur par défaut"
  onValueChange={(value) => console.log('Nouvelle valeur:', value)}
/>
*/
