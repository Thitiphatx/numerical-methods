import React from "react";
import { useState } from "react";
import { Container, Card, Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import { CalSimpson } from "../../functions/calculator/Integration/Simpson";
import { DatabaseManager } from "../../functions/DatabaseManager";

function Simpson() {
    const [FX, setFX] = useState("");
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [n, setN] = useState(2);
    const [result, setResult] = useState(0);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Simpson";
    const TYPE = "XY";

    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setStart(inputJson.start);
        setEnd(inputJson.end);
        setN(inputJson.n);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

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
        const answer = CalSimpson(FX, start, end, n);
        const newInputs = {
            equation: FX,
            start: start,
            end: end,
            n: n,
        };
        setSaveAble(true);
        setInputs(newInputs);
        setResult(answer);
    }

    return (
        <Container>
            {db.HistoryTab()}
            <Card>
                <Card.Header>Simpson's Rules</Card.Header>
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
                    <InputGroup>
                        <Button variant="primary" onClick={calculator}>
                            Calculate
                        </Button>
                        {saveAble && (
                            <Button variant="outline-primary" onClick={saveInputs}>Save inputs</Button>
                        )}
                    </InputGroup>

                </Card.Body>
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
        </Container>
    )
}

export default Simpson;


// 68.015625
// 41.022216796875
// 37.390625
