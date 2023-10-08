import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function GaussJordan() {
    const [matrix, setMatrix] = useState([[2,3,2],[1,2,1], [2,3,5]]);
    const [b, setB] = useState([2,3,4])
    const [size, setSize] = useState(3);
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
        let arr = JSON.parse(JSON.stringify(matrix));;
        let answer = [...b];

        for (let i = 0; i < size; i++) {
            let fixed = arr[i][i];
        
            if (fixed === 0) {
                let swapped = false;
                for (let j = i + 1; j < size; j++) {
                    if (arr[j][i] !== 0) {
                        swapRows(arr, i, j);
                        swapRows(answer, i, j);
                        swapped = true;
                        break;
                    }
                }
                if (!swapped) {
                    return null;
                }
                fixed = arr[i][i];
            }
        
            for (let j = i; j < size; j++) {
                arr[i][j] /= fixed;
            }
            answer[i] /= fixed;
        
            for (let j = 0; j < size; j++) {
                if (i === j) continue;
                let factor = arr[j][i];
                for (let k = i; k < size; k++) {
                    arr[j][k] -= factor * arr[i][k];
                }
                answer[j] -= factor * answer[i];
            }
        }
        
        function swapRows(arr, row1, row2) {
            const temp = arr[row1];
            arr[row1] = arr[row2];
            arr[row2] = temp;
        }
        setResult(answer);
    }

    return(
        <Card>
            <Card.Header>Gauss Jordan</Card.Header>
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
            <Card.Footer>Answer : {result.map((x, index)=> (
                <h5>x{index} : {x}</h5>
            ))}
            </Card.Footer>
        </Card>
    )
}

export default GaussJordan;