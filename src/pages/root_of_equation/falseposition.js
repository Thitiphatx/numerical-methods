import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { evaluate } from 'mathjs';

class FalsePosition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            result: 0,
        }
    }

    inputFx = (event)=> {
        this.setState({
            fx: event.target.value
        })
    }
    inputXL = (event)=> {
        this.setState({
            xl: event.target.value
        })
    }
    inputXR = (event)=> {
        this.setState({
            xr: event.target.value
        })
    }

    Calculator = ()=> {
        let xl = this.state.xl || 0.000001 ;
        let xr = this.state.xr || 0.000001;
        let fx = this.state.fx;
        if (fx == "") return;

        let fxl = evaluate(fx, {x: xl})
        let fxr = evaluate(fx, {x: xr})
        let x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
        let x1_old = 0;
        let i = 0;
        while(Math.abs(x1-x1_old)/x1 * 100 >= 0.000001) {
            i++;
            let fx1 = evaluate(fx, {x: x1})
            
            if (fx1 * fxr > 0) {
                xr = x1;
                fxr = fx1;
            }
            else {
                xl = x1;
                fxl = fx1;
            }

            x1_old = x1;
            x1 = (xl*fxr - xr*fxl)/(fxr-fxl);
        }
        console.log(i)
        this.setState({result: x1});
        

    }

    render() {
        return (
                <Card>
                    <Card.Header>False Position Medthod</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>F(x)</Form.Label>
                                    <Form.Control type="string" onChange={this.inputFx}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>XL</Form.Label>
                                    <Form.Control type="number" onChange={this.inputXL}></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>XR</Form.Label>
                                    <Form.Control type="number" onChange={this.inputXR}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Button variant="primary" onClick={this.Calculator}>Calculate</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>Answer : {this.state.result}</Card.Footer>
                </Card>
            
        )
    }
}
export default FalsePosition;