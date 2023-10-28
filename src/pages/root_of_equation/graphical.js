import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { generateTable } from '../../functions/calculator/generateTable';
import { HistoryManager, FetchManager, PostManager } from '../../functions/historymanager';

function Graphical() {
    const [FX, setfx] = useState("");
    const [xStart, setXstart] = useState("");
    const [result, setResult] = useState(0);
    const [resultArr, setResultArr] = useState([]);
    const [latestData, setLatestData] = useState(null);
    const [saveButton, setSaveButton] = useState(false);
    const [reFetch, setRefetch] = useState(1);
    const [history, setHistory] = useState([]);

    // Database handler
    useEffect(() => {
        FetchManager("graphical").then((data) => {
            setHistory(data);
        }).catch((error) => {
            console.error('Error fetching history:', error);
        });
    }, [reFetch]);
    const handleHistoryFill = (index) => {
        const selectedValue = JSON.parse(history[index].input_json);
        setFX(selectedValue.equation);
        setXL(selectedValue.start);
        setXR(selectedValue.end);
    };
    const saveBtn = ()=> {
        const sendData = ()=> {
            PostManager(history,"graphical", JSON.stringify(latestData));
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

    const inputFx = (event)=> {
        setfx(event.target.value);
    }
    const inputXStart = (event)=> {
        setXstart(event.target.value);
    }

    const calculator = ()=> {
        let y1, y2, x, error;
        x = parseFloat(xStart);
        y1 = evaluate(FX, {x: x});
        y2 = 0;
        error = 0.000001;
        const newArr = [];
        let step = 1;
        while(Math.abs(y1) > error && y1 != 0) {
            x += step;
            y2 = evaluate(FX, {x: x});
            if (y1 * y2 > 0) {
                y1 = y2;
                newArr.push({
                    x: x,
                    y: y1,
                })
            }
            else {
                x -= step;
                step /= 10;
            }
        }
        setLatestData({
            equation: FX,
            start: xStart
        })
        setResult(x);
        setResultArr(newArr);
        setSaveButton(true);
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
                        y: evaluate(latestData.equation, {x: i}),
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
                                    y: Graph.map((point)=> (point.y)),
                                    mode: "lines",
                                    marker: {color: 'blue'},
                                    name: latestData.equation,
                                },
                                {
                                    x: resultArr.map((point)=> (point.x)),
                                    y: resultArr.map((point)=> (point.y)),
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
        <Container>
             <HistoryManager history={history} onFillClick={handleHistoryFill} updateHistory={updateHistory}/>
            <Card as={Row} className="mb-3">
                <Card.Header>Graphical Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control value={FX} onChange={(e)=> inputFx(e)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>From X</Form.Label>
                                <Form.Control value={xStart} onChange={(e)=> inputXStart(e)}></Form.Control>
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
                <Card.Footer>Answer: {result}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
    )
}

export default Graphical;