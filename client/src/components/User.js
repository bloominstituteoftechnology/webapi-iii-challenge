import React, { Component } from "react";

export default function User(props) {
  console.log(props);
  return (
    <div className="user-card" key={props.user.id}>
      <h3>{props.user.name}</h3>
    </div>
  );
}
