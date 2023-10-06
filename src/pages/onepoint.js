import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { evaluate } from 'mathjs';

class Onepoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fx: "",
            x: 0,
            result: 0,
        };
    }

    inputFx = (event) => {
        this.setState({
            fx: event.target.value,
        });
    }

    inputX = (event) => {
        this.setState({
            x: event.target.value,
        });
    }

    calculator = () => {
        let xOld;
        let fx = this.state.fx;
        let x = this.state.x;
        do {
            xOld = x;
            x = evaluate(fx, { x });
        } while (!((Math.abs(x - xOld) / x) * 100 < 0.000001) && x != undefined);
        
        this.setState({
            result: x,
        });
    }

    render() {
        return (
            <Card>
                <Card.Header>Onepoint Iteration</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>f(x)</Form.Label>
                                <Form.Control type="text" onChange={this.inputFx} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>x start</Form.Label>
                                <Form.Control type="number" onChange={this.inputX} />
                        </Form.Group>
                        <Button variant="primary" onClick={this.calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Answer : {this.state.result}</Card.Footer>
            </Card>
        )
    }
}

export default Onepoint;
