// HistoryManager.js
import React, { useState } from "react";
import { Button, Modal, Table, InputGroup, Form } from "react-bootstrap";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

export function FetchManager(method) {
    return axios.get(`http://localhost:3001/getHistory/${method}`).then(response => {
        if (response.data != null) return response.data;
    });
}

export function PostManager(history, method, json) {
    function checkExist(history, json) {
        return history.some(item => item.input_json === json);
    }

    if (json !== null && !checkExist(history, json)) {
        axios.post('http://localhost:3001/addHistory', {
            ip_method: method,
            ip_json: json
        });
    }
}

export function HistoryManager({ history, onFillClick, updateHistory }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFillClick = (index) => {
        onFillClick(index);
        handleClose();
    };

    const handleDelClick = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`);
        updateHistory();
    };

    return (
        <div className="input-popup">
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faHistory} />
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Inputs</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((val, index) => {
                                const inputJson = JSON.parse(val.input_json);
                                const keys = Object.keys(inputJson);

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {keys.map((key, i) => (
                                                <InputGroup key={i}>
                                                    <InputGroup.Text>{key}</InputGroup.Text>
                                                    <Form.Control value={inputJson[key]} readOnly />
                                                </InputGroup>
                                            ))}
                                        </td>
                                        <td>
                                            <InputGroup>
                                                <Button onClick={() => handleFillClick(index)}>FILL</Button>
                                                <Button onClick={() => handleDelClick(val.input_id)} variant="danger">DELETE</Button>
                                            </InputGroup>
                                        </td>
                                    </tr>
                                );
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
    );
}
