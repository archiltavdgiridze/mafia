import React, { useEffect, useState } from "react";
import "./talktime.scss";
import { Link } from "react-router-dom";
import CountdownTimer from "../../../reComps/CountdownTimer/CountdownTimer";
import Navbar from "../../../reComps/Navbar/Navbar";

const TalkTime = (isPlaying, toggleTimer) => {
  const [count, setCount] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // State variable to manage the key
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const talkTime = sessionStorage.getItem("talkTime");
  const players = JSON.parse(sessionStorage.getItem("playerNames"));
  const activePlayerName = players[count];

  console.log(players);

  useEffect(() => {
    setTimerKey((prevKey) => prevKey + 1);
  }, [activePlayerName]);

  const getActivePlayerIndex = () => {
    return players.findIndex((player) => player === activePlayerName);
  };

  const handlePreviousPlayer = () => {
    const activeIndex = getActivePlayerIndex();
    if (activeIndex > 0) {
      setCount(activeIndex - 1);
    }
  };

  const handleNextPlayer = () => {
    const activeIndex = getActivePlayerIndex();
    if (activeIndex < players.length - 1) {
      setCount(activeIndex + 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="TT_container main_content_wrapper">
      <Navbar
        toggleDropdown={toggleDropdown}
        isDropdownVisible={isDropdownVisible}
      />
      <div className="speaker_name msg_4_host">
        <h2>საუბრობს {activePlayerName}</h2>
      </div>
      <CountdownTimer key={timerKey} duration={talkTime} />
      <div className="player_select">
        <button className="prev_player" onClick={handlePreviousPlayer}>
          <p>წინა</p>
        </button>
        <button className="next_player" onClick={handleNextPlayer}>
          <p>რიგშია {players[count + 1]}</p>
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
