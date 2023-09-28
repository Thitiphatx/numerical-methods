import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Lagrange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xInput: "",
            yInput: "",
            X: 0,
            result: 0,
        };
    }

    inputX = (event) => {
        this.setState({
            xInput: event.target.value,
        })
    }
    inputY = (event) => {
        this.setState({
            yInput: event.target.value,
        })
    }
    inputTargetX = (event) => {
        this.setState({
            X: event.target.value,
        })
    }



    CalLagrange = () => {
        let xString = this.state.xInput.split(",");
        let yString = this.state.yInput.split(",");

        const x = [];
        const y = [];
        const X = parseFloat(this.state.X);

        xString.forEach(num => {
            x.push(parseFloat(num.trim()));
        });
        yString.forEach(num => {
            y.push(parseFloat(num.trim()));
        })

        let result = 0;
        for (let i = 0; i < x.length; i++) {
            let L = 1;
            for (let j = 0; j < x.length; j++) {
                if (i === j) continue;
                L *= (x[j] - X) / (x[j] - x[i]);
            }
            result += y[i]*L;
        }

        this.setState({result});
    }

    render() {
        return(
            <Container>
                <h1>Lagrange</h1>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>Input x</Form.Label>
                            <Form.Control onChange={this.inputX} type="text" placeholder="0, 1, 2, 3" />
                        </Col>
                        <Col>
                            <Form.Label>Input f(x)</Form.Label>
                            <Form.Control onChange={this.inputY} type="text" placeholder="5.2, 23.2, 11, 50.2" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Label>Target X</Form.Label>
                            <Form.Control onChange={this.inputTargetX} type="number" placeholder="42235" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={this.CalLagrange}>Calculate</Button>
                </Form>
                <br/>
                <h5>Answer: {this.state.result}</h5>
            </Container>
        )
    }
}

export default Lagrange;