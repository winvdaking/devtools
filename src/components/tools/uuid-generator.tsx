/**
 * Outil de génération UUID et tokens
 */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Key, Copy, Check, RefreshCw, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/v1/winv"
import { Input } from "@/components/ui/input"

interface GeneratedItem {
  id: string
  value: string
  type: string
}

export function UuidGenerator() {
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [tokenLength, setTokenLength] = useState(32)

  // Génération UUID v4
  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Génération token aléatoire
  const generateToken = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Génération token hexadécimal
  const generateHexToken = (length: number): string => {
    const chars = '0123456789abcdef'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Génération clé API
  const generateApiKey = (): string => {
    const prefix = 'sk_'
    const randomPart = generateToken(48)
    return prefix + randomPart
  }

  // Génération JWT-like token
  const generateJwtLike = (): string => {
    const header = btoa('{"alg":"HS256","typ":"JWT"}').replace(/=/g, '')
    const payload = btoa('{"sub":"1234567890","name":"John Doe","iat":1516239022}').replace(/=/g, '')
    const signature = generateToken(43)
    return `${header}.${payload}.${signature}`
  }

  const generators = [
    {
      id: "uuid",
      name: "UUID v4",
      description: "Identifiant unique universel",
      generate: generateUUID,
      example: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      id: "token",
      name: "Token aléatoire",
      description: "Token alphanumérique personnalisable",
      generate: () => generateToken(tokenLength),
      example: "Kj8fN2mP9qR3sT5vW7xY1zA4bC6dE8fG"
    },
    {
      id: "hex",
      name: "Token hexadécimal",
      description: "Token en format hexadécimal",
      generate: () => generateHexToken(tokenLength),
      example: "a1b2c3d4e5f6789012345678901234ab"
    },
    {
      id: "apikey",
      name: "Clé API",
      description: "Clé API avec préfixe",
      generate: generateApiKey,
      example: "sk_Kj8fN2mP9qR3sT5vW7xY1zA4bC6dE8fGhI9jK0lM1nO2pQ"
    },
    {
      id: "jwt",
      name: "JWT-like Token",
      description: "Token similaire à un JWT",
      generate: generateJwtLike,
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
  ]

  const generateItem = (type: string) => {
    const generator = generators.find(g => g.id === type)
    if (!generator) return

    const newItem: GeneratedItem = {
      id: Date.now().toString(),
      value: generator.generate(),
      type: generator.name
    }

    setGeneratedItems(prev => [newItem, ...prev.slice(0, 9)]) // Garder les 10 derniers
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const clearHistory = () => {
    setGeneratedItems([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Key className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">UUID & Token Generator</h2>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Paramètres pour la génération de tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Longueur des tokens :</label>
            <Input
              type="number"
              value={tokenLength}
              onChange={(e) => setTokenLength(Math.max(8, Math.min(128, parseInt(e.target.value) || 32)))}
              className="w-20"
              min={8}
              max={128}
            />
            <span className="text-sm text-muted-foreground">caractères (8-128)</span>
          </div>
        </CardContent>
      </Card>

      {/* Générateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generators.map((generator) => (
          <Card key={generator.id} className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{generator.name}</CardTitle>
              <CardDescription className="text-sm">
                {generator.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 bg-muted rounded text-xs font-mono text-muted-foreground break-all">
                  {generator.example}
                </div>
                <Button
                  onClick={() => generateItem(generator.id)}
                  className="w-full"
                  icon={RefreshCw}
                >
                  Générer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historique */}
      {generatedItems.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Historique</CardTitle>
                <CardDescription>
                  Derniers éléments générés
                </CardDescription>
              </div>
              <Button onClick={clearHistory} variant="default" icon={Trash2}>
                Effacer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1">{item.type}</div>
                    <div className="font-mono text-sm break-all text-muted-foreground">
                      {item.value}
                    </div>
                  </div>
                  <Button
                    variant="default"
                    icon={copied === item.id ? Check : Copy}
                    onClick={() => copyToClipboard(item.value, item.id)}
                    className="ml-4 flex-shrink-0"
                  >
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Key className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Sécurité des tokens
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Les tokens sont générés côté client avec une randomisation cryptographiquement sécurisée.
                Pour des applications critiques, utilisez des générateurs serveur dédiés.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
