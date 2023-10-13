import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { generateTable } from '../../functions/generateTable';


function Graphical() {
    const [fx, setfx] = useState("");
    const [xStart, setXstart] = useState(0);
    const [result, setResult] = useState(0);

    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);

    const inputFx = (event)=> {
        setfx(event.target.value);
    }
    const inputXStart = (event)=> {
        setXstart(event.target.value);
    }

    const Calculator = ()=> {
        let y1, y2, x, error;
        x = parseFloat(xStart);
        y1 = evaluate(fx, {x: x});
        y2 = 0;
        error = 0.000001;
        const newArr = [];
        let step = 1;
        while(Math.abs(y1) > error && y1 != 0) {
            x += step;
            y2 = evaluate(fx, {x: x});
            if (y1 * y2 > 0) {
                y1 = y2;
                newArr.push({
                    x: x,
                    fx: y1,
                })
            }
            else {
                x -= step;
                step /= 10;
            }
        }
        setLatestData({
            equation: fx,
            start: xStart
        })
        setResult(x);
        setResultArr(newArr);
    }

    function generatePlot(arr) {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
                for (let i = parseFloat(latestData.start)-1; i < arr.length+1; i++) {
                    Graph.push({
                        x: i,
                        fx: evaluate(latestData.equation, {x: i}),
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
                                    y: Graph.map((point)=> (point.fx)),
                                    mode: "lines",
                                    marker: {color: 'blue'},
                                    name: latestData.equation,
                                },
                                {
                                    x: resultArr.map((point)=> (point.x)),
                                    y: resultArr.map((point)=> (point.fx)),
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
        <>
            <Card as={Row} className="mb-3">
                <Card.Header>Graphical Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control type="String" onChange={(e)=> inputFx(e)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>From X</Form.Label>
                                <Form.Control type="number" onChange={(e)=> inputXStart(e)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={Calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer><h5>Answer: {result}</h5></Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </>
    )
}

export default Graphical;