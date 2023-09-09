import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "./dropdownmenu.scss";
import Fouls from "../fouls/Fouls";

const DropdownMenu = ({ toggleDropdown, isDropdownVisible }) => {
  return (
    <div className={`dropdown_menu ${isDropdownVisible ? "active" : "hidden"}`}>
      <button>
        <Fouls />
      </button>
      <button>
        <FontAwesomeIcon icon={faSquarePollVertical} />
      </button>
    </div>
  );
};

export default DropdownMenu;
