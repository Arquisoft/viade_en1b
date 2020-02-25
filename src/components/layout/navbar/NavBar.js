import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BsPerson, BsArrowBarUp, BsMap } from "react-icons/bs";
import { withRouter } from 'react-router-dom'
import "./NavBar.css";

let MyNavBar = React.memo(props => {

  const links = [
    { id: 0, text: 'My routes', href: '/routes', icon: <BsMap className="icon"></BsMap>, testId: ' navbar-my-routes'},
    { id: 1, text: 'Upload route', href: '/routes/upload', icon: <BsArrowBarUp className="icon"></BsArrowBarUp>, testId: 'navbar-upload-route'}
  ]

  const dropDownElements = [
    { id: 0, text: 'My Profile', href: '/profile', testId: 'navbar-my-profile'},
    { id: 1, text: 'Log Out', href: '/logout', testId: 'navbar-logout'},

  ]

  const getNavLinkClass = path => {
    return props.location.pathname === path ? 'nav-link active' : 'nav-link'
  }



  return (
    <Navbar className="bg-light" fixed="top" bg="light" expand="lg">
      <Navbar.Brand data-testid="navbar-brand" href="/dashboard">{props.brandName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="justify-content-end" activeKey="/home">
          {links.map(link => {
            return (<span key={link.id}>
              <Nav.Link data-testid={link.testId} key={link.id} className={getNavLinkClass(link.href)} href={link.href}>
                {link.icon}
                {link.text}
              </Nav.Link>
            </span>
            )
          })}

          <NavDropdown variant="secondary" drop="left" title={<BsPerson className="icon"></BsPerson>}>
            {dropDownElements.map(element => {
              return (<NavDropdown.Item data-testid={element.testId} key={element.id} href={element.href}>{element.text}</NavDropdown.Item>)
            })}

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});
MyNavBar = withRouter(MyNavBar)
export default MyNavBar;