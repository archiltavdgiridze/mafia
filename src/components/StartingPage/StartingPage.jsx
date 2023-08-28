import React from "react";
import "./startingpage.scss";
import mafiaDude from "../../assets/img/mafia_dude.svg";
import bullet from "../../assets/img/bullet.svg";
import gear from "../../assets/img/gear.svg";

const StartingPage = () => {
  return (
    <div className="start_container">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="mafia_dude">
        <img src={mafiaDude} alt="" />
      </div>
      <div className="start_btn">
        <div className="start">
          <button>
            <div className="start_icons">
              <img src={bullet} alt="" />
            </div>
            <p>დაწყება</p>
          </button>
        </div>
        <div className="about_us">
          <button>
            <div className="start_icons">
              <img src={gear} alt="" />
            </div>
            <p>ჩვენს შესახებ</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartingPage;
