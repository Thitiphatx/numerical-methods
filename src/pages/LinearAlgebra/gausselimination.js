import React from "react";
import { Card, Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import { useState } from "react";
import { DatabaseManager } from "../../functions/DatabaseManager";
import { CalGaussElimination } from "../../functions/calculator/LinearAlgebra/GaussElimination";

function GaussElimination() {
    const [matrix, setMatrix] = useState([[2,3,2], [1,2,1], [2,3,5]]);
    const [b, setB] = useState([2,3,4])
    const [size, setSize] = useState(3);
    
    const [finalResult, setFinalResult] = useState([0,0,0]);
    const [answerMatrix, setAnswerMatrix] = useState([[0,0,0], [0,0,0], [0,0,0]]);
    const [result, setResult] = useState([0, 0, 0]);
    const [inputs, setInputs] = useState([]);
    const [saveAble, setSaveAble] = useState(false);


    // Database Handler
    const METHOD = "GaussElim";
    const TYPE = "Matrix";
    const fillData = (inputJson) => {
        setSize(inputJson.size);
        setMatrix(inputJson.A);
        setB(inputJson.B);
    };
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

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
        let {arr, answer, newResult} = CalGaussElimination(matrix, b, size);
        const newInputs = {
            size: size,
            A: matrix,
            B: b,
        };
        
        setSaveAble(true);
        setInputs(newInputs);
        setAnswerMatrix(arr);
        setResult(answer);
        setFinalResult(newResult);
    }

    return(
        <Container>
            {db.HistoryTab()}
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
                            <Col className="d-flex justify-content-center">
                                <div className="mx-3 text-center">
                                    <h4>A</h4>
                                    {matrix.map((row, rowIndex)=> (
                                        <InputGroup key={rowIndex}>
                                            {matrix[rowIndex].map((col, colIndex)=> (
                                                <Form.Control className="text-center matrix-field" key={colIndex} value={matrix[rowIndex][colIndex]} onChange={(e)=> changeMatrix(e, rowIndex, colIndex)}></Form.Control>
                                            ))}
                                        </InputGroup>
                                    ))}
                                </div>
                                <div className="mx-3 text-center">
                                    <h4>x</h4>
                                    {matrix.map((row, rowIndex)=> (
                                        <Form.Group key={rowIndex}>
                                            <Form.Control className="text-center matrix-field" value={`x${rowIndex}`} disabled></Form.Control>
                                        </Form.Group>
                                    ))}
                                </div>
                                <div className="mx-3 text-center">
                                    <h4>b</h4>
                                    {b.map((row, index)=> (
                                        <Form.Group key={index}>
                                            <Form.Control className="text-center matrix-field" value={b[index]} onChange={(e)=> inputB(e, index)}></Form.Control>
                                        </Form.Group>
                                    ))}
                                </div>
                                
                            </Col>
                            
                        </Form.Group>
                        <InputGroup>
                        <Button variant="primary" onClick={calculator}>Calculate</Button>
                        {saveAble && (
                            <Button variant="outline-primary" onClick={saveInputs}>
                                Save inputs
                            </Button>
                        )}
                        </InputGroup>
                        
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
        </Container>
    )
}

export default GaussElimination;