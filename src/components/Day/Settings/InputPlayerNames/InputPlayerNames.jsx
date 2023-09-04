// InputPlayerNames.js
import React, { useRef, useState } from "react";
import InputName from "../../../../reComps/InputName/InputName";
import "./inputplayernames.scss";
import { Link } from "react-router-dom";
import stripLeft from "../../../../assets/img/strip-left.svg";
import Msg4Host from "../../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../../reComps/PrevNextBtn/PrevNextBtn";

const InputPlayerNames = () => {
  const numOfPlayers = 12;
  const formOfInps = useRef();
  const [isFormValid, setIsFormValid] = useState(false); // Initialize form validity state
  const [playerNames, setPlayerNames] = useState(Array(numOfPlayers)); // Initialize an array to hold player names

  console.log(playerNames);

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Perform your form validation logic here
    // For example, check if all required fields are filled
    const isAllFieldsValid = Array.from(formOfInps.current.elements).every(
      (element) => {
        return !element.required || element.value.trim() !== "";
      }
    );
    setIsFormValid(isAllFieldsValid);

    if (isAllFieldsValid) {
      // Submit the form if all fields are valid
      formOfInps.current.submit();
    } else {
      alert("Please fill out all required fields.");
    }

    if (isAllFieldsValid) {
      // Save playerNames to sessionStorage
      sessionStorage.setItem("playerNames", JSON.stringify(playerNames));

      // Navigate to the game session route
      window.location.href = "/game-session"; // You can also use <Link to="/game-session" /> here if it's wrapped in a Router component
    } else {
      alert("Please fill out all required fields.");
    }
  };

  // Function to handle "next_btn" click
  const handleNextButtonClick = () => {
    // Save playerNames to sessionStorage
    sessionStorage.setItem("playerNames", JSON.stringify(playerNames));

    // Redirect to the next step using react-router-dom's Link
    // Change "/input_player_roles" to the appropriate route
    // You can also use history.push() to navigate programmatically if you have access to the router's history
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="IPN_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <Msg4Host message={"შეიყვანეთ მოთამაშეების სახელები"} />
      <p>* ჯერჯერობით მუშაობს მხოლოდ 8 მოთამაშეზე / 04.09</p>
      <div className="inputs">
        <form ref={formOfInps} onSubmit={onSubmit}>
          {Array.from({ length: numOfPlayers }, (_, index) => (
            <InputName
              key={index}
              numOfPlayers={index + 1}
              playerName={playerNames[index]} // Pass the corresponding name from playerNames
              setPlayerName={(name) =>
                setPlayerNames((prevNames) => {
                  const updatedNames = [...prevNames];
                  updatedNames[index] = name;
                  console.log(updatedNames);
                  return updatedNames;
                })
              }
            />
          ))}
        </form>
      </div>
      {/* circles of steps */}
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
