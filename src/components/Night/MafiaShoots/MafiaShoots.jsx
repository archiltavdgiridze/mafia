import React, { useState } from "react";
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

const MafiaShoots = () => {
  const [killedPlayers, setKilledPlayers] = useState({});
  const [killIsDone, setKillIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);

  const playerAndRole = JSON.parse(sessionStorage.getItem("assignedRoles"));

  const mafiaPlayers = [];
  const notMafia = [];

  for (let i = 0; i < playerAndRole.length; i++) {
    if (
      playerAndRole[i].role === "მაფიოზი" ||
      playerAndRole[i].role === "დონი"
    ) {
      mafiaPlayers.push(playerAndRole[i]);
    } else {
      notMafia.push(playerAndRole[i]);
    }
  }

  const toggleKillStatus = (playerName) => {
    if (!killIsDone) {
      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        if (updatedKilledPlayers[playerName]) {
          delete updatedKilledPlayers[playerName];
          setUndoDisabled(true);
        } else {
          updatedKilledPlayers[playerName] = true;
          setKillIsDone(true);
          setUndoDisabled(false);
        }
        return updatedKilledPlayers;
      });
    }
  };

  const confirmUndoKill = (playerName) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerName}–ის მკვლელობა?`)) {
      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        delete updatedKilledPlayers[playerName];

        setUndoDisabled(true);
        setKillIsDone(false);
        return updatedKilledPlayers;
      });
    }
  };

  return (
    <div className="night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"მაფია გაისვრის"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {mafiaPlayers.map((player, index) => (
                <tr key={index}>
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    <p>{player.role}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="non_action_players">
          <table>
            <tbody>
              {notMafia.map((player, index) => (
                <tr
                  key={index}
                  className={killedPlayers[player.name] ? "disabled_row" : ""}
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {killedPlayers[player.name] ? (
                      <>
                        <button
                          onClick={() => confirmUndoKill(player.name)}
                          disabled={undoDisabled}
                          className={undoDisabled ? "disabled_btn" : ""}
                        >
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
                        onClick={() => toggleKillStatus(player.name)}
                        disabled={killIsDone}
                        className={killIsDone ? "disabled_btn" : ""}
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
        linkForward={"/night/doc_saves"}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default MafiaShoots;
