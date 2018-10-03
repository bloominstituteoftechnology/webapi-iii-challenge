import React, { Component } from "react";
import PostList from "./PostList";
import axios from "axios";

class UserDetails extends Component {
  state = {
    posts: [],
    newPostInput: ''
  };

  fetchUserPostsData = () => {
    axios
      .get(`http://localhost:7000/users/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  handleInput = event => {
      this.setState({
          newPostInput: event.target.value
      })
  }

  sumbitPost = () => {
      const text = this.state.newPostInput
      const userId = parseInt(this.props.match.params.id)
      axios.post('http://localhost:7000/users/posts',{text, userId})
      .then(res => {          
          this.setState({
              posts:res.data,
              newPostInput: ''
          })  
      })
  }

  deletePost = id => {
    const userId = parseInt(this.props.match.params.id)  
    axios.delete(`http://localhost:7000/users/posts/${id}/${userId}`)
      .then(res => {
          this.setState({
              posts:res.data
          })
      })
  }

  render() {
    const user = this.props.users.find(user => {
      return user.id === parseInt(this.props.match.params.id);
    });
    const { name, id } = user ? user : { name: "", id: "" };
    const { posts, newPostInput } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <div>
          <h3>New Post:</h3>
          <input onChange={this.handleInput} value={newPostInput}/>
          <button onClick={this.sumbitPost}>Sumbit</button>
        </div>
        <PostList posts={posts} deletePost={this.deletePost} {...this.props} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchUserPostsData();
  }
}

export default UserDetails;
