import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./roleshow.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
// role card images
import mafia from "../../../assets/img/mafia.png";
import don from "../../../assets/img/don.png";
import citizen from "../../../assets/img/citizen.png";
import detective from "../../../assets/img/detektivi.png";
import doctor from "../../../assets/img/doctor.png";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";

const RoleShow = () => {
  // Retrieve and Filter Player Names
  const storedPlayerNames = JSON.parse(sessionStorage.getItem("playerNames"));
  // Retrieve the player counter from the inputPlayerName counter
  const storedPlayerCounter = JSON.parse(
    sessionStorage.getItem("playerCounter")
  );
  const filteredPlayerNames = storedPlayerNames.filter(
    (name) => name !== null && name.trim() !== ""
  );

  // this 4 objects are because the min number of players is 6
  const roleData = [
    { roleName: "მოქალაქე", roleImg: citizen },
    { roleName: "მოქალაქე", roleImg: citizen },
    { roleName: "მოქალაქე", roleImg: citizen },
    { roleName: "დეტექტივი", roleImg: detective },
  ];

  // a switch statement to assign roles based on the number of players which is retrieved from the sessionStorage
  switch (storedPlayerCounter) {
    case 6:
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      break;
    case 7:
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "დონი", roleImg: don });
      break;
    case 8:
      roleData.push({ roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "დონი", roleImg: don });
      break;
    case 9:
      roleData.push({ roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "დონი", roleImg: don });
      break;
    case 10:
      roleData.push({ roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "დონი", roleImg: don });
      break;
    case 11:
      roleData.push({ roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleName: "დონი", roleImg: don });
      break;
    default:
      break;
  }

  console.log(roleData);

  // 3. Assign Roles Randomly (Only on Initial Render)
  const [assignedRoles] = useState(() => {
    const shuffledRoles = shuffleArray(roleData);
    const roles = [];

    // Assign roles based on the desired distribution
    for (let i = 0; i < filteredPlayerNames.length; i++) {
      const role = shuffledRoles.pop();
      roles.push({
        name: filteredPlayerNames[i],
        role: role.roleName,
        role_img: role.roleImg,
      });
    }

    return roles;
  });

  // 4. useState Hooks
  const [activeIndex, setActiveIndex] = useState(0);
  const [morningButton, setMorningButton] = useState(false);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setMorningButton(swiper.isEnd);
  };

  const handleLastIndex = () => {
    setMorningButton(true);
  };

  // Shuffle array helper function
  function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <div className="RS_container main_content_wrapper">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <Msg4Host
        message={"ღამდება, ყველა იძინებს, მოთამაშეები ეცნობიან როლებს."}
      />

      <div className="card_wrapper">
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
              {assignedRoles.map((data, index) => (
                <SwiperSlide key={index}>
                  {activeIndex === index && <p>{data.name}</p>}
                  <div className="card_container">
                    <img
                      className="role_card"
                      src={data.role_img}
                      alt={`Slide ${index}`}
                    />
                    {activeIndex === index && <p>{data.role}</p>}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="prev_next_btn">
        <div className="back_btn">
          <Link to={"/set_limits"}>
            <button>უკან</button>
          </Link>
        </div>
        <div className="morning_btn">
          <Link to={"/talk_time"}>
            <button
              className={`morning_button  ${
                morningButton ? "enabled" : "disabled"
              }`}
              disabled={!morningButton}
            >
              გათენდა
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleShow;
