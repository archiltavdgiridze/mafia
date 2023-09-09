import React from "react";
import { Link } from "react-router-dom";
import "./inputroles.scss";
import RoleNames from "../../../../reComps/RoleNames/RoleNames";
import PrevNextBtn from "../../../../reComps/PrevNextBtn/PrevNextBtn";
import GameSessionStorage from "../../../../reComps/GameSessionComp/GameSessionStorage";
import Fouls from "../../../../reComps/fouls/Fouls";

const InputRoles = () => {
  return (
    <div className="IR_container main_content_wrapper">
      {/* <Fouls /> */}
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="msg_4_host">
        <h2>აირჩიეთ როლები</h2>
      </div>
      <RoleNames />
      <PrevNextBtn
        linkBack={"/input_player_names"}
        linkForward={"/set_limits"}
        addBtnClass={"day"}
      />
    </div>
  );
};

export default InputRoles;
