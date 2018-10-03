import React, { Component } from "react";
import User from "./User";

const UserList = props => {
    const {users} = props
    console.log(props)
  return (
    <div>
      <h1>UserList</h1>
      {users.map(user => (
        <User {...props} user={user} />
      ))}
    </div>
  );
};

export default UserList;
