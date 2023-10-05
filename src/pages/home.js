import React from "react";
// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import MatrixFieldForm from "./Interpolation/test";

class Home extends React.Component {
    render() {
        return(
            <Row>
                <Col><h1>Home page</h1></Col>
                <MatrixFieldForm />
            </Row>
        )
    }
}

export default Home;