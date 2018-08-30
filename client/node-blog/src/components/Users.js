import React from 'react';
import styled from "styled-components";

import logo from '../logo.svg';

import User from './User';


const Main = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20px;
`;


// Users receives usersData as users from App => sends individual usersData info to User
const Users = props => {
  return (
    <Main>
      {props.users.length === 0 ?
        <img src={logo} className="App-logo" alt="logo" />
        :
        props.users.map((user, index) => <User key={index} id={user.id} name={user.name} />)
      }
    </Main>
  );
}

export default Users;
