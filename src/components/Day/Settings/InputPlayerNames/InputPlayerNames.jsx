import React from "react";
import InputName from "../../../../reComps/InputName/InputName";
import "./inputplayernames.scss";
import { Link } from "react-router-dom";
import stripLeft from "../../../../assets/img/strip-left.svg";

const InputPlayerNames = () => {
  const numOfPlayers = 12;

  const inputComponents = Array.from({ length: numOfPlayers }, (_, index) => (
    <InputName key={index} numOfPlayers={index + 1} />
  ));

  return (
    <div className="IPN_container  main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="input_text">
        <h2>შეიყვანეთ მოთამაშეების სახელები</h2>
      </div>
      <div className="inputs">{inputComponents}</div>
      {/* circles of steps */}
      <div className="prev_next_btn">
        <div className="prev_btn">
          <Link to={"/"}>
            <button>
              <p>უკან</p>
            </button>
          </Link>
        </div>
        <div className="next_btn">
          <Link to={"/input_player_roles"}>
            <button>
              <p>შემდეგი</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputPlayerNames;
