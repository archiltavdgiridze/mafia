import React, { useState } from "react";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faSkull,
  faBookSkull,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import BackArrow from "../../../reComps/BackArrow/BackArrow";
import Navbar from "../../../reComps/Navbar/Navbar";

const KillerKills = () => {
  const [checkedPlayers, setCheckedPlayers] = useState({});
  const [checkIsDone, setCheckIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true); // State to track if Undo buttons should be disabled

  const playerAndRole = JSON.parse(sessionStorage.getItem("assignedRoles"));

  const killerPlayer = [];
  const otherPlayers = [];

  for (let i = 0; i < playerAndRole.length; i++) {
    if (playerAndRole[i].role === "მანიაკი") {
      killerPlayer.push(playerAndRole[i]);
    } else {
      otherPlayers.push(playerAndRole[i]);
    }
  }

  const toggleCheckStatus = (playerName) => {
    if (!checkIsDone) {
      setCheckedPlayers((prevCheckedPlayers) => {
        const updatedCheckedPlayers = { ...prevCheckedPlayers };
        if (updatedCheckedPlayers[playerName]) {
          delete updatedCheckedPlayers[playerName];
          setUndoDisabled(true);
        } else {
          updatedCheckedPlayers[playerName] = true;
          setCheckIsDone(true);
          setUndoDisabled(false);
        }
        return updatedCheckedPlayers;
      });
    }
  };

  const confirmUndoCheck = (playerName) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerName}–ის მკვლელობა?`)) {
      setCheckedPlayers((prevCheckedPlayers) => {
        const updatedCheckedPlayers = { ...prevCheckedPlayers };
        delete updatedCheckedPlayers[playerName];

        setUndoDisabled(true);
        setCheckIsDone(false);
        return updatedCheckedPlayers;
      });
    }
  };

  return (
    <div className="MS_container night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"ქილერი მოკლავს"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {killerPlayer.map((player, index) => (
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
              {otherPlayers.map((player, index) => (
                <tr
                  key={index}
                  className={checkedPlayers[player.name] ? "disabled_row" : ""}
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {checkedPlayers[player.name] ? (
                      <>
                        <button
                          onClick={() => confirmUndoCheck(player.name)}
                          disabled={undoDisabled}
                          className={undoDisabled ? "disabled_btn" : ""}
                        >
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={faSkull} />
                          <FontAwesomeIcon icon={faBookSkull} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleCheckStatus(player.name)}
                        disabled={checkIsDone}
                        className={checkIsDone ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={faSkull} />
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
        linkBack={"/night/don_checks"}
        linkForward={"/night/summary"}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default KillerKills;
