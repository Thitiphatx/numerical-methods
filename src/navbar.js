
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
function HomeNav() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faCalculator} />
             <span> Numerical methods</span>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Root of equation">
                  <NavDropdown.Item href="#" disabled>Graphical method</NavDropdown.Item>
                  <NavDropdown.Item href="/bisection">Bisection</NavDropdown.Item>
                  <NavDropdown.Item href="#" disabled>False Position</NavDropdown.Item>
                  <NavDropdown.Item href="#" disabled>One point</NavDropdown.Item>
                  <NavDropdown.Item href="#" disabled>Newton Raphson</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Inter/Extra -polation">
                <NavDropdown.Item href="/newton-div-diff" disabled>Newton's Divide-difference</NavDropdown.Item>
                  <NavDropdown.Item href="/lagrange">Lagrange</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNav;