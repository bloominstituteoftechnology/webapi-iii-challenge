import React from "react";
import { Card, CardBody, CardTitle, Button, CardImg} from 'reactstrap';


class UserCard extends React.Component {
  render() {

    return (
      <Card>
        <CardImg
          top
          width="100%"
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97180&w=150&h=80"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{this.props.name}</CardTitle>
          <Button>View Profile</Button>
        </CardBody>
      </Card>
    );
  }
}

export default UserCard;
