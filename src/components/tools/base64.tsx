/**
 * Outil d'encodage/décodage Base64
 */
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Binary, Copy, Check, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/v1/winv"

export function Base64() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const processText = () => {
    setError("")
    
    if (!inputText.trim()) {
      setOutputText("")
      return
    }

    try {
      if (mode === "encode") {
        // Encodage Base64
        const encoded = btoa(unescape(encodeURIComponent(inputText)))
        setOutputText(encoded)
      } else {
        // Décodage Base64
        const decoded = decodeURIComponent(escape(atob(inputText)))
        setOutputText(decoded)
      }
    } catch (err) {
      setError(mode === "encode" 
        ? "Erreur lors de l'encodage" 
        : "Texte Base64 invalide"
      )
      setOutputText("")
    }
  }

  const switchMode = () => {
    setMode(mode === "encode" ? "decode" : "encode")
    // Échanger input et output si possible
    if (outputText && !error) {
      setInputText(outputText)
      setOutputText(inputText)
    }
    setError("")
  }

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const loadSample = () => {
    if (mode === "encode") {
      setInputText("Hello, World! 👋 Ceci est un exemple avec des caractères UTF-8")
    } else {
      setInputText("SGVsbG8sIFdvcmxkISDwn5GL")
    }
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setError("")
  }

  // Traitement automatique
  React.useEffect(() => {
    processText()
  }, [inputText, mode])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <Binary className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Base64 Encoder/Decoder</h2>
      </div>

      {/* Contrôles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Mode :</span>
              <Button
                variant={mode === "encode" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("encode")}
              >
                Encoder
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("decode")}
              >
                Décoder
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={switchMode} variant="default" size="sm" icon={ArrowUpDown}>
                Inverser
              </Button>
              <Button onClick={loadSample} variant="default" size="sm">
                Exemple
              </Button>
              <Button onClick={clearAll} variant="default" size="sm">
                Effacer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "encode" ? "Texte à encoder" : "Base64 à décoder"}
            </CardTitle>
            <CardDescription>
              {mode === "encode" 
                ? "Saisissez le texte brut à convertir en Base64"
                : "Collez le texte Base64 à décoder"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === "encode" 
                ? "Votre texte ici..."
                : "SGVsbG8sIFdvcmxkIQ=="
              }
              className="min-h-[300px] font-mono text-sm"
            />
            
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <span>{inputText.length} caractères</span>
              <span>
                {mode === "encode" ? "UTF-8" : "Base64"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "encode" ? "Base64 encodé" : "Texte décodé"}
            </CardTitle>
            <CardDescription>
              Résultat du {mode === "encode" ? "encodage" : "décodage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted"
                  placeholder={`Le résultat ${mode === "encode" ? "encodé" : "décodé"} apparaîtra ici...`}
                />
                {outputText && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2"
                    icon={copied ? Check : Copy}
                  >
                  </Button>
                )}
              </div>
            )}
            
            {outputText && !error && (
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>{outputText.length} caractères</span>
                <span>
                  {mode === "encode" ? "Base64" : "UTF-8"}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Binary className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                À propos de Base64
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Base64 est un encodage qui convertit les données binaires en texte ASCII. 
                Il est souvent utilisé pour transmettre des données dans des formats qui ne supportent que le texte.
                L'encodage augmente la taille des données d'environ 33%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
