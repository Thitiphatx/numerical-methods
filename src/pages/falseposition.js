import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class FalsePosition extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            fx: "",
            xl: 0,
            xr: 0,
            result: 0,
        })
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Header>False Position Medthod</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>F(x)</Form.Label>
                                    <Form.Control type="string"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>XL</Form.Label>
                                    <Form.Control type="number"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>XR</Form.Label>
                                    <Form.Control type="number"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Button variant="primary">Calculate</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>Answer :</Card.Footer>
                </Card>
            </Container>
            
        )
    }
}
export default FalsePosition;