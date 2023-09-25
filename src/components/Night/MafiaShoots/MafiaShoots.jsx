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
  const [disabledKilling, setDisabledKilling] = useState(false);
  const [docPlays, setDocPlays] = useState(""); // State to track if killer plays or not
  const [gameData, setGameData] = useState(
    JSON.parse(sessionStorage.getItem("gameData"))
  );
  const [currentNight, setCurrentNight] = useState(1); // State to track the current night

  // ? Load disabledKilling state from sessionStorage when the component initializes
  useEffect(() => {
    const disabledKillingState = JSON.parse(
      sessionStorage.getItem("disabledKilling")
    );
    if (disabledKillingState) {
      setDisabledKilling(disabledKillingState);
    }
  }, []);

  // ? Separate mafiaPlayers and notMafia players during component initialization
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
    if (disabledKilling) {
      // ? If all "kill" buttons are disabled, don't proceed
      return;
    }

    // ? Create a new copy of the gameData array
    const updatedGameData = gameData.map((data) => {
      if (data.playerInfo.ID === playerID) {
        data.playerState.isAlive = false;
      }
      return data;
    });

    // Update the gameData state with the new array
    setGameData(updatedGameData);

    // Update the state to disable all "kill" buttons except for the killed player's undo button
    setDisabledKilling(true);

    // ? Enable the undo button for the killed player
    setUndoDisabled((prevUndoDisabled) => ({
      ...prevUndoDisabled,
      [playerID]: false,
    }));

    sessionStorage.setItem("gameData", JSON.stringify(updatedGameData));
    sessionStorage.setItem("disabledKilling", JSON.stringify(true));
  };

  const confirmUndoKill = (playerID) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to undo this action?"
    );

    if (isConfirmed) {
      // ? Find the index of the player in gameData array
      const playerIndex = gameData.findIndex(
        (data) => data.playerInfo.ID === playerID
      );

      gameData[playerIndex].playerState.isAlive = true;

      // Update the state to enable all "kill" buttons
      setDisabledKilling(false);

      // Disable the undo button for the killed player
      setUndoDisabled((prevUndoDisabled) => ({
        ...prevUndoDisabled,
        [playerID]: true,
      }));

      sessionStorage.setItem("gameData", JSON.stringify(gameData));
    }
  };
  const handleNextNight = () => {
    setCurrentNight((prevNight) => prevNight + 1);

    // Enable all "kill" buttons and disable all undo buttons
    setDisabledKilling(false);
    setUndoDisabled({});
  };

  useEffect(() => {
    // ? Determine the value of docPlays based on gameData length
    setDocPlays(gameData.length < 8 ? "/night/cop_checks" : "/night/doc_saves");
  }, [gameData]);

  console.table(mafiaPlayers);
  console.table(notMafia);

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
                        disabled={disabledKilling}
                        className={disabledKilling ? "disabled_btn" : ""}
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
        onNext={handleNextNight}
      />
    </div>
  );
};

export default MafiaShoots;
