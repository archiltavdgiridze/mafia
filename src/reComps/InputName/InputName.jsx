import React from "react";
import "./inputname.scss";

const InputName = ({ numOfPlayers }) => {
  return (
    <div className="input_container">
      <p>მოთამაშე {numOfPlayers}</p>
      {numOfPlayers <= 6 ?
        <input required type="text" placeholder="ჩაწერე სახელი (აუც.)" />
        :
        <input type="text" placeholder="ჩაწერე სახელი" />}
    </div>
  );
};

export default InputName;
