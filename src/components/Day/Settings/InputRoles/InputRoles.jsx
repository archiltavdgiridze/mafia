import React from "react";
import { Link } from "react-router-dom";
import "./inputroles.scss";
import RoleNames from "../../../../reComps/RoleNames/RoleNames";

const InputRoles = () => {
  return (
    <div className="IR_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="input_text">
        <h2>აირჩიეთ როლები</h2>
      </div>
      <div className="role_names">
        <RoleNames />
      </div>
      <div className="prev_next_btn">
        <div className="prev_btn">
          <Link to={"/input_player_names"}>
            <button>
              <p>უკან</p>
            </button>
          </Link>
        </div>
        <div className="next_btn">
          <Link to={"/set_limits"}>
            <button>
              <p>შემდეგი</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputRoles;
