import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigate() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/add">
            <Nav.Link>Add New Product</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}
