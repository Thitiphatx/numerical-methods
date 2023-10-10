import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function GaussElimination() {
    const [matrix, setMatrix] = useState([[2,3,2], [1,2,1], [2,3,5]]);
    const [b, setB] = useState([2,3,4])
    const [size, setSize] = useState(3);
    
    const [finalResult, setFinalResult] = useState([0,0,0]);
    const [answerMatrix, setAnswerMatrix] = useState([[0,0,0], [0,0,0], [0,0,0]]);
    const [result, setResult] = useState([0, 0, 0]);

    const inputSize = (event)=> {
        if (event.target.value >= 2) {
            setSize(event.target.value);
        }
    }
    const inputMatrixSize = ()=> {
        const newMatrix = [];
        for (let i = 0; i < size; i++) {
            const rowMatrix = [];
            for (let j = 0; j < size; j++) {
                rowMatrix.push(0);
            }
            newMatrix.push(rowMatrix);
        }
        setMatrix(newMatrix);

        const newB = [];
        for (let i = 0; i < size;i++) {
            newB.push(0);
        }
        setB(newB);
    }
    const changeMatrix = (event, row, col)=> {
        const newMatrix = [...matrix];
        newMatrix[row][col] = event.target.value;
        setMatrix(newMatrix);
    }
    const inputB = (event, index)=> {
        const newB = [...b];
        newB[index] = event.target.value;
        setB(newB);
    }

    const calculator = ()=> {
        let arr = JSON.parse(JSON.stringify(matrix));
        let answer = [...b];
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (arr[i][j] == 0) {
                    arr[i][j] = 1e-14;
                }
            }
            if (answer[i] == 0) {
                answer[i] = 1e-14;
            }
        }

        for (let i= 0; i < size; i++) {
            for (let j = i+1; j < size; j++) {
                let ratio = arr[j][i]/arr[i][i];
                

                for (let k = 0; k < size; k++) {
                    arr[j][k] -= ratio * arr[i][k];
                }
                answer[j] -= ratio * answer[i];
            }
        }

        const newResult = JSON.parse(JSON.stringify(answer));

        for (let i = size-1; i >= 0; i--) {
            for (let j = i+1; j < size; j++) {
                newResult[i] -= arr[i][j]*newResult[j];
            }
            newResult[i] = newResult[i]/arr[i][i];
        }



        setAnswerMatrix(arr);
        setResult(answer);
        setFinalResult(newResult);
    }

    return(
        <>
            <Card as={Row} className="mb-3">
                <Card.Header>Gauss Elimination</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={3}>
                                <Form.Label>Matrix size</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" value={size} onChange={(e)=> {inputSize(e)}}></Form.Control>
                                    <Button variant="secondary" onClick={inputMatrixSize}>Set</Button>
                                </InputGroup>
                                
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>A</Form.Label>
                                {matrix.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {matrix[rowIndex].map((col, colIndex)=> (
                                            <Form.Control key={colIndex} value={matrix[rowIndex][colIndex]} onChange={(e)=> changeMatrix(e, rowIndex, colIndex)}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>x</Form.Label>
                                {matrix.map((row, rowIndex)=> (
                                    <Form.Group key={rowIndex}>
                                        <Form.Control className="text-center" value={`x${rowIndex}`} disabled></Form.Control>
                                    </Form.Group>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>b</Form.Label>
                                {b.map((row, index)=> (
                                    <Form.Group key={index}>
                                        <Form.Control className="text-center" value={b[index]} onChange={(e)=> inputB(e, index)}></Form.Control>
                                    </Form.Group>
                                ))}
                            </Col>
                            
                        </Form.Group>
                        <Button variant="primary" onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            <Card as={Row} className="mb-3">
                <Card.Header>Answer</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>A</Form.Label>
                                {answerMatrix.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {answerMatrix[rowIndex].map((col, colIndex)=> (
                                            <Form.Control key={colIndex} value={answerMatrix[rowIndex][colIndex]} disabled></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>x</Form.Label>
                                {answerMatrix.map((row, rowIndex)=> (
                                    <Form.Group key={rowIndex}>
                                        <Form.Control className="text-center" value={`x${rowIndex}`} disabled></Form.Control>
                                    </Form.Group>
                                ))}
                            </Col>
                            <Col xs={1}>
                                <Form.Label>b</Form.Label>
                                {result.map((row, index)=> (
                                    <Form.Group key={index}>
                                        <Form.Control className="text-center" value={result[index]} disabled></Form.Control>
                                    </Form.Group>
                                ))}
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
                {finalResult.map((e, index)=> (
                    <Card.Footer key={index}>x{index}: {e}</Card.Footer>
                ))}
                
            </Card>
        </>
    )
}

export default GaussElimination;