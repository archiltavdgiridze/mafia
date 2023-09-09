import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./countdowntimer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const CountdownTimer = ({ key, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTextColor, setRemainingTextColor] = useState("#fff");

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setRemainingTextColor("#fff");
  }, [isPlaying]);

  return (
    <div className="CT_container">
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        style={{ fontSize: "30px" }}
        colors={["#000"]}
        background="#000"
      >
        {({ remainingTime }) => (
          <span
            style={{
              color: remainingTextColor,
              fontSize: "4rem",
              padding: "12px 0 0 ",
            }}
          >
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>

      <button className="timer_buttons" onClick={toggleTimer}>
        {isPlaying ? (
          <FontAwesomeIcon
            className="pause_btn"
            icon={faPause}
            flip="horizontal"
            onClick={toggleTimer}
          />
        ) : (
          <FontAwesomeIcon
            className="play_btn"
            icon={faPlay}
            onClick={toggleTimer}
          />
        )}
      </button>
    </div>
  );
};

export default CountdownTimer;
