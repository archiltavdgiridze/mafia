import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGun,
  faRotateLeft,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import Navbar from "../../../reComps/Navbar/Navbar";
import {
  selectPlayers,
  selectNight,
  selectHasRole,
  setNightTarget,
  MAFIA_ROLE_IDS,
} from "../../../redux/gameSlice";

const DOCTOR_ROLE_ID = 3;

const MafiaShoots = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const night = useSelector(selectNight);
  const hasDoctor = useSelector(selectHasRole(DOCTOR_ROLE_ID));

  const mafiaPlayers = players.filter((p) => MAFIA_ROLE_IDS.includes(p.roleId));
  const targetablePlayers = players.filter(
    (p) => !MAFIA_ROLE_IDS.includes(p.roleId) && p.isAlive
  );

  const targetSelected = night.mafia != null;

  const toggleKillStatus = (playerId) => {
    if (targetSelected) return;
    dispatch(setNightTarget({ role: "mafia", targetId: playerId }));
  };

  const confirmUndoKill = (playerId) => {
    const isConfirmed = window.confirm("გსურთ გააუქმოთ ეს გასროლა?");
    if (isConfirmed) {
      dispatch(setNightTarget({ role: "mafia", targetId: null }));
    }
  };

  const docPlays = hasDoctor ? "/night/doc_saves" : "/night/cop_checks";

  return (
    <div className="night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"მაფია გაისვრის"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {mafiaPlayers.map((data) => (
                <tr key={data.id}>
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>
                    <p>{data.roleName}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="non_action_players">
          <table>
            <tbody>
              {targetablePlayers.map((data) => (
                <tr
                  key={data.id}
                  className={data.id === night.mafia ? "disabled_row" : ""}
                >
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>
                    {data.id === night.mafia ? (
                      <>
                        <button onClick={() => confirmUndoKill(data.id)}>
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={faGun} />
                          <FontAwesomeIcon icon={faSkullCrossbones} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleKillStatus(data.id)}
                        disabled={targetSelected}
                        className={targetSelected ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={faGun} />
                        </p>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PrevNextBtn
        linkBack={"/night/role_queue"}
        linkForward={docPlays}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default MafiaShoots;
