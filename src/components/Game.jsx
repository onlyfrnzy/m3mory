import React, { useEffect, useState } from "react";
const Game = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const totalPairs = Math.floor(totalCards / 2);
    const numbers = Array(totalPairs)
      .fill(0)
      .map((_, idx) => idx + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((number, idx) => ({
        id: idx,
        number,
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  const resetGame = () => {
    initializeGame();
  };

  const handleCardClick = (card) => {
    if (disabled || won) return;
    if (flipped.length == 0) {
      setFlipped([card]);
    }
    if (card == flipped[0]) {
      setSolved([...solved, card, flipped[0]]);
    }
    setFlipped([...flipped, card]);
  };

  const isFlipped = (card) => {
    return flipped.includes(card);
  };

  const isSolved = (card) => {
    solved.includes(card);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Do You Remember</h1>
      <div>
        <label htmlFor="gridSize" className="mr-6">
          Grid Size (max 10) :
        </label>
        <input
          type="number"
          className="border-2 p-2 mb-4 rounded-full border-gray-300"
          value={gridSize}
          id="gridSize"
          min="2"
          max="10"
          onChange={(e) => setGridSize(e.target.value)}
        />
      </div>

      {/* Board */}
      <div className={`grid gap-2 mb-4 grid-cols-${gridSize}`}>
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className={`flex items-center justify-center cursor-pointer h-12 w-12 rounded-md transition-all 
                duration-500 text-xl font-bold p-10 hover:bg-gray-400 ${
                  isSolved(card)
                    ? "bg-green-400 text-white"
                    : isFlipped(card)
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => handleCardClick(card)}
            >
              {flipped.includes(card) || solved.includes(card)
                ? card.number
                : "?"}
            </div>
          );
        })}
      </div>

      {/* Reset or Play Again*/}
      <button
        className="bg-green-700 p-3 rounded-full"
        onClick={() => resetGame()}
      >
        Reset
      </button>
    </div>
  );
};

export default Game;
