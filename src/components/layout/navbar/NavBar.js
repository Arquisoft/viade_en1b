import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BsPerson, BsArrowBarUp, BsMap } from "react-icons/bs";
import "./NavBar.css";

const MyNavBar = props => {
  return (
    <Navbar className="bg-light" fixed="top" bg="light" expand="lg">
      <Navbar.Brand href="dashboard">{props.brandName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Link href="/routes">
            <BsMap className="icon"></BsMap>
            My routes
          </Nav.Link>
          <Nav.Link href="/routes/upload">
            <BsArrowBarUp className="icon"></BsArrowBarUp>
            Upload route
          </Nav.Link>
          <NavDropdown variant="secondary" drop="left" title={<BsPerson className="icon"></BsPerson>}>
        <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
      </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavBar;
