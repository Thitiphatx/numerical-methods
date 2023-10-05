import React, { Component } from "react";
import { Card, Row, Col, Button, Form, Nav, ButtonGroup } from "react-bootstrap";

class Spline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "linear",
      size: 1,
      inputs: [{ x: 0, fx: 0 }],
      answer: 0,
    };
  }

  handleNumberPoints = () => {
    const newSize = this.state.size;
    const currentInputs = this.state.inputs;
    let newInputs = currentInputs.slice();
  
    if (newSize < currentInputs.length) {
      newInputs = currentInputs.slice(0, newSize);
    }
  
    for (let i = currentInputs.length; i < newSize; i++) {
      newInputs.push({ x: 0, fx: 0 });
    }
  
    this.setState({ inputs: newInputs });
  };

  handleInputChange = (event, index) => {
    const newInputs = [...this.state.inputs];
    newInputs[index][event.target.name] = event.target.value;
    this.setState({ inputs: newInputs });
  };

  render() {
    return (
        <Card>
            <Card.Header>Linear Spline</Card.Header>
            <Card.Body>
            <Form>
                <Form.Group as={Row} className="mb-3">
                <Col xs={2}>
                    <Form.Label>Number of points</Form.Label>
                    <ButtonGroup>
                        
                        <Form.Control type="number" value={this.state.size} onChange={(e) => this.setState({ size: e.target.value })} />
                        <Button variant="dark" onClick={this.handleNumberPoints}>Set</Button>
                    </ButtonGroup>
                    
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Col>
                    <Form.Label>x</Form.Label>
                </Col>
                <Col>
                    <Form.Label>f(x)</Form.Label>
                </Col>
                {this.state.inputs.map((input, index) => (
                    <Form.Group as={Row} key={index} className="mb-3">
                    <Col>
                        <Form.Control type="number" name="x" value={input.x} placeholder={`x${index + 1}`} onChange={(e) => this.handleInputChange(e, index)} />
                    </Col>
                    <Col>
                        <Form.Control type="number" name="fx" value={input.fx} placeholder={`f(x${index + 1})`} onChange={(e) => this.handleInputChange(e, index)} />
                    </Col>
                    </Form.Group>
                ))}
                </Form.Group>
                <Button variant="primary">Calculate</Button>
            </Form>
            </Card.Body>
            <Card.Footer>Answer : {this.state.answer}</Card.Footer>
        </Card>
    );
  }
}

export default Spline;
