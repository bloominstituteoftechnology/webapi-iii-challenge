
import React from "react";

const UserPosts = props => {
  console.log(props);
  return (
    <div className="card">
      {props.users.map(user => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
};

export default UserPosts;