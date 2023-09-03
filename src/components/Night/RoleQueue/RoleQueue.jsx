import React from "react";
import "./rolequeue.scss";
import { Link } from "react-router-dom";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import BackArrow from "../../../reComps/BackArrow/BackArrow";

const RoleQueue = () => {
  return (
    <div className="RQ_container main_content_wrapper night_theme">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <BackArrow backLink={"/talk_time"} />
      <Msg4Host
        message={"როლების რიგი ღამით"}
        addClassname={"night_msg_4_host"}
      />
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
        <Link to={"/night/mafia_shoots"}>
          <button>ღამის დაწყება</button>
        </Link>
      </div>
    </div>
  );
};

export default RoleQueue;
