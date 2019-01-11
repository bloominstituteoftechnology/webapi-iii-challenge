import React from "react";
import { CardPanel } from "react-materialize";
import { Link } from "react-router-dom";

const UserCard = props => {
  const { name, id } = props.user;
  return (
    <CardPanel className="red lighten-2 white-text center">
      <Link to={`/users/${id}/posts`} className="white-text">
        <h3>{name}</h3>
      </Link>
    </CardPanel>
  );
};
export default UserCard;
