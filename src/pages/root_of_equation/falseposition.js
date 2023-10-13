import React from 'react';
import { useState } from 'react';
import { evaluate } from 'mathjs';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { generateTable } from '../../functions/generateTable';
import Plot from 'react-plotly.js';

function FalsePosition() {
    const [FX, setFX] = useState("");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);
    const [iterBreak, setIterBreak] = useState(false);

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
        setIterBreak(false);
        let iteration = 0;
        let maxIteration = 100;
        let xl = XL || 0.000001;
        let xr = XR || 0.000001;
        let fx = FX;
        if (fx == "") return;

        let fxl = evaluate(fx, {x: xl})
        let fxr = evaluate(fx, {x: xr})
        let x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
        let x1_old = 0;

        const newArr = [];
        
        while(Math.abs(x1-x1_old)/x1 * 100 >= 0.000001 && iteration < maxIteration) {
            iteration++;
            let fx1 = evaluate(fx, {x: x1})
            newArr.push({
                x: x1,
                fx: fx1
            })
            if (fx1 * fxr > 0) {
                xr = x1;
                fxr = fx1;
            }
            else {
                xl = x1;
                fxl = fx1;
            }
            x1_old = x1;
            x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
        }
        if (iteration == maxIteration) {
            setIterBreak(true);
        }
        console.log(iteration)
        setResultArr(newArr);
        setResult(x1);
        setLatestData({
            equation: FX,
            start: XL,
            end: XR
        })
    }

    const resultBadge = ()=> {
        if (iterBreak) {
            return (
                <Badge bg="danger">Max iteration</Badge>
            )
        }
        else {
            return null
        }
    }

    const generatePlot = (arr)=> {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            const step = Math.abs(latestData.start-latestData.end) < 10 ? 0.1 : 1;
            for (let i = parseFloat(latestData.start)-1; i < parseFloat(latestData.end)+1; i += step) {
                Graph.push(
                    {
                        x: i,
                        fx: evaluate(latestData.equation, {x: i}),
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
                                    y: Graph.map((point)=> (point.fx)),
                                    mode: "lines",
                                    marker: {color: 'blue'},
                                    name: latestData.equation,
                                },
                                {
                                    x: arr.map((point)=> (point.x)),
                                    y: arr.map((point)=> (point.fx)),
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
            <Card as={Row} className="mb-3">
                <Card.Header>False Position Medthod</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control type="string" onChange={inputFX}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>XL</Form.Label>
                                <Form.Control type="number" onChange={inputXL}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>XR</Form.Label>
                                <Form.Control type="number" onChange={inputXR}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Answer : {result} {resultBadge()}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
    )
}
export default FalsePosition;