import React, { useState, useEffect } from "react";
import "../../../reComps/nightrolestyles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faHeart,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import Navbar from "../../../reComps/Navbar/Navbar";

const DocSaves = () => {
  const [healedPlayers, setHealedPlayers] = useState({});
  const [healIsDone, setHealIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true); // State to track if Undo buttons should be disabled

  const playerAndRole = JSON.parse(sessionStorage.getItem("assignedRoles"));
  console.table(playerAndRole);

  const docPlayer = [];
  const otherPlayers = [];

  for (let i = 0; i < playerAndRole.length; i++) {
    if (playerAndRole[i].role === "ექიმი") {
      docPlayer.push(playerAndRole[i]);
    } else {
      // otherPlayers.push(playerAndRole[i]);
    }
  }

  // useEffect(() => {
  //   // Save healedPlayers to sessionStorage whenever it changes
  //   sessionStorage.setItem("healedPlayers", JSON.stringify(healedPlayers));
  // }, [healedPlayers]);

  const toggleHealStatus = (playerName) => {
    if (!healIsDone && !healedPlayers[playerName]) {
      setHealedPlayers((prevHealedPlayers) => {
        const updatedHealedPlayers = {
          ...prevHealedPlayers,
          [playerName]: true,
        };
        setHealIsDone(true);
        setUndoDisabled(false);
        return updatedHealedPlayers;
      });
    }
  };

  const confirmUndoHeal = (playerName) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerName}–ის მკვლელობა?`)) {
      setHealedPlayers((prevHealedPlayers) => {
        const updatedHealedPlayers = { ...prevHealedPlayers };
        delete updatedHealedPlayers[playerName];

        setUndoDisabled(true);
        setHealIsDone(false);
        return updatedHealedPlayers;
      });
    }
  };
  useEffect(() => {
    const updateIsAliveStatus = () => {
      const updatedPlayerAndRole = [...playerAndRole];
      for (const playerName in healedPlayers) {
        if (healedPlayers.hasOwnProperty(playerName)) {
          const playerIndex = updatedPlayerAndRole.findIndex(
            (player) => player.name === playerName
          );
          if (playerIndex !== -1) {
            updatedPlayerAndRole[playerIndex].isAlive = true;
          }
        }
      }

      sessionStorage.setItem(
        "assignedRoles",
        JSON.stringify(updatedPlayerAndRole)
      );
    };

    updateIsAliveStatus();
  }, [healedPlayers]);

  console.table(healedPlayers);

  return (
    <div className="MS_container night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host
        message={"ექიმი გადაარჩენს"}
        addClassname={"night_msg_4_host"}
      />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {docPlayer.map((player, index) => (
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
              {playerAndRole.map((player, index) => (
                <tr
                  key={index}
                  className={
                    playerAndRole[index].isAlive === false ? "disabled_row" : ""
                  }
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {healedPlayers[player.name] ? (
                      <>
                        <button
                          onClick={() => confirmUndoHeal(player.name)}
                          disabled={undoDisabled}
                          className={undoDisabled ? "disabled_btn" : ""}
                        >
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
                        onClick={() => toggleHealStatus(player.name)}
                        disabled={healIsDone}
                        className={healIsDone ? "disabled_btn" : ""}
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
