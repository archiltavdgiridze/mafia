// InputName.js
import React from "react";
import "./inputname.scss";

const InputName = ({ playerCounter, playerName, setPlayerName }) => {
  const handleChange = (e) => {
    setPlayerName(e.target.value); // Update the player name in the parent component
    console.log(playerName);
  };

  return (
    <div className="input_container">
      <p>მოთამაშე {playerCounter}</p>
      {playerCounter <= 6 ? (
        <input
          required
          type="text"
          placeholder="ჩაწერე სახელი (აუც.)"
          value={playerName} // Bind the value to the playerName prop
          onChange={handleChange} // Handle input changes
        />
      ) : (
        <input
          type="text"
          placeholder="ჩაწერე სახელი"
          value={playerName} // Bind the value to the playerName prop
          onChange={handleChange} // Handle input changes
        />
      )}
    </div>
  );
};

export default InputName;
