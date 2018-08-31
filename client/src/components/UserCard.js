import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserCard = ({ id, name }) => {
  return(
    <Card as={Link} to={`/user/${id}`}>
      <Card.Header>
        <Icon circular inverted name="user" color="gray" />
        {name}
      </Card.Header>
    </Card>
  );
}

export default UserCard;
