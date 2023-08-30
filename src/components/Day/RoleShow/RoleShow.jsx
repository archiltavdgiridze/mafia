import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./roleshow.scss";

// role card images
import mafia from "../../../assets/img/mafia.png";
import don from "../../../assets/img/don.png";
import citizen from "../../../assets/img/citizen.png";
import detective from "../../../assets/img/detektivi.png";
import doctor from "../../../assets/img/doctor.png";
import click from '../../../assets/img/click.png'
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const RoleShow = () => {
  const roleData = [
    { name: "" },
    { name: "მოთამაშე1", roleName: "მაფია", url: mafia },
    { name: "" },
    { name: "მოთამაშე2", roleName: "დონი", url: don },
    { name: "" },
    { name: "მოთამაშე3", roleName: "მოქალაქე", url: citizen },
    { name: "" },
    { name: "მოთამაშე4", roleName: "დეტექტივი", url: detective },
    { name: "" },
    { name: "მოთამაშე5", roleName: "ექიმი", url: doctor },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [morningButton, setMorningButton] = useState(false);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setMorningButton(swiper.isEnd);
  };

  const handleLastIndex = () => {
    setMorningButton(true);
  };

  return (
    <div className="RS_container">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="nav_btns">
        <div className="back_to_settings">
          <Link to={"/set_limits"}>
            <button>უკან</button>
          </Link>
        </div>
        <div className="morning_btn">
          <Link to={"/talk_time"}>
            <button
              className={`morning_button  ${morningButton ? "enabled" : "disabled"
                }`}
              disabled={!morningButton}
            >
              გათენდა
            </button>
          </Link>
        </div>
      </div>

      <div className="msg_4_host">
        <h3>ღამდება, ყველა იძინებს, მოთამაშეები ეცნობიან როლებს.</h3>
      </div>
      <div className="role_card_container">
        <div className="role_card_title">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onReachEnd={handleLastIndex}
            onSlideChange={handleSlideChange}
          >
            {roleData.map((data, index) => (
              data.name === '' ?
                <SwiperSlide key={index}>
                  {activeIndex === index && <p>{data.name}</p>}
                  <div className="card_container">
                    <img
                      className="role_card"
                      src={click}
                    />
                    {activeIndex === index && <p>{data.roleName}</p>}
                  </div>
                </SwiperSlide> :
                <SwiperSlide key={index}>
                  {activeIndex === index && <p>{data.name}</p>}
                  <div className="card_container">
                    <img
                      className="role_card"
                      src={data.url}
                      alt={`Slide ${index}`}
                    />
                    {activeIndex === index && <p>{data.roleName}</p>}
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>
  );
};

export default RoleShow;
