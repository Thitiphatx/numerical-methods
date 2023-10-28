import { useState, useEffect } from "react";
import { Container, Button, Form, Card, Row, Col, InputGroup } from "react-bootstrap";
import { evaluate } from 'mathjs';
import { generateTable } from "../../functions/calculator/generateTable";
import Plot from "react-plotly.js";
import { HistoryManager, FetchManager, PostManager } from '../../functions/historymanager';
const Bisection =()=>{

    // declare useState
    const [FX, setFX] = useState("");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [result, setResult] = useState(0);
    const [latestData, setLatestData] = useState([]);
    const [resultArr, setResultArr] = useState([]);
    const [saveButton, setSaveButton] = useState(false);
    const [reFetch, setRefetch] = useState(1);
    const [history, setHistory] = useState([]);

    const METHOD = "bisection";

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
        setFX(selectedValue.equation);
        setXL(selectedValue.start);
        setXR(selectedValue.end);
    };
    const saveBtn = ()=> {
        const sendData = ()=> {
            PostManager(history,METHOD, JSON.stringify(latestData));
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

    // input handler
    const inputFX = (e)=> {
        setFX(e.target.value);
    }
    const inputXL = (e)=> {
        setXL(e.target.value);
    }
    const inputXR = (e)=> {
        setXR(e.target.value);
    }

    // calculate function
    const calculator = ()=> {
        const newResultArr = [];
        let Xl = parseFloat(XL);
        let Xr = parseFloat(XR);
        let Xm = (Xl+Xr)/2;
        let fXm = evaluate(FX, {x: Xm});
        let Xm_old = 0;
        let e = 0.000001;

        while(Math.abs((Xm-Xm_old)/Xm * 100) >= e) {
            let fXr = evaluate(FX, {x: Xr});
            if (fXr * fXm > 0) {
                Xr = Xm;
            }
            else {
                Xl = Xm;
            }
            Xm_old = Xm;
            Xm = (Xl + Xr)/2;
            fXm = evaluate(FX, {x: Xm});
            newResultArr.push({
                x: Xm.toPrecision(7),
                y: fXm.toPrecision(7),
            })
        }
        setResultArr(newResultArr);
        setSaveButton(true);
        setLatestData({
            equation: FX,
            start: XL,
            end: XR
        });
        setResult(Xm);
    }

    function generatePlot(arr) {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            for (let i = parseFloat(latestData.start)-1; i < parseFloat(latestData.end)+1; i++) {
                const x = i
                try {
                    const fx = evaluate(latestData.equation, {x: i})
                    Graph.push({
                        x,
                        y: fx,
                    })
                }
                catch (e) {
                    
                }
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
                                    name: latestData.equation
                                },
                                {
                                    x: arr.map((point) => (point.x)),
                                    y: arr.map((point) => (point.y)),
                                    mode: "markers",
                                    marker: {color: 'red'},
                                    name: "Bisection"
                                }
                            ]}
                            layout={
                                {
                                    xaxis: {
                                        title: 'x',
                                    },
                                    yaxis: {
                                        title: 'f(x)',
                                    }
                                }
                            }
                        />
                    </Card.Body>
                </Card>
                
            )
        }
        
    }

    return (
        <Container>
            <HistoryManager history={history} onFillClick={handleHistoryFill} updateHistory={updateHistory}/>
            <Card as={Row} className="mb-3">
                <Card.Header>Bisection Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Input f(x)</Form.Label>
                                <Form.Control onChange={inputFX} value={FX}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Input XL</Form.Label>
                                <Form.Control onChange={inputXL} value={XL}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Input XR</Form.Label>
                                <Form.Control onChange={inputXR} value={XR}></Form.Control>
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
                <Card.Footer>Answer: {typeof result === 'number' ? result.toPrecision(7) : result}</Card.Footer>
            </Card>
            {generatePlot(resultArr)}
            {generateTable(resultArr)}
        </Container>
                 
    )
}

export default Bisection;