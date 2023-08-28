import React from "react";
import "./inputname.scss";

const InputName = ({ numOfPlayers }) => {
  return (
    <div className="input_container">
      <p>მოთამაშე {numOfPlayers}</p>
      <input type="text" placeholder="ჩაწერე სახელი" />
    </div>
  );
};

export default InputName;
