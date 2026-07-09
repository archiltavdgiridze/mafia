import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import Navbar from "../../../reComps/Navbar/Navbar";
import {
  selectPhase,
  selectPlayers,
  selectLastLogEntry,
  selectWinner,
  resolveNight,
  goToDay,
} from "../../../redux/gameSlice";

const Summary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phase = useSelector(selectPhase);
  const players = useSelector(selectPlayers);
  const lastLog = useSelector(selectLastLogEntry);
  const winner = useSelector(selectWinner);

  useEffect(() => {
    if (phase === "night") {
      dispatch(resolveNight());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!lastLog) {
    return null;
  }

  const deadPlayers = lastLog.deaths
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean);

  const handleNextDay = () => {
    dispatch(goToDay());
    navigate("/talk_time");
  };

  return (
    <div className="night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"დილა დადგა"} addClassname={"night_msg_4_host"} />

      <div className="summary_section">
        <h3>ღამით დაიღუპა:</h3>
        {deadPlayers.length === 0 ? (
          <p>ამ ღამით არავინ დაღუპულა</p>
        ) : (
          <ul>
            {deadPlayers.map((p) => (
              <li key={p.id}>
                {p.name} ({p.roleName})
              </li>
            ))}
          </ul>
        )}
      </div>

      {lastLog.copCheck && (
        <div className="summary_section">
          <h3>დეტექტივის შემოწმება (მხოლოდ წამყვანისთვის):</h3>
          <p>
            {lastLog.copCheck.name} — {lastLog.copCheck.roleName}
          </p>
        </div>
      )}

      {lastLog.donCheck && (
        <div className="summary_section">
          <h3>დონის შემოწმება (მხოლოდ წამყვანისთვის):</h3>
          <p>
            {lastLog.donCheck.name} — {lastLog.donCheck.roleName}
          </p>
        </div>
      )}

      {winner ? (
        <div className="summary_section winner_banner">
          <h2>
            {winner === "mafia"
              ? "მაფია გაიმარჯვა!"
              : "მშვიდობის მოქალაქეები გაიმარჯვეს!"}
          </h2>
        </div>
      ) : (
        <div className="prev_next_btn">
          <div className="morning_btn">
            <button className="night" onClick={handleNextDay}>
              შემდეგი დღე
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
