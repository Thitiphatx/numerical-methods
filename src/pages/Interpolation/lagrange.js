import React from 'react';
import { Container, Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function Lagrange() {
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
    const inputX = (e, index)=> {
        const newArr = [...arrayPoints];
        newArr[index].x = e.target.value;
    }
    const inputY = (e, index)=> {
        const newArr = [...arrayPoints];
        newArr[index].y = e.target.value;
    }
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }


    const calculator = () => {
        const x = arrayPoints.map((e)=> (parseFloat(e.x)));
        const y = arrayPoints.map((e)=> (parseFloat(e.y)));
        let resultX = 0;
        let X = targetX;

        for (let i = 0; i < x.length; i++) {
            let L = 1;
            for (let j = 0; j < x.length; j++) {
                if (i === j) continue;
                L *= (x[j] - X) / (x[j] - x[i]);
            }
            resultX += y[i]*L;
        }

        setResult(resultX);
    }
        return(
            <Container>
            <Card>
                <Card.Header>Lagrange</Card.Header>
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

export default Lagrange;