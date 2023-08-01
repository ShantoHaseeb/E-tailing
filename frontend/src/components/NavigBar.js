import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./NavigBar.css";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";

function NavigBar() {
  function handleLogout() {
    dispatch(logout());
  }
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand
          href='/FrontPage'
          style={{ color: "white", textDecoration: "none" }}
        >
          E-Tailing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {user && (
            <>
              <Nav className='me-auto'>
                <Nav.Link
                  href='/AddCar'
                  style={{ color: "white", textDecoration: "none" }}
                  activeStyle={{ color: "red", textDecoration: "none" }}
                >
                  Add Furniture For Sale
                </Nav.Link>
                <Nav.Link
                  href='/add-request'
                  style={{ color: "white", textDecoration: "none" }}
                  activeStyle={{ color: "red", textDecoration: "none" }}
                >
                  Add request
                </Nav.Link>
                <Nav.Link
                  href='/requests'
                  style={{ color: "white", textDecoration: "none" }}
                  activeStyle={{ color: "red", textDecoration: "none" }}
                >
                  Requests
                </Nav.Link>
              </Nav>
              <Nav className='ms-auto'>
                <LinkContainer to='/cart' style={{ color: "white" }}>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i>
                    {user?.cart.count > 0 && (
                      <span className='badge badge-warning' id='cartcount'>
                        {user.cart.count}
                      </span>
                    )}
                  </Nav.Link>
                </LinkContainer>
                <Button
                  variant='danger'
                  onClick={handleLogout}
                  className='logout-btn'
                >
                  Logout
                </Button>
              </Nav>
            </>
          )}
          {!user && (
            <Nav className='ms-auto'>
              <Nav.Link
                href='/CreateAccount'
                style={{ color: "white", textDecoration: "none" }}
                activeStyle={{ color: "red", textDecoration: "none" }}
              >
                Create Account
              </Nav.Link>
              <Nav.Link
                href='/SignIn'
                style={{ color: "white", textDecoration: "none" }}
                activeStyle={{ color: "red", textDecoration: "none" }}
              >
                Sign in
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigBar;
