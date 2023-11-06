import React from "react";
import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { CalMultipleLeast } from "../../functions/calculator/Regression/Leastquare";
import { DatabaseManager } from '../../functions/DatabaseManager';

export default function MultipleLeastSquares() {
    const [arrayX, setArrayX] = useState([[0,1,2]])
    const [arrayY, setArrayY] = useState([0,1,2]);
    const [xTarget, setxTarget] = useState(0);
    const [result, setResult] = useState(0);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "MultiLeastSquare";
    const TYPE = "Table";
    const fillData = (inputJson)=> {
        setArrayX(inputJson.x);
        setArrayY(inputJson.y);
        setxTarget(inputJson.xTarget);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    // input controller
    const addX = ()=> {
        const newArray = [...arrayX];
        newArray.push(new Array(newArray[0].length).fill(0));
        setArrayX(newArray);
    }
    const removeX = ()=> {
        const newArray = [...arrayX];
        if (newArray.length > 1) {
            newArray.pop();
            setArrayX(newArray);
        }
    }
    const addRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].push(0);
        }
        newArrayY.push(0);
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    const removeRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].pop();
        }
        newArrayY.pop();
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    // input handler
    const inputX = (e, row, index)=> {
        const newArray = [...arrayX];
        newArray[row][index] = e.target.value;
        setArrayX(newArray);
    }
    const inputY = (e, index)=> {
        const newArray = [...arrayY];
        newArray[index] = e.target.value;
        setArrayY(newArray);
    }
    const inputxTarget = (e)=> {
        setxTarget(e.target.value);
    }

    const calculator = ()=> {
        const answer = CalMultipleLeast(arrayX, arrayY, xTarget)
        const newInputs = {
            x: arrayX,
            y: arrayY,
            xTarget: xTarget
        };
        setSaveAble(true);
        setInputs(newInputs)
        setResult(answer);
    }

    return (
        <Container>
            {db.HistoryTab()}
            <Card>
                <Card.Header>Multiple Least Squares</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Number of X</Form.Label>
                                <InputGroup>
                                    <Button variant="outline-primary" onClick={addX} className="w-50">Add x</Button>
                                    <Button variant="outline-danger" onClick={removeX} className="w-50">Remove x</Button>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label>Number of row (n)</Form.Label>
                                <InputGroup>
                                    <Button variant="outline-primary" onClick={addRow} className="w-50">Add row</Button>
                                    <Button variant="outline-danger" onClick={removeRow} className="w-50">Remove row</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-center">
                            {arrayX.map((dataSet, index)=> (
                                <Col key={index}>
                                    <h4 className="text-center">{"x"+index}</h4>
                                    {dataSet.map((data, idx)=> (
                                        <Form.Control key={idx} value={data} className="text-center" onChange={(e)=> inputX(e, index, idx)}></Form.Control>
                                    ))}
                                </Col>
                            ))}
                            
                            <Col>
                            <h4 className="text-center">y</h4>
                                {arrayY.map((e, index)=> (
                                    <Form.Control key={index} value={e} onChange={(e)=> inputY(e, index)} className="text-center"></Form.Control>
                                ))}
                            
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>target X</InputGroup.Text>
                                    <Form.Control value={xTarget} onChange={inputxTarget}></Form.Control>
                                </InputGroup>
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
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
        </Container>
    )
}