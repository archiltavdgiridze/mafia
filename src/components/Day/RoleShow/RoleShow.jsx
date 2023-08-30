import React from "react";
import "./roleshow.scss";
import { Link } from "react-router-dom";
import mafia from "../../../assets/img/mafia.png";
import don from "../../../assets/img/don.png";
import citizen from "../../../assets/img/citizen.png";
import detective from "../../../assets/img/detektivi.png";
import doctor from "../../../assets/img/doctor.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const RoleShow = () => {
  // array of images
  const images = [mafia, don, citizen, detective, doctor];

  return (
    <div className="RS_container">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="back_to_settings">
        <Link to={"/set_limits"}>
          <button>უკან</button>
        </Link>
      </div>
      <div className="input_text">
        <h2>მოთამაშეები ეცნობიან როლებს</h2>
      </div>
      <div className="msg_4_host">
        <h3>ღამდება, ყველა იძინებს, მოთამაშეები ეცნობიან როლებს.</h3>
      </div>
      <div className="role_card_container">
        <div className="role_card_title">
          <h2>მაფია</h2>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide>
                <img className="role_card" src={image} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RoleShow;
