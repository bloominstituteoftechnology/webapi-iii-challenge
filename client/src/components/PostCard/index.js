import React from "react";
import { Card, CardBody, CardSubtitle, CardText} from 'reactstrap';


class PostCard extends React.Component {
  render() {

    return (
      <Card color='info' style={{margin: '10px'}}>
        <CardBody style={{textAlign: 'left'}}>
          <CardSubtitle>@{this.props.postedBy}</CardSubtitle>
          <CardText style={{fontSize: '28px'}}>{this.props.text}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default PostCard;
