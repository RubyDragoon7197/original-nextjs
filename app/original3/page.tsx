"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sparkles, RotateCcw, Trophy } from "lucide-react";

const GRID_SIZE = 8;
const CANDY_TYPES = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒'];

type Position = { row: number; col: number };
type Candy = string;

const CandyCrushGame = () => {
  const [grid, setGrid] = useState<Candy[][]>([]);
  const [selectedCandy, setSelectedCandy] = useState<Position | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());

  const createRandomCandy = (): Candy => {
    return CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
  };

  const initializeGrid = useCallback(() => {
    const newGrid: Candy[][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const row: Candy[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push(createRandomCandy());
      }
      newGrid.push(row);
    }
    return newGrid;
  }, []);

  useEffect(() => {
    setGrid(initializeGrid());
  }, [initializeGrid]);

  const findMatches = (currentGrid: Candy[][]): Position[] => {
    const matches: Position[] = [];
    
    // Horizontal
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        const candy = currentGrid[row][col];
        if (candy && currentGrid[row][col + 1] === candy && currentGrid[row][col + 2] === candy) {
          matches.push({ row, col }, { row, col: col + 1 }, { row, col: col + 2 });
        }
      }
    }
    
    // Vertical
    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 2; row++) {
        const candy = currentGrid[row][col];
        if (candy && currentGrid[row + 1][col] === candy && currentGrid[row + 2][col] === candy) {
          matches.push({ row, col }, { row: row + 1, col }, { row: row + 2, col });
        }
      }
    }
    
    return matches;
  };

  const removeMatches = (currentGrid: Candy[][], matches: Position[]): Candy[][] => {
    const newGrid = currentGrid.map(row => [...row]);
    const uniqueMatches = new Set(matches.map(m => `${m.row},${m.col}`));
    
    uniqueMatches.forEach(match => {
      const [row, col] = match.split(',').map(Number);
      newGrid[row][col] = '';
    });
    
    setScore(prev => prev + uniqueMatches.size * 10);
    return newGrid;
  };

  const dropCandies = (currentGrid: Candy[][]): Candy[][] => {
    const newGrid = currentGrid.map(row => [...row]);
    
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptySpaces = 0;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (newGrid[row][col] === '') {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          newGrid[row + emptySpaces][col] = newGrid[row][col];
          newGrid[row][col] = '';
        }
      }
      
      for (let row = 0; row < emptySpaces; row++) {
        newGrid[row][col] = createRandomCandy();
      }
    }
    
    return newGrid;
  };

  const processMatches = async (currentGrid: Candy[][]) => {
    let newGrid = currentGrid;
    let hasMatches = true;
    
    while (hasMatches) {
      const matches = findMatches(newGrid);
      if (matches.length === 0) {
        hasMatches = false;
      } else {
        const animating = new Set(matches.map(m => `${m.row},${m.col}`));
        setAnimatingCells(animating);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        newGrid = removeMatches(newGrid, matches);
        setGrid(newGrid);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        newGrid = dropCandies(newGrid);
        setGrid(newGrid);
        setAnimatingCells(new Set());
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    setIsProcessing(false);
  };

  const isAdjacent = (pos1: Position, pos2: Position): boolean => {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  const swapCandies = (pos1: Position, pos2: Position, currentGrid: Candy[][]): Candy[][] => {
    const newGrid = currentGrid.map(row => [...row]);
    const temp = newGrid[pos1.row][pos1.col];
    newGrid[pos1.row][pos1.col] = newGrid[pos2.row][pos2.col];
    newGrid[pos2.row][pos2.col] = temp;
    return newGrid;
  };

  const handleCandyClick = async (row: number, col: number) => {
    if (isProcessing || moves === 0) return;
    
    const position = { row, col };
    
    if (!selectedCandy) {
      setSelectedCandy(position);
    } else {
      if (isAdjacent(selectedCandy, position)) {
        setIsProcessing(true);
        setMoves(prev => prev - 1);
        
        let newGrid = swapCandies(selectedCandy, position, grid);
        setGrid(newGrid);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const matches = findMatches(newGrid);
        
        if (matches.length === 0) {
          newGrid = swapCandies(selectedCandy, position, newGrid);
          setGrid(newGrid);
          setIsProcessing(false);
        } else {
          await processMatches(newGrid);
        }
        
        setSelectedCandy(null);
      } else {
        setSelectedCandy(position);
      }
    }
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setMoves(20);
    setSelectedCandy(null);
    setIsProcessing(false);
    setAnimatingCells(new Set());
  };

  const isSelected = (row: number, col: number) => {
    return selectedCandy?.row === row && selectedCandy?.col === col;
  };

  const isAnimating = (row: number, col: number) => {
    return animatingCells.has(`${row},${col}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-950 rounded-3xl shadow-2xl p-4 sm:p-8 max-w-2xl w-full border border-gray-700">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={28} />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Candy Match
            </h1>
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 hover:from-gray-600 hover:to-gray-500 transition-all active:scale-95 text-sm sm:text-base border border-gray-500"
          >
            <RotateCcw size={18} />
            Nuevo
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-gray-900 p-3 sm:p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400" size={20} />
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Puntuación</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-400">{score}</p>
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Movimientos</p>
            <p className="text-xl sm:text-2xl font-bold text-orange-400">{moves}</p>
          </div>
        </div>

        {moves === 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-center border border-yellow-600">
            <p className="text-xl font-bold text-yellow-400">¡Juego terminado!</p>
            <p className="text-gray-300">Puntuación final: {score}</p>
          </div>
        )}
        
        <div className="inline-block bg-gradient-to-br from-gray-800 to-gray-900 p-2 sm:p-3 rounded-2xl mx-auto border border-gray-700">
          <div className="grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((candy, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCandyClick(rowIndex, colIndex)}
                  disabled={isProcessing || moves === 0}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 text-2xl sm:text-3xl flex items-center justify-center rounded-lg
                    transition-all duration-200 transform
                    ${isSelected(rowIndex, colIndex) 
                      ? 'bg-yellow-600 scale-110 shadow-lg shadow-yellow-500/50 ring-2 sm:ring-4 ring-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 hover:scale-105 active:scale-95 shadow-md border border-gray-600'
                    }
                    ${isAnimating(rowIndex, colIndex) ? 'animate-bounce' : ''}
                    ${isProcessing || moves === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer touch-manipulation'}
                  `}
                >
                  {candy}
                </button>
              ))
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Haz clic en dos dulces adyacentes para intercambiarlos</p>
          <p>Forma grupos de 3 o más del mismo tipo</p>
        </div>
      </div>
    </div>
  );
};

export default CandyCrushGame;