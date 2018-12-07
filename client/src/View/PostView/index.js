import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import SinglePostContainer from '../../containers/SinglePostContainer';
import SinglePostSettings from '../../containers/SinglePostSettings';

class PostView extends React.Component {

  render () {
    return (
      <Container>
        <Row>
          <Col >
            <SinglePostContainer {...this.props}/>
          </Col>
          <Col md='3'>
            <h3>Post Settings</h3>
          <SinglePostSettings {...this.props}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PostView;
