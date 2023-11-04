import React from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Table, InputGroup } from "react-bootstrap";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import { DatabaseManager } from "../../functions/DatabaseManager";
import { CalSecant } from "../../functions/calculator/Root of Equation/Secant";

function Secant() {
    const [FX, setFX] = useState("");
    const [x0, setx0] = useState(0);
    const [x1, setx1] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);

    const METHOD = "Bisection";
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
    
    const calculator = ()=> {
        const { newArr, x2 } = CalSecant(FX, x0, x1);
        setSaveAble(true);
        setInputs({
            equation: FX,
            x0: x0,
            x1: x1,
        })
        setResultArr(newArr || 0);
        setResult(x2);
        setSaveAble(true);
    }

    const inputX0 = (event)=> {
        setx0(event.target.value);
    }
    const inputX1 = (event)=> {
        setx1(event.target.value);
    }
    const inputFX = (event)=> {
        setFX(event.target.value);
    }

    function generatePlot(arr) {
        if (arr.length === 0) {
            return null;
        } else {
            const Graph = [];
            for (let i = x0-1; i < x1+1; i++) {
                Graph.push({
                    x: i,
                    y: evaluate(inputs.equation, {x: i})
                })
            }
            return (
                <Card as={Row} className="mb-3">
                    <Card.Header>Plot</Card.Header>
                    <Card.Body className="text-center">
                        <Plot
                            data={[
                                {
                                    x: Graph.map(point => point.x),
                                    y: Graph.map(point => point.y),
                                    mode: "lines",
                                    marker: { color: "blue" },
                                    name: inputs.equation,
                                },
                                {
                                    x: arr.map((point)=> (point.x2)),
                                    y: arr.map((point)=> (evaluate(inputs.equation, {x: point.x2}))),
                                    mode: "markers",
                                    marker: {color: 'red'},
                                    name: "Secant"
                                },
                            ]}
                            layout={{
                                yaxis: {
                                    title: "f(x)",
                                },
                                xaxis: {
                                    title: "x",
                                },
                            }}
                        />
                    </Card.Body>
                </Card>
            );
        }
    }
    

    function generateTable(resultArr) {
        if (resultArr.length == 0) {
            return null
        }
        else {
            return (
                <Card as={Row} className="mb-3">
                    <Card.Header>Iteration Table</Card.Header>
                    <Card.Body>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>i</th>
                                    <th>x0</th>
                                    <th>x1</th>
                                    <th>x2</th>
                                    <th>error</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultArr.map((iter, index)=> (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{iter.x0}</td>
                                        <td>{iter.x1}</td>
                                        <td>{iter.x2}</td>
                                        <td>{Math.abs(0-iter.x2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )
        }
    }
    return(
        <Container>
            {db.HistoryTab()}
            <Card as={Row} className="mb-3">
                <Card.Header>Secant Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>f(x)</Form.Label>
                            <Form.Control value={FX} onChange={inputFX}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>x0</Form.Label>
                                <Form.Control value={x0} onChange={inputX0}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>x1</Form.Label>
                                <Form.Control value={x1} onChange={inputX1}></Form.Control>
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

export default Secant;