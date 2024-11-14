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
      .map((_, idx) => {
        return idx + 1;
      });
    const shuffledCards = [...cardArr, ...cardArr].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
  };
  const isFlipped = (idx) => {
    return flipped.includes(idx);
  };
  const resetGame = () => {
    initializeGame();
  };

  const handleClick = (idx) => {
    if (disabled || isFlipped(idx) || isSolved(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length == 2) {
      const [firstIndex, secondIndex] = newFlipped;
      setMoves((moves) => moves + 1);
      if (cards[firstIndex] == cards[secondIndex]) {
        setSolved([...solved, firstIndex, secondIndex]);
        // console.log(moves);
      }
      setDisabled(true);
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isSolved = (card) => {
    return solved.includes(card);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length == cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div
      className={
        "flex flex-col items-center justify-center min-h-screen p-4 bg-gray-200"
      }
    >
      {/* Header */}
      <h1 className={`text-3xl font-bold mb-4`}>M3MORY</h1>
      {/* Input */}
      <div>
        <label htmlFor="gridSize">Grid Size :</label>
        <input
          type="number"
          id="gridSize"
          className={`border-2 border-solid border-gray-600 ml-3 rounded-full p-2`}
          value={gridSize}
          onChange={(e) => setGridSize(e.target.value)}
        />
      </div>
      {/* Board */}
      <div
        className={`grid  gap-2 mt-5 mb-5`}
        style={{ gridTemplateColumns: `repeat(${gridSize},1fr)` }}
      >
        {cards.map((card, idx) => {
          return (
            <div
              onClick={() => handleClick(idx)}
              key={idx}
              className={`aspect-square flex justify-center items-center cursor-pointer transition-all duration-600 text-xl font-bold p-10 hover:bg-gray-400 rounded-lg
               ${
                 isFlipped(idx) || isSolved(idx)
                   ? isSolved(idx)
                     ? "bg-green-400 text-white"
                     : "bg-blue-500 text-white"
                   : "bg-gray-300 text-gray-500"
               } 
                `}
            >
              {isFlipped(idx) || isSolved(idx) ? card : "?"}
              {/* {console.log(isFlipped({ card, idx }))} */}
            </div>
          );
        })}
      </div>
      {/* Result */}
      {won ? (
        <div className="mt-4 text-green-600 text-5xl font-bold animate-bounce ">
          You have Won with {moves} Moves
        </div>
      ) : null}
      {/* Reset Button */}
      <button
        className={` bg-blue-600 rounded-full p-3 text-white font-bold mt-3 `}
        onClick={() => resetGame()}
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default Game;
