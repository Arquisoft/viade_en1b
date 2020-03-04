import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BsPerson, BsArrowBarUp, BsMap } from "react-icons/bs";
import "./NavBar.css";
import { LogoutButton } from "@solid/react";

let MyNavBar = props => {

  const links = [
    { id: 0, text: 'My routes', href: '/routes', icon: <BsMap className="icon"></BsMap>, testId: 'navbar-my-routes'},
    { id: 1, text: 'Upload route', href: '/upload', icon: <BsArrowBarUp className="icon"></BsArrowBarUp>, testId: 'navbar-upload-route'}
  ]

  const dropDownElements = [
    { id: 0, text: 'My Profile', href: '/profile', testId: 'navbar-my-profile'},
    { id: 1, text: 'Log Out', href: '/', testId: 'navbar-logout'},

  ]


  const getNavLinkClass = path => {
    let route_array = window.location.href.split('/')
    let path_array = path.split('/')
    return route_array[route_array.length - 1] === path_array[path_array.length - 1] ? 'nav-link active' : 'nav-link'
  }



  return (
    <Navbar className="bg-light" fixed="top" bg="light" expand="lg">
      <Navbar.Brand data-testid="navbar-brand" href="/dashboard">{props.brandName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="justify-content-end" activeKey="/home">
          {links.map(link => {
            return (<span key={link.id}>
              <Nav.Link data-testid={link.testId} key={link.id} href={link.href} className={getNavLinkClass(link.href)} >
                {link.icon}
                {link.text}
              </Nav.Link>
            </span>
            )
          })}

          <NavDropdown variant="secondary" drop="left" title={<BsPerson className="icon"></BsPerson>}>
            {dropDownElements.map(element => {
              return (<NavDropdown.Item data-testid={element.testId} key={element.id} href={element.href}>
                { element.id===1 ? <LogoutButton>{element.text}</LogoutButton> :
                element.text}
              </NavDropdown.Item>)
            })}

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default React.memo(MyNavBar);