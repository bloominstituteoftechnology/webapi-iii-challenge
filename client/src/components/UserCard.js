import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserCard = ({ id, name }) => {
  return(
    <Card as={Link} to={`/user/${id}`}>
      <Card.Header>{name}</Card.Header>
    </Card>
  );
}

export default UserCard;
