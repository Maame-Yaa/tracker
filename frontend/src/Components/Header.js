import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="/">Autism Elopement Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/viewAllMaps">View All Maps</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
