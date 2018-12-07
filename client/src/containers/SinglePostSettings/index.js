import React from 'react';
import { Container } from 'reactstrap';
import Close from '../../components/Close/';

class SinglePostSettings extends React.Component {
  render () {
    return (
      <Container>
        <Close id={this.props.match.params.id}/>
      </Container>
    );
  }
}

export default SinglePostSettings;
