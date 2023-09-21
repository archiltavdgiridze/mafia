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
  const [killedPlayers, setKilledPlayers] = useState({});
  const [killIsDone, setKillIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [docPlays, setDocPlays] = useState(""); // State to track if killer plays or not
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));

  // Separate mafiaPlayers and notMafia players during component initialization
  const mafiaPlayers = gameData.filter(
    (data) => data.playerInfo.roleID === 4 || data.playerInfo.roleID === 5
  );
  const notMafia = gameData.filter(
    (data) => data.playerInfo.roleID !== 4 && data.playerInfo.roleID !== 5
  );
  console.log(notMafia);

  useEffect(() => {
    // Check if killIsDone state is stored in localStorage
    const storedKillIsDone =
      JSON.parse(localStorage.getItem("killIsDone")) || false;

    // Initialize killIsDone state based on stored data
    setKillIsDone(storedKillIsDone);

    // Check if there are previously killed players in localStorage
    const storedKilledPlayers =
      JSON.parse(localStorage.getItem("killedPlayers")) || {};

    // Initialize killedPlayers and undoDisabled based on stored data
    setKilledPlayers(storedKilledPlayers);

    const initialUndoDisabled = notMafia.some((player, index) => {
      return !gameData[index].isAlive && !storedKilledPlayers[index];
    });
    setUndoDisabled(initialUndoDisabled);

    // Save the initial state to localStorage
    localStorage.setItem("killedPlayers", JSON.stringify(storedKilledPlayers));
  }, []);

  // const toggleKillStatus = 1;
  // const confirmUndoKill = 2;
  const toggleKillStatus = (playerIndex) => {
    if (!killIsDone) {
      // Retrieve gameData from sessionStorage
      const retrievedPlayerAndRole = [...gameData];

      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        if (updatedKilledPlayers[playerIndex]) {
          delete updatedKilledPlayers[playerIndex];
        } else {
          updatedKilledPlayers[playerIndex] = true;

          // Update the player's isAlive property in retrievedPlayerAndRole
          retrievedPlayerAndRole[playerIndex].playerInfo.isAlive = false;
        }

        // Save the modified gameData array back to sessionStorage
        sessionStorage.setItem(
          "gameData",
          JSON.stringify(retrievedPlayerAndRole)
        );

        // Save updated killedPlayers to localStorage
        localStorage.setItem(
          "killedPlayers",
          JSON.stringify(updatedKilledPlayers)
        );

        // Check if any player is killed
        const isAnyPlayerKilled = Object.keys(updatedKilledPlayers).length > 0;
        setKillIsDone(isAnyPlayerKilled);

        // Check if the player was killed before disabling undo
        const isPlayerKilled = updatedKilledPlayers[playerIndex];
        setUndoDisabled(!isPlayerKilled);

        return updatedKilledPlayers;
      });
    }
  };

  const confirmUndoKill = (playerIndex) => {
    const retrievedPlayerAndRole = JSON.parse(
      sessionStorage.getItem("gameData")
    );

    if (
      window.confirm(
        `გსურთ გააუქმოთ ${retrievedPlayerAndRole[playerIndex].name}–ის მკვლელობა?`
      )
    ) {
      // Update isAlive to true
      retrievedPlayerAndRole[playerIndex].playerInfo.isAlive = true;

      // Save the modified gameData array back to sessionStorage
      sessionStorage.setItem(
        "gameData",
        JSON.stringify(retrievedPlayerAndRole)
      );

      // Remove the player from killedPlayers
      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        delete updatedKilledPlayers[playerIndex];

        // Save updated killedPlayers to localStorage
        localStorage.setItem(
          "killedPlayers",
          JSON.stringify(updatedKilledPlayers)
        );

        // Set undoDisabled to true and killIsDone to false
        setUndoDisabled(true);
        setKillIsDone(false);

        // Save the killIsDone state to localStorage
        localStorage.setItem("killIsDone", JSON.stringify(false));

        return updatedKilledPlayers;
      });
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
              {mafiaPlayers.map((data, index) => (
                <tr key={index}>
                  <td>
                    <p>{data.playerInfo.name}</p>
                  </td>
                  <td>
                    {[data.playerInfo.ID]}
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
              {notMafia.map((data, index) => (
                <tr
                  key={index}
                  className={
                    !gameData[index].playerState.isAlive ? "disabled_row" : ""
                  }
                >
                  <td>
                    {data.playerInfo.ID}

                    <p>{data.playerInfo.name}</p>
                  </td>
                  <td>
                    {gameData[index].playerState.isAlive ? (
                      <button
                        onClick={() => toggleKillStatus(data.playerInfo.ID)}
                        disabled={killIsDone}
                        className={killIsDone ? "disabled_btn" : ""}
                      >
                        {[data.playerInfo.ID]}
                        <p>
                          <FontAwesomeIcon icon={faGun} />
                        </p>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => confirmUndoKill(index)}
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
