import React from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createPost } from '../../actions/posts/';

class NewPostForm extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      // testing with userId number one for all posts
      userId: 1
    }
  }
  createFormObject = (e) => {
    e.preventDefault();
    const post = {text: this.state.text, userId: this.state.userId}
    console.log(post)
    return this.props.createPost(post);
  }
  changeHandler = (e) => {
    return this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <Container>
        <h1>Create a new Post</h1>
        <Row>
         <Col md={{size: '6', offset: '3'}}>
          <Form onSubmit={this.createFormObject}>
            <FormGroup>
              <Input type='textarea' name='text' onChange={this.changeHandler} value={this.state.text} />
            </FormGroup>
            <Button color='primary'>Post</Button>
          </Form>
         </Col>
        </Row>
        {this.props.createdPost ? <Redirect to='/posts' /> : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    creatingPost: state.postsReducer.creatingPost,
    createdPost: state.postsReducer.createdPost
  }
}

export default connect(mapStateToProps, {createPost})(NewPostForm);
