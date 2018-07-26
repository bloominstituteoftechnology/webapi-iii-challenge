import React from 'react';
import '../App.css';
import axios from 'axios';

class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      showPosts: false
    }
  }

  componentDidMount() {
    console.log("View Note thing", this.props.match.params.id);
    axios.get(`http://localhost:8000/api/users/${this.props.match.params.id}`)
    .then(response => {
      this.setState({name: response.data.name})
    })
    .catch(err => {
      console.log("ERR:", err)
    })
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
      <div>
      <button onClick={() => {this.props.history.push('/')}}>Go Home</button>
      <h1 className="user-title">{this.state.name}</h1>
      <p onClick={this.showPostsHandler} id={this.props.match.params.id}>Click to {this.state.showPosts ? "hide":"show"} posts</p>
      <div>{this.state.showPosts ? this.state.posts.map(post => {
        return (
          <div key={post.id}>
            <h3>{post.text}</h3>
            <h6>{post.postedBy}</h6>
          </div>
        )
      }): null}
      <p onClick={this.showPostsHandler} id={this.props.match.params.id}>Click to {this.state.showPosts ? "hide":"show"} posts</p>
      </div>
      </div>
    )
  }
}

export default ViewUser;
