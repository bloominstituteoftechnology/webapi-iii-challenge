import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import SinglePostContainer from '../../containers/SinglePostContainer';

class PostView extends React.Component {

  render () {
    return (
      <Container>
        <Row>
          <Col >
            <SinglePostContainer {...this.props}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PostView;
