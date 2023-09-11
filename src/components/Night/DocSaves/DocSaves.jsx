import React, { useState } from "react";
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

  const docPlayer = [];
  const otherPlayers = [];

  for (let i = 0; i < playerAndRole.length; i++) {
    if (playerAndRole[i].role === "ექიმი") {
      docPlayer.push(playerAndRole[i]);
    } else {
      otherPlayers.push(playerAndRole[i]);
    }
  }

  const toggleHealStatus = (playerName) => {
    if (!healIsDone) {
      setHealedPlayers((prevHealedPlayers) => {
        const updatedHealedPlayers = { ...prevHealedPlayers };
        if (updatedHealedPlayers[playerName]) {
          delete updatedHealedPlayers[playerName];
          setUndoDisabled(true);
        } else {
          updatedHealedPlayers[playerName] = true;
          setHealIsDone(true);
          setUndoDisabled(false);
        }
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
              {otherPlayers.map((player, index) => (
                <tr
                  key={index}
                  className={healedPlayers[player.name] ? "disabled_row" : ""}
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

// import React from "react";
// import ActionComp from "../../../reComps/ActionComp/ActionComp";
// import { faHeart, faPlus, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

// const DocSaves = () => {
//   const docPlayer = [
//     {
//       name: "მოთამაშე 4",
//       role: "ექიმი",
//     },
//   ];

//   const otherPlayers = [
//     {
//       name: "მოთამაშე 1",
//     },
//     {
//       name: "მოთამაშე 2",
//     },
//     {
//       name: "მოთამ 3",
//     },
//     {
//       name: "მოთ. 5",
//     },
//     {
//       name: "მოთამაშე 6",
//     },
//     {
//       name: "მოთააშ 7",
//     },
//     {
//       name: "მოთ. 8",
//     },
//     {
//       name: "მოთ.შე 9",
//     },
//     {
//       name: "მოთამაშე 10",
//     },
//     {
//       name: "მოთამაშე 11",
//     },
//   ];

//   return (
//     <div className="DS_container main_content_wrapper night_theme">
//       <div className="title">
//         <h1>მაფია</h1>
//       </div>
//       <ActionComp
//         role={"doctor"}
//         roleGeo={"ექიმი"}
//         backlink={"/night/mafia_shoots"}
//         message={"ექიმი იცავს"}
//         actionType={"გადარჩენა"}
//         currentActiveRolePlayersArr={docPlayer}
//         otherPlayersArr={otherPlayers}
//         influencedPlayers={"healedPlayers"}
//         actionIcon={faUserDoctor}
//         actionIcon2={faHeart}
//       />
//     </div>
//   );
// };

// export default DocSaves;
