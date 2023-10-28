import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Table, InputGroup } from "react-bootstrap";
import { evaluate } from "mathjs";
import { HistoryManager, FetchManager, PostManager } from '../../functions/historymanager';
import Plot from "react-plotly.js";

function Secant() {
    const [fx, setFx] = useState("");
    const [x0, setx0] = useState(0);
    const [x1, setx1] = useState(0);
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);
    const [saveButton, setSaveButton] = useState(false);
    const [reFetch, setRefetch] = useState(1);
    const [history, setHistory] = useState([]);

    const METHOD = "secant";

    // Database handler
    useEffect(() => {
        FetchManager(METHOD).then((data) => {
            setHistory(data);
        }).catch((error) => {
            console.error('Error fetching history:', error);
        });
    }, [reFetch]);
    const handleHistoryFill = (index) => {
        const selectedValue = JSON.parse(history[index].input_json);
        setFx(selectedValue.equation);
        setx0(selectedValue.x0);
        setx1(selectedValue.x1);
    };
    const saveBtn = ()=> {
        const sendData = ()=> {
            PostManager(history, METHOD, JSON.stringify(latestData));
            setSaveButton(false);
            let i = reFetch;
            setRefetch(++i);
        }
        if (saveButton) {
            return (
                <Button onClick={sendData} variant="outline-primary">Save Inputs</Button>
            )
        } else {
            return null;
        }
    }
    const updateHistory = () => {
        let i = reFetch;
        setRefetch(++i);
    };
    const calculator = ()=> {
        let local_x0 = parseFloat(x0);
        let local_x1 = parseFloat(x1);
        let x2, xOld, fx0, fx1;

        const newArr = [];
        do {
            fx0 = evaluate(fx, {x:local_x0});
            fx1 = evaluate(fx, {x:local_x1});
            x2 = local_x0 - ( fx0 * (local_x0 - local_x1 ) ) / ( fx0 - fx1)
            xOld = local_x1;
            newArr.push(
                {
                    x0: local_x0,
                    x1: local_x1,
                    x2: x2,
                }
            )
            local_x0 = local_x1;
            local_x1 = x2;
            

        } while((Math.abs(x2-xOld)/x2) * 100 >= 0.000001);
        setLatestData({
            equation: fx,
            x0: x0,
            x1: x1,
        })
        setResultArr(newArr || 0);
        setResult(x2);
        setSaveButton(true);
    }

    const inputX0 = (event)=> {
        setx0(event.target.value);
    }
    const inputX1 = (event)=> {
        setx1(event.target.value);
    }
    const inputFx = (event)=> {
        setFx(event.target.value);
    }

    function generatePlot(arr) {
        if (arr.length === 0) {
            return null;
        } else {
            const Graph = [];
            for (let i = x0-1; i < x1+1; i++) {
                Graph.push({
                    x: i,
                    y: evaluate(latestData.equation, {x: i})
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
                                    name: latestData.equation,
                                },
                                {
                                    x: arr.map((point)=> (point.x2)),
                                    y: arr.map((point)=> (evaluate(latestData.equation, {x: point.x2}))),
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
            <HistoryManager history={history} onFillClick={handleHistoryFill} updateHistory={updateHistory}/>
            <Card as={Row} className="mb-3">
                <Card.Header>Secant Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>f(x)</Form.Label>
                            <Form.Control value={fx} onChange={inputFx}></Form.Control>
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
                                {saveBtn()}
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