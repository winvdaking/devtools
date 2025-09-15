"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  User, 
  Send, 
  Trash2, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  Mic,
  Paperclip,
  XCircle
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Suggestions simples
  const suggestions = [
    "Aide-moi à coder...",
    "Explique-moi...",
    "Résume ce texte...",
    "Génère des idées..."
  ];

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Réponse simple
  const generateResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "Voici une réponse détaillée à votre question...",
      "Je peux vous aider avec cela. Voici ce que je recommande...",
      "Excellente question ! Voici une explication claire...",
      "Je vais vous expliquer cela étape par étape...",
      "Voici une solution pratique pour votre problème..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await generateResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      setError("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  // Gestion du drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  // Gestion de l'upload de fichiers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Gestion du micro
  const toggleRecording = () => {
    if (isRecording) {
      // Arrêter l'enregistrement
      setIsRecording(false);
      // Ici vous pourriez traiter l'audio enregistré
    } else {
      // Démarrer l'enregistrement
      setIsRecording(true);
      // Ici vous pourriez initialiser l'enregistrement audio
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto">
      {/* En-tête simple */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dak1ng IA
            </h1>
          </div>
          
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
        
        {/* Notification de développement */}
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
              En développement
            </span>
          </div>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            Cette fonctionnalité est actuellement en cours de développement. Les réponses sont simulées et ne sont pas fonctionnelles.
          </p>
        </div>
      </div>

      {/* Zone de messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Dak1ng IA
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Posez votre question ci-dessous
              </p>
              
              {/* Suggestions simples */}
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    message.role === "user" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                  </div>

                  {/* Message */}
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Zone de saisie */}
      <div 
        className={`p-4 relative transition-colors ${isDragOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Fond quadrillé léger */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Zone de drop overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center z-20">
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-lg font-medium">
                Déposez vos fichiers ici
              </div>
              <div className="text-blue-500 dark:text-blue-300 text-sm">
                Images, documents, etc.
              </div>
            </div>
          </div>
        )}
        
        <div className="relative z-10">
          {error && (
            <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-700 h-6 w-6 p-0"
              >
                <XCircle className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          {/* Fichiers attachés */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  <span className="text-gray-600 dark:text-gray-400 truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="w-full min-h-[60px] max-h-32 resize-none border-4 border-gray-200 bg-gray-100/50 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 text-gray-900 dark:text-gray-10 pr-10"
              disabled={isLoading}
            />
            
            {/* Input file caché */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {/* Icônes dans l'input */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Joindre un fichier"
              >
                <Paperclip className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRecording}
                className={`h-6 w-6 p-0 ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title={isRecording ? "Arrêter l'enregistrement" : "Enregistrement vocal"}
              >
                <Mic className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="absolute bottom-2 right-2">
              <Button 
                onClick={sendMessage} 
                disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                className="h-6 w-6 p-0 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded"
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Send className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
