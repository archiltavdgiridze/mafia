import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./roleshow.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
// role card images
import mafia from "../../../assets/img/roleCards/mafia.webp";
import don from "../../../assets/img/roleCards/don.webp";
import maniac from "../../../assets/img/roleCards/maniac.webp";
import citizen from "../../../assets/img/roleCards/citizen.webp";
import detective from "../../../assets/img/roleCards/detective.webp";
import doctor from "../../../assets/img/roleCards/doctor.webp";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // You can choose a different effect if needed


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

  // 1 მოქალაქე
  // 2 დეტექტივი
  // 3 ექიმი
  // 4 მაფიოზი
  // 5 დონი
  // 6 მანიაკი

  // this 4 objects are because the min number of players is 6
  const roleData = [
    { roleID: 1, roleName: "მოქალაქე", roleImg: citizen },
    { roleID: 1, roleName: "მოქალაქე", roleImg: citizen },
    { roleID: 1, roleName: "მოქალაქე", roleImg: citizen },
    { roleID: 2, roleName: "დეტექტივი", roleImg: detective },
  ];

  // a switch statement to assign roles based on the number of players which is retrieved from the sessionStorage
  switch (storedPlayerCounter) {
    case 6:
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      break;
    case 7:
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      break;
    case 8:
      roleData.push({ roleID: 3, roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      roleData.push({ roleID: 6, roleName: "მანიაკი", roleImg: maniac });
      break;
    case 9:
      roleData.push({ roleID: 3, roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      roleData.push({ roleID: 6, roleName: "მანიაკი", roleImg: maniac });
      break;
    case 10:
      roleData.push({ roleID: 3, roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      roleData.push({ roleID: 6, roleName: "მანიაკი", roleImg: maniac });
      break;
    case 11:
      roleData.push({ roleID: 3, roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      roleData.push({ roleID: 6, roleName: "მანიაკი", roleImg: maniac });
      break;
    case 12:
      roleData.push({ roleID: 3, roleName: "ექიმი", roleImg: doctor });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 1, roleName: "მოქალაქე", roleImg: citizen });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 4, roleName: "მაფიოზი", roleImg: mafia });
      roleData.push({ roleID: 5, roleName: "დონი", roleImg: don });
      roleData.push({ roleID: 6, roleName: "მანიაკი", roleImg: maniac });
      break;
    default:
      break;
  }

  // 3. Assign Roles Randomly (Only on Initial Render)
  const [gameData] = useState(() => {
    const shuffledRoles = shuffleArray(roleData);
    const roles = [];

    // Assign roles based on the desired distribution
    for (let i = 0; i < filteredPlayerNames.length; i++) {
      const role = shuffledRoles.pop();
      roles.push({
        playerInfo: {
          ID: i,
          name: filteredPlayerNames[i],
          roleID: role.roleID,
          role: role.roleName,
          role_img: role.roleImg,
        },
        playerState: {
          isAlive: true,
          isHealed: false,
          isDeadForever: false,
          isCheckedByCop: false,
          isCheckedByDon: false,
        },
      });
    }

    return roles;
  });

  sessionStorage.setItem("gameData", JSON.stringify(gameData));

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
              {gameData.map((data, index) => (
                <SwiperSlide key={index}>
                  {activeIndex === index && <p>{data.playerInfo.name}</p>}
                  <div className="card_container">
                    <LazyLoadImage
                      className="role_card"
                      src={data.playerInfo.role_img}
                      alt={`Slide ${index}`}
                      effect="blur" 
                    />

                    {activeIndex === index && <p>{data.playerInfo.role}</p>}
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
