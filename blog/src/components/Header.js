import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'emotion'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  } from 'reactstrap';

  

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false
     };
     
  }
  
  linkColor = css`
    color: black;
    margin: 0 5px;

    ` 
  activeLink = css`
    font-weight: bold;
  `
  

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
     
    return ( 
      <div>
        <Navbar color="light" light expand="md">
          <NavLink 
            exact to="/"
            className={this.linkColor}
            activeClassName={this.activeLink}
          >
            <NavbarBrand>Node Blog</NavbarBrand>
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink 
                  to="/user" 
                  className={this.linkColor} 
                  activeClassName={this.activeLink}
                >
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/posts" 
                  className={this.linkColor} 
                  activeClassName={this.activeLink}
                >
                  All Posts
                </NavLink>
              </NavItem>              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
     )
  }
}
 
export default Header;