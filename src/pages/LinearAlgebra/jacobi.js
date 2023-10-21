import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { generateMatrix } from "./generateMatrix";

function Jacobi() {
    const [matrixA, setMatrixA] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const [matrixB, setMatrixB] = useState([0,0,0]);
    const [matrixX, setMatrixX] = useState([1,1,1]);
    const [size, setSize] = useState(3);

    const [matrixResult, setMatrixResult] = useState([]);

    
    // input handler
    const inputSize = (e)=> {
        setSize(e.target.value);
    }
    const setMatrixSize = () => {
        let SIZE = parseInt(size);
        setMatrixA(new Array(SIZE).fill().map(()=> new Array(SIZE).fill(0)));
        setMatrixB(new Array(SIZE).fill(0));

    }
    const changeMatrixA = (e, row, col)=> {
        const newMatrix = [...matrixA];
        newMatrix[row][col] = e.target.value;
        setMatrixA(newMatrix);
    }
    const changeMatrixB = (e, index)=> {
        const newMatrix = [...matrixB];
        newMatrix[index] = e.target.value;
        setMatrixB(newMatrix);
    }

    // calculate
    const calculator = ()=> {
        let A = JSON.parse(JSON.stringify(matrixA));
        let B = [...matrixB];
        let xOld = [];
        let x = new Array(parseInt(size)).fill(0);
        let error = 0.001;
        let passCounter = 0;
        let iteration = 0;

        while(passCounter < size) {
            for (let i = 0; i < size; i++) {
                xOld[i] = x[i];
            }

            for (let i = 0; i < size; i++) {
                let sum = B[i];
                for (let j = 0; j < size; j++) {
                    if (i == j) continue;
                    sum -= A[i][j]*xOld[j];
                }
                x[i] = sum/A[i][i];
            }
            passCounter = 0;
            for (let i = 0; i < size; i++) {
                if (Math.abs((x[i] - xOld[i]) / x[i]) * 100 < error) {
                    passCounter++;
                }
            }
            iteration++;
        }
        setMatrixResult(x);
    }

    return (
        <Container>
            <Card>
                <Card.Header>Jacobi Iteration</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={3}>
                                <InputGroup>
                                    <Form.Control type="number" value={size} onChange={inputSize}></Form.Control>
                                    <Button variant="secondary" onClick={setMatrixSize}>Set</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {row.map((col, colIndex)=> (
                                            <Form.Control key={colIndex} value={matrixA[rowIndex][colIndex]} onChange={(e)=> {changeMatrixA(e, rowIndex, colIndex)}}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </Col>
                            <Col xs={1}>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        <Form.Control value={"x"+rowIndex} disabled></Form.Control>
                                    </InputGroup>
                                ))}
                            </Col>
                            <Col xs={1}>
                                {matrixB.map((row, index)=> (
                                    <InputGroup key={index}>
                                        <Form.Control value={matrixB[index]} onChange={(e)=> changeMatrixB(e, index)}></Form.Control>
                                    </InputGroup>
                                ))}
                            </Col>
                        </Form.Group>
                        
                        <Button onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                {matrixResult.map((e, index)=> (
                    <Card.Footer>x{index} : {e} </Card.Footer>
                ))}
                
            </Card>
        </Container>
    )
}

export default Jacobi;