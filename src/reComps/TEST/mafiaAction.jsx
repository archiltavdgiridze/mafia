// import React from "react";
// import BackArrow from "../BackArrow/BackArrow";
// import Msg4Host from "../Msg4Host/Msg4Host";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// const MafiaAction = ({
//   role,
//   roleGeo,
//   backlink,
//   message,
//   currentActiveRolePlayersArr,
//   otherPlayersArr,
//   killedPlayers,
//   healedPlayers,
//   checkedPlayers,
//   confirmUndoKill,
//   undoDisabled,
//   undoIcon,
//   actionIcon,
//   actionIcon2,
//   toggleKillStatus,
//   toggleHealStatus,
//   toggleCheckStatus,
//   killIsDone,
//   healIsDone,
//   checkIsDone,

// }) => {
//   return (
//     <>
//       <BackArrow backLink={backlink} />
//       <Msg4Host message={message} addClassname={"night_msg_4_host"} />

//       <div className="player_list">
//         <div className={`${role}_players`}>
//           <table>
//             <tbody>
//               {currentActiveRolePlayersArr.map((player, index) => (
//                 <tr key={index}>
//                   <td>
//                     <p>{player.name}</p>
//                   </td>
//                   <td>
//                     <p>{player.role}</p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className={`not_${role}_players`}>
//           <table>
//             <tbody>
//               {otherPlayersArr.map((player, index) => (
//                 <tr
//                   key={index}
//                   className={killedPlayers[player.name] ? "disabled_row" : ""}
//                 >
//                   <td>
//                     <p>{player.name}</p>
//                   </td>
//                   <td>
//                     {killedPlayers[player.name] ? (
//                       <>
//                         <button
//                           onClick={() => confirmUndoKill(player.name)}
//                           disabled={undoDisabled}
//                           className={undoDisabled ? "disabled_btn" : ""}
//                         >
//                           <p>
//                             <FontAwesomeIcon icon={undoIcon} />
//                           </p>
//                         </button>
//                         <p>
//                           <FontAwesomeIcon icon={actionIcon} />
//                           <FontAwesomeIcon icon={actionIcon2} />
//                         </p>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => toggleKillStatus(player.name)}
//                         disabled={killIsDone}
//                         className={killIsDone ? "disabled_btn" : ""}
//                       >
//                         <p>
//                           <FontAwesomeIcon icon={actionIcon} />
//                         </p>
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MafiaAction;
