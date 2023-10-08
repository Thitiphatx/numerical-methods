import { useState } from "react"
import { Button, Form, Table, Card, Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Plot from "react-plotly.js";

const Bisection =()=>{
    const printTable = () =>{
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Card>
                <Card.Header>Iteration Table</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th width="10%">Iteration</th>
                                <th width="30%">XL</th>
                                <th width="30%">XM</th>
                                <th width="30%">XR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index)=>{
                                return  (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                    <td>{element.Xr}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>     
        );
    }
    const printPlot = ()=> {
        return(
            <Card>
                <Card.Header>Plot</Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        )
    }
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:xm,
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
     
   
    const [iterTable, setIterTable] = useState(null);
    const [iterPlot, setIterPlot] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);

        setIterTable(printTable());
        setIterPlot();
    }

    return (
        <>
            <Card>
                <Card.Header>Bisection Method</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Input f(x)</Form.Label>
                                <Form.Control type="text" onChange={inputEquation}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Input XL</Form.Label>
                                <Form.Control type="number" onChange={inputXL}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Input XR</Form.Label>
                                <Form.Control type="number" onChange={inputXR}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={calculateRoot}>
                            Calculate
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Answer: {X.toPrecision(7)}</Card.Footer>
            </Card>
            {iterTable}
        </>             
    )
}

export default Bisection