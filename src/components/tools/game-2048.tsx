/**
 * 2048 Game - Jeu de puzzle classique avec historique et animations
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, TrendingUp, Grid3x3 } from "lucide-react";

interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

interface GameStats {
  score: number;
  maxTile: number;
  date: string;
}

const GRID_SIZE = 4;
const CELL_SIZE = 64; // Taille d'une cellule en pixels
const CELL_GAP = 8; // Espacement entre les cellules

export function Game2048() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameStats[]>([]);
  const [bestScore, setBestScore] = useState<GameStats | null>(null);
  const [moveDirection, setMoveDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null);

  // Charger l'historique
  useEffect(() => {
    const savedHistory = localStorage.getItem("2048-game-history");
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
    initGame();
  }, []);

  // Générer un ID unique
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Créer une nouvelle tuile
  const createTile = (row: number, col: number, value: number, isNew = false): Tile => ({
    id: generateId(),
    value,
    row,
    col,
    isNew,
  });

  // Convertir les tuiles en grille
  const tilesToGrid = (currentTiles: Tile[]): (number | null)[][] => {
    const grid: (number | null)[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    currentTiles.forEach(tile => {
      grid[tile.row][tile.col] = tile.value;
    });
    return grid;
  };

  // Convertir grille en tuiles
  const gridToTiles = (grid: (number | null)[][], markNew = false): Tile[] => {
    const newTiles: Tile[] = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell !== null) {
          newTiles.push(createTile(i, j, cell, markNew));
        }
      });
    });
    return newTiles;
  };

  // Ajouter une tuile aléatoire
  const addRandomTile = (currentTiles: Tile[]): Tile[] => {
    const grid = tilesToGrid(currentTiles);
    const emptyCells: [number, number][] = [];
    
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) emptyCells.push([i, j]);
      }
    }

    if (emptyCells.length === 0) return currentTiles;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    return [...currentTiles, createTile(row, col, value, true)];
  };

  // Initialiser le jeu
  const initGame = useCallback(() => {
    let newTiles: Tile[] = [];
    newTiles = addRandomTile(newTiles);
    newTiles = addRandomTile(newTiles);
    setTiles(newTiles);
    setScore(0);
    setGameOver(false);
    setMoveDirection(null);
  }, []);

  // Sauvegarder dans l'historique
  const saveToHistory = useCallback((finalScore: number, maxTile: number) => {
    const stats: GameStats = {
      score: finalScore,
      maxTile,
      date: new Date().toISOString(),
    };
    const history = [...gameHistory, stats];
    const sortedHistory = history.sort((a, b) => b.score - a.score).slice(0, 10);
    
    setGameHistory(sortedHistory);
    localStorage.setItem("2048-game-history", JSON.stringify(sortedHistory));
    
    if (!bestScore || finalScore > bestScore.score) {
      setBestScore(stats);
    }
  }, [gameHistory, bestScore]);

  // Logique de mouvement avec préservation des IDs pour l'animation
  const processMove = (currentTiles: Tile[], direction: 'up' | 'down' | 'left' | 'right'): { tiles: Tile[]; changed: boolean; points: number } => {
    const grid = tilesToGrid(currentTiles);
    let points = 0;
    let changed = false;

    // Créer une map des tuiles par position
    const tileMap = new Map<string, Tile>();
    currentTiles.forEach(tile => {
      tileMap.set(`${tile.row}-${tile.col}`, tile);
    });

    const moveRowLeft = (row: (number | null)[]): (number | null)[] => {
      const filtered = row.filter(cell => cell !== null);
      const merged: (number | null)[] = [];
      
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          const value = (filtered[i]! * 2);
          merged.push(value);
          points += value;
          i++;
          changed = true;
        } else {
          merged.push(filtered[i]);
        }
      }
      
      while (merged.length < GRID_SIZE) {
        merged.push(null);
      }
      
      return merged;
    };

    let newGrid: (number | null)[][] = grid.map(row => [...row]);

    if (direction === 'left') {
      newGrid = newGrid.map(row => moveRowLeft(row));
    } else if (direction === 'right') {
      newGrid = newGrid.map(row => moveRowLeft([...row].reverse()).reverse());
    } else if (direction === 'up') {
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = newGrid.map(row => row[col]);
        const moved = moveRowLeft(column);
        moved.forEach((val, row) => {
          newGrid[row][col] = val;
        });
      }
    } else if (direction === 'down') {
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = newGrid.map(row => row[col]);
        const moved = moveRowLeft([...column].reverse()).reverse();
        moved.forEach((val, row) => {
          newGrid[row][col] = val;
        });
      }
    }

    // Vérifier si quelque chose a changé
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] !== newGrid[i][j]) {
          changed = true;
          break;
        }
      }
      if (changed) break;
    }

    // Conserver les IDs des tuiles existantes pour une animation fluide
    const newTiles: Tile[] = [];
    const usedOldTiles = new Set<string>();

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newGrid[i][j] !== null) {
          // Chercher une tuile existante avec la même valeur qui n'a pas été utilisée
          let foundTile: Tile | undefined;
          
          // Chercher d'abord à la même position
          const samePosTile = tileMap.get(`${i}-${j}`);
          if (samePosTile && samePosTile.value === newGrid[i][j] && !usedOldTiles.has(samePosTile.id)) {
            foundTile = samePosTile;
          } else {
            // Chercher n'importe quelle tuile avec la même valeur
            for (const tile of currentTiles) {
              if (tile.value === newGrid[i][j] && !usedOldTiles.has(tile.id)) {
                foundTile = tile;
                break;
              }
            }
          }

          if (foundTile) {
            usedOldTiles.add(foundTile.id);
            newTiles.push({
              ...foundTile,
              row: i,
              col: j,
              isNew: false,
            });
          } else {
            // Créer une nouvelle tuile
            newTiles.push(createTile(i, j, newGrid[i][j]!, false));
          }
        }
      }
    }

    return { tiles: newTiles, changed, points };
  };

  // Gérer les mouvements
  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver || moveDirection) return; // Empêcher les mouvements pendant l'animation

    setMoveDirection(direction);
    const result = processMove(tiles, direction);

    if (result.changed) {
      // Mettre à jour immédiatement les tuiles déplacées
      setTiles(result.tiles);
      
      // Ajouter une nouvelle tuile après l'animation de glissement
      setTimeout(() => {
        const newTiles = addRandomTile(result.tiles);
        setTiles(newTiles);
        setScore(prev => prev + result.points);

        const grid = tilesToGrid(newTiles);
        // Vérifier si le jeu est terminé
        if (isGameOver(grid)) {
          setGameOver(true);
          const maxTile = Math.max(...grid.flat().filter(n => n !== null) as number[]);
          saveToHistory(score + result.points, maxTile);
        }
        setMoveDirection(null);
      }, 250); // Augmenté pour une animation plus visible
    } else {
      setMoveDirection(null);
    }
  }, [tiles, gameOver, score, saveToHistory, moveDirection]);

  // Vérifier si le jeu est terminé
  const isGameOver = (currentGrid: (number | null)[][]): boolean => {
    // Vérifier s'il reste des cases vides
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentGrid[i][j] === null) return false;
      }
    }

    // Vérifier si des fusions sont possibles
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = currentGrid[i][j];
        if (j < GRID_SIZE - 1 && current === currentGrid[i][j + 1]) return false;
        if (i < GRID_SIZE - 1 && current === currentGrid[i + 1][j]) return false;
      }
    }

    return true;
  };

  // Calculer la position en pixels
  const getTilePosition = (row: number, col: number) => ({
    x: col * (CELL_SIZE + CELL_GAP),
    y: row * (CELL_SIZE + CELL_GAP),
  });

  // Gérer les touches du clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      if (e.key === 'ArrowUp') move('up');
      else if (e.key === 'ArrowDown') move('down');
      else if (e.key === 'ArrowLeft') move('left');
      else if (e.key === 'ArrowRight') move('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [move, gameOver]);

  // Couleur des tuiles
  const getTileColor = (value: number | null): string => {
    if (!value) return 'bg-muted';
    const colors: Record<number, string> = {
      2: 'bg-gray-200 dark:bg-gray-700',
      4: 'bg-gray-300 dark:bg-gray-600',
      8: 'bg-orange-300 text-white',
      16: 'bg-orange-400 text-white',
      32: 'bg-orange-500 text-white',
      64: 'bg-red-500 text-white',
      128: 'bg-yellow-400 text-white',
      256: 'bg-yellow-500 text-white',
      512: 'bg-yellow-600 text-white',
      1024: 'bg-yellow-700 text-white',
      2048: 'bg-yellow-800 text-white',
    };
    return colors[value] || 'bg-purple-500 text-white';
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3x3 className="h-6 w-6 text-primary" />
            2048 Game
          </CardTitle>
          <CardDescription>
            Combinez les tuiles pour atteindre 2048 ! Utilisez les flèches du clavier ou les boutons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Scores */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            {bestScore && (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{bestScore.score}</div>
                <div className="text-xs text-muted-foreground">Meilleur Score</div>
              </div>
            )}
          </div>

          {/* Grille */}
          <div className="flex justify-center">
            <div 
              className="relative rounded-lg p-2 bg-muted/50"
              style={{ 
                width: GRID_SIZE * CELL_SIZE + (GRID_SIZE + 1) * CELL_GAP,
                height: GRID_SIZE * CELL_SIZE + (GRID_SIZE + 1) * CELL_GAP,
              }}
            >
              {/* Cellules de fond */}
              <div className="absolute inset-0 p-2">
                <div className="grid grid-cols-4 gap-2 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded-md" />
                  ))}
                </div>
              </div>

              {/* Tuiles animées */}
              <div className="absolute inset-0 p-2">
                <AnimatePresence mode="popLayout">
                  {tiles.map((tile) => {
                    const pos = getTilePosition(tile.row, tile.col);
                    return (
                      <motion.div
                        key={tile.id}
                        layout
                        initial={tile.isNew ? { 
                          scale: 0, 
                          opacity: 0,
                          x: pos.x,
                          y: pos.y,
                        } : {
                          x: pos.x,
                          y: pos.y,
                        }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          x: pos.x,
                          y: pos.y,
                        }}
                        exit={{ 
                          scale: 0, 
                          opacity: 0,
                        }}
                        transition={{ 
                          type: "tween",
                          ease: "easeOut",
                          duration: tile.isNew ? 0.15 : 0.2,
                          layout: {
                            duration: 0.2,
                            ease: "easeOut",
                          }
                        }}
                        className={`absolute flex items-center justify-center rounded-md font-bold shadow-lg transition-colors duration-150 ${getTileColor(tile.value)}`}
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          fontSize: tile.value > 512 ? '1.25rem' : '1.5rem',
                          willChange: 'transform',
                        }}
                      >
                        {tile.value}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Contrôles tactiles */}
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => move('up')}
              disabled={gameOver}
              variant="outline"
              size="icon"
            >
              ↑
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => move('left')} disabled={gameOver} variant="outline" size="icon">
                ←
              </Button>
              <Button onClick={() => move('down')} disabled={gameOver} variant="outline" size="icon">
                ↓
              </Button>
              <Button onClick={() => move('right')} disabled={gameOver} variant="outline" size="icon">
                →
              </Button>
            </div>
          </div>

          {/* Bouton Nouvelle Partie */}
          <Button onClick={initGame} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            Nouvelle Partie
          </Button>

          {/* Game Over */}
          {gameOver && (
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                <p className="text-muted-foreground">Score final: {score}</p>
              </CardContent>
            </Card>
          )}
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
                    <div>
                      <div className="text-lg font-bold">{game.score}</div>
                      <div className="text-xs text-muted-foreground">Max: {game.maxTile}</div>
                    </div>
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

