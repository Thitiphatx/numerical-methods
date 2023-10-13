import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

function Cramer() {
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
        let mainMatrix = JSON.parse(JSON.stringify(matrix));
        let answer = [...b];
        let cramerResult = [];
        for (let col = 0; col < size; col++) {
            // re clone matrix
            let arr = JSON.parse(JSON.stringify(matrix));

            // replace a[i] with b
            for (let row = 0; row < size; row++) {
                arr[row][col] = answer[row];
            }
            let det = determinant(mainMatrix);
            let detI = determinant(arr);
            cramerResult.push(detI/det);
        }
        setResult(cramerResult);
        
    }

    const determinant = (matrix)=> {
        let row = 0;
        let col = 0;
        let top = 0;
        let down = 0;
        for (let i = 0; i < size; i++) {
            col = i;
            let temp_multiply = 1;
            while(true) {
                temp_multiply *= matrix[row][col];
                row++;
                col++;
                if (row >= size) {
                    row = 0;
                    break;
                }
                if (col >= size) {
                    col = 0;
                }
            }
            top += temp_multiply;
        }

        row = 2;
        col = 0;

        for (let i = size-1; i >= 0; i--) {
            col = Math.abs(i-2)
            let temp_multiply = 1;
            while (true) {
                temp_multiply *= matrix[row][col];
                row--;
                col++;
                if (row < 0) {
                    row = 2;
                    break;
                }
                if (col >= size) {
                    col = 0;
                }
            }
            down += temp_multiply;
        }
        return top-down;
    }

    return(
        <Card>
            <Card.Header>Cramer's rule</Card.Header>
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
            {result.map((x, index)=> (
                <Card.Footer key={index}>x{index}: {x}</Card.Footer>
            ))}
        </Card>
    )
}

export default Cramer;