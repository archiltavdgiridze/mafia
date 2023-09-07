import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './foul.scss'
const Fouls = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const players = JSON.parse(sessionStorage.getItem('playerNames'));
    return (
        <>
            <Button style={{ position: 'absolute', left: '90%', top: '50%' }} variant="primary" onClick={handleShow}>
                ფ
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        {players.map((player) => (
                            <tr>
                                <td>{player}</td>
                                <td>foul</td>
                            </tr>
                        ))}
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Fouls