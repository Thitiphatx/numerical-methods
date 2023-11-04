import React from 'react';
import { useState } from 'react';
import { evaluate } from 'mathjs';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { generateTable } from '../../functions/calculator/generateTable';
import Plot from 'react-plotly.js';
import { CalFalseposition } from '../../functions/calculator/Root of Equation/Falseposition';
import { DatabaseManager } from '../../functions/DatabaseManager';

function FalsePosition() {
    const [FX, setFX] = useState("");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Falseposition";
    const TYPE = "XY";

    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setXL(inputJson.start);
        setXR(inputJson.end);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    const inputFX = (event)=> {
        setFX(event.target.value);
    }
    const inputXL = (event)=> {
        setXL(event.target.value);
    }
    const inputXR = (event)=> {
       setXR(event.target.value);
    }

    const calculator = ()=> {
        const {newArr, x1} = CalFalseposition(FX, XL, XR);
        setSaveAble(true);
        setResultArr(newArr);
        setResult(x1);
        setInputs({
            equation: FX,
            start: XL,
            end: XR
        })
    }

    const generatePlot = (arr)=> {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            const step = Math.abs(inputs.start-inputs.end) < 10 ? 0.1 : 1;
            for (let i = parseFloat(inputs.start)-1; i < parseFloat(inputs.end)+1; i += step) {
                Graph.push(
                    {
                        x: i,
                        y: evaluate(inputs.equation, {x: i}),
                    }
                )
            }
            return (
                <Card as={Row} className="mb-3">
                    <Card.Header>Plot</Card.Header>
                    <Card.Body className="text-center">
                        <Plot 
                            data={[
                                {
                                    x: Graph.map((point)=> (point.x)),
                                    y: Graph.map((point)=> (point.y)),
                                    mode: "lines",
                                    marker: {color: 'blue'},
                                    name: inputs.equation,
                                },
                                {
                                    x: arr.map((point)=> (point.x)),
                                    y: arr.map((point)=> (point.y)),
                                    mode: "markers",
                                    marker: {color: 'red'},
                                    name: "False Position"
                                }
                            ]}
                            layout={{
                                yaxis: {
                                    title: "f(x)"
                                },
                                xaxis: {
                                    title: "x",
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <Container>
            {db.HistoryTab()}
            <Card as={Row} className="mb-3">
                <Card.Header>False Position Medthod</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control value={FX} onChange={inputFX}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>XL</Form.Label>
                                <Form.Control value={XL} onChange={inputXL}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>XR</Form.Label>
                                <Form.Control value={XR} onChange={inputXR}></Form.Control>
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
                    </Form>
                </Card.Body>
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
    )
}
export default FalsePosition;