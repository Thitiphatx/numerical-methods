import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";

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
        const arr = JSON.parse(JSON.stringify(Amatrix));
        const Identity = generateIdentityMatrix(size);
        GaussJordan(arr, Identity);
        

        setResult(MatrixMultiply(Identity, Bmatrix));
    };

    const MatrixMultiply = (I, b)=> {
        var results = [];
        for (let i = 0; i < size; i++) {
            results[i] = 0;
            for (let j = 0; j < size; j++) {
                results[i] += parseFloat(I[i][j]) * parseFloat(b[j]);
            }
        }
        return results;
    }

    const GaussJordan = (matrix, Imatrix) => {
        for (let i = 0; i < size; i++) {
            if (matrix[i][i] == 0) {
                matrix[i][i] = 1e-15;
            }
            let fixed = matrix[i][i];

            for (let j = 0; j < size; j++) {
                Imatrix[i][j] /= fixed;
                matrix[i][j] /= fixed;
            }
            for (let j = 0; j < size; j++) {
                if (i == j) continue;
                let factor = matrix[j][i];
                for (let k = 0; k < size; k++) {
                    Imatrix[j][k] -= factor * Imatrix[i][k];
                    matrix[j][k] -= factor * matrix[i][k];
                }
            }
        }
    }

    const generateIdentityMatrix = (n) => {
        const newMatrix = [];
        for (let i = 0; i < n; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) newMatrix[i][j] = 1;
                else newMatrix[i][j] = 0;
            }
        }
        return newMatrix;
    };

    return (
        <Container>
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
    )
}

export default MatrixInversion;
