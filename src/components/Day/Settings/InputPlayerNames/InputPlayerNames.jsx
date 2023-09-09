// InputPlayerNames.js
import React, { useRef, useState, useEffect } from "react";
import InputName from "../../../../reComps/InputName/InputName";
import "./inputplayernames.scss";
import Msg4Host from "../../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../../reComps/PrevNextBtn/PrevNextBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PhoneNavbar from "../../../../reComps/PhoneNabvar/PhoneNavbar";

const InputPlayerNames = () => {
  // const numOfPlayers = 12;
  const formOfInps = useRef();
  const [isFormValid, setIsFormValid] = useState(false); // Initialize form validity state
  // const [playerNames, setPlayerNames] = useState(Array(numOfPlayers)); // Initialize an array to hold player names
  const [playerCounter, setPlayerCounter] = useState(6); // Initialize a counter to keep track of the number of players
  const [playerNames, setPlayerNames] = useState(Array(playerCounter)); // Initialize an array to hold player names

  // When the component mounts, check if playerCounter is stored in sessionStorage
  const [storedPlayerCounter, setStoredPlayerCounter] = useState(6);

  // When the component mounts, check if playerCounter is stored in sessionStorage
  useEffect(() => {
    const storedNames = JSON.parse(sessionStorage.getItem("playerNames"));
    const storedCounter = JSON.parse(sessionStorage.getItem("playerCounter"));

    if (storedCounter === null) {
      // playerCounter is not in sessionStorage, set it to the default value
      sessionStorage.setItem("playerCounter", JSON.stringify(6));
    } else {
      // playerCounter is in sessionStorage, update the state and storedPlayerCounter
      setPlayerCounter(storedCounter);
      setStoredPlayerCounter(storedCounter);
      if (storedNames) {
        setPlayerNames(storedNames);
      }
    }
  }, []);

  const minPlayerCount = 6;
  const maxPlayerCount = 12;

  const handleSubmit = (e) => {
    const isAllFieldsValid = Array.from(formOfInps.current.elements).every(
      (element) => {
        return !element.required || element.value.trim() !== "";
      }
    );
    setIsFormValid(isAllFieldsValid);

    if (isAllFieldsValid) {
      formOfInps.current.submit();
    } else {
      alert("Please fill out all required fields.");
    }

    if (isAllFieldsValid) {
      // Save playerCounter to sessionStorage
      sessionStorage.setItem("playerCounter", JSON.stringify(playerCounter));
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleNextButtonClick = () => {
    sessionStorage.setItem("playerNames", JSON.stringify(playerNames));
    // Save playerCounter to sessionStorage
    sessionStorage.setItem("playerCounter", JSON.stringify(playerCounter));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (index, name) => {
    setPlayerNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = name;
      return updatedNames;
    });
  };

  return (
    <div className="IPN_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      {/* <PhoneNavbar /> */}
      <Msg4Host message={"შეიყვანეთ მოთამაშეების სახელები"} />
      <div className="inputs">
        <div className="player_count_btn_container">
          <p>
            აირჩიე რაოდენობა {minPlayerCount}-{maxPlayerCount}
          </p>
          <div className="player_count">
            <div className="player_count_btns">
              <button
                className="player_count_btn"
                onClick={() => {
                  if (playerCounter > minPlayerCount) {
                    setPlayerCounter(playerCounter - 1);
                    sessionStorage.setItem(
                      "playerCounter",
                      JSON.stringify(playerCounter - 1)
                    );
                    setStoredPlayerCounter(playerCounter - 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button
                className="player_count_btn"
                onClick={() => {
                  if (playerCounter < maxPlayerCount) {
                    setPlayerCounter(playerCounter + 1);
                    // Update the stored playerCounter value
                    sessionStorage.setItem(
                      "playerCounter",
                      JSON.stringify(playerCounter + 1)
                    );
                    setStoredPlayerCounter(playerCounter + 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <p>არჩეულია {storedPlayerCounter}</p>
          </div>
        </div>
        <form ref={formOfInps} onSubmit={onSubmit}>
          {Array.from({ length: storedPlayerCounter }, (_, index) => (
            <InputName
              key={index}
              playerCounter={index + 1}
              playerName={playerNames[index]}
              setPlayerName={(name) => handleNameChange(index, name)}
            />
          ))}
        </form>
      </div>
      <PrevNextBtn
        linkBack={"/"}
        linkForward={"/input_player_roles"}
        addBtnClass={"day"}
        onNextButtonClick={handleNextButtonClick}
      />
    </div>
  );
};

export default InputPlayerNames;
