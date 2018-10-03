import React from "react";

const User = props => {
  const { id, name } = props.user;
  return (
    <div onClick = {() => props.history.push(`/users/${id}`)}>
      <h3>{name}</h3>
    </div>
  );
};

export default User