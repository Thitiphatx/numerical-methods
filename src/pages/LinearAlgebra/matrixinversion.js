import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { DatabaseManager } from "../../functions/DatabaseManager";
import { CalMatrixInversion } from "../../functions/calculator/LinearAlgebra/MatrixInversion";

function MatrixInversion() {
    const [size, setSize] = useState(3);
    const [Amatrix, setAmatrix] = useState(
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
    );
    const [Bmatrix, setBmatrix] = useState([0, 0, 0]);
    const [result, setResult] = useState([0, 0, 0]);
    const [inputs, setInputs] = useState([]);
    const [saveAble, setSaveAble] = useState(false);


    // Database Handler
    const METHOD = "MatrixInvert";
    const TYPE = "Matrix";
    const fillData = (inputJson) => {
        setSize(inputJson.size);
        setAmatrix(inputJson.A);
        setBmatrix(inputJson.B);
    };
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    const inputSize = (e) => {
        setSize(parseInt(e.target.value));
    };
    
    const inputSetSize = () => {
        const newMatrix = [];
        const bMatrix = [];
        for (let i = 0; i < size; i++) {
            const rowMatrix = [];
            for (let j = 0; j < size; j++) {
                rowMatrix.push(0);
            }
            bMatrix.push(0);
            newMatrix.push(rowMatrix);
        }
        setAmatrix(newMatrix);
        setBmatrix(bMatrix);
    };

    const inputMatrix = (e, row, col) => {
        const newMatrix = [...Amatrix];
        newMatrix[row][col] = e.target.value;
        setAmatrix(newMatrix);
    };

    const inputB = (e, index) => {
        const newB = [...Bmatrix];
        newB[index] = e.target.value;
        setBmatrix(newB);
    };

    const calculator = () => {
        const newInputs = {
            size: size,
            A: Amatrix,
            B: Bmatrix,
        }
        const x = CalMatrixInversion(Amatrix, Bmatrix, size);
        setInputs(newInputs);
        setSaveAble(true);
        setResult(x);
    };

    return (
        <Container>
            {db.HistoryTab()}
            <Card as={Row} className="mb-3">
                <Card.Header>Matrix Inversion</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={3}>
                                <Form.Label>Matrix size</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" onChange={inputSize} value={size}></Form.Control>
                                    <Button variant="secondary" onClick={inputSetSize}>Set</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col className="d-flex justify-content-center">
                            <div className="mx-3 text-center">
                            <h4>A</h4>
                                {Amatrix.map((rowCell, rowIndex) => (
                                    <InputGroup key={rowIndex}>
                                        {rowCell.map((colCell, colIndex) => (
                                            <Form.Control className="text-center matrix-field" key={colIndex} value={Amatrix[rowIndex][colIndex]} onChange={(e) => inputMatrix(e, rowIndex, colIndex)}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </div>
                            <div className="mx-3 text-center">
                            <h4>X</h4>
                                {Amatrix.map((row, index) => (
                                    <Form.Control className="text-center matrix-field" key={index} value={`x${index}`} disabled></Form.Control>
                                ))}
                            </div>
                            <div className="mx-3 text-center">
                            <h4>B</h4>
                                {Bmatrix.map((row, index) => (
                                    <Form.Control className="text-center matrix-field" key={index} value={Bmatrix[index]} onChange={(e) => inputB(e, index)}></Form.Control>
                                ))}
                            </div>
                            </Col>
                        </Form.Group>
                        <InputGroup>
                            <Button onClick={calculator}>Calculate</Button>
                            {saveAble && (
                                <Button variant="outline-primary" onClick={saveInputs}>Save inputs</Button>
                            )}
                        </InputGroup>
                    </Form>
                </Card.Body>
                {result.map((x, index) => (
                    <Card.Footer key={index}>x{index} : {x}</Card.Footer>
                ))}
            </Card>
        </Container>
    )
}

export default MatrixInversion;
