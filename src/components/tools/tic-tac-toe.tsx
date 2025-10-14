/**
 * Tic-Tac-Toe - Morpion avec IA minimax
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/v1/winv";
import { Trophy, RotateCcw, TrendingUp, X as XIcon, Circle } from "lucide-react";

type Player = 'X' | 'O' | null;
type Board = Player[];

interface GameStats {
  result: 'win' | 'loss' | 'draw';
  date: string;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [gameHistory, setGameHistory] = useState<GameStats[]>([]);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });

  // Charger l'historique
  useEffect(() => {
    const savedHistory = localStorage.getItem("tic-tac-toe-history");
    if (savedHistory) {
      const history: GameStats[] = JSON.parse(savedHistory);
      setGameHistory(history);
      
      // Calculer les stats
      const wins = history.filter(g => g.result === 'win').length;
      const losses = history.filter(g => g.result === 'loss').length;
      const draws = history.filter(g => g.result === 'draw').length;
      setStats({ wins, losses, draws });
    }
  }, []);

  // Sauvegarder dans l'historique
  const saveToHistory = useCallback((result: 'win' | 'loss' | 'draw') => {
    const stats: GameStats = {
      result,
      date: new Date().toISOString(),
    };
    const history = [stats, ...gameHistory].slice(0, 20);
    
    setGameHistory(history);
    localStorage.setItem("tic-tac-toe-history", JSON.stringify(history));
    
    // Mettre à jour les stats
    const wins = history.filter(g => g.result === 'win').length;
    const losses = history.filter(g => g.result === 'loss').length;
    const draws = history.filter(g => g.result === 'draw').length;
    setStats({ wins, losses, draws });
  }, [gameHistory]);

  // Vérifier les conditions de victoire
  const checkWinner = (currentBoard: Board): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
      [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (const [a, b, c] of lines) {
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }

    if (currentBoard.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  // Algorithme Minimax pour l'IA
  const minimax = (currentBoard: Board, isMaximizing: boolean): number => {
    const result = checkWinner(currentBoard);
    
    if (result === 'O') return 10;
    if (result === 'X') return -10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          const score = minimax(currentBoard, false);
          currentBoard[i] = null;
          maxScore = Math.max(score, maxScore);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          const score = minimax(currentBoard, true);
          currentBoard[i] = null;
          minScore = Math.min(score, minScore);
        }
      }
      return minScore;
    }
  };

  // Trouver le meilleur coup pour l'IA
  const findBestMove = (currentBoard: Board): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        const score = minimax(currentBoard, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  // Tour de l'IA
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const bestMove = findBestMove(newBoard);
        
        if (bestMove !== -1) {
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          
          const gameResult = checkWinner(newBoard);
          if (gameResult) {
            setWinner(gameResult);
            if (gameResult === 'O') saveToHistory('loss');
            else if (gameResult === 'draw') saveToHistory('draw');
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board, saveToHistory]);

  // Gérer le clic du joueur
  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      if (gameResult === 'X') saveToHistory('win');
      else if (gameResult === 'draw') saveToHistory('draw');
    } else {
      setIsPlayerTurn(false);
    }
  };

  // Nouvelle partie
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-blue-500" />
            Tic-Tac-Toe
          </CardTitle>
          <CardDescription>
            Battez l'IA au morpion ! Vous êtes X, l'IA est O.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-green-500/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{stats.wins}</div>
                <div className="text-xs text-muted-foreground">Victoires</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-500/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.draws}</div>
                <div className="text-xs text-muted-foreground">Égalités</div>
              </CardContent>
            </Card>
            <Card className="bg-red-500/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{stats.losses}</div>
                <div className="text-xs text-muted-foreground">Défaites</div>
              </CardContent>
            </Card>
          </div>

          {/* Statut */}
          <div className="text-center">
            {!winner && (
              <div className="text-lg font-semibold">
                {isPlayerTurn ? (
                  <span className="text-blue-500">Votre tour (X)</span>
                ) : (
                  <span className="text-red-500 animate-pulse">Tour de l'IA (O)...</span>
                )}
              </div>
            )}
          </div>

          {/* Plateau de jeu */}
          <div className="flex justify-center">
            <div className="inline-block bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-2">
                {board.map((cell, index) => (
                  <Button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={!!cell || !!winner || !isPlayerTurn}
                    className="w-20 h-20 bg-card border-2 border-border rounded-lg flex items-center justify-center hover:bg-accent transition-all disabled:cursor-not-allowed touch-manipulation"
                    variant="ghost"
                    size="lg"
                  >
                    {cell === 'X' && <XIcon className="h-12 w-12 text-blue-500" strokeWidth={3} />}
                    {cell === 'O' && <Circle className="h-12 w-12 text-red-500" strokeWidth={3} />}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Bouton Nouvelle Partie */}
          <Button onClick={resetGame} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            Nouvelle Partie
          </Button>

          {/* Résultat */}
          {winner && (
            <Card className={`${
              winner === 'X' ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500' :
              winner === 'O' ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500' :
              'bg-gradient-to-r from-gray-500/10 to-slate-500/10 border-gray-500'
            }`}>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {winner === 'X' ? '🎉 Vous avez gagné !' :
                   winner === 'O' ? '😔 L\'IA a gagné' :
                   '🤝 Égalité !'}
                </h3>
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
            Historique des parties
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
                  className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                    game.result === 'win' ? 'bg-green-500/10' :
                    game.result === 'loss' ? 'bg-red-500/10' :
                    'bg-gray-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${
                      game.result === 'win' ? 'text-green-500' :
                      game.result === 'loss' ? 'text-red-500' :
                      'text-gray-500'
                    }`}>
                      {game.result === 'win' ? '✓ Victoire' :
                       game.result === 'loss' ? '✗ Défaite' :
                       '= Égalité'}
                    </span>
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

