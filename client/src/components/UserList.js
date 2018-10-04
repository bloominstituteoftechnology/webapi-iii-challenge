import React, { Component } from "react";
import User from "./User";

export default function UserList(props) {
  if (!props.userList || !props.userList.length) {
    return <h1>Loading Users...</h1>;
  }
  return (
    <div className="user-list-wrapper">
      {props.userList.map(user => (
        <User user={user} id={user.id} key={user.id} />
      ))}
    </div>
  );
}
