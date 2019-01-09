import React from 'react';
import { Alert, Button, Form, FormGroup, Input,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updatePost, fetchPost } from '../../actions/posts';

class EditPost extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      text: ''
    }
  }
  componentDidMount() {
    const id = this.props.id;
    this.props.fetchPost(id)
  }
  toggle = () => {
    return this.setState({
      modal: !this.state.modal
    })
  }
  update = (e) => {
    e.preventDefault();
    const id = this.props.id;
    // create object to update
    const obj = {
      text: this.state.text
    }
    return this.props.updatePost(id, obj);
  }

  changeHandler = (e) => {
    return this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div>
      <Alert color='info'><Button color='info' onClick={this.toggle}>EDIT POST</Button></Alert>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Edit Current Post</ModalHeader>
          <Form onSubmit={this.update}>
          <ModalBody>
            <FormGroup>
              <Input type='textarea' name='text' onChange={this.changeHandler} value={this.state.text || this.props.currentPost.text} />
            </FormGroup>
        </ModalBody>
        <ModalFooter style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button type='submit' color='success'>Save</Button>
        <Button color='info' onClick={this.toggle}>Go Back</Button>
        </ModalFooter>
        </Form>
      </Modal>
      {this.props.updatedPost ? <Redirect to={`/posts/`} /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    updatedPost: state.postsReducer.updatedPost,
    currentPost: state.postsReducer.currentPost,
    fetchedPost: state.postsReducer.fetchedPost
  }
}

export default connect(mapStateToProps, {updatePost, fetchPost})(EditPost);
