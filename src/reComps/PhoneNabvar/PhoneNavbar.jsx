import React from "react";
import "./phonenavbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

const PhoneNavbar = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faArrowLeft} />
      <FontAwesomeIcon icon={faHouse} />
      <button>
        ფ
      </button>
      <FontAwesomeIcon icon={faSquarePollVertical} />
    </div>
  );
};

export default PhoneNavbar;
