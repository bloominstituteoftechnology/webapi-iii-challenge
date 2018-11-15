import React from "react";
import { Link } from "react-router-dom";

const UserCard = props => {
  return (
    <div>
      <Link to={`/users/${props.user.id}`}>
        <p>{props.user}</p>
      </Link>
    </div>
  );
};

export default UserCard;