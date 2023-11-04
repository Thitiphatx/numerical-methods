import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { DatabaseManager } from "../../functions/DatabaseManager";
import { CalGaussSeidel } from "../../functions/calculator/LinearAlgebra/GaussSeidel";

function GaussSeidel() {
    const [matrixA, setMatrixA] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const [matrixB, setMatrixB] = useState([0,0,0]);
    const [matrixX, setMatrixX] = useState([0,0,0]);
    const [size, setSize] = useState(3);
    const [inputs, setInputs] = useState([]);
    const [saveAble, setSaveAble] = useState(false);


    // Database Handler
    const METHOD = "GaussSeidel";
    const TYPE = "Matrix";
    const fillData = (inputJson) => {
        setSize(inputJson.size);
        setMatrixA(inputJson.A);
        setMatrixB(inputJson.B);
    };
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }
    
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
        const x = CalGaussSeidel(matrixA, matrixB, size);
        const newInputs = {
            size: size,
            A: matrixA,
            B: matrixB
        }
        setSaveAble(true);
        setInputs(newInputs);
        setMatrixX(x);
    }

    return (
        <Container>
            {db.HistoryTab()}
            <Card>
                <Card.Header>Gauss Seidel Iteration</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={3}>
                                <Form.Label>Matrix size</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" value={size} onChange={inputSize}></Form.Control>
                                    <Button variant="secondary" onClick={setMatrixSize}>Set</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col className="d-flex justify-content-center">
                                <div className="mx-3 text-center">
                                <h4>A</h4>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {row.map((col, colIndex)=> (
                                            <Form.Control className="text-center matrix-field" key={colIndex} value={matrixA[rowIndex][colIndex]} onChange={(e)=> {changeMatrixA(e, rowIndex, colIndex)}}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                                </div>
                                <div className="mx-3 text-center">
                                <h4>X</h4>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        <Form.Control className="text-center matrix-field" value={"x"+rowIndex} disabled></Form.Control>
                                    </InputGroup>
                                ))}
                                </div>
                                <div className="mx-3 text-center">
                                <h4>B</h4>
                                {matrixB.map((row, index)=> (
                                    <InputGroup key={index}>
                                        <Form.Control className="text-center matrix-field" value={matrixB[index]} onChange={(e)=> changeMatrixB(e, index)}></Form.Control>
                                    </InputGroup>
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
                {matrixX.map((e, index)=> (
                    <Card.Footer>x{index} : {e} </Card.Footer>
                ))}

            </Card>
        </Container>
    )
}

export default GaussSeidel;