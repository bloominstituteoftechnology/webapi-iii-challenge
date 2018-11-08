import React from "react";
import { Link } from "react-router-dom";

const Users = props => {
  return (
      <div>
          {props.users.map(user => (
              <div key={user.id}>
                  <Link to={`/api/posts/${user.id}`}>{user.name}</Link>
              </div>
          ))}
      </div>
  );
};

export default Users;
