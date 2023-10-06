import React from "react";
import { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { evaluate } from "mathjs";

function Secant() {
    const [fx, setFx] = useState("");
    const [x0, setx0] = useState(0);
    const [x1, setx1] = useState(0);
    const [result, setResult] = useState(0);

    const Calculator = ()=> {
        let local_x0 = x0;
        let local_x1 = x1;
        let x2, xOld, fx0, fx1;

        do {
            fx0 = evaluate(fx, {x:local_x0});
            fx1 = evaluate(fx, {x:local_x1});
            x2 = local_x0 - ( fx0 * (local_x0 - local_x1 ) ) / ( fx0 - fx1)
            xOld = local_x1;
            
            local_x0 = local_x1;
            local_x1 = x2;

        } while((Math.abs(x2-xOld)/x2) * 100 >= 0.000001);
        setResult(x2);
    }

    const inputX0 = (event)=> {
        setx0(event.target.value);
    }
    const inputX1 = (event)=> {
        setx1(event.target.value);
    }
    const inputFx = (event)=> {
        setFx(event.target.value);
    }

    return(
        <Card>
            <Card.Header>Secant Method</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>f(x)</Form.Label>
                        <Form.Control onChange={inputFx}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>x0</Form.Label>
                            <Form.Control onChange={inputX0}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>x1</Form.Label>
                            <Form.Control onChange={inputX1}></Form.Control>
                        </Col>
                        
                    </Form.Group>
                    <Button variant="primary" onClick={Calculator}>Calculate</Button>
                </Form>
            </Card.Body>
            <Card.Footer>Answer : {result}</Card.Footer>
        </Card>
    )
}

export default Secant;