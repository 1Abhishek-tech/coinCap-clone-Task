import React, { useState } from "react";
import {Navbar, Container,Nav, Button ,NavDropdown ,FormControl , Form} from 'react-bootstrap';
import {Input} from 'elementz';
import { Icon } from '@iconify/react';


export const AppNavbar = () => {
  const [isLoading,setLoading] = useState({
    'search': false,
    'edit': false,
    'custom': false
  });
  return (
    <div className="fluid bg-white">
    <Navbar  expand="lg" className="container ">
    <Container fluid >
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0 z"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#Coins">Coins</Nav.Link>
          <Nav.Link href="#Exchange">Exchange</Nav.Link>
          <Nav.Link href="#Swap">Swap</Nav.Link>
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
  <div className="nav__right">
      <Input
        loading={isLoading.search}
        before={
          <Icon icon="akar-icons:search" color="black" width="15 "/>
        }
        placeholder='Search something'
        onChange={(e)=>(
          setLoading({...isLoading, search: !isLoading.search})
          )}
          />
        <Icon icon="uiw:setting" color="black" width="20 " className="nav__right_icon"/>
        <button type="button" class="btn btn_nav">Connect Wallet</button>
        </div>
          </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
}
