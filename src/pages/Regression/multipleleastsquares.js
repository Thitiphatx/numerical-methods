import React from "react";
import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";

export default function MultipleLeastSquares() {
    const [arrayX, setArrayX] = useState([[0,1,2]])
    const [arrayY, setArrayY] = useState([0,1,2]);
    const [targetX, setTargetX] = useState(0);
    const [result, setResult] = useState(0);


    // input controller
    const addX = ()=> {
        const newArray = [...arrayX];
        newArray.push(new Array(newArray[0].length).fill(0));
        setArrayX(newArray);
    }
    const removeX = ()=> {
        const newArray = [...arrayX];
        if (newArray.length > 1) {
            newArray.pop();
            setArrayX(newArray);
        }
    }
    const addRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].push(0);
        }
        newArrayY.push(0);
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    const removeRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].pop();
        }
        newArrayY.pop();
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    // input handler
    const inputX = (e, row, index)=> {
        const newArray = [...arrayX];
        newArray[row][index] = e.target.value;
        setArrayX(newArray);
    }
    const inputY = (e, index)=> {
        const newArray = [...arrayY];
        newArray[index] = e.target.value;
        setArrayY(newArray);
    }
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }

    const calculator = ()=> {
        let x = arrayX.map((set)=> set.map((data)=> parseFloat(data)));
        let y = arrayY.map((data)=> parseFloat(data));
        let m = x.length;

        let arr = new Array(m+1).fill(new Array(m+1).fill(0));
        let answer = []

        arr[0][0] = y.length;

        for (let i = 1; i < m+1; i++) {
            let sumX = 0;
            for (let j = 0; j < y.length; j++) {
                sumX += x[i - 1][j];
            }
            arr[0][i] = sumX;
        }


        for (let i = 1; i < m+1; i++) {
            for (let j = 0; j < m+1; j++) {
                let sumX = 0;
                for (let k = 0; k < y.length; k++) {
                    if (j === 0) {
                        sumX += x[i-1][k];
                    } else {
                        sumX += x[j - 1][k] * x[i - 1][k];
                    }
                }
                arr[i][j] = sumX;
            }
        }

        for (let i = 0; i < m+1; i++) {
            let sumXY = 0;
            for (let j = 0; j < y.length; j++) {
                if (i === 0) {
                    sumXY += y[j];
                } else {
                    sumXY += y[j] * x[i - 1][j];
                }
            }
            answer[i] = sumXY;
        }
        function GaussJordan(arr, answer) {
            let size = arr.length;
        
            for (let i = 0; i < size; i++) {
                if (arr[i][i] == 0) {
                    arr[i][i] = 1e-15;
                }
                let fixed = arr[i][i];
        
                for (let j = i; j < size; j++) {
                    arr[i][j] /= fixed;
                }
                answer[i] /= fixed;
        
                for (let j = 0; j < size; j++) {
                    if (i === j) continue;
                    let factor = arr[j][i];
                    for (let k = i; k < size; k++) {
                        arr[j][k] -= factor * arr[i][k];
                    }
                    answer[j] -= factor * answer[i];
                }
            }
            return answer;
        }
        function f(x) {
            let A = GaussJordan(arr, answer);
            let resultX = A[0];

            for (let i = 1; i < A.length; i++) {
                resultX += A[i]*Math.pow(x,i);
            }
            console.log(A);
            return resultX;
        }
        setResult(f(parseFloat(targetX)))

    }

    return (
        <Container>
            <Card>
                <Card.Header>Multiple Least Squares</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}>
                                <InputGroup>
                                    <Button variant="secondary" onClick={addX}>Add x</Button>
                                    <Button variant="outline-danger" onClick={removeX}>Remove x</Button>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Button variant="secondary" onClick={addRow}>Add row</Button>
                                    <Button variant="outline-danger" onClick={removeRow}>Remove row</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            {arrayX.map((dataSet, index)=> (
                                <Col key={index} sm="1">
                                    <Form.Control value={"x"+index} className="text-center" disabled></Form.Control>
                                    {dataSet.map((data, idx)=> (
                                        <Form.Control key={idx} value={data} className="text-center" onChange={(e)=> inputX(e, index, idx)}></Form.Control>
                                    ))}
                                </Col>
                            ))}
                            <Col sm="1">
                                <Form.Control value={"y"} className="text-center" disabled></Form.Control>
                                {arrayY.map((e, index)=> (
                                    <Form.Control key={index} value={e} onChange={(e)=> inputY(e, index)} className="text-center"></Form.Control>
                                ))}
                            
                            </Col>
                            
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>target X</InputGroup.Text>
                                    <Form.Control value={targetX} onChange={inputTargetX}></Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Button onClick={calculator}>Calculate</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Answer : {result}</Card.Footer>
            </Card>
        </Container>
    )
}