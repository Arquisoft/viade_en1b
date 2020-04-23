import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BsPerson, BsArrowBarUp, BsMap, BsCompass } from "react-icons/bs";
import "./NavBar.css";
import { LogoutButton } from "@solid/react";
import { LinkContainer } from "react-router-bootstrap";
import {
  loadFriendsRequest,
  loadEmailRequest,
} from "../../../store/actions/UserActions";
import { updateWebId } from "../../../store/actions/AuthActions";
import { loadRoutesRequest } from "../../../store/actions/RouteActions";
import { contentLoaded } from "../../../store/actions/LoadActions";
import { connect } from "react-redux";
import { getWebId } from "../../../solid/auth";
import { FormattedMessage } from "react-intl";
import ThemePicker from "../theme/ThemePicker";

export const MyNavBar = (props) => {
  const links = [
    {
      id: 0,
      text: "Dashboard",
      href: "/dashboard",
      icon: <BsCompass className="icon"></BsCompass>,
      testId: "navbar-dashboard",
    },
    {
      id: 1,
      text: "MyRoutes",
      href: "/routes/MyRoutes",
      icon: <BsMap className="icon"></BsMap>,
      testId: "navbar-my-routes",
    },
    {
      id: 2,
      text: "UploadRoute",
      href: "/routes/upload",
      icon: <BsArrowBarUp className="icon"></BsArrowBarUp>,
      testId: "navbar-upload-route",
    },
  ];

  if (!props.loaded) {
    getWebId().then((id) => {
      props.updateWebId(id);
      props.loadFriendsRequest();
      props.loadEmailRequest();
      props.loadRoutesRequest();
      props.contentLoaded();
    });
  }

  const dropDownElements = [
    {
      id: 0,
      text: <FormattedMessage id="MyProfile" />,
      href: "/profile",
      testId: "navbar-my-profile",
    },
    {
      id: 1,
      text: <FormattedMessage id="Settings" />,
      href: "/settings",
      testId: "navbar-settings",
    },
    {
      id: 2,
      text: <FormattedMessage id="LogOut" />,
      href: "#/",
      testId: "navbar-logout",
    },
  ];

  return (
    <Navbar className="bg-light" fixed="top" bg="light" expand="lg">
      <LinkContainer to="/dashboard">
        <Navbar.Brand data-testid="navbar-brand" href="/dashboard">
          <img
            alt="Viade logo"
            src={process.env.PUBLIC_URL + "/viade-logo.svg"}
          ></img>
          <span>{props.brandName}</span>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="justify-content-end" activeKey="/home">
          {<ThemePicker></ThemePicker>}
          {links.map((link) => {
            return (
              <span key={link.id}>
                <LinkContainer to={link.href}>
                  <Nav.Link
                    data-testid={link.testId}
                    to={link.href}
                    key={link.id}
                    href={link.href}
                    className="nav-link"
                  >
                    {link.icon}
                    <FormattedMessage id={link.text} />
                  </Nav.Link>
                </LinkContainer>
              </span>
            );
          })}

          <NavDropdown
            variant="secondary"
            drop="left"
            title={<BsPerson className="icon"></BsPerson>}
          >
            {dropDownElements.map((element) => {
              return (
                <NavDropdown.Item
                  data-testid={element.testId}
                  key={element.id}
                  href={element.href}
                >
                  {element.id === 2 ? (
                    <LogoutButton>{element.text}</LogoutButton>
                  ) : (
                    <LinkContainer to={element.href}>
                      <Nav.Link>{element.text}</Nav.Link>
                    </LinkContainer>
                  )}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    loaded: state.control.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendsRequest: () => dispatch(loadFriendsRequest()),
    updateWebId: (webId) => dispatch(updateWebId(webId)),
    loadEmailRequest: () => dispatch(loadEmailRequest()),
    loadRoutesRequest: () => dispatch(loadRoutesRequest()),
    contentLoaded: () => dispatch(contentLoaded()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyNavBar);
