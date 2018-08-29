import React from 'react';
import { NavLink } from 'react-router-dom';

const User = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <NavLink to={`/users/${props.id}`}>View Blog Posts</NavLink>
    </div>
  );
}

export default User;