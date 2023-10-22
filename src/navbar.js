
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { methodsPath } from './path';

function HomeNav() {
  return (
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faCalculator} /><span> Numerical methods</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {methodsPath.map((type, index)=> (
                  <NavDropdown title={type.title} key={index}>
                    {type.path.map((link, linkIndex)=> (
                      <NavDropdown.Item key={linkIndex} href={link.id}>{link.label}</NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default HomeNav;