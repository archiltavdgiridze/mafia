import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import "./foul.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { selectPlayers, selectFoulLimit, addFoul, subtractFoul } from "../../redux/gameSlice";

const Fouls = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const foulLimit = useSelector(selectFoulLimit);

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
              {players.map((player) => (
                <tr key={player.id}>
                  <td>
                    <p>{player.name}</p>
                  </td>
                  <td>
                    <div>
                      <button
                        className="foul_minus"
                        onClick={() => dispatch(subtractFoul(player.id))}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      {player.foulCount}
                      <button
                        className="foul_plus"
                        onClick={() => dispatch(addFoul(player.id))}
                        disabled={player.foulCount >= foulLimit}
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
