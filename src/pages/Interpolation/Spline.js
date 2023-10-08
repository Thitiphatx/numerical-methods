import React, { useState } from "react";
import { Card, Row, Col, Form, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";

function Spline() {
  const [splineType, setSplineType] = useState("Linear");
  const [points, setPoints] = useState([
    {
      x: 0,
      fx: 0,
    }
  ])
  const [size, setSize] = useState(1);
  const [xTarget, setxTarget] = useState(0);
  const [result, setResult] = useState(0);

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

  const inputX = (event, index)=> {
    const newPoints = [...points];
    newPoints[index].x = parseFloat(event.target.value) || 0;
    setPoints(newPoints);
  }
  const inputFX = (event, index)=> {
    const newPoints = [...points];
    newPoints[index].fx = parseFloat(event.target.value) || 0;
    setPoints(newPoints);
  }
  const inputxTarget = (event)=> {
    setxTarget(event.target.value);
  }

  const linear = ()=> {
    let start, end;
    for (let i = 1; i < points.length; i++) {
      if (xTarget > points[i-1].x && xTarget < points[i].x) {
        start = i-1;
        end = i;
        break;
      }
    }
    console.log(points[start], points[end])
    let y_interpolation = points[start].fx + (xTarget - points[start].x) * (points[end].fx - points[start].fx) / (points[end].x - points[start].x);
    setResult(y_interpolation);
  }

  return(
    <Card>
      <Card.Header>Spline Interpolation</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <ToggleButtonGroup type="radio" name="splineType" defaultValue={splineType}>
              <ToggleButton id="linear-radio" value={"Linear"} variant="outline-primary">Linear</ToggleButton>
              <ToggleButton id="quadratic-radio" value={"Quadratic"} variant="outline-primary">Quadratic</ToggleButton>
              <ToggleButton id="cubic-radio" value={"Cubic"} variant="outline-primary">Cubic</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Col xs={3}>
              <Form.Label>Number of points</Form.Label>
              <ButtonGroup>
                <Form.Control type="number" onChange={inputSize} value={size}></Form.Control>
                <Button variant="secondary" onClick={changeSize}>Set</Button>
              </ButtonGroup>
            </Col>
          </Form.Group>
          {points.map((input, index)=> (
            <Form.Group as={Row} key={index} className="mb-3">
              <Col>
                <InputGroup>
                  <InputGroup.Text>{"x"+index}</InputGroup.Text>
                  <Form.Control onChange={(e)=> inputX(e, index)}></Form.Control>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text>{"fx"+index}</InputGroup.Text>
                  <Form.Control onChange={(e)=> inputFX(e, index)}></Form.Control>
                </InputGroup>
              </Col>
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>x target</Form.Label>
            <Form.Control onChange={inputxTarget}></Form.Control>
          </Form.Group>
          <Button onClick={linear}>Calculate</Button>
        </Form>
      </Card.Body>
      <Card.Footer>Answer : {result}</Card.Footer>
    </Card>
  )
}

export default Spline