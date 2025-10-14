"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Input } from "@/components/ui/input";
import { Copy, Download, FileText, Shield, RefreshCw, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
    customChars: ""
  });

  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: "Très faible",
    feedback: [] as string[]
  });

  // Caractères disponibles
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "il1Lo0O", // Caractères similaires à exclure
    ambiguous: "{}[]()/\\~,;.<>" // Caractères ambigus à exclure
  };

  // Génération de mot de passe
  const generatePassword = () => {
    let charset = "";
    
    if (settings.includeUppercase) charset += charSets.uppercase;
    if (settings.includeLowercase) charset += charSets.lowercase;
    if (settings.includeNumbers) charset += charSets.numbers;
    if (settings.includeSymbols) charset += charSets.symbols;
    if (settings.customChars) charset += settings.customChars;

    // Exclure les caractères similaires
    if (settings.excludeSimilar) {
      charset = charset.split('').filter(char => !charSets.similar.includes(char)).join('');
    }

    // Exclure les caractères ambigus
    if (settings.excludeAmbiguous) {
      charset = charset.split('').filter(char => !charSets.ambiguous.includes(char)).join('');
    }

    if (charset.length === 0) {
      setPassword("Veuillez sélectionner au moins un type de caractère");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < settings.length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    setGeneratedPasswords(prev => [newPassword, ...prev.slice(0, 9)]); // Garder les 10 derniers
    calculatePasswordStrength(newPassword);
  };

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    const feedback: string[] = [];

    // Longueur
    if (pwd.length >= 8) score += 1;
    else feedback.push("Utilisez au moins 8 caractères");

    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    // Diversité des caractères
    if (/[a-z]/.test(pwd)) score += 1;
    else feedback.push("Ajoutez des lettres minuscules");

    if (/[A-Z]/.test(pwd)) score += 1;
    else feedback.push("Ajoutez des lettres majuscules");

    if (/[0-9]/.test(pwd)) score += 1;
    else feedback.push("Ajoutez des chiffres");

    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;
    else feedback.push("Ajoutez des symboles");

    // Patterns communs
    if (/(.)\1{2,}/.test(pwd)) {
      score -= 1;
      feedback.push("Évitez les caractères répétés");
    }

    if (/123|abc|qwe/i.test(pwd)) {
      score -= 1;
      feedback.push("Évitez les séquences communes");
    }

    // Déterminer le niveau
    let level = "Très faible";
    if (score >= 6) level = "Très fort";
    else if (score >= 4) level = "Fort";
    else if (score >= 2) level = "Moyen";
    else if (score >= 1) level = "Faible";

    setPasswordStrength({ score, level, feedback });
  };

  // Analyse de sécurité
  const securityAnalysis = useMemo(() => {
    if (!password) return null;

    const analysis = {
      entropy: 0,
      timeToCrack: "Instantané",
      recommendations: [] as string[]
    };

    // Calcul de l'entropie
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

    analysis.entropy = Math.log2(Math.pow(charsetSize, password.length));

    // Temps de cassage estimé
    const combinations = Math.pow(charsetSize, password.length);
    const attemptsPerSecond = 1e9; // 1 milliard d'essais par seconde
    const secondsToCrack = combinations / (2 * attemptsPerSecond);

    if (secondsToCrack < 1) analysis.timeToCrack = "Instantané";
    else if (secondsToCrack < 60) analysis.timeToCrack = `${Math.round(secondsToCrack)} secondes`;
    else if (secondsToCrack < 3600) analysis.timeToCrack = `${Math.round(secondsToCrack / 60)} minutes`;
    else if (secondsToCrack < 86400) analysis.timeToCrack = `${Math.round(secondsToCrack / 3600)} heures`;
    else if (secondsToCrack < 31536000) analysis.timeToCrack = `${Math.round(secondsToCrack / 86400)} jours`;
    else analysis.timeToCrack = `${Math.round(secondsToCrack / 31536000)} années`;

    // Recommandations
    if (password.length < 12) analysis.recommendations.push("Augmentez la longueur à au moins 12 caractères");
    if (!/[A-Z]/.test(password)) analysis.recommendations.push("Ajoutez des majuscules");
    if (!/[a-z]/.test(password)) analysis.recommendations.push("Ajoutez des minuscules");
    if (!/[0-9]/.test(password)) analysis.recommendations.push("Ajoutez des chiffres");
    if (!/[^a-zA-Z0-9]/.test(password)) analysis.recommendations.push("Ajoutez des symboles");

    return analysis;
  }, [password]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadPasswords = () => {
    const content = generatedPasswords.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStrengthColor = (level: string) => {
    switch (level) {
      case "Très fort": return "text-green-600";
      case "Fort": return "text-blue-600";
      case "Moyen": return "text-yellow-600";
      case "Faible": return "text-orange-600";
      default: return "text-red-600";
    }
  };

  const getStrengthBgColor = (level: string) => {
    switch (level) {
      case "Très fort": return "bg-green-500";
      case "Fort": return "bg-blue-500";
      case "Moyen": return "bg-yellow-500";
      case "Faible": return "bg-orange-500";
      default: return "bg-red-500";
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Générateur de Mots de Passe Sécurisés
          </CardTitle>
          <CardDescription>
            Générez des mots de passe forts et sécurisés pour protéger vos comptes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Paramètres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Longueur</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={settings.length}
                    onChange={(e) => setSettings({...settings, length: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-12">{settings.length}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Types de caractères</label>
                <div className="space-y-2">
                  {[
                    { key: 'includeUppercase', label: 'Majuscules (A-Z)' },
                    { key: 'includeLowercase', label: 'Minuscules (a-z)' },
                    { key: 'includeNumbers', label: 'Chiffres (0-9)' },
                    { key: 'includeSymbols', label: 'Symboles (!@#$...)' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings[key as keyof typeof settings] as boolean}
                        onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Options avancées</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.excludeSimilar}
                      onChange={(e) => setSettings({...settings, excludeSimilar: e.target.checked})}
                    />
                    <span className="text-sm">Exclure les caractères similaires (il1Lo0O)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.excludeAmbiguous}
                      onChange={(e) => setSettings({...settings, excludeAmbiguous: e.target.checked})}
                    />
                    <span className="text-sm">Exclure les caractères ambigus ({}[]...)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Caractères personnalisés</label>
                <Input
                  value={settings.customChars}
                  onChange={(e) => setSettings({...settings, customChars: e.target.value})}
                  placeholder="Caractères supplémentaires"
                />
              </div>
            </div>
          </div>

          {/* Génération */}
          <div className="space-y-4">
            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Générer un mot de passe
            </Button>

            {password && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={password}
                    readOnly
                    type={showPassword ? "text" : "password"}
                    className="font-mono text-lg"
                  />
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => copyToClipboard(password)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {/* Force du mot de passe */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Force du mot de passe</span>
                    <span className={`text-sm font-medium ${getStrengthColor(passwordStrength.level)}`}>
                      {passwordStrength.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getStrengthBgColor(passwordStrength.level)}`}
                      style={{ width: `${(passwordStrength.score / 7) * 100}%` }}
                    />
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {passwordStrength.feedback.map((msg, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-500" />
                          {msg}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Analyse de sécurité */}
                {securityAnalysis && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Analyse de sécurité</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Entropie:</span> {securityAnalysis.entropy.toFixed(1)} bits
                      </div>
                      <div>
                        <span className="font-medium">Temps de cassage estimé:</span> {securityAnalysis.timeToCrack}
                      </div>
                    </div>
                    {securityAnalysis.recommendations.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Recommandations:</span>
                        <ul className="text-sm text-muted-foreground mt-1">
                          {securityAnalysis.recommendations.map((rec, i) => (
                            <li key={i}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Historique des mots de passe */}
      {generatedPasswords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Historique des mots de passe générés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {generatedPasswords.map((pwd, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="text-sm text-muted-foreground w-8">#{index + 1}</span>
                  <Input
                    value={pwd}
                    readOnly
                    type="password"
                    className="font-mono flex-1"
                  />
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => copyToClipboard(pwd)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="default"
                onClick={downloadPasswords}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Télécharger l'historique
              </Button>
              <Button
                variant="default"
                onClick={() => setGeneratedPasswords([])}
              >
                Effacer l'historique
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conseils de sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Conseils de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Bonnes pratiques</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Utilisez des mots de passe uniques pour chaque compte</li>
                <li>• Changez vos mots de passe régulièrement</li>
                <li>• Utilisez un gestionnaire de mots de passe</li>
                <li>• Activez l'authentification à deux facteurs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">À éviter</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Informations personnelles (nom, date de naissance)</li>
                <li>• Mots du dictionnaire</li>
                <li>• Séquences communes (123456, qwerty)</li>
                <li>• Partage de mots de passe par email/SMS</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
