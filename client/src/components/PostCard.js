import React from 'react';
import { Card } from 'semantic-ui-react';

const PostCard = ({ text, postedBy }) => {
  return(
    <Card>
      <Card.Content>
        <Card.Header>{postedBy}</Card.Header>
        <Card.Description>{text}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
