import React from "react";
import { useState } from "react";
import { Container, Card, Form, Col, Row, Button } from "react-bootstrap";
import { evaluate } from "mathjs";

function Trapezoidal() {
    const [FX, setFX] = useState("");
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [n, setN] = useState(2);
    const [result, setResult] = useState(0);

    const inputFX = (e)=> {
        setFX(e.target.value);
    }
    const inputStart = (e)=> {
        setStart(e.target.value);
    }
    const inputEnd = (e)=> {
        setEnd(e.target.value);
    }
    const inputN = (e)=> {
        setN(e.target.value);
    }

    const calculator = ()=> {
        let a = parseFloat(start);
        let b = parseFloat(end);
        let h;
        let x = a;
        const arrayF = [];
        h = (b-a)/n;
        x = a;
        while(x <= b) {
            arrayF.push(f(x));
            x += h;
        }
        let I = 0;
        for (let j = 0; j < arrayF.length; j++) {
            if (j == 0 || j == arrayF.length-1) {
                I += arrayF[j];
            }
            else {
                I += 2*arrayF[j]; 
            }
        }
        I *= h/2;
        setResult(I);
        function f(x) {
            return evaluate(FX, {x});
        }
        
    }

    return (
        <Container>
            <Card>
                <Card.Header>Trapezoidal</Card.Header>
                <Card.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>f(x)</Form.Label>
                            <Form.Control value={FX} onChange={inputFX}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>n</Form.Label>
                            <Form.Control type="number" value={n} onChange={inputN}></Form.Control>
                        </Col>
                        
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>a</Form.Label>
                            <Form.Control type="number" value={start} onChange={inputStart}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>b</Form.Label>
                            <Form.Control type="number" value={end} onChange={inputEnd}></Form.Control>
                        </Col>
                    </Form.Group>
                    <Button onClick={calculator}>Calculate</Button>

                </Card.Body>
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
        </Container>
    )
}

export default Trapezoidal;