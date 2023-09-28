import React from "react";
import "./setlimits.scss";
import RangeSlider from "../../../../reComps/RangeSlider/RangeSlider";
import Msg4Host from "../../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "./../../../../reComps/PrevNextBtn/PrevNextBtn";

const SetLimits = () => {
  // Define unique names for each slider
  const talkTimeSliderName = "talkTime";
  const defenceTimeSliderName = "defenceTime";
  const foulLimitSliderName = "foulLimit";

  return (
    <div className="SL_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <Msg4Host message={"მონიშნეთ ლიმიტები"} />
      <div className="limits">
        <div className="talk_time">
          <h2>სასაუბრო დრო</h2>
          <RangeSlider min={20} max={60} step={10} name={talkTimeSliderName} />
        </div>
        <div className="defence_time">
          <h2>თავის დაცვის დრო</h2>
          <RangeSlider
            min={20}
            max={60}
            step={10}
            name={defenceTimeSliderName}
          />
        </div>
        <div className="foul_quantity">
          <h2>ფოლების რაოდენობა</h2>
          <RangeSlider min={2} max={4} step={1} name={foulLimitSliderName} />
        </div>
        
      </div>
      <PrevNextBtn
        linkBack={"/input_player_roles"}
        linkForward={"/role_show"}
        addBtnClass={"day"}
      />
    </div>
  );
};

export default SetLimits;
