import React from "react";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { CalCramer } from "../../functions/calculator/LinearAlgebra/Cramer";
import { DatabaseManager } from "../../functions/DatabaseManager";

function Cramer() {
    const [matrix, setMatrix] = useState([[2,3,2],[1,2,1], [2,3,5]]);
    const [b, setB] = useState([2,3,4])
    const [size, setSize] = useState(3);
    const [result, setResult] = useState([0, 0, 0]);
    const [inputs, setInputs] = useState([]);
    const [saveAble, setSaveAble] = useState(false);


    // Database Handler
    const METHOD = "Cramer";
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
        let cramerResult = CalCramer(matrix, b, size);
        const newInputs = {
            size: size,
            A: matrix,
            B: b
        };
        setInputs(newInputs);
        setResult(cramerResult);
        setSaveAble(true);
    }

    return(
        
        <Card>
            {db.HistoryTab()}
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
                        <Button variant="primary" onClick={calculator}>
                            Calculate
                        </Button>
                        {saveAble && (
                            <Button variant="outline-primary" onClick={saveInputs}>
                                Save inputs
                            </Button>
                        )}
                    </InputGroup>
                </Form>
            </Card.Body>
            {result.map((x, index)=> (
                <Card.Footer key={index}>x{index}: {x}</Card.Footer>
            ))}
        </Card>
    )
}

export default Cramer;