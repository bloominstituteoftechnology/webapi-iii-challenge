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
      <div className="userlist-container">
        {users.map((user, i) => (
          <div className="user-container" key={user.id}>
            <h2>
              <Link to={`/users/${user.id}`} className="userlink">
                {user.name}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
