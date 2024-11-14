import React, { useEffect, useState } from "react";

const Game = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [won, setWon] = useState(false);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const totalPairs = Math.floor(totalCards / 2);
    const cardArr = Array(totalPairs)
      .fill(0)
      .map((_, idx) => idx + 1);
    const shuffledCards = [...cardArr, ...cardArr].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
  };

  const isFlipped = (idx) => flipped.includes(idx);

  const isSolved = (idx) => solved.includes(idx);

  const resetGame = () => {
    initializeGame();
  };

  const getWinMessage = () => {
    if (moves <= gridSize) return "Excellent!";
    else if (moves <= gridSize * 2) return "Great Job!";
    else return "Good Job!";
  };

  const handleClick = (idx) => {
    if (disabled || isFlipped(idx) || isSolved(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      setMoves((moves) => moves + 1);
      if (cards[firstIndex] === cards[secondIndex]) {
        setSolved([...solved, firstIndex, secondIndex]);
      }
      setDisabled(true);
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-500 to-blue-600 text-white">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 tracking-wider drop-shadow-lg">
        M3MORY
      </h1>

      {/* Grid Size Input */}
      <div className="flex items-center mb-4">
        <label htmlFor="gridSize" className="text-lg mr-3 font-semibold">
          Grid Size:
        </label>
        <input
          type="number"
          id="gridSize"
          className="border-2 border-gray-600 rounded-full p-2 w-20 text-center text-black font-bold focus:outline-none"
          value={gridSize}
          onChange={(e) => setGridSize(e.target.value)}
          min="2"
          max="8"
        />
      </div>

      {/* Board */}
      <div
        className="grid gap-4 mt-5 mb-5 w-full max-w-sm"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: "1rem" }}
      >
        {cards.map((card, idx) => (
          <div
            onClick={() => handleClick(idx)}
            key={idx}
            className={`aspect-square flex justify-center items-center cursor-pointer text-2xl font-bold rounded-lg transition-all duration-500
        ${
          isFlipped(idx) || isSolved(idx)
            ? "bg-green-500 text-white transform scale-105 shadow-lg"
            : "bg-gray-300 text-gray-500 hover:bg-gray-400 transform hover:scale-105"
        }`}
          >
            {isFlipped(idx) || isSolved(idx) ? card : "?"}
          </div>
        ))}
      </div>

      {/* Result */}
      {won && (
        <div className="mt-4 text-pink-200 text-4xl font-bold animate-pulse">
          {getWinMessage()} You won in {moves} moves!
        </div>
      )}

      {/* Reset Button */}
      <button
        className="bg-blue-700 rounded-full py-2 px-6 mt-4 font-bold text-white hover:bg-blue-800 transition-colors"
        onClick={() => resetGame()}
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default Game;
