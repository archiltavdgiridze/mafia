import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faMagnifyingGlass, faGun } from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import Navbar from "../../../reComps/Navbar/Navbar";
import { selectPlayers, selectNight, selectHasRole, setNightTarget } from "../../../redux/gameSlice";

const DON_ROLE_ID = 5;
const MANIAC_ROLE_ID = 6;

const DonChecks = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const night = useSelector(selectNight);
  const hasManiac = useSelector(selectHasRole(MANIAC_ROLE_ID));

  const donPlayer = players.filter((p) => p.roleId === DON_ROLE_ID);
  const targetablePlayers = players.filter(
    (p) => p.isAlive && p.roleId !== DON_ROLE_ID
  );

  const targetSelected = night.don != null;

  const toggleCheckStatus = (playerId) => {
    if (targetSelected) return;
    dispatch(setNightTarget({ role: "don", targetId: playerId }));
  };

  const confirmUndoCheck = (playerId) => {
    if (window.confirm("გსურთ გააუქმოთ ეს შემოწმება?")) {
      dispatch(setNightTarget({ role: "don", targetId: null }));
    }
  };

  const killerPlays = hasManiac ? "/night/killer_kills" : "/night/summary";

  return (
    <div className="MS_container night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"დონი გადაამოწმებს"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {donPlayer.map((player) => (
                <tr key={player.id}>
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    <p>{player.roleName}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="non_action_players">
          <table>
            <tbody>
              {targetablePlayers.map((player) => (
                <tr
                  key={player.id}
                  className={player.id === night.don ? "disabled_row" : ""}
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {player.id === night.don ? (
                      <>
                        <button onClick={() => confirmUndoCheck(player.id)}>
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                          <FontAwesomeIcon icon={faGun} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleCheckStatus(player.id)}
                        disabled={targetSelected}
                        className={targetSelected ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
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
        linkBack={"/night/cop_checks"}
        linkForward={killerPlays}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default DonChecks;
