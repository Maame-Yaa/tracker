// Header.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

// This is the part of the page that stays at the top, like a header on a document.
export default function Header() {
  // This describes what the header should look like and do.
  return (
    <header>
      {/* This is the navigation bar that lets users go to different pages. */}
      <Navbar bg="light" expand="lg">
        {/* This keeps the items in the navigation bar nicely spaced. */}
        <Container>
          {/* This is the name or logo on the left side of the navigation bar. */}
          <Navbar.Brand href="/">Geofence</Navbar.Brand>
          {/* This is a button that appears when the screen is small (like on phones) to show the navigation links. */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* This is where the navigation links are actually listed. */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* This is a single navigation link to take the user to the homepage. */}
              <Nav.Link href="/">Home</Nav.Link>
              {/* You can add more links here for other pages. */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
