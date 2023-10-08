import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";

import { evaluate } from 'mathjs';


function Graphical() {
    const [fx, setfx] = useState("");
    const [xStart, setXstart] = useState(0);
    const [iterTable, setIterTable] = useState([
        {
            x: 2,
            fx: 3,
        }
    ]);
    const [result, setResult] = useState(0);

    const inputFx = (event)=> {
        setfx(event.target.value);
    }
    const inputXStart = (event)=> {
        setXstart(event.target.value);
    }

    const Calculator = () => {
        let x = xStart;
        let y1 = evaluate(fx, {x: x});

        while(y1 != 0) {
            x++;
            let y2 = evaluate(fx, {x: x});
            if (y1 * y2 > 0) {
                y1 = y2;
            }
            else {
                x = x-1;
                break;
            }
        }

        while (y1 < 0.000001) {
            x = x+0.000001;
            y1 = evaluate(fx, {x: x});
        }

        setResult(x);
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
                <Card.Header>Iteration</Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Iteration</th>
                                <th>x</th>
                                <th>f(x)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterTable.map((iter, index)=> (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{iter.x}</td>
                                    <td>{iter.fx}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Graphical;