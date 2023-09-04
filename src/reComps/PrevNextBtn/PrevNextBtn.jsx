import React from "react";
import { Link } from "react-router-dom";
import "./prevnextbtn.scss";

const PrevNextBtn = ({
  linkBack,
  linkForward,
  addBtnClass,
  onNextButtonClick,
}) => {
  return (
    <div className="prev_next_btn">
      <div className="prev_btn ">
        <Link to={linkBack}>
          <button className={addBtnClass}>
            <p>უკან</p>
          </button>
        </Link>
      </div>
      <div className="next_btn">
        <Link to={linkForward}>
          <button className={addBtnClass} onClick={onNextButtonClick}>
            <p>შემდეგი</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PrevNextBtn;
