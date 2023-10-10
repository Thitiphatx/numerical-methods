import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';


function Graphical() {
    const [fx, setfx] = useState("");
    const [xStart, setXstart] = useState(0);
    const [lines, setLines] = useState(
        [
            {
                x: 0,
                fx: 0
            }
        ]);
    const [result, setResult] = useState(0);

    const inputFx = (event)=> {
        setfx(event.target.value);
    }
    const inputXStart = (event)=> {
        setXstart(event.target.value);
    }

    const Calculator = ()=> {
        let y1, y2, x, iteration, maxIteration, error;
        x = parseFloat(xStart);
        y1 = evaluate(fx, {x: x});
        error = 0.000001;
        maxIteration = 100;
        iteration = 0;

        const newArr = [];

        while (y1 != 0  && iteration < maxIteration) {
            iteration++;
            x++;
            y2 = evaluate(fx, {x: x});

            if (y1 * y2 > 0) {
                y1 = y2;
                newArr.push({
                    x: x,
                    fx: y1,
                })
            }
            else {
                x -= 1;
                while(y1 >= error) {
                    x += 0.000001;
                    y1 = evaluate(fx, {x: x});
                    newArr.push({
                        x: x,
                        fx: y1,
                    })
                }
            } 
            
        }
        setResult(x);
        setLines(newArr);
        console.log(newArr);

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
            <Card as={Row} className="mb-3">
                <Card.Header>Plot</Card.Header>
                <Card.Body className="d-flex justify-content-center">
                    <Plot
                        data={[
                            {
                                x: lines.map((point) => (
                                    point.x
                                )),
                                y: lines.map((point) => (
                                    point.fx
                                )),
                                mode: 'lines',
                                marker: {color: 'blue'}
                            }
                        ]}
                        config={{ staticPlot: false }}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Graphical;