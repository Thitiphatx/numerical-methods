import { useState } from "react";
import { Container, Button, Form, Card, Row, Col, InputGroup } from "react-bootstrap";
import { generateTable } from "../../functions/calculator/generateTable";
import Plot from "react-plotly.js";
import { CalBisection } from "../../functions/calculator/Root of Equation/Bisection";
import { DatabaseManager } from "../../functions/DatabaseManager";
import { evaluate } from "mathjs";
const Bisection =()=>{

    // declare useState
    const [FX, setFX] = useState("");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
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
        const {newResultArr, Xm} = CalBisection(XL, XR, FX);
        const newInputs = {
            equation: FX,
            start: XL,
            end: XR
        }

        setSaveAble(true);
        setResultArr(newResultArr);
        setInputs(newInputs);
        setResult(Xm);
    }

    function generatePlot(arr) {
        if (arr.length == 0) {
            return null
        }
        else {
            const Graph = [];
            for (let i = inputs.start; i < inputs.end; i++) {
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
                                    x: Graph.map((point)=> (point.x)),
                                    y: Graph.map((point)=> (point.y)),
                                    mode: "lines",
                                    marker: {color: 'blue'},
                                    name: inputs.equation
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
            {db.HistoryTab()}
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
                            {saveAble && (
                                <Button variant="outline-primary" onClick={saveInputs}>Save inputs</Button>
                            )}
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