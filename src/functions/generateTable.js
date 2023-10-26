import { Card, Table, Row } from 'react-bootstrap';

export const generateTable = (resultArr)=> {
    if (resultArr.length == 0) {
        return null
    }
    else {
        return (
            <Card as={Row} className="mb-3">
                <Card.Header>Iteration Table</Card.Header>
                <Card.Body>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>i</th>
                                <th>x</th>
                                <th>fx</th>
                                <th>error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultArr.map((iter, index)=> (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{iter.x}</td>
                                    <td>{iter.y}</td>
                                    <td>{Math.abs(0-iter.y)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}