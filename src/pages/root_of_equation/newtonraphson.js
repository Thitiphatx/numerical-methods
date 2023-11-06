import React from "react";
import { useState } from "react";
import { Container, Row, Card, Button, Form, InputGroup } from "react-bootstrap";
import { evaluate } from "mathjs";
import { generateTable } from "../../functions/calculator/generateTable";
import Plot from "react-plotly.js";
import { CalNewtonRaph } from "../../functions/calculator/Root of Equation/NewtonRaphson";
import { DatabaseManager } from "../../functions/DatabaseManager";

function NewtonRaphson() {
    const [FX, setFX] = useState("");
    const [xStart, setxStart] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Newtonraph";
    const TYPE = "XY";

    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setxStart(inputJson.start);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    const calculator = ()=> {
        const {newArr, x} = CalNewtonRaph(FX, xStart);
        setSaveAble(true);
        setInputs({
            equation: FX,
            start: xStart,
        })
        setResultArr(newArr);
        setResult(x);
    }

    const inputX = (event)=> {
        setxStart(event.target.value);
    }
    const inputFX = (event)=> {
        setFX(event.target.value);
    }

    const generatePlot = (arr)=> {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            const step = Math.abs(inputs.start-arr.length) < 10 ? 0.1 : 1;
            for (let i = parseFloat(inputs.start)-1; i < parseFloat(arr.length)+1; i += step) {
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

    return(
        <Container>
            {db.HistoryTab()}
            <Card as={Row} className="mb-3">
                <Card.Header>Newton Raphson</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>f(x)</Form.Label>
                            <Form.Control value={FX} onChange={inputFX}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>x start</Form.Label>
                            <Form.Control value={xStart} onChange={inputX}></Form.Control>
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
                <Card.Footer>Answer : {result || 0}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
        
    )
}

export default NewtonRaphson;