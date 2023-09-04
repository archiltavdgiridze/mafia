import React, { useEffect, useState } from "react";
import "./talktime.scss";
import { Link } from "react-router-dom";
import CountdownTimer from "../../../reComps/CountdownTimer/CountdownTimer";
import BackArrow from "../../../reComps/BackArrow/BackArrow";

const TalkTime = (isPlaying, toggleTimer) => {
  const [count, setCount] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // State variable to manage the key

  useEffect(() => {
    // Increment the timerKey whenever currentPlayerIndex changes
    setTimerKey((prevKey) => prevKey + 1);
  }, [currentPlayerIndex]);
  // array of players
  const players = [
    {
      id: 1,
      name: "მოთამაშე 1",
    },
    {
      id: 2,
      name: "მოთამაშე 2",
    },
    {
      id: 3,
      name: "მოთამაშე 3",
    },
    {
      id: 4,
      name: "მოთამაშე 4",
    },
    {
      id: 5,
      name: "მოთამაშე 5",
    },
  ];

  const handlePreviousPlayer = () => {
    if (currentPlayerIndex < 1) {
      return;
    }
    const prevIndex = (currentPlayerIndex - 1) % players.length;
    setCurrentPlayerIndex(prevIndex);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex > players.length - 2) {
      return;
    }
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
  };

  return (
    <div className="TT_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <BackArrow backLink={"/role_show"} />
      <div className="speaker_name msg_4_host">
        <h2>საუბრობს {players[currentPlayerIndex].name}</h2>
      </div>
      <CountdownTimer key={timerKey} />
      <div className="player_select">
        <button className="prev_player" onClick={handlePreviousPlayer}>
          <p>წინა</p>
        </button>
        <button className="next_player" onClick={handleNextPlayer}>
          <p>რიგშია მოთ.{[currentPlayerIndex + 2]}</p>
        </button>
      </div>
      <div className="next_component">
        <Link to={"/night/role_queue"}>
          <button>დაღამდა</button>
        </Link>
      </div>
    </div>
  );
};

export default TalkTime;
