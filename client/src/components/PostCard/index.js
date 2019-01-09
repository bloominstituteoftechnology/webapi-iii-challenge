import React from "react";
import { Card, CardBody, CardSubtitle, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';

class PostCard extends React.Component {
  render() {
    return (
      <Link to={`/posts/${this.props.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <Card color='info' style={{margin: '10px'}}>
          <CardBody style={{textAlign: 'left'}}>
            <CardSubtitle>@{this.props.postedBy}</CardSubtitle>
            <CardText style={{fontSize: '28px'}}>{this.props.text}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  }
}

export default PostCard;
