import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faMagnifyingGlass, faHandcuffs } from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import Navbar from "../../../reComps/Navbar/Navbar";
import { selectPlayers, selectNight, setNightTarget } from "../../../redux/gameSlice";

const COP_ROLE_ID = 2;

const CopChecks = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const night = useSelector(selectNight);

  const copPlayer = players.filter((p) => p.roleId === COP_ROLE_ID);
  const targetablePlayers = players.filter(
    (p) => p.isAlive && p.roleId !== COP_ROLE_ID
  );

  const targetSelected = night.cop != null;

  const toggleCheckStatus = (playerId) => {
    if (targetSelected) return;
    dispatch(setNightTarget({ role: "cop", targetId: playerId }));
  };

  const confirmUndoCheck = (playerId) => {
    if (window.confirm("გსურთ გააუქმოთ ეს შემოწმება?")) {
      dispatch(setNightTarget({ role: "cop", targetId: null }));
    }
  };

  return (
    <div className="MS_container night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"დეტექტივი გადაამოწმებს"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {copPlayer.map((player) => (
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
                  className={player.id === night.cop ? "disabled_row" : ""}
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {player.id === night.cop ? (
                      <>
                        <button onClick={() => confirmUndoCheck(player.id)}>
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                          <FontAwesomeIcon icon={faHandcuffs} />
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
        linkBack={"/night/doc_saves"}
        linkForward={"/night/don_checks"}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default CopChecks;
