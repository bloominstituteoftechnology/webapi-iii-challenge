import React from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deletePost } from '../../actions/posts';

class Close extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: false
    }
  }
  toggle = () => {
    return this.setState({
      modal: !this.state.modal
    })
  }
  delete = () => {
    const id = this.props.id;
    console.log('delete', id);
    return this.props.deletePost(id);
  }
  render () {
    return (
      <div>
      <Alert color='danger'><Button color='danger' onClick={this.toggle}>DELETE</Button></Alert>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Delete Current Post</ModalHeader>
        <ModalBody>
          Are you sure you want to delete?
        </ModalBody>
        <ModalFooter style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button color='danger' onClick={this.delete}>DELETE</Button>
        <Button color='dark' onClick={this.toggle}>No</Button>
        </ModalFooter>
      </Modal>
      {this.props.deletedPost ? <Redirect to='/posts' /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    deletedPost: state.postsReducer.deletedPost
  }
}

export default connect(mapStateToProps, {deletePost})(Close);
