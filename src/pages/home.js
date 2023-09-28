import React from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

class Home extends React.Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col><h1>Home page</h1></Col>
                </Row>
            </Container>
            
        )
    }
}

export default Home;