
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const rootOfEquation = [
  {
    label: "Graphical Method",
    link: "/graphical"
  },
  {
    label: "Bisection Method",
    link: "/bisection",
  },
  {
    label: "False Position",
    link: "/falseposition",
  },
  {
    label: "Onepoint Iteration",
    link: "/onepoint",
  },
  {
    label: "Newton Raphson",
    link: "/newtonraphson",
  },
  {
    label: "Secant Method",
    link: "/secant",
  }

]


function HomeNav() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faCalculator} /><span> Numerical methods</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Root of equation">
                  {rootOfEquation.map((menu, index)=> (
                    <NavDropdown.Item key={index} href={menu.link}>{menu.label}</NavDropdown.Item>
                  ))}
                </NavDropdown>

                <NavDropdown title="Matrix">
                  <NavDropdown.Item href="/cramer">Cramer</NavDropdown.Item>
                  <NavDropdown.Item href="/gauss-elimination">Gauss Elimination</NavDropdown.Item>
                  <NavDropdown.Item href="/gauss-jordan">Gauss Jordan</NavDropdown.Item>
                  <NavDropdown.Item href="/matrix-inversion" disabled>Matrix Inversion</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Interpolation">
                  <NavDropdown.Item href="/newton-div-diff" disabled>Newton's Divide-difference</NavDropdown.Item>
                  <NavDropdown.Item href="/lagrange">Lagrange</NavDropdown.Item>
                  <NavDropdown.Item href="/spline">Spline</NavDropdown.Item>
                </NavDropdown>

                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNav;