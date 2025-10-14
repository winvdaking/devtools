/**
 * Memory Game - Jeu de mémoire avec historique dans localStorage et animations
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Trophy, RotateCcw, TrendingUp, Clock, Target } from "lucide-react";

interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameStats {
  moves: number;
  matches: number;
  time: number;
  date: string;
  completed: boolean;
}

// Emojis pour le jeu
const emojis = ["🎮", "🎯", "🎨", "🎭", "🎪", "🎸", "🎺", "🎹"];

export function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameStats[]>([]);
  const [bestScore, setBestScore] = useState<GameStats | null>(null);

  // Initialisation du jeu
  const initGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setIsPlaying(true);
  };

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("memory-game-history");
    if (savedHistory) {
      const history: GameStats[] = JSON.parse(savedHistory);
      setGameHistory(history);
      
      // Trouver le meilleur score (partie complétée avec le moins de coups)
      const completedGames = history.filter(game => game.completed);
      if (completedGames.length > 0) {
        const best = completedGames.reduce((prev, current) => 
          prev.moves < current.moves ? prev : current
        );
        setBestScore(best);
      }
    }
    initGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && matches < emojis.length) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, matches]);

  // Sauvegarder dans l'historique
  const saveToHistory = (stats: GameStats) => {
    const history = [...gameHistory, stats];
    const sortedHistory = history.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 10); // Garder les 10 dernières parties
    
    setGameHistory(sortedHistory);
    localStorage.setItem("memory-game-history", JSON.stringify(sortedHistory));
    
    // Mettre à jour le meilleur score si nécessaire
    if (stats.completed) {
      if (!bestScore || stats.moves < bestScore.moves) {
        setBestScore(stats);
      }
    }
  };

  // Gérer le clic sur une carte
  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlippedCards;

      if (cards[first].value === cards[second].value) {
        // Match trouvé
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          
          const newMatches = matches + 1;
          setMatches(newMatches);

          // Partie terminée
          if (newMatches === emojis.length) {
            setIsPlaying(false);
            const stats: GameStats = {
              moves: moves + 1,
              matches: newMatches,
              time,
              date: new Date().toISOString(),
              completed: true,
            };
            saveToHistory(stats);
          }
        }, 500);
      } else {
        // Pas de match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Formater le temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Memory Game
          </CardTitle>
          <CardDescription>
            Trouvez toutes les paires d'emojis en un minimum de coups !
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Statistiques du jeu actuel */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Target className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{moves}</div>
                <div className="text-xs text-muted-foreground">Coups</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Trophy className="h-5 w-5 text-green-500 mb-2" />
                <div className="text-2xl font-bold">{matches}/{emojis.length}</div>
                <div className="text-xs text-muted-foreground">Paires</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Clock className="h-5 w-5 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{formatTime(time)}</div>
                <div className="text-xs text-muted-foreground">Temps</div>
              </CardContent>
            </Card>
          </div>

          {/* Grille de jeu */}
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched}
                whileHover={!card.isMatched ? { scale: 1.05 } : {}}
                whileTap={!card.isMatched ? { scale: 0.95 } : {}}
                animate={{
                  rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                  scale: card.isMatched ? 0.9 : 1,
                }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className={`aspect-square rounded-lg flex items-center justify-center text-4xl ${
                  card.isFlipped || card.isMatched
                    ? "bg-primary/10"
                    : "bg-card hover:bg-accent"
                } ${
                  card.isMatched ? "opacity-50 cursor-not-allowed" : "cursor-pointer shadow-md hover:shadow-lg"
                } border-2 ${
                  card.isMatched ? "border-green-500" : "border-border"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 180 }}
                  transition={{ duration: 0 }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {card.isFlipped || card.isMatched ? card.value : "❓"}
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Bouton Nouvelle Partie */}
          <Button onClick={initGame} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            Nouvelle Partie
          </Button>

          {/* Victoire */}
          <AnimatePresence>
            {matches === emojis.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Félicitations ! 🎉</h3>
                    <p className="text-muted-foreground mb-4">
                      Vous avez terminé en {moves} coups et {formatTime(time)} !
                    </p>
                    {bestScore && moves <= bestScore.moves && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-green-600 font-semibold"
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

      {/* Historique et Meilleur Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meilleur Score */}
        {bestScore && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Meilleur Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coups</span>
                  <span className="font-bold text-lg">{bestScore.moves}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Temps</span>
                  <span className="font-bold text-lg">{formatTime(bestScore.time)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-xs">{new Date(bestScore.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Historique */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Historique
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
                    className="flex justify-between items-center p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {new Date(game.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium">{game.moves} coups</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(game.time)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

