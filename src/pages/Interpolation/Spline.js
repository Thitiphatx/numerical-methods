import React, { useState } from "react";
import { Container, Card, Row, Col, Form, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";
import { CalCubicSpline, CalLinearSpline, CalQuadraticSpline } from "../../functions/calculator/Interpolation/Spline";
import { DatabaseManager } from "../../functions/DatabaseManager";

export default function Spline() {
  const [splineType, setSplineType] = useState("Linear");
  const [points, setPoints] = useState([{x: 0,fx: 0,}]);
  const [size, setSize] = useState(1);
  const [xTarget, setxTarget] = useState(0);
  const [result, setResult] = useState(0);
  const [saveAble, setSaveAble] = useState(false);
  const [inputs, setInputs] = useState([]);

  const METHOD = "Spline";
  const TYPE = "Points";
  const fillData = (inputJson)=> {
    const newPoints = [];
    inputJson.points.map((point) => {
      newPoints.push({
        x: point.x,
        fx: point.fx,
      })
    })
    setSize(inputJson.size);
    setPoints(newPoints);
    setxTarget(inputJson.xTarget);
  }

  const db = DatabaseManager(METHOD, {fillData});
  const saveInputs = ()=> {
    db.PostData(inputs, TYPE);
    setSaveAble(false);
  }

  const inputSize = (event)=> {
    if(event.target.value < 1) {
      event.target.value = 1;
    }
    setSize(event.target.value);
  }

  const changeSize = ()=> {
    const newPoints = [...points];
    while(newPoints.length > size) {
      newPoints.pop();
    }
    for (let i = newPoints.length; i < size; i++) {
      newPoints.push({
        x: 0,
        fx: 0,
      })
    }
    setPoints(newPoints);
  }
  const inputType = (value)=> {
    setSplineType(value);
  }
  const inputX = (event, index)=> {
    const newPoints = [...points];
    newPoints[index].x = event.target.value || 0;
    setPoints(newPoints);
  }
  const inputFX = (event, index)=> {
    const newPoints = [...points];
    newPoints[index].fx = event.target.value || 0;
    setPoints(newPoints);
  }
  const inputxTarget = (event)=> {
    setxTarget(event.target.value);
  }

  const calculator = ()=> {
    let answer;
    let targetX = parseFloat(xTarget);
    const newInputs = {
      size: size,
      points: points.map(point => ({ x: point.x, fx: point.fx })),
      xTarget: targetX,
    }
    console.log(targetX);
    if (splineType == "Linear") {
      answer = CalLinearSpline(points, targetX);
    }
    else if (splineType == "Quadratic") {
      answer = CalQuadraticSpline(points, targetX);
    }
    else if (splineType == "Cubic") {
      answer = CalCubicSpline(points, targetX);
    }
    setInputs(newInputs);
    setResult(answer);
    setSaveAble(true);

  }

  return(
    <Container>
      {db.HistoryTab()}
      <Card>
        <Card.Header>Spline</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col xs={2}>
                <Form.Label>Number of points</Form.Label>
                <ButtonGroup>
                  <Form.Control type="number" onChange={inputSize} value={size}></Form.Control>
                  <Button onClick={changeSize}>Set</Button>
                </ButtonGroup>
              </Col>

              <Col>
                <Form.Label>Spline type</Form.Label>
                <div>
                  <ToggleButtonGroup name="splineType" type="radio" value={splineType} onChange={inputType}>
                    <ToggleButton id="t-1" value="Linear" variant="outline-primary">Linear</ToggleButton>
                    <ToggleButton id="t-2" value="Quadratic" variant="outline-primary">Quadratic</ToggleButton>
                    <ToggleButton id="t-3" value="Cubic" variant="outline-primary">Cubic</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                
              </Col>
            </Form.Group>
            {points.map((input, index)=> (
              <Form.Group as={Row} key={index} className="mb-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text>{"x"+index}</InputGroup.Text>
                    <Form.Control value={points[index].x} onChange={(e)=> inputX(e, index)}></Form.Control>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Text>{"fx"+index}</InputGroup.Text>
                    <Form.Control value={points[index].fx} onChange={(e)=> inputFX(e, index)}></Form.Control>
                  </InputGroup>
                </Col>
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>x target</Form.Label>
              <Form.Control value={xTarget} onChange={inputxTarget}></Form.Control>
            </Form.Group>
            <InputGroup>
              <Button onClick={calculator}>Calculate</Button>
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