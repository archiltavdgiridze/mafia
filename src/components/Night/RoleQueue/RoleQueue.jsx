import React from "react";
import "./rolequeue.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const RoleQueue = () => {
  return (
    <div className="RQ_container main_content_wrapper night_theme">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <div className="back_to_settings">
        <Link to={"/talk_time"}>
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
      </div>
      <div className="role_queue">
        <h3 className="queue_title">როლების რიგი ღამით</h3>
      </div>
      <div className="role_list">
        <div className="role">
          <p>მაფია გაისვრის</p>
        </div>
        <div className="role">
          <p>ექიმი იცავს</p>
        </div>
        <div className="role">
          <p>დეტექტივი ეძებს</p>
        </div>
        <div className="role">
          <p>დონი ეძებს</p>
        </div>
        <div className="role">
          <p>ქილერი კლავს</p>
        </div>
      </div>
      <div className="start_night_btn">
        <button>ღამის დაწყება</button>
      </div>
    </div>
  );
};

export default RoleQueue;
