import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Alert
} from "reactstrap";
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts/';

class SinglePostContainer extends React.Component {
  componentDidMount() {
    return this.props.fetchPost(this.props.match.params.id);
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: "8", offset: "2" }}>
            <Card color="info" style={{ margin: "10px", height: '300px' }}>
              <CardBody style={{ textAlign: "left" }}>
                <CardSubtitle>{this.props.fetchedPost ? <p>{`@${this.props.currentPost.postedBy}`}</p> : <Alert color='primary' style={{backgroundColor: 'inherit', color: 'black'}}>Loading Post...</Alert>}</CardSubtitle>
                <CardText style={{ fontSize: "28px" }}>
                  {this.props.currentPost.text}
                </CardText>
              </CardBody>
            </Card>
          </Col>
      </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.postsReducer.currentPost,
    fetchedPost: state.postsReducer.fetchedPost
  }
}

export default connect(mapStateToProps, {fetchPost})(SinglePostContainer);
