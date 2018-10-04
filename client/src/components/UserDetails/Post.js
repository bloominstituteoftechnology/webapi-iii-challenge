import React, { Component } from "react";
import axios from 'axios'

class Post extends Component {
  state = {
    updateInput: ""
  };
  handleInput = event => {
    this.setState({
        updateInput: event.target.value
    })
  };

  deletePost = () => {
      console.log(this.props)
    this.props.deletePost(this.props.post.id);
  };
  updatePost = ()=> {
      this.props.updatePost(this.state.updateInput, this.props.post.id)
  }
  render() {
    const { text, postedBy, id } = this.props.post;

    return (
      <div>
        <p>{text}</p>
        <h6>By: {postedBy}</h6>
        <input onChange={this.handleInput} value={this.state.updateInput} />
        <button onClick={this.updatePost}>Update</button>
        <button onClick={this.deletePost}>Delete</button>
      </div>
    );
  }
}
export default Post;
