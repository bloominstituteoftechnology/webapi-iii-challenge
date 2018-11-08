import React from "react";

const Users = props => {
  console.log(props);
  return (
    <div>
      {props.users.map(user => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
};

export default Users;
