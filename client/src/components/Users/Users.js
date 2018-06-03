import React from 'react';
import { Link } from 'react-router-dom';

import User from './User';

import logo from '../../logo.svg';
import './style/Users.css';

const Users = props => {
  if (props.users.length === 0) {
    return <img src={logo} className="App-logo" alt="logo" />;
  }
  return (
    <div className='App__user-container'>
      {
        props.users.map(user => {
          return (
            <Link to={ `/${ user.id }` } key={ user.id } className='user-container__link'>
              <User name={ user.name } />
            </Link>
          );
        })
      }
    </div>
  )
}
 
export default Users;