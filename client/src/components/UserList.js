import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user, i) => (
        <Link className="user" key={user.id} to={`/users/${user.id}`}>
          <h2>{user.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
