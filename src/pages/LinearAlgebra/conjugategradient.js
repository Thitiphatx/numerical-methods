import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import Plot from "react-plotly.js";
import { useState } from "react";

function ConjugateGradient() {
    const [matrixA, setMatrixA] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const [matrixB, setMatrixB] = useState([0,0,0]);
    const [matrixX, setMatrixX] = useState([0,0,0]);
    const [size, setSize] = useState(3);

    // const [resultArray, setResultArray] = useState([]);

    
    // input handler
    const inputSize = (e)=> {
        setSize(e.target.value);
    }
    const setMatrixSize = () => {
        let SIZE = parseInt(size);
        setMatrixA(new Array(SIZE).fill().map(()=> new Array(SIZE).fill(0)));
        setMatrixB(new Array(SIZE).fill(0));
    }
    const changeMatrixA = (e, row, col)=> {
        const newMatrix = [...matrixA];
        newMatrix[row][col] = e.target.value;
        setMatrixA(newMatrix);
    }
    const changeMatrixB = (e, index)=> {
        const newMatrix = [...matrixB];
        newMatrix[index] = e.target.value;
        setMatrixB(newMatrix);
    }

    // calculate
    const calculator = ()=> {
        let A = JSON.parse(JSON.stringify(matrixA));
        let B = [...matrixB];
        let x = new Array(parseInt(size)).fill(0);


        let R = subtract(multiply(A,x),B);
        let D = multiply(R, -1);
        const xArray = [];
        while (error(R)) {
            let lambda = -1*dotProduct(D, R)/dotProduct(D,multiply(A, D));
            for (let i = 0; i < x.length; i++) {
                x[i] = x[i]+(D[i]*lambda);
            }
            R = subtract(multiply(A,x),B);
            
            let alpha = dotProduct(R,multiply(A, D))/dotProduct(D,multiply(A, D));
            for (let i = 0; i < x.length; i++) {
                D[i] = -1*R[i]+alpha*D[i];
            }
            xArray.push(x);
            console.log(x)
        };
        
        setResultArray(xArray);
        setMatrixX(x);

        function error(r) {
            return (Math.abs(dotProduct(r, r)) > 0)
        }
        function subtract(m1, m2) {
            let m3 = [];
            for (let i = 0; i < m1.length; i++) {
                m3[i] = m1[i]-m2[i];
            }
            return m3;
        }
        function dotProduct(p1, p2) {
            let temp = 0;
            for (let i = 0; i < p1.length; i++) {
                temp += p1[i]*p2[i];
            }
            return temp;
        }
        function multiply(m1, v) {
            let m3 = [];
            if (Array.isArray(v) && !Array.isArray(v[0])) {
                for (let i = 0; i < m1.length; i++) {
                    let rowSum = 0;
                    for (let j = 0; j < v.length; j++) {
                        rowSum += m1[i][j] * v[j];
                    }
                    m3[i] = rowSum;
                }
            }
            else if (Array.isArray(v) && Array.isArray(v[0])) {
                for (let i = 0; i < m1.length; i++) {
                    m3[i] = new Array(v[i].length);
                    for (let j = 0; j < m1[i].length; j++) {
                        m3[i][j] = 0;
                        for (let k = 0; k < v[i].length; k++) {
                            m3[i][j] += m1[i][k] * v[k][j];
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < m1.length; i++) {
                    m3[i] = m1[i]*v;
                    
                }
            }
            
            return m3;
        }
    }

    return (
        <Container>
            <Card as={Row} className="mb-3">
                <Card.Header>Conjugate Gradient</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={3}>
                                <InputGroup>
                                    <Form.Control type="number" value={size} onChange={inputSize}></Form.Control>
                                    <Button variant="secondary" onClick={setMatrixSize}>Set</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col className="d-flex justify-content-center">
                                <div className="mx-3 text-center">
                                <h4>A</h4>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        {row.map((col, colIndex)=> (
                                            <Form.Control className="text-center matrix-field" key={colIndex} value={matrixA[rowIndex][colIndex]} onChange={(e)=> {changeMatrixA(e, rowIndex, colIndex)}}></Form.Control>
                                        ))}
                                    </InputGroup>
                                ))}
                                </div>
                                <div className="mx-3 text-center">
                                <h4>X</h4>
                                {matrixA.map((row, rowIndex)=> (
                                    <InputGroup key={rowIndex}>
                                        <Form.Control className="text-center matrix-field" value={"x"+rowIndex} disabled></Form.Control>
                                    </InputGroup>
                                ))}
                                </div>
                                <div className="mx-3 text-center">
                                <h4>B</h4>
                                {matrixB.map((row, index)=> (
                                    <InputGroup key={index}>
                                        <Form.Control className="text-center matrix-field" value={matrixB[index]} onChange={(e)=> changeMatrixB(e, index)}></Form.Control>
                                    </InputGroup>
                                ))}  
                                </div>
                                
                            </Col>
                        </Form.Group>
                        
                        <Button onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                {matrixX.map((e, index)=> (
                    <Card.Footer>x{index} : {e} </Card.Footer>
                ))}

            </Card>
            <Card as={Row} className="mb-3">
                <Card.Header>Plot</Card.Header>
                <Card.Body>
                    <Plot 
                        data={[
                            {
                                type: 'contour',
                                x: [1,2,3],
                                y: [1,2,3],
                                z: [1,2,3],
                                colorscale: 'Viridis',
                            },
                            
                        ]}
                        layout={
                            {
                                xaxis: {
                                    title: "x"
                                },
                                yaxis: {
                                    title: "f(x)"
                                }
                            }
                        }
                    />
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        </Container>
    )
}

export default ConjugateGradient;