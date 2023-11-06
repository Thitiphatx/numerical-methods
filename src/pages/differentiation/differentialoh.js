import React, { useState } from "react";
import { Container, Row, Col, Card, Form, ToggleButtonGroup, ToggleButton, Button, InputGroup } from "react-bootstrap";
import { DifferentationOh2 } from "../../functions/calculator/Differentation/differentialoh2";
import { DifferentationOh } from "../../functions/calculator/Differentation/differentialoh";
import { DatabaseManager } from "../../functions/DatabaseManager";

export default function DifferentialOh() {
    const [level, setLevel] = useState(1);
    const [type, setType] = useState("Forward");
    const [oh, setOh] = useState(1);
    const [FX, setFX] = useState("");
    const [hValue, sethValue] = useState(0);
    const [xTarget, setXtarget] = useState(0);
    const [result, setResult] = useState(0);
    const [saveAble, setSaveAble] = useState(false);
    const [inputs, setInputs] = useState([]);
  
    const METHOD = "Differential";
    const TYPE = "XY";
    const fillData = (inputJson)=> {
        setFX(inputJson.equation);
        setLevel(inputJson.level);
        setType(inputJson.type);
        setOh(inputJson.oh);
        sethValue(inputJson.h);
        setXtarget(inputJson.xTarget);
    }
    const db = DatabaseManager(METHOD, {fillData});
    const saveInputs = ()=> {
        db.PostData(inputs, TYPE);
        setSaveAble(false);
    }


    const diffLevel = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
    ]
    const diffType = [
        { label: "Forward", value: "Forward" },
        { label: "Backward", value: "Backward" },
        { label: "Central", value: "Central" },
    ]

    //input handlers
    const inputFX = (e)=> {
        setFX(e.target.value);
    }
    const inputLevel = (value)=> {
        setLevel(value);
    }
    const inputType = (value)=> {
        setType(value);
    }
    const inputOh = (value)=> {
        setOh(value);
    }
    const inputH = (e)=> {
        sethValue(e.target.value);
    }
    const inputX = (e)=> {
        setXtarget(e.target.value);
    }

    // calculate
    const calculator = ()=> {
        let answer;
        const newInputs = {
            equation: FX,
            level: level,
            type: type,
            oh: oh,
            h: hValue,
            xTarget: xTarget,
        }
        try {
            if (oh === 1) {
                answer = DifferentationOh(FX, level, type, parseFloat(hValue), parseFloat(xTarget));
            }
            else {
                answer = DifferentationOh2(FX, level, type, parseFloat(hValue), parseFloat(xTarget));
            }
        } catch (err) {
            console.log(err)
            setResult("Error, Please check your input");
        }
        setSaveAble(true);
        setResult(answer);
        setInputs(newInputs);
    }
    return (
        <Container>
            {db.HistoryTab()}
            <Card className="mb-3">
                <Card.Header>Divided Difference</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>f(x)</Form.Label>
                                <Form.Control value={FX} onChange={inputFX}></Form.Control>
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Divide Difference level</Form.Label>
                                <div>
                                    <ToggleButtonGroup type="radio" name="levelButton" defaultValue={1} value={level} onChange={inputLevel}>
                                        {diffLevel.map((level, index)=> (
                                            <ToggleButton id={"level-"+index} value={level.value} key={index} variant="outline-primary">
                                                {level.label}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </div>
                            </Col>
                            <Col>
                                <Form.Label>Type</Form.Label>
                                <div>
                                    <ToggleButtonGroup type="radio" name="typeButton" defaultValue={1} value={type} onChange={inputType}>
                                        {diffType.map((type, index)=> (
                                            <ToggleButton id={"type-"+index} value={type.value} key={index} variant="outline-primary">
                                                {type.label}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </div>
                            </Col>
                            <Col>
                                <Form.Label>&nbsp;</Form.Label>
                                <div>
                                    <ToggleButtonGroup type="radio" defaultValue={oh} value={oh} name="oh" onChange={inputOh}>
                                        <ToggleButton id="oh-1" value={1} variant="outline-primary">o(h)</ToggleButton>
                                        <ToggleButton id="oh-2" value={2} variant="outline-primary">o(h&sup2;)</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>h</Form.Label>
                                <Form.Control value={hValue} onChange={inputH}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>x target</Form.Label>
                                <Form.Control value={xTarget} onChange={inputX}></Form.Control>
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
        </Container>
    )
}