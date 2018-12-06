import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <Nav horizontal='true' className='row'>
      {props.buttons.map(button => {
        return (
          <NavItem key={button}>
            <NavLink className='col-sm-3' to={`/${button.toLowerCase()}`}>{button}</NavLink>
          </NavItem>
        );
      })}
    </Nav>
  )
}

export default MainNav
