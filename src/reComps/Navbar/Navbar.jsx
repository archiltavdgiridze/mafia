import React from "react";
import BackArrow from "../BackArrow/BackArrow";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const Navbar = ({ toggleDropdown, isDropdownVisible }) => {
  return (
    <div className="navbar">
      <BackArrow backLink={"/role_show"} />
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <button className="dropdown_menu_btn" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBarsStaggered} />
        <DropdownMenu isDropdownVisible={isDropdownVisible} />
      </button>
    </div>
  );
};

export default Navbar;
