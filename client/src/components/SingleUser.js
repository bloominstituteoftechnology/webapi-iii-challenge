import React, { Component } from "react";

export default function User(props) {
  return (
    <div className="post-card" key={props.user.id}>
      <h3>{props.user.postedBy}</h3>
      <p>{props.user.text}</p>
    </div>
  );
}
