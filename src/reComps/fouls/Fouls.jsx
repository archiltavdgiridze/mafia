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
  const assignedRoles = JSON.parse(sessionStorage.getItem('assignedRoles'));

  // Initialize foulCounts from session storage or with zeros if not available
  const initialFoulCounts =
    JSON.parse(sessionStorage.getItem("foulCounts")) ||
    Array(players.length).fill(0);

  const [foulCounts, setFoulCounts] = useState(initialFoulCounts);

  const handleFoulSubtract = (index) => {
    const newFoulCounts = [...foulCounts];
    newFoulCounts[index] = Math.max(0, newFoulCounts[index] - 1);
    setFoulCounts(newFoulCounts);
  };

  const handleFoulAdd = (index) => {
    const newFoulCounts = [...foulCounts];
    if (newFoulCounts[index] <= (foulQuantity - 1)) {
      newFoulCounts[index] += 1;
    }
    if (newFoulCounts[index] === foulQuantity) {
      const updatedAssignedRoles = [...assignedRoles];
      updatedAssignedRoles[index].isAlive = false;
      sessionStorage.setItem('assignedRoles', JSON.stringify(updatedAssignedRoles));
    }
    setFoulCounts(newFoulCounts);
  };

  // Update session storage whenever foulCounts change
  useEffect(() => {
    sessionStorage.setItem("foulCounts", JSON.stringify(foulCounts));
  }, [foulCounts, assignedRoles]);
  

  return (
    <>
      <div className="foul_btn" onClick={handleShow}>ფ</div>
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
                    <p>{player} {!assignedRoles[index].isAlive ? 'mokda egi' : ''} </p>
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
