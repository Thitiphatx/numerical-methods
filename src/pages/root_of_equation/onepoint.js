import React from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import { useState } from 'react';
import { generateTable } from '../../functions/generateTable';
import Plot from 'react-plotly.js';
function Onepoint() {

    const [FX, setFX] = useState("");
    const [xStart, setXStart] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);

    const inputFX = (event) => {
        setFX(event.target.value);
    }
    const inputX = (event) => {
        setXStart(event.target.value);
    }

    const calculator = () => {
        let iteration = 0;
        let maxIteration = 100;
        let xOld;
        let fx = FX;
        let x = parseFloat(xStart);

        const newArr = [];
        do {
            iteration++;
            xOld = x;
            x = evaluate(fx, { x });
            newArr.push({
                x: xOld,
                y: x
            })
        } while ((Math.abs(x - xOld) / x) * 100 >= 0.000001 && iteration < maxIteration && x != 0);
        setLatestData({
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
            for (let i = latestData.start; i < arr.length; i++) {
                Graph.push({
                    x: i,
                    y: evaluate(latestData.equation, {x: i}),
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
                                    name: latestData.equation
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
                <Card as={Row} className="mb-3">
                    <Card.Header>Onepoint Iteration</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                    <Form.Label>f(x)</Form.Label>
                                    <Form.Control type="text" onChange={inputFX} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                    <Form.Label>x start</Form.Label>
                                    <Form.Control type="number" onChange={inputX} />
                            </Form.Group>
                            <Button variant="primary" onClick={calculator}>Calculate</Button>
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
