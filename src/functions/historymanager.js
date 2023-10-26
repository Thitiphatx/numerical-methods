import React from "react";
import { useState } from "react";
import { Button, Modal, Table, InputGroup, Form } from "react-bootstrap";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function HistoryManager({ history, onFillClick }) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFillClick = (index) => {
        onFillClick(index);
        handleClose();
    };
    
    return (
        <div className="input-popup">
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faHistory} />
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>history</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>method</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((val, index)=> {
                                const inputJson = JSON.parse(val.input_json);
                                const keys = Object.keys(inputJson);
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            {keys.map((key, i) => (
                                                <InputGroup key={i}>
                                                    <InputGroup.Text>{key}</InputGroup.Text>
                                                    <Form.Control value={inputJson[key]} readOnly></Form.Control>
                                                </InputGroup>
                                                
                                            ))}
                                        </td>
                                        <td><Button onClick={() => handleFillClick(index)}>FILL</Button></td>
                                    </tr>
                                )
                                
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}