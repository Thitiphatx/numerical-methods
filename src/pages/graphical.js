import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { evaluate } from 'mathjs';


class Graphical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fx: "",
            error: 0.000001,
            xStart: 0,
            result: 0
        }
    }

    inputFx = (event)=> {
        this.setState({
            fx: event.target.value,
        })
    }
    inputXStart = (event)=> {
        this.setState({
            xStart: event.target.value,
        })
    }
    inputError = (event)=> {
        this.setState({
            error: event.target.value,
        })
    }

    Calculator = () => {
        let scope = {
            x: parseFloat(this.state.xStart)
        }

        let y1 = evaluate(this.state.fx, scope);
        while (y1 != 0) {
            scope.x += 1;
            let y2 = evaluate(this.state.fx, scope);
    
            if (y1 * y2 > 0) {
                y1 = y2;
            } else {
                scope.x -= 1;
                break;
            }
            
        }

        while (y1 < this.state.error) {
            scope.x += 0.0001;
            y1 = evaluate(this.state.fx, scope);
        }
    
        this.setState({ result: scope.x });
    }
    
    

    render() {
        return(
            <Card>
                <Card.Header>Graphical Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control type="String" onChange={this.inputFx}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Error</Form.Label>
                                <Form.Control type="number" onChange={this.inputError}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>From X</Form.Label>
                                <Form.Control type="number" onChange={this.inputXStart}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={this.Calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer><h5>Answer: {this.state.result}</h5></Card.Footer>
            </Card>
        )
    }
}

export default Graphical;