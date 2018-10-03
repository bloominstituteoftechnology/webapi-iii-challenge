import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";


const Article = styled.article`
  width: 45%;
  margin-top: 25px;
  padding: 15px;
  border: solid 1.5px #61DAFB;
  border-radius: 10px;
  background-color: rgba(34, 34, 34, .9);

  .user-name {
    color: white;
  }
  
  .user-link {
    text-decoration: none;
    color: #61DAFB;
    font-weight: bold;
  }
`;


// User receives usersData info from Users => NavLink to UserPosts
const User = props => {
  return (
    <Article>
      <h3 className="user-name">{props.name}</h3>
      <NavLink className="user-link" to={`/users/${props.id}`}>View Blog Posts</NavLink>
    </Article>
  );
}

export default User;
