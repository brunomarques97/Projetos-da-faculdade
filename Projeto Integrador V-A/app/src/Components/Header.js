import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import img from '../img/logo.jpg'

function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'gray' }}>
      <Container>
        <Navbar.Brand href="/">
          <img src={img} alt="logo" style={{ width: '65px', height: '65px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: '#4bb3b7' }}/> {/* Hamburger button */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Ongs">Ongs</Nav.Link>
            <Nav.Link href="/Dicas">Tips</Nav.Link>
            <Nav.Link href="/Cadastro">Register</Nav.Link>
            <Nav.Link href="/Relatos">Storys</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;