import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { CalNewtondivide } from "../../functions/calculator/Interpolation/Newtondivide";
import { DatabaseManager } from "../../functions/DatabaseManager";

function NewtonDivided() {
    const [arrayPoints, setArrayPoints] = useState([{x: 0, y: 0}]);
    const [targetX, setTargetX] = useState(0);
    const [size, setSize] = useState(3);
    const [result, setResult] = useState(0);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Newtondivide";
    const TYPE = "Points";
    const fillData = (inputJson)=> {
        const newInputs = [];
        inputJson.points.map((point) => {
            newInputs.push({
                x: point.x,
                y: point.y,
            });
        })
        setSize(inputJson.size);
        setArrayPoints(newInputs);
        setTargetX(inputJson.xTarget);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    // input handler
    const inputSize = (e)=> {
        setSize(e.target.value);
    }
    const setPointSize = () => {
        const newArr = [...arrayPoints];
        let sizeDiff = size-newArr.length;
        for (let i = 0; i < Math.abs(sizeDiff); i++) {
            if (sizeDiff > 0) {
                newArr.push({
                    x: 0,
                    y: 0,
                })
            }
            else {
                newArr.pop();
            }
        }
        setArrayPoints(newArr);
    }
    const inputX = (e, index)=> {
        const newArr = [...arrayPoints];
        newArr[index].x = e.target.value;
        setArrayPoints(newArr);
    }
    const inputY = (e, index)=> {
        const newArr = [...arrayPoints];
        newArr[index].y = e.target.value;
        setArrayPoints(newArr);
    }
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }

    // calculate
    const calculator = ()=> {
        let answer = CalNewtondivide(arrayPoints, targetX);
        const newInputs = {
            size: size,
            points: arrayPoints.map(point => ({ x: point.x, y: point.y })),
            xTarget: targetX,
        }
        setInputs(newInputs);
        setSaveAble(true);
        setResult(answer);

    }
    return (
        <Container>
            {db.HistoryTab()}
            <Card>
                <Card.Header>Newton divided difference</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}>
                                <Form.Label>Number of points</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" value={size} onChange={inputSize}></Form.Control>
                                    <Button onClick={setPointSize}>Set</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            {arrayPoints.map((e, index)=> (
                                <Form.Group as={Row} key={index} className="mb-3">
                                <Col>
                                <InputGroup>
                                    <InputGroup.Text>{"x"+index}</InputGroup.Text>
                                    <Form.Control onChange={(e)=> inputX(e, index)}></Form.Control>
                                </InputGroup>
                                </Col>
                                <Col>
                                <InputGroup>
                                    <InputGroup.Text>{"y"+index}</InputGroup.Text>
                                    <Form.Control onChange={(e)=> inputY(e, index)}></Form.Control>
                                </InputGroup>
                                </Col>
                            </Form.Group>
                            ))}
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>target X</InputGroup.Text>
                                <Form.Control value={targetX} onChange={(e)=> inputTargetX(e)}></Form.Control>
                            </InputGroup>
                            
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

export default NewtonDivided;