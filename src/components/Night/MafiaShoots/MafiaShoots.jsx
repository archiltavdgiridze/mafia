import React, { useEffect, useState } from "react";
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
  const [undoDisabled, setUndoDisabled] = useState({});
  const [disabledKilling, setDisabledKilling] = useState({});
  const [docPlays, setDocPlays] = useState(""); // State to track if killer plays or not
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));

  // Separate mafiaPlayers and notMafia players during component initialization
  const mafiaPlayers = {};
  const notMafia = {};

  gameData.forEach((data) => {
    const playerID = data.playerInfo.ID;
    if (data.playerInfo.roleID === 4 || data.playerInfo.roleID === 5) {
      mafiaPlayers[playerID] = data;
    } else {
      notMafia[playerID] = data;
    }
  });

  const toggleKillStatus = (playerID) => {
    const retrievedGameData = JSON.parse(sessionStorage.getItem("gameData"));
    console.table(retrievedGameData);

    // Find the player with the given playerID
    const updatedGameData = retrievedGameData.map((playerData) => {
      if (playerData.playerInfo.ID === playerID) {
        // Update isAlive to false
        playerData.playerState.isAlive = false;
        // Update the disabledKilling state to disable the button
        setDisabledKilling((prevDisabledKilling) => ({
          ...prevDisabledKilling,
          [playerID]: true,
        }));
      }
      return playerData;
    });
    // Save the modified gameData array back to sessionStorage
    sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));
  };

  const confirmUndoKill = (playerID) => {
    // Show a confirmation dialog to confirm the undo action
    const isConfirmed = window.confirm(
      "Are you sure you want to undo this action?"
    );

    if (isConfirmed) {
      // Find the index of the player in gameData array
      const playerIndex = gameData.findIndex(
        (data) => data.playerInfo.ID === playerID
      );

      // Update isAlive to true
      gameData[playerIndex].playerState.isAlive = true;

      // Update the disabledKilling state to enable the kill button
      setDisabledKilling((prevDisabledKilling) => ({
        ...prevDisabledKilling,
        [playerID]: false,
      }));

      // Save the modified gameData array back to sessionStorage
      sessionStorage.setItem("gameData", JSON.stringify(gameData));
    }
  };

  useEffect(() => {
    // Determine the value of docPlays based on gameData length
    setDocPlays(gameData.length < 8 ? "/night/cop_checks" : "/night/doc_saves");
  }, [gameData]);

  return (
    <div className="night_roles_container main_content_wrapper night_theme">
      <Navbar />
      <Msg4Host message={"მაფია გაისვრის"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {Object.values(mafiaPlayers).map((data) => (
                <tr key={data.playerInfo.ID}>
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
              {Object.values(notMafia).map((data) => (
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
                        onClick={() => toggleKillStatus(data.playerInfo.ID)}
                        disabled={disabledKilling[data.playerInfo.ID]}
                        className={
                          disabledKilling[data.playerInfo.ID]
                            ? "disabled_btn"
                            : ""
                        }
                      >
                        <p>
                          <FontAwesomeIcon icon={faGun} />
                        </p>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => confirmUndoKill(data.playerInfo.ID)}
                          disabled={undoDisabled[data.playerInfo.ID]}
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
