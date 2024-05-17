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
  const [undoDisabled, setUndoDisabled] = useState({});
  const [healedPlayers, setHealedPlayers] = useState({});
  const [disabledHealing, setDisabledHealing] = useState({}); // State to track if Undo buttons should be disabled
  const [gameData, setGameData] = useState(
    JSON.parse(sessionStorage.getItem("gameData"))
  );
  const [doctorActionDone, setDoctorActionDone] = useState(false);

  const docPlayer = gameData.filter((data) => data.playerInfo.roleID === 3);
  const allPlayers = gameData.filter((data) => data.playerInfo.roleID);

  console.table(docPlayer);
  console.table(allPlayers);

  // 1 მოქალაქე
  // 2 დეტექტივი
  // 3 ექიმი
  // 4 მაფიოზი
  // 5 დონი
  // 6 მანიაკი

  const toggleHealStatus = (playerID) => {
    const retrievedGameData = JSON.parse(sessionStorage.getItem("gameData"));

    // Find the player with the given playerID
    const updatedGameData = retrievedGameData.map((playerData) => {
      if (playerData.playerInfo.ID === playerID) {
        // If the player was dead, set isAlive to true when healed
        if (!healedPlayers[playerID]) {
          setHealedPlayers((prevHealedPlayers) => ({
            ...prevHealedPlayers,
            [playerID]: playerData.playerState.isAlive,
          }));
        }

        if (!playerData.playerState.isAlive) {
          playerData.playerState.isAlive = true;
        }
        playerData.playerState.isHealed = true;

        setDisabledHealing((prevDisabledHealing) => ({
          ...prevDisabledHealing,
          [playerID]: true,
        }));
        setDoctorActionDone(true);
      }
      return playerData;
    });
    sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));
  };

  // Function to handle undoing the heal
  const confirmUndoHeal = (playerID) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerID}–ის მკვლელობა?`)) {
      const updatedGameData = gameData.map((playerData) => {
        if (playerData.playerInfo.ID === playerID) {
          // If the player was dead before healing, set isAlive back to its original state
          if (!healedPlayers[playerID]) {
            playerData.playerState.isAlive = false;
          } else {
            playerData.playerState.isAlive = healedPlayers[playerID];
          }
          playerData.playerState.isHealed = false;
        }
        return playerData;
      });

      setUndoDisabled((prevUndoDisabled) => ({
        ...prevUndoDisabled,
        [playerID]: true,
      }));
      setHealedPlayers((prevHealedPlayers) => {
        const updatedHealedPlayers = { ...prevHealedPlayers };
        delete updatedHealedPlayers[playerID];
        return updatedHealedPlayers;
      });
      setGameData(updatedGameData); // Update gameData state
      sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));
    }
  };

  useEffect(() => {
    // Disable other player's heal buttons until the doctor's action is done
    const disableHealButtons = () => {
      if (doctorActionDone) {
        setDisabledHealing({});
      }
    };

    disableHealButtons();
  }, [doctorActionDone]);

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
              {docPlayer.map((data, index) => (
                <tr key={index}>
                  <td>
                    <p>{data.playerInfo.name}</p>
                  </td>
                  <td>
                    <p>{data.playerInfo.role}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="non_action_players">
          <table>
            <tbody>
              {Object.values(allPlayers).map((data) => (
                <tr
                  key={data.playerInfo.ID}
                  className={!data.playerState.isAlive ? "disabled_row" : ""}
                >
                  <td>
                    <p>{data.playerInfo.name}</p>
                  </td>
                  <td>
                    {!data.playerState.isHealed ? (
                      <button
                        onClick={() => toggleHealStatus(data.playerInfo.ID)}
                        disabled={disabledHealing[data.playerInfo.ID]}
                        className={
                          disabledHealing[data.playerInfo.ID]
                            ? "disabled_btn"
                            : ""
                        }
                      >
                        {data.playerInfo.ID}
                        <p>
                          <FontAwesomeIcon icon={faUserDoctor} />
                        </p>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => confirmUndoHeal(data.playerInfo)}
                          disabled={undoDisabled[data.playerInfo.ID]}
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
