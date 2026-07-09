import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faHeart, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import Navbar from "../../../reComps/Navbar/Navbar";
import { selectPlayers, selectNight, setNightTarget } from "../../../redux/gameSlice";

const DOCTOR_ROLE_ID = 3;

const DocSaves = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const night = useSelector(selectNight);

  const docPlayer = players.filter((p) => p.roleId === DOCTOR_ROLE_ID);
  const targetablePlayers = players.filter((p) => p.isAlive);

  const targetSelected = night.doctor != null;

  const toggleHealStatus = (playerId) => {
    if (targetSelected) return;
    dispatch(setNightTarget({ role: "doctor", targetId: playerId }));
  };

  const confirmUndoHeal = (playerId) => {
    if (window.confirm("გსურთ გააუქმოთ ეს გადარჩენა?")) {
      dispatch(setNightTarget({ role: "doctor", targetId: null }));
    }
  };

  return (
    <div className="MS_container night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"ექიმი გადაარჩენს"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {docPlayer.map((data) => (
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
                <tr key={data.id}>
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>
                    {data.id === night.doctor ? (
                      <>
                        <button onClick={() => confirmUndoHeal(data.id)}>
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={faUserDoctor} />
                          <FontAwesomeIcon icon={faHeart} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleHealStatus(data.id)}
                        disabled={targetSelected}
                        className={targetSelected ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={faUserDoctor} />
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
        linkBack={"/night/mafia_shoots"}
        linkForward={"/night/cop_checks"}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default DocSaves;
