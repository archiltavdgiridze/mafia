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
  const inputComponents = Array.from({ length: numOfPlayers }, (_, index) => (
    <InputName key={index} numOfPlayers={index + 1} />
  ));

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
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="IPN_container  main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <Msg4Host message={"შეიყვანეთ მოთამაშეების სახელები"} />
      <div className="inputs">
        <form ref={formOfInps} onSubmit={onSubmit}>
          {inputComponents}
        </form>
      </div>
      {/* circles of steps */}
      <PrevNextBtn
        linkBack={"/"}
        linkForward={"/input_player_roles"}
        addBtnClass={"day"}
      />
    </div>
  );
};

export default InputPlayerNames;
