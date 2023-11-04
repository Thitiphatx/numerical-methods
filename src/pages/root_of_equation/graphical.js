import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { generateTable } from '../../functions/calculator/generateTable';
import { CalGraphical } from '../../functions/calculator/Root of Equation/Graphical';
import { DatabaseManager } from '../../functions/DatabaseManager';
function Graphical() {
    const [FX, setFX] = useState("");
    const [xStart, setXstart] = useState("");
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Graphical";
    const TYPE = "XY";

    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setXstart(inputJson.start);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    const inputFx = (event)=> {
        setFX(event.target.value);
    }
    const inputXStart = (event)=> {
        setXstart(event.target.value);
    }

    const calculator = ()=> {
        const {newArr, x} = CalGraphical(FX, xStart);
        setInputs({
            equation: FX,
            start: xStart
        })
        setSaveAble(true);
        setResult(x);
        setResultArr(newArr);
    }

    function generatePlot(arr) {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
                for (let i = parseFloat(inputs.start)-1; i < arr.length+1; i++) {
                    Graph.push({
                        x: i,
                        y: evaluate(inputs.equation, {x: i}),
                    });
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
                                    x: resultArr.map((point)=> (point.x)),
                                    y: resultArr.map((point)=> (point.y)),
                                    mode: "markers",
                                    marker: {color: 'red'},
                                    name: "Graphical",
                                }
                            ]}
                            layout={
                                {
                                    xaxis: {
                                        title: "x"
                                    },
                                    yaxis: {
                                        title: "f(x)"
                                    }
                                }
                            }
                        />
                    </Card.Body>
                </Card>
            )
        }
        
    }
    
    return(
        <Container>
            {db.HistoryTab()}
            <Card as={Row} className="mb-3">
                <Card.Header>Graphical Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control value={FX} onChange={(e)=> inputFx(e)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>From X</Form.Label>
                                <Form.Control value={xStart} onChange={(e)=> inputXStart(e)}></Form.Control>
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
                <Card.Footer>Answer: {result}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
    )
}

export default Graphical;