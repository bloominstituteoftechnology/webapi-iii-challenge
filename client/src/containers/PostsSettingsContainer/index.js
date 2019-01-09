import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class PostsSettingsContainer extends React.Component {
  render () {
    return (
      <Container>
        <Row>
          <Col md='3'>
            <h3>Settings</h3>
            <Link to='/create/post'>
              <Button>+ Create Post</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PostsSettingsContainer;
