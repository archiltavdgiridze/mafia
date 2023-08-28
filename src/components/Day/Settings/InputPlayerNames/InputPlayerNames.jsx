import React from "react";
import InputName from "../../../../reComps/InputName/InputName";
import "./inputplayernames.scss";
import { Link } from "react-router-dom";

const InputPlayerNames = () => {
  const numOfPlayers = 10;

  const inputComponents = Array.from({ length: numOfPlayers }, (_, index) => (
    <InputName key={index} numOfPlayers={index + 1} />
  ));

  return (
    <div className="IPN_container">
      <div className="title">
        <h1>
          <Link to={"/"}>მაფია</Link>
        </h1>
      </div>
      <div className="input_text">
        <h2>შეიყვანეთ მოთამაშეების სახელები</h2>
      </div>
      <div className="inputs">{inputComponents}</div>
      {/* circles of steps */}
      <div className="prev_next_btn">
        <div className="prev_btn">
          <Link to={"/"}>
            <button>უკან</button>
          </Link>
        </div>
        <div className="next_btn">
          <Link to={"/input_player_roles"}>
            <button>შემდეგი</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputPlayerNames;
