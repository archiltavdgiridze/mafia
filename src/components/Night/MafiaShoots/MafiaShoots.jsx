import React, { useState } from "react";
import "../../../reComps/nightrolestyles.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGun,
  faRotateLeft,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
import BackArrow from "../../../reComps/BackArrow/BackArrow";

const MafiaShoots = () => {
  const [killedPlayers, setKilledPlayers] = useState({});
  const [killIsDone, setKillIsDone] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true); // State to track if Undo buttons should be disabled

  const mafiaPlayers = [
    {
      name: "მოთამაშე 1",
      role: "მაფიოზი",
    },
    {
      name: "მოთამაშე 1",
      role: "მაფიოზი",
    },
    {
      name: "მოთამაშე 2",
      role: "მაფიოზი",
    },
    {
      name: "მოთამაშე 2",
      role: "დონი",
    },
  ];

  const notMafia = [
    {
      name: "მოთამაშე 3",
    },
    {
      name: "მოთამ 4",
    },
    {
      name: "მოთ. 5",
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

  const toggleKillStatus = (playerName) => {
    if (!killIsDone) {
      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        if (updatedKilledPlayers[playerName]) {
          delete updatedKilledPlayers[playerName]; // Undo kill
          setUndoDisabled(true); // Disable Undo button
        } else {
          updatedKilledPlayers[playerName] = true; // Mark as killed
          setKillIsDone(true); // Disable other "kill" buttons
          setUndoDisabled(false); // Enable Undo button
        }
        return updatedKilledPlayers;
      });
    }
  };

  const confirmUndoKill = (playerName) => {
    if (window.confirm(`გსურთ გააუქმოთ ${playerName}–ის მკვლელობა?`)) {
      setKilledPlayers((prevKilledPlayers) => {
        const updatedKilledPlayers = { ...prevKilledPlayers };
        delete updatedKilledPlayers[playerName];

        setUndoDisabled(true);
        setKillIsDone(false);
        return updatedKilledPlayers;
      });
    }
  };

  return (
    <div className="night_roles_container main_content_wrapper night_theme">
      <div className="title">
        <h1>მაფია</h1>
      </div>
      <BackArrow backLink={"/night/role_queue"} />
      <Msg4Host message={"მაფია გაისვრის"} addClassname={"night_msg_4_host"} />
      <div className="player_list">
        <div className="action_players">
          <table>
            <tbody>
              {mafiaPlayers.map((player, index) => (
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
              {notMafia.map((player, index) => (
                <tr
                  key={index}
                  className={killedPlayers[player.name] ? "disabled_row" : ""}
                >
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    {killedPlayers[player.name] ? (
                      <>
                        <button
                          onClick={() => confirmUndoKill(player.name)}
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
                    ) : (
                      <button
                        onClick={() => toggleKillStatus(player.name)}
                        disabled={killIsDone}
                        className={killIsDone ? "disabled_btn" : ""}
                      >
                        <p>
                          <FontAwesomeIcon icon={faGun} />
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
        linkBack={"/night/role_queue"}
        linkForward={"/night/doc_saves"}
        addBtnClass={"night"}
      />
    </div>
  );
};

export default MafiaShoots;





// import React, { useState } from "react";
// import "./mafiashoots.scss";
// // import { Link } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   // faArrowLeft,
//   faGun,
//   faRotateLeft,
//   faSkullCrossbones,
// } from "@fortawesome/free-solid-svg-icons";
// // import Msg4Host from "../../../reComps/Msg4Host/Msg4Host";
// import PrevNextBtn from "../../../reComps/PrevNextBtn/PrevNextBtn";
// // import BackArrow from "../../../reComps/BackArrow/BackArrow";
// import ActionComp from "../../../reComps/ActionComp/ActionComp";

// const MafiaShoots = () => {
//   // const [killedPlayers, setKilledPlayers] = useState({});
//   // const [killIsDone, setKillIsDone] = useState(false);
//   const [undoDisabled, setUndoDisabled] = useState(true); // State to track if Undo buttons should be disabled

//   const mafiaPlayers = [
//     {
//       name: "მოთამაშე 1",
//       role: "მაფიოზი",
//     },
//     {
//       name: "მოთამაშე 3",
//       role: "მაფიოზი",
//     },
//     {
//       name: "მოთამაშე 2",
//       role: "მაფიოზი",
//     },
//     {
//       name: "მოთამაშე 2",
//       role: "დონი",
//     },
//   ];

//   const notMafia = [
//     {
//       name: "მოთამაშე 3",
//     },
//     {
//       name: "მოთამ 4",
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
//     <div className="MS_container main_content_wrapper night_theme">
//       <div className="title">
//         <h1>მაფია</h1>
//       </div>
//       <ActionComp
//         role={"mafia"}
//         roleGeo={"მაფია"}
//         backlink={"/night/role_queue"}
//         message={"მაფია გაისვრის"}
//         actionType={"მკვლელობა"}
//         currentActiveRolePlayersArr={mafiaPlayers}
//         otherPlayersArr={notMafia}
//         // influencedPlayers={killedPlayers}
//         // confirmUndoKill={confirmUndoKill}
//         // undoDisabled={undoDisabled}
//         undoIcon={faRotateLeft}
//         actionIcon={faGun}
//         actionIcon2={faSkullCrossbones}
//         // toggleKillStatus={toggleKillStatus}
//       />

//       <PrevNextBtn
//         linkBack={"/night/role_queue"}
//         linkForward={"/night/doc_saves"}
//         addBtnClass={"night"}
//       />
//     </div>
//   );
// };

// export default MafiaShoots;

// const toggleKillStatus = (playerName) => {
//   if (!killIsDone) {
//     setKilledPlayers((prevKilledPlayers) => {
//       const updatedKilledPlayers = { ...prevKilledPlayers };
//       if (updatedKilledPlayers[playerName]) {
//         delete updatedKilledPlayers[playerName]; // Undo kill
//         setUndoDisabled(true); // Disable Undo button
//       } else {
//         updatedKilledPlayers[playerName] = true; // Mark as killed
//         setKillIsDone(true); // Disable other "kill" buttons
//         setUndoDisabled(false); // Enable Undo button
//       }
//       return updatedKilledPlayers;
//     });
//   }
// };

// const confirmUndoKill = (playerName) => {
//   if (window.confirm(`გსურთ გააუქმოთ ${playerName}–ის მკვლელობა?`)) {
//     setKilledPlayers((prevKilledPlayers) => {
//       const updatedKilledPlayers = { ...prevKilledPlayers };
//       delete updatedKilledPlayers[playerName];

//       setUndoDisabled(true);
//       setKillIsDone(false);
//       return updatedKilledPlayers;
//     });
//   }
// };
