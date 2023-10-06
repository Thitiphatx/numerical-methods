import React from "react";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { evaluate, derivative } from "mathjs";

function NewtonRaphson() {
    const [fx, setFx] = useState("");
    const [xStart, setxStart] = useState(0);
    const [result, setResult] = useState(0);

    const Calculator = ()=> {
        let xOld;
        let x = xStart;

        do {
            xOld = x;
            x = xOld - evaluate(fx, {x: xOld}) / derivative(fx, 'x').evaluate({x: xOld});
        } while((Math.abs(x-xOld)/x) * 100 >= 0.000001);
        setResult(x);
    }

    const inputX = (event)=> {
        setxStart(event.target.value);
    }
    const inputFx = (event)=> {
        setFx(event.target.value);
    }

    return(
        <Card>
            <Card.Header>Newton Raphson</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>f(x)</Form.Label>
                        <Form.Control onChange={inputFx}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>x start</Form.Label>
                        <Form.Control onChange={inputX}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={Calculator}>Calculate</Button>
                </Form>
            </Card.Body>
            <Card.Footer>Answer : {result}</Card.Footer>
        </Card>
    )
}

export default NewtonRaphson;