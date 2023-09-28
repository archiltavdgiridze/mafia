import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./foul.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const Fouls = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const players = JSON.parse(sessionStorage.getItem("playerNames"));
  const foulQuantity = JSON.parse(sessionStorage.getItem("foulQuantity"));
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));

  // Initialize foulCounts from session storage or with zeros if not available
  const initialFoulCounts =
    JSON.parse(sessionStorage.getItem("foulCounts")) ||
    Array(players.length).fill(0);

  const [foulCounts, setFoulCounts] = useState(initialFoulCounts);

  // Update session storage whenever foulCounts change
  useEffect(() => {
    sessionStorage.setItem("foulCounts", JSON.stringify(foulCounts));
  }, [foulCounts]);

  const foulCount = JSON.parse(sessionStorage.getItem("foulCounts"));

  // Monitor foul counts and update player statuses
  useEffect(() => {
    if (foulCount) {
      for (let i = 0; i < foulCount.length; i++) {
        if (foulCount[i] === foulQuantity - 1) {
          // Player reached or exceeded foulQuantity, set status to dead forever
          if (
            (gameData[i].playerState.isAlive &&
              !gameData[i].playerState.isDeadForever) ||
            (!gameData[i].playerState.isAlive &&
              !gameData[i].playerState.isDeadForever)
          ) {
            gameData[i].playerState.isAlive = false;
            gameData[i].playerState.isDeadForever = true;
          }
        } else {
          // Player's foul count is less than foulQuantity
          // Check if they were dead forever and revert if necessary
          if (gameData[i].playerState.isDeadForever) {
            gameData[i].playerState.isAlive = true;
            gameData[i].playerState.isDeadForever = false;
          }
        }
      }
      // Update gameData in session storage
      sessionStorage.setItem("gameData", JSON.stringify(gameData));
    }
  }, [foulCount]);

  // Add and subtract foul counts
  const handleFoulSubtract = (index) => {
    const newFoulCounts = [...foulCounts];
    newFoulCounts[index] = Math.max(0, newFoulCounts[index] - 1);
    setFoulCounts(newFoulCounts);
  };

  const handleFoulAdd = (index) => {
    const newFoulCounts = [...foulCounts];
    if (newFoulCounts[index] < foulQuantity) {
      newFoulCounts[index] += 1;
    }
    setFoulCounts(newFoulCounts);
  };

  return (
    <>
      <div onClick={handleShow}>ფ</div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">ფოლები</Modal.Title>
          <FontAwesomeIcon icon={faX} className="modal_X" />
        </Modal.Header>
        <Modal.Body>
          <table>
            <thead>
              <tr>
                <th>
                  <p>სახელი</p>
                </th>
                <th>რაოდ.</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>
                    <p>{player}</p>
                  </td>
                  <td>
                    <div>
                      <button
                        className="foul_minus"
                        onClick={() => handleFoulSubtract(index)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      {foulCounts[index]}
                      <button
                        className="foul_plus"
                        onClick={() => handleFoulAdd(index)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Fouls;
