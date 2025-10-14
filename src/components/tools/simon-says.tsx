/**
 * Simon Says - Jeu de mémoire avec séquences de couleurs et animations
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Trophy, RotateCcw, TrendingUp, Brain } from "lucide-react";

interface GameStats {
  level: number;
  date: string;
}

const COLORS = ['red', 'blue', 'green', 'yellow'] as const;
type Color = typeof COLORS[number];

export function SimonSays() {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameStats[]>([]);
  const [bestLevel, setBestLevel] = useState<GameStats | null>(null);

  // Charger l'historique
  useEffect(() => {
    const savedHistory = localStorage.getItem("simon-says-history");
    if (savedHistory) {
      const history: GameStats[] = JSON.parse(savedHistory);
      setGameHistory(history);
      if (history.length > 0) {
        const best = history.reduce((prev, current) => 
          prev.level > current.level ? prev : current
        );
        setBestLevel(best);
      }
    }
  }, []);

  // Sauvegarder dans l'historique
  const saveToHistory = useCallback((finalLevel: number) => {
    const stats: GameStats = {
      level: finalLevel,
      date: new Date().toISOString(),
    };
    const history = [...gameHistory, stats];
    const sortedHistory = history.sort((a, b) => b.level - a.level).slice(0, 10);
    
    setGameHistory(sortedHistory);
    localStorage.setItem("simon-says-history", JSON.stringify(sortedHistory));
    
    if (!bestLevel || finalLevel > bestLevel.level) {
      setBestLevel(stats);
    }
  }, [gameHistory, bestLevel]);

  // Démarrer une nouvelle partie
  const startGame = useCallback(() => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(0);
    setGameOver(false);
    setIsPlaying(true);
    // Ajouter la première couleur après un court délai
    setTimeout(() => {
      const firstColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setSequence([firstColor]);
      setLevel(1);
    }, 500);
  }, []);

  // Afficher la séquence
  useEffect(() => {
    if (sequence.length === 0 || !isPlaying || gameOver) return;

    setIsShowingSequence(true);
    setPlayerSequence([]);

    let index = 0;
    const showNextColor = () => {
      if (index < sequence.length) {
        setActiveColor(sequence[index]);
        setTimeout(() => {
          setActiveColor(null);
          index++;
          setTimeout(showNextColor, 300);
        }, 600);
      } else {
        setIsShowingSequence(false);
      }
    };

    setTimeout(showNextColor, 1000);
  }, [sequence, isPlaying, gameOver]);

  // Gérer le clic sur une couleur
  const handleColorClick = useCallback((color: Color) => {
    if (!isPlaying || isShowingSequence || gameOver) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    // Effet visuel
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 300);

    // Vérifier si la couleur est correcte
    const currentIndex = newPlayerSequence.length - 1;
    if (sequence[currentIndex] !== color) {
      // Mauvaise réponse
      setGameOver(true);
      setIsPlaying(false);
      saveToHistory(level);
      return;
    }

    // Vérifier si la séquence est complète
    if (newPlayerSequence.length === sequence.length) {
      // Séquence correcte, passer au niveau suivant
      setTimeout(() => {
        const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setSequence([...sequence, nextColor]);
        setLevel(prev => prev + 1);
        setPlayerSequence([]);
      }, 1000);
    }
  }, [isPlaying, isShowingSequence, gameOver, playerSequence, sequence, level, saveToHistory]);

  // Couleurs des boutons
  const getColorClasses = (color: Color, isActive: boolean): string => {
    const baseClasses = "w-32 h-32 rounded-lg transition-all duration-150 border-4 ";
    const colorMap = {
      red: isActive 
        ? "bg-red-600 border-red-400 shadow-lg shadow-red-500/50 scale-95" 
        : "bg-red-500 hover:bg-red-600 border-red-700",
      blue: isActive 
        ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/50 scale-95" 
        : "bg-blue-500 hover:bg-blue-600 border-blue-700",
      green: isActive 
        ? "bg-green-600 border-green-400 shadow-lg shadow-green-500/50 scale-95" 
        : "bg-green-500 hover:bg-green-600 border-green-700",
      yellow: isActive 
        ? "bg-yellow-600 border-yellow-400 shadow-lg shadow-yellow-500/50 scale-95" 
        : "bg-yellow-500 hover:bg-yellow-600 border-yellow-700",
    };
    return baseClasses + colorMap[color];
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            Simon Says
          </CardTitle>
          <CardDescription>
            Mémorisez et reproduisez la séquence de couleurs. À quel niveau arriverez-vous ?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Niveau actuel */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500">{level}</div>
              <div className="text-xs text-muted-foreground">Niveau</div>
            </div>
            {bestLevel && (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{bestLevel.level}</div>
                <div className="text-xs text-muted-foreground">Meilleur Niveau</div>
              </div>
            )}
          </div>

          {/* Statut */}
          <div className="text-center">
            {isShowingSequence && (
              <div className="text-lg font-semibold text-primary animate-pulse">
                Regardez la séquence...
              </div>
            )}
            {!isShowingSequence && isPlaying && !gameOver && (
              <div className="text-lg font-semibold text-green-500">
                À votre tour ! ({playerSequence.length}/{sequence.length})
              </div>
            )}
          </div>

          {/* Grille de couleurs */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              {COLORS.map(color => (
                <motion.button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  disabled={!isPlaying || isShowingSequence || gameOver}
                  className={getColorClasses(color, activeColor === color)}
                  whileHover={!isShowingSequence && isPlaying && !gameOver ? { scale: 1.05 } : {}}
                  whileTap={!isShowingSequence && isPlaying && !gameOver ? { scale: 0.95 } : {}}
                  animate={{
                    scale: activeColor === color ? 0.95 : 1,
                    filter: activeColor === color ? "brightness(1.5)" : "brightness(1)",
                  }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
          </div>

          {/* Bouton Nouvelle Partie */}
          <Button onClick={startGame} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            {isPlaying ? "Recommencer" : "Nouvelle Partie"}
          </Button>

          {/* Game Over */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                    <p className="text-muted-foreground mb-2">Vous avez atteint le niveau {level}</p>
                    {bestLevel && level >= bestLevel.level && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-purple-600 font-semibold"
                      >
                        🏆 Nouveau record personnel !
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Historique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Top 10 Niveaux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {gameHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Aucune partie jouée
              </p>
            ) : (
              gameHistory.map((game, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {index < 3 && (
                      <Trophy className={`h-4 w-4 ${
                        index === 0 ? "text-yellow-500" : 
                        index === 1 ? "text-gray-400" : "text-orange-600"
                      }`} />
                    )}
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span className="text-lg font-bold">Niveau {game.level}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(game.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

