import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Posts extends Component {
  constructor(){
    super();
    this.state={
      posts:[]
    }
  }
  componentDidMount(){
    axios.get('http://localhost:5000/api/posts')
    .then(response=>{
      this.setState ({posts:response.data})
    })
    .catch(error=>{
      console.error('Server Error', error);
    
  })
}
  render() {
    return (
    
      <div className="Container">
      {this.state.posts.map(post=>{
        return(
          <div className="" key={post.id}>
          <div>Id:{post.id}</div>
          <div>userId:{post.userId}</div>
          <div>Comment:{post.text}</div>
          </div>
        )
      })}
      </div>  
    );
  }
}

export default Posts;