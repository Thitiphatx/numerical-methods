import React from 'react';
import { Container, Card, Form, Button, Row, InputGroup } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import { useState } from 'react';
import { generateTable } from '../../functions/calculator/generateTable';
import Plot from 'react-plotly.js';
import { CalOnepoint } from '../../functions/calculator/Root of Equation/Onepoint';
import { DatabaseManager } from '../../functions/DatabaseManager';
function Onepoint() {

    const [FX, setFX] = useState("");
    const [xStart, setXStart] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Onepoint";
    const TYPE = "XY";

    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setXStart(inputJson.start);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }

    const inputFX = (event) => {
        setFX(event.target.value);
    }
    const inputX = (event) => {
        setXStart(event.target.value);
    }

    const calculator = () => {
        const {newArr, xOld} = CalOnepoint(FX, xStart);
        setSaveAble(true);
        setInputs({
            equation: FX,
            start: xStart
        })
        setResultArr(newArr);
        setResult(xOld);
    }

    function generatePlot(arr) {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            for (let i = inputs.start; i < arr.length; i++) {
                Graph.push({
                    x: i,
                    y: evaluate(inputs.equation, {x: i}),
                })
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
                                    marker: {color: "blue"},
                                    name: inputs.equation
                                },
                                {
                                    x: arr.map((point)=> (point.x)),
                                    y: arr.map((point)=> (point.y)),
                                    mode: "markers",
                                    marker: {color: "red"},
                                    name: "OnePoint"
                                }
                            ]}
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
                    <Card.Header>Onepoint Iteration</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                    <Form.Label>f(x)</Form.Label>
                                    <Form.Control value={FX} onChange={inputFX} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                    <Form.Label>x start</Form.Label>
                                    <Form.Control value={xStart} onChange={inputX} />
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

export default Onepoint;
