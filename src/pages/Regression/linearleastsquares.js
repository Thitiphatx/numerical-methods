import React from 'react';
import { Container, Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function LinearLeastSquares() {
    const [arrayPoints, setArrayPoints] = useState([{x: 0, y: 0}]);
    const [targetX, setTargetX] = useState(0);
    const [size, setSize] = useState(3);

    const [result, setResult] = useState(0);

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
    const inputX = (e, index) => {
        const newArr = [...arrayPoints];
        newArr[index].x = e.target.value;
        setArrayPoints(newArr);
    };
    const inputY = (e, index) => {
        const newArr = [...arrayPoints];
        newArr[index].y = e.target.value;
        setArrayPoints(newArr);
    };
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }


    const calculator = () => {
        const x = arrayPoints.map((e)=> (parseFloat(e.x)));
        const y = arrayPoints.map((e)=> (parseFloat(e.y)));
        const xTarget = parseFloat(targetX);
        let matrix = new Array(2).fill(new Array(2).fill(0));
        let answer = new Array(2).fill(0);

        for (let i = 0; i < size; i++) {
            matrix[0][1] += x[i];
            matrix[1][0] += x[i];
            matrix[1][1] += Math.pow(x[i],2);

            answer[0] += y[i];
            answer[1] += x[i]*y[i];
        }

        setResult(A[0]+xTarget*A[1]);
    }
        return(
            <Container>
            <Card>
                <Card.Header>Linear Regression</Card.Header>
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
                        <Button onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
        </Container>
        )
}

export default LinearLeastSquares;