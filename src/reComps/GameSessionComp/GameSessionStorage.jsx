import React, { useState, useEffect } from "react";

const GameSessionStorage = () => {
  const [playerNames, setPlayerNames] = useState([]);

  useEffect(() => {
    // Retrieve the player names from sessionStorage when the component mounts
    const storedPlayerNames = JSON.parse(sessionStorage.getItem("playerNames"));

    if (storedPlayerNames) {
      setPlayerNames(storedPlayerNames);
    }
    console.log(storedPlayerNames);
  }, []);

  // Render the player names in your game session
  const renderPlayerNames = () => {
    return playerNames.map((name, index) => (
      <div key={index}>
        Player {index + 1}: {name}
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
