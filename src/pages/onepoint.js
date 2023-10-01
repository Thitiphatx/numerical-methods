import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Onepoint extends React.Component {
    render() {
        return(
            <Card>
                <Card.Header>Onepoint Iteration</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>F(x)</Form.Label>
                                <Form.Control type="String"></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>X0</Form.Label>
                                <Form.Control type="number"></Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary">Calculate</Button>
                        
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Onepoint;