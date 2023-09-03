import React from "react";
import { Link } from "react-router-dom";
import "./backarrow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackArrow = ({ backLink }) => {
  return (
    <div className="back_to_settings">
      <Link to={backLink}>
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </Link>
    </div>
  );
};

export default BackArrow;
