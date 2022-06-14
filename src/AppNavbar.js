import React, {  } from "react";
import {Navbar, Container,Nav, Button ,NavDropdown ,FormControl , Form} from 'react-bootstrap';

export const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="fluid ">
    <Container fluid >
      {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Coins</Nav.Link>
          <Nav.Link href="#action2">Exchange</Nav.Link>
          <Nav.Link href="#action2">Swap</Nav.Link>
        </Nav>
        <Container>
    <Navbar.Brand href="#home" className="d-flex justify-content-center">
      <img
        src="https://coincap.io/static/logos/black.svg"
        width="75"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  </Container>
        <Form className="d-flex ">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
