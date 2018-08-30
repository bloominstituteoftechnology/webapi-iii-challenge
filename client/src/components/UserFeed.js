import React, { Component } from 'react';
import PostCard from './PostCard';
import axios from 'axios';

class UserFeed extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    axios.get(`http://localhost:9000/api/users/${id}/posts`)
          .then(res => this.setState({ posts: res.data }))
          .catch(err => console.log(err));
  }

  render(){
    return(
      <div className="user-feed">
        {this.state.posts && this.state.posts.length > 0 &&
          this.state.posts.map(post => <PostCard key={post.id}
                                           {...post}
                                       /> )}
        {this.state.posts && this.state.posts.length === 0 &&
          <p>There are no posts to show</p>}
        {this.state.error &&
          <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default UserFeed;
