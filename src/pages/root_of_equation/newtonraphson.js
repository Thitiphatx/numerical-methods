import React from "react";
import { useState } from "react";
import { Container, Row, Card, Button, Form } from "react-bootstrap";
import { evaluate, derivative } from "mathjs";
import { generateTable } from "../../functions/generateTable";
import Plot from "react-plotly.js";
function NewtonRaphson() {
    const [FX, setFX] = useState("");
    const [xStart, setxStart] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);

    const calculator = ()=> {
        let iteration = 0;
        let maxIteration = 100;
        let xOld;
        let x = xStart;
        const newArr = [];
        do {
            iteration++;
            xOld = x;
            x = xOld - evaluate(FX, {x: xOld}) / derivative(FX, 'x').evaluate({x: xOld});
            newArr.push({
                x: xOld,
                y: x
            })
        } while((Math.abs(x-xOld)/x) * 100 >= 0.000001 && iteration < maxIteration);

        setLatestData({
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
            const step = Math.abs(latestData.start-arr.length) < 10 ? 0.1 : 1;
            for (let i = parseFloat(latestData.start)-1; i < parseFloat(arr.length)+1; i += step) {
                Graph.push(
                    {
                        x: i,
                        y: evaluate(latestData.equation, {x: i}),
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
                                    name: latestData.equation,
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
            <Card as={Row} className="mb-3">
                <Card.Header>Newton Raphson</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>f(x)</Form.Label>
                            <Form.Control onChange={inputFX}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>x start</Form.Label>
                            <Form.Control onChange={inputX}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={calculator}>Calculate</Button>
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