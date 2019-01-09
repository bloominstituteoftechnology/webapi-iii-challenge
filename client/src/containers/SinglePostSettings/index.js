import React from 'react';
import { Container } from 'reactstrap';
import Close from '../../components/Close/';
import EditPost from '../../components/EditPost';

class SinglePostSettings extends React.Component {
  render () {
    console.log(this.props)
    return (
      <Container>
        <Close id={this.props.match.params.id}></Close>
      <EditPost id={this.props.match.params.id}></EditPost>
      </Container>
    );
  }
}

export default SinglePostSettings;
