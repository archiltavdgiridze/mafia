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
  console.log("Initial gameData:", gameData);

  const docPlayer = gameData.filter((data) => data.playerInfo.roleID === 3);
  const otherPlayers = gameData.filter((data) => data.playerInfo.roleID !== 3);

  // 1 მოქალაქე
  // 2 დეტექტივი
  // 3 ექიმი
  // 4 მაფიოზი
  // 5 დონი
  // 6 მანიაკი

  const toggleHealStatus = (playerID) => {
    const retrievedGameData = JSON.parse(sessionStorage.getItem("gameData"));
    console.log(playerID);

    // Find the player with the given playerID
    const updatedGameData = retrievedGameData.map((playerData) => {
      if (playerData.playerInfo.ID === playerID) {
        // If the player was dead, set isAlive to true when healed
        if (!playerData.playerState.isAlive) {
          playerData.playerState.isAlive = true;
        }
        playerData.playerState.isHealed = true;

        setDisabledHealing((prevDisabledHealing) => ({
          ...prevDisabledHealing,
          [playerID]: true,
        }));
      }
      return playerData;
    });
    sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));

    // const updatedGameData = gameData.map((playerData) => {
    //   if (playerData.playerInfo.ID === playerID) {
    //     // If the player was dead, set isAlive to true when healed
    //     if (!playerData.playerState.isAlive) {
    //       playerData.playerState.isAlive = true;
    //     }
    //     playerData.playerState.isHealed = true;

    //     setDisabledHealing((prevDisabledHealing) => ({
    //       ...prevDisabledHealing,
    //       [playerID]: true,
    //     }));
    //   }
    //   console.log("Toggle button clicked for player ID:", playerID);

    //   return playerData;
    // });
    // console.log("Updated gameData after healing:", updatedGameData);
    // console.log("Updated disabledHealing:", disabledHealing);

    // setHealedPlayers((prevHealedPlayers) => ({
    //   ...prevHealedPlayers,
    //   [playerID]: true,
    // }));
    // setGameData(updatedGameData);
    // sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));
  };

  const confirmUndoHeal = (playerID) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerID}–ის მკვლელობა?`)) {
      const updatedGameData = gameData.map((playerData) => {
        if (playerData.playerInfo.ID === playerID) {
          // If the player was dead before healing, set isAlive back to false
          if (!healedPlayers[playerID]) {
            playerData.playerState.isAlive = false;
          }
          playerData.playerState.isHealed = false;
        }
        return playerData;
      });
      setDisabledHealing((prevDisabledHealing) => ({
        ...prevDisabledHealing,
        [playerID]: false,
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
    const updateIsAliveStatus = () => {
      const updatedPlayerAndRole = [...gameData];
      for (const playerID in healedPlayers) {
        if (healedPlayers.hasOwnProperty(playerID)) {
          const playerIndex = updatedPlayerAndRole.findIndex(
            (player) => player.playerInfo.ID === playerID
          );
          if (playerIndex !== -1) {
            // If the player was dead before healing, set isAlive to false
            if (!healedPlayers[playerID]) {
              updatedPlayerAndRole[playerIndex].playerInfo.isAlive = false;
            }
          }
        }
      }
      sessionStorage.setItem("gameData", JSON.stringify(updatedPlayerAndRole));
    };

    updateIsAliveStatus();
  }, [healedPlayers, gameData]);

  console.table(docPlayer);
  console.table(otherPlayers);

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
              {Object.values(otherPlayers).map((data) => (
                <tr
                  key={data.playerInfo.ID}
                  className={!data.playerState.isAlive ? "disabled_row" : ""}
                >
                  <td>
                    <p>{data.playerInfo.name}</p>
                  </td>
                  <td>
                    {data.playerState.isAlive ? (
                      <button
                        onClick={() => toggleHealStatus(data.playerInfo.ID)}
                        disabled={disabledHealing[data.playerInfo.ID]}
                        className={
                          disabledHealing[data.playerInfo.ID]
                            ? "disabled_btn"
                            : ""
                        }
                      >
                        <p>
                          <FontAwesomeIcon icon={faUserDoctor} />
                        </p>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => confirmUndoHeal(data.playerInfo.ID)}
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
