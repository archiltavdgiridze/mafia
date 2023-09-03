import React, { useState } from "react";
import BackArrow from "../BackArrow/BackArrow";
import Msg4Host from "../Msg4Host/Msg4Host";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const ActionComp = ({
  role,
  roleGeo,
  backlink,
  message,
  actionType,
  currentActiveRolePlayersArr,
  otherPlayersArr,
  // influencedPlayers,
  confirmUndoKill,
  // undoDisabled,
  undoIcon,
  actionIcon,
  actionIcon2,
  toggleKillStatus,
  toggleHealStatus,
  toggleCheckStatus,
  killIsDone,
  healIsDone,
  checkIsDone,
}) => {
  const [influencedPlayers, setInfluencedPlayers] = useState({});
  const [isActionDone, setIsActionDone] = useState(false);
  const [isUndoDisabled, setIsUndoDisabled] = useState(true);

  const toggleActionStatus = (playerName) => {
    if (!isActionDone) {
      setInfluencedPlayers((prevActionStatus) => {
        const updatedActionStatus = { ...prevActionStatus };
        console.log(influencedPlayers);

        if (updatedActionStatus[playerName]) {
          delete updatedActionStatus[playerName]; // Undo action
          setIsUndoDisabled(true); // Disable Undo button
        } else {
          updatedActionStatus[playerName] = true; // Mark as done
          setIsActionDone(true); // Disable other action buttons
          setIsUndoDisabled(false); // Enable Undo button
        }
        console.log(updatedActionStatus);
        return updatedActionStatus;
      });
    }
  };

  const confirmUndoAction = (playerName) => {
    if (
      window.confirm(`Do you want to undo the ${actionType} on ${playerName}?`)
    ) {
      setInfluencedPlayers((prevActionStatus) => {
        const updatedActionStatus = { ...prevActionStatus };
        delete updatedActionStatus[playerName];
        setIsUndoDisabled(true);
        setIsActionDone(false);
        return updatedActionStatus;
      });
    }
  };

  return (
    <>
      <BackArrow backLink={backlink} />
      <Msg4Host message={message} addClassname={"night_msg_4_host"} />

      <div className="player_list">
        <div className={`${role}_players`}>
          <table>
            <tbody>
              {currentActiveRolePlayersArr.map((player, index) => (
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
        <div className={`not_${role}_players`}>
          <table>
            <tbody>
              {otherPlayersArr.map((player, index) => (
                <tr
                  key={index}
                  className={
                    influencedPlayers[player.name] ? "disabled_row" : ""
                  }
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {influencedPlayers[player.name] ? (
                      <>
                        <button
                          onClick={() => confirmUndoAction(player.name)}
                          disabled={isUndoDisabled}
                          className={isUndoDisabled ? "disabled_btn" : ""}
                        >
                          <p>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </p>
                        </button>
                        <p>
                          <FontAwesomeIcon icon={actionIcon} />
                          <FontAwesomeIcon icon={actionIcon2} />
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleActionStatus(player.name)}
                        disabled={isActionDone}
                        className={isActionDone ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={actionIcon} />
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
    </>
  );
};

export default ActionComp;
