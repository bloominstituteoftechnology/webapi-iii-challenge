import React from 'react';
import '../App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPosts: false,
      posts: []
    }
  }

  showPostsHandler = (event) => {
    console.log(event.target);
    console.log(event.target.getAttribute('id'));
    let id = event.target.getAttribute('id');
    axios.get(`http://localhost:8000/api/users/${id}/posts`)
      .then(response => {
        this.setState({showPosts: !this.state.showPosts, posts: response.data});
      }).catch(err => {
        console.log("Err from app:", err);
      })
  }

  render() {
    return (
      <div key={this.props.user.id}>
        <NavLink to={`/api/users/${this.props.user.id}`} id={this.props.user.id}><h1>{this.props.user.name}</h1></NavLink>
        <div>{this.state.showPosts ? this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <h3>{post.text}</h3>
              <h6>{post.postedBy}</h6>
            </div>
          )
        }): null}
        <p onClick={this.showPostsHandler} id={this.props.user.id}>Click to {this.state.showPosts ? "hide":"show"} posts</p>
        </div>
        <hr className="horizontal-rule"/>
      </div>
    )
  }
}

export default UserList;
