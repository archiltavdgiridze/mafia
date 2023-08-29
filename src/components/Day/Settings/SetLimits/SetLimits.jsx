import React from "react";
import { Link } from "react-router-dom";
import "./setlimits.scss";
import RangeSlider from "../../../../reComps/RangeSliderWithImg/RangeSlider";

const SetLimits = () => {
  return (
    <div className="SL_container">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="input_text">
        <h2>მონიშნე ლიმიტები</h2>
      </div>
      <div className="limits">
        <div className="talk_time">
          <h2>სასაუბრო დრო</h2>
          <RangeSlider min={20} max={60} step={10} />
        </div>
        <div className="defence_time">
          <h2>თავის დაცვის დრო</h2>
          <RangeSlider min={20} max={60} step={10} />
        </div>
        <div className="foul_quantity">
          <h2>ფოლების რაოდენობა</h2>
          <RangeSlider min={2} max={4} step={1} />
        </div>
      </div>
      <div className="prev_next_btn">
        <div className="prev_btn">
          <Link to={"/input_player_roles"}>
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

export default SetLimits;
