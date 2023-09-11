import React, { useState, useEffect } from "react";

const GameSessionStorage = () => {
  const [playerAndRole, setPlayerAndRole] = useState([]);

  useEffect(() => {
    // Retrieve the player data from sessionStorage when the component mounts
    const storedPlayerAndRole = JSON.parse(
      sessionStorage.getItem("assignedRoles")
    );

    if (storedPlayerAndRole) {
      setPlayerAndRole(storedPlayerAndRole);
    }
  }, []);

  // Render the player names and roles in your game session
  const renderPlayerNames = () => {
    return playerAndRole.map((player, index) => (
      <div key={index}>
        Player {index + 1}: {player.name} ---- {player.role} ---- {player.isAlive ? "Alive" : "Dead"}
        {/* <img src={player.role_img} alt={`Role Image for Player ${index + 1}`} /> */}
      </div>
    ));
  };

  return (
    <div>
      <h1>Game Session</h1>
      <h2>Player Data</h2>
      {renderPlayerNames()}
    </div>
  );
};

export default GameSessionStorage;
