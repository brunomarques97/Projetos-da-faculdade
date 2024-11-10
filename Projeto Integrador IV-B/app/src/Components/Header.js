import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import img from "../img/logo.jpg"

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={img} alt="logo" style={{ width: '50px', height: '50px' }}/>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Ongs">Ongs</Nav.Link>
          <Nav.Link href="/Dicas">Dicas</Nav.Link>
          <Nav.Link href="/Cadastro">Cadastro</Nav.Link>
          <Nav.Link href="/Relatos">Relatos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;