import React, { useState } from "react";
import "../../../reComps/nightrolestyles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faMagnifyingGlass,
  faHandcuffs
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import BackArrow from "../../../reComps/BackArrow/BackArrow";

const CopChecks = () => {
  const [checkedPlayers, setCheckedPlayers] = useState({});
  const [checkIsDone, setCheckIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true); // State to track if Undo buttons should be disabled

  const docPlayer = [
    {
      name: "მოთამაშე 5",
      role: "დეტექტივი",
    },
  ];

  const otherPlayers = [
    {
      name: "მოთამაშე 1",
    },
    {
      name: "მოთამაშე 2",
    },
    {
      name: "მოთამ 3",
    },
    {
      name: "მოთ. 4",
    },
    {
      name: "მოთამაშე 6",
    },
    {
      name: "მოთააშ 7",
    },
    {
      name: "მოთ. 8",
    },
    {
      name: "მოთ.შე 9",
    },
    {
      name: "მოთამაშე 10",
    },
    {
      name: "მოთამაშე 11",
    },
  ];

  const toggleCheckStatus = (playerName) => {
    if (!checkIsDone) {
      setCheckedPlayers((prevCheckedPlayers) => {
        const updatedCheckedPlayers = { ...prevCheckedPlayers };
        if (updatedCheckedPlayers[playerName]) {
          delete updatedCheckedPlayers[playerName]; // Undo check
          setUndoDisabled(true); // Disable Undo button
        } else {
          updatedCheckedPlayers[playerName] = true; // Mark as checked
          setCheckIsDone(true); // Disable other "check" buttons
          setUndoDisabled(false); // Enable Undo button
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
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <BackArrow backLink={"/night/role_queue"} />
      <Msg4Host message={"დეტექტივი გადაამოწმებს"} addClassname={"night_msg_4_host"} />
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
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                          <FontAwesomeIcon icon={faHandcuffs} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleCheckStatus(player.name)}
                        disabled={checkIsDone}
                        className={checkIsDone ? "disabled_btn" : ""}
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
        linkForward={""}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default CopChecks;
