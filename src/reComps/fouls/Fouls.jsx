import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './foul.scss'
const Fouls = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button style={{ position: 'absolute', left: '90%', top: '50%' }} variant="primary" onClick={handleShow}>
                ფ
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            </Modal>
        </>
    )
}

export default Fouls