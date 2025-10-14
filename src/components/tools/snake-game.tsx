/**
 * Snake Game - Jeu du serpent classique avec historique
 */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Trophy, RotateCcw, TrendingUp, Zap } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface GameStats {
  score: number;
  date: string;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameHistory, setGameHistory] = useState<GameStats[]>([]);
  const [bestScore, setBestScore] = useState<GameStats | null>(null);
  const directionRef = useRef(direction);

  // Charger l'historique
  useEffect(() => {
    const savedHistory = localStorage.getItem("snake-game-history");
    if (savedHistory) {
      const history: GameStats[] = JSON.parse(savedHistory);
      setGameHistory(history);
      if (history.length > 0) {
        const best = history.reduce((prev, current) => 
          prev.score > current.score ? prev : current
        );
        setBestScore(best);
      }
    }
  }, []);

  // Sauvegarder dans l'historique
  const saveToHistory = useCallback((finalScore: number) => {
    const stats: GameStats = {
      score: finalScore,
      date: new Date().toISOString(),
    };
    const history = [...gameHistory, stats];
    const sortedHistory = history.sort((a, b) => b.score - a.score).slice(0, 10);
    
    setGameHistory(sortedHistory);
    localStorage.setItem("snake-game-history", JSON.stringify(sortedHistory));
    
    if (!bestScore || finalScore > bestScore.score) {
      setBestScore(stats);
    }
  }, [gameHistory, bestScore]);

  // Générer une nouvelle position pour la nourriture
  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Démarrer une nouvelle partie
  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setSpeed(INITIAL_SPEED);
  }, [generateFood]);

  // Gérer les touches du clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      const key = e.key;
      const currentDir = directionRef.current;

      if (key === "ArrowUp" && currentDir.y === 0) {
        directionRef.current = { x: 0, y: -1 };
      } else if (key === "ArrowDown" && currentDir.y === 0) {
        directionRef.current = { x: 0, y: 1 };
      } else if (key === "ArrowLeft" && currentDir.x === 0) {
        directionRef.current = { x: -1, y: 0 };
      } else if (key === "ArrowRight" && currentDir.x === 0) {
        directionRef.current = { x: 1, y: 0 };
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, gameOver]);

  // Boucle de jeu
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const currentDir = directionRef.current;
        const head = prevSnake[0];
        const newHead = {
          x: head.x + currentDir.x,
          y: head.y + currentDir.y,
        };

        // Vérifier les collisions avec les murs
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          saveToHistory(score);
          return prevSnake;
        }

        // Vérifier les collisions avec le corps
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          saveToHistory(score);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Vérifier si le serpent mange la nourriture
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(50, prev - 2));
          return newSnake;
        }

        // Retirer la queue
        newSnake.pop();
        return newSnake;
      });

      setDirection(directionRef.current);
    }, speed);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, food, speed, score, generateFood, saveToHistory]);

  // Contrôles tactiles pour mobile
  const handleDirectionClick = (newDir: Position) => {
    if (!isPlaying || gameOver) return;
    const currentDir = directionRef.current;
    
    if (
      (newDir.x !== 0 && currentDir.x === 0) ||
      (newDir.y !== 0 && currentDir.y === 0)
    ) {
      directionRef.current = newDir;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-500" />
            Snake Game
          </CardTitle>
          <CardDescription>
            Utilisez les flèches du clavier ou les boutons pour diriger le serpent. Ne touchez pas les murs !
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Score actuel */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            {bestScore && (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{bestScore.score}</div>
                <div className="text-xs text-muted-foreground">Meilleur Score</div>
              </div>
            )}
          </div>

          {/* Grille de jeu */}
          <div className="flex justify-center">
            <div
              className="relative border-4 border-border rounded-lg overflow-hidden"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                backgroundColor: "hsl(var(--muted))",
              }}
            >
              {/* Serpent */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-75"
                  style={{
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    backgroundColor: index === 0 ? "#22c55e" : "#16a34a",
                    borderRadius: index === 0 ? "4px" : "2px",
                  }}
                />
              ))}
              
              {/* Nourriture */}
              <div
                className="absolute animate-pulse"
                style={{
                  left: food.x * CELL_SIZE,
                  top: food.y * CELL_SIZE,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                }}
              />

              {/* Game Over overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                    <p className="text-lg mb-4">Score: {score}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contrôles tactiles */}
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => handleDirectionClick({ x: 0, y: -1 })}
              disabled={!isPlaying || gameOver}
              variant="default"
              size="icon"
              className="touch-manipulation"
            >
              ↑
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => handleDirectionClick({ x: -1, y: 0 })}
                disabled={!isPlaying || gameOver}
                variant="default"
                size="icon"
                className="touch-manipulation"
              >
                ←
              </Button>
              <Button
                onClick={() => handleDirectionClick({ x: 0, y: 1 })}
                disabled={!isPlaying || gameOver}
                variant="default"
                size="icon"
                className="touch-manipulation"
              >
                ↓
              </Button>
              <Button
                onClick={() => handleDirectionClick({ x: 1, y: 0 })}
                disabled={!isPlaying || gameOver}
                variant="default"
                size="icon"
                className="touch-manipulation"
              >
                →
              </Button>
            </div>
          </div>

          {/* Bouton Nouvelle Partie */}
          <Button onClick={startGame} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            {isPlaying ? "Recommencer" : "Nouvelle Partie"}
          </Button>
        </CardContent>
      </Card>

      {/* Historique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Top 10 Scores
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
                    <span className="text-lg font-bold">{game.score}</span>
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

