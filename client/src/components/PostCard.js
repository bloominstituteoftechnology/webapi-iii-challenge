import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const PostCard = ({ text, postedBy }) => {
  return(
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon circular inverted name="user" color="gray" />
          {postedBy}
        </Card.Header>
        <Card.Description>{text}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
