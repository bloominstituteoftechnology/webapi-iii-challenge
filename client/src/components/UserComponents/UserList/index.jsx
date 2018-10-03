import React from "react";
import { Link } from "react-router-dom";

const UserList = props => {
  if (!props.users) {
    return <div>Users are loading...</div>;
  }
  // if the users do exist then we can slice them and reverse them so that newest user is shown first
  const users = props.users.slice().reverse();

  return (
    <div className="main-container">
      <h2>Users:</h2>
      <div className="user-previews-container">
        {users.map(user => {
          return (
            <Link to={`/users/${user.id}`} key={Math.random()}>
              <div className="user-preview-container">
                <h3>{user.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
