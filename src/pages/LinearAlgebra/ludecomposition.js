import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";

function LUDecomposition() {
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
        let LMatrix = [];
        let UMatrix = [];
        let YMatrix = new Array(size).fill(0);
        let XMatrix = new Array(size).fill(0);

        for (let i = 0; i < size; i++) {
            LMatrix[i] = new Array(size).fill(0);
            UMatrix[i] = new Array(size).fill(0);
        }

        for (let i = 0; i < size; i++) {
            // finding U
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += LMatrix[i][k] * UMatrix[k][j];
                }
                UMatrix[i][j] = Amatrix[i][j] - sum;
            }

            // finding L
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += LMatrix[j][k] * UMatrix[k][i];
                }
                LMatrix[j][i] = (Amatrix[j][i] - sum) / UMatrix[i][i];
            }
        }

        // find Y from LY = B
        for (let i = 0; i < size; i++) {
            let sum = 0;
            for (let j = 0; j < size; j++) {
                sum += LMatrix[i][j] * YMatrix[j];
            }
            YMatrix[i] = (Bmatrix[i] - sum) / LMatrix[i][i];
        }

        // find X from UX = Y
        for (let i = size - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < size; j++) {
                sum += UMatrix[i][j] * XMatrix[j];
            }
            XMatrix[i] = (YMatrix[i] - sum) / UMatrix[i][i];
        }

        setResult(XMatrix);
    };

    return (
        <Container>
            <Card as={Row} className="mb-3">
                <Card.Header>LU Decomposition</Card.Header>
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
                            <Col>
                                <Form.Label>A</Form.Label>
                                {Amatrix.map((rowCell, rowIndex) => (
                                    <InputGroup key={rowIndex}>
                                        {rowCell.map((colCell, colIndex) => (
                                            <Form.Control key={colIndex} value={Amatrix[rowIndex][colIndex]} onChange={(e) => inputMatrix(e, rowIndex, colIndex)}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>X</Form.Label>
                                {Amatrix.map((row, index) => (
                                    <Form.Control className="text-center" key={index} value={`x${index}`} disabled></Form.Control>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>B</Form.Label>
                                {Bmatrix.map((row, index) => (
                                    <Form.Control className="text-center" key={index} value={Bmatrix[index]} onChange={(e) => inputB(e, index)}></Form.Control>
                                ))}
                            </Col>
                        </Form.Group>
                        <Button onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                {result.map((x, index) => (
                    <Card.Footer key={index}>x{index} : {x}</Card.Footer>
                ))}
            </Card>
        </Container>
    );
}

export default LUDecomposition;
