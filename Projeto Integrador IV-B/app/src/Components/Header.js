import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import img from "../img/logo.jpg"

function Header() {
  return (
    <Navbar style={{backgroundColor:'gray'}}>
      <Container>
        <Navbar.Brand href="/">
          <img src={img} alt="logo" style={{ width: '65px', height: '65px' }}/>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Ongs">Ongs</Nav.Link>
          <Nav.Link href="/Dicas">Clue</Nav.Link>
          <Nav.Link href="/Cadastro">Register</Nav.Link>
          <Nav.Link href="/Relatos">Storys</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;