import React, { useState, useEffect } from "react";

const GameSessionStorage = () => {
  const [playerNames, setPlayerNames] = useState([]);
  const [playerCounter, setPlayerCounter] = useState(6); // Initialize a counter to keep track of the number of players

  useEffect(() => {
    // Retrieve the player names from sessionStorage when the component mounts
    const storedPlayerNames = JSON.parse(sessionStorage.getItem("playerNames"));
    const storedPlayerCounter = JSON.parse(
      sessionStorage.getItem("playerCounter")
    );

    if (storedPlayerNames) {
      setPlayerNames(storedPlayerNames);
    }

    if (storedPlayerCounter) {
      setPlayerCounter(storedPlayerCounter);
    }
  }, []);

  console.log(playerCounter);

  // Render the player names in your game session
  const renderPlayerNames = () => {
    return playerNames.map((name, index) => (
      <div key={index}>
        მოთამაშე {index + 1}: {name}
      </div>
    ));
  };

  return (
    <div>
      <h1>Game Session</h1>
      <h2>Player Names</h2>
      {renderPlayerNames()}
    </div>
  );
};

export default GameSessionStorage;
