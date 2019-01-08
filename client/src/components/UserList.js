import React from "react";
import { Link, NavLink } from "react-router-dom";

const UserList = ({ users }) => {
  return (
    <div>
      <nav>
        <NavLink to="/" className="navlink">
          Home
        </NavLink>
        <NavLink to="/users" className="navlink">
          User Page
        </NavLink>
      </nav>
      {users.map((user, i) => (
        <Link className="user" key={user.id} to={`/users/${user.id}`}>
          <h2>{user.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
