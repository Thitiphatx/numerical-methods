import axios from "axios";
import { Button, Modal, Table, InputGroup, Form, Row, Col } from "react-bootstrap";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";

export function DatabaseManager(method, {fillData}) {
    const [dataTable, setDataTable] = useState([]);
    const [fetchTable, setFetchTable] = useState(false);

    useEffect(() => {
        if (fetchTable) {
            axios.get(`http://localhost:3001/getHistory/${method}`)
                .then(response => {
                    setDataTable(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                });
            setFetchTable(false);
        }
    }, [fetchTable, method]);

    function PostData(inputs, type) {
        setFetchTable(!fetchTable);
        const json = JSON.stringify(inputs);
        if (dataTable.some(item => item.input_json === json)) {
            alert("This input is already in the database");
        } else {
            axios.post('http://localhost:3001/addHistory', {
                ip_method: method,
                ip_json: json,
                ip_type: type
            });
        }
        
    }

    function DelData(id) {
        alert(`This input has been successfully deleted`)
        axios.delete(`http://localhost:3001/delete/${id}`);
        setFetchTable(!fetchTable);
    }

    function FillData(index, {setShow}) {
        const selectedData = dataTable[index];
        const inputJson = JSON.parse(selectedData.input_json);
        
        fillData(inputJson);
        setShow(false);
    }

    function GenerateInput(keys, inputJson, type) {
        if (type === "Matrix") {
            return (
                <Row key="matrix-input">
                    <Col className="d-flex justify-content-center" style={{maxWidth: "30rem"}}>
                            <div className="mx-3 text-center">
                                <h4>A</h4>
                                {inputJson["A"].map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {row.map((col, colIndex)=> (
                                            <Form.Control className="text-center matrix-field" key={colIndex} value={col} readOnly></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </div>
                            <div className="mx-3 text-center">
                                <h4>B</h4>
                                {inputJson["B"].map((val, index)=> (
                                    <Form.Group key={index}>
                                        <Form.Control className="text-center matrix-field" value={val} readOnly></Form.Control>
                                    </Form.Group>
                                ))}
                            </div>
                        </Col>
                </Row>  
              );
        } else if (type === "XY") {
            return (
                keys.map((key, i) => (
                    <InputGroup key={i}>
                        <InputGroup.Text>{key}</InputGroup.Text>
                        <Form.Control value={inputJson[key]} readOnly />
                    </InputGroup>
                ))
            );
        } else if (type === "Points") {
            return (
                <div>
                    <Row>
                        <Col xs={6}>
                            {inputJson["points"].map((point, index) => (
                                <div className="d-flex" key={index}>
                                    <InputGroup>
                                        <InputGroup.Text>{"x"+index}</InputGroup.Text>
                                        <Form.Control value={point.x} readOnly></Form.Control>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text>{"y"+index}</InputGroup.Text>
                                        <Form.Control value={point.y} readOnly></Form.Control>
                                    </InputGroup>
                                </div>
                                
                            ))}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <div className="d-flex">
                                <InputGroup>
                                    <InputGroup.Text>xTarget</InputGroup.Text>
                                    <Form.Control value={inputJson["xTarget"]} readOnly></Form.Control>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>m</InputGroup.Text>
                                    <Form.Control value={inputJson["orderM"]} readOnly></Form.Control>
                                </InputGroup>
                            </div>
                            
                        </Col>
                    </Row>
                </div>
                
            );
        } else if (type ===  "Table" ) {
            return (
                <Table bordered responsive>
                    <tbody>
                        {inputJson["x"].map(((x, index) => (
                            <tr key={index}>
                                <th>x{index+1}</th>
                                {x.map((val, idx) => (
                                    <td key={idx}>{val}</td>
                                ))}
                            </tr>
                        )))}
                        <tr>
                            <th>y</th>
                            {inputJson["y"].map((y, index) => (
                                <td>{y}</td>
                            ))}
                        </tr>
                        
                    </tbody>
                </Table>
            )
        }
    }

    function HistoryTab() {
        const [show, setShow] = useState(false);
        const handleClose = () => {
            setShow(false);
        }
        
        const handleShow = () => {
            setFetchTable(!fetchTable);
            setShow(true);
        }

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
                                {dataTable.map((val, index) => {
                                    const inputJson = JSON.parse(val.input_json);
                                    const keys = Object.keys(inputJson);

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {GenerateInput(keys, inputJson, val.input_type)}
                                            </td>
                                            <td>
                                                <InputGroup>
                                                    <Button onClick={() => FillData(index, {setShow})}>FILL</Button>
                                                    <Button variant="danger" onClick={() => DelData(val.input_id)}>DELETE</Button>
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
        )
    }
    return {
        PostData,
        DelData,
        HistoryTab,
    }
}