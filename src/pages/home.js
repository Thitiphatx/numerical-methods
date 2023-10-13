import React from "react";
// Bootstrap
import { Container, Row, Col, Button } from "react-bootstrap";
import { methodsPath } from "../path";


function Home() {
    return(
        <Container>
            <Row className="mb-3">
            {methodsPath.map((type, index) => (
                <Col key={index}>
                <h4>{type.title}</h4>
                {type.path.map((link, linkIndex) => (
                    <Row key={linkIndex} className="mb-1">
                    <Col className="d-grid gap-2">
                        <Button href={link.id} size="sm">{link.label}</Button>
                    </Col>
                    </Row>
                ))}
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default Home;