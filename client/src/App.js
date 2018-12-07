import React, { Component } from 'react';
import logo from './logo.svg';
import Post from "./components/post";
import axios from "axios"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      tags: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5050/api/posts')
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  closeHandler = (id) => {
alert("function is unavailable at this time...")

  }

  editHandler = id => {
    alert("function is unavailable at this time...")
/* axios
      .get('http://localhost:4000/api/posts')
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      }); */
  }

  deleteHandler = id => {
    console.log("id:", id)
    axios
    .delete(`http://localhost:5050/api/posts/${id}`)
    .then(response => {
      console.log("response:", response)
      window.location.reload();
      //getHandler;
     /*  this.setState(() => ({ posts: response.data })); */
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  getHandler = e => {
    axios
    .get('http://localhost:5050/api/posts')
    .then(response => {
      this.setState(() => ({ posts: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  render() {

    return (
      <div className="container">
        <div className="header-container">
          <div className="create-button">
            <button className="create">Create Post</button>
          </div>
          <h2>Node "Blog" Express Lab</h2> 
          <div className="create-button">
            <button className="create">Create User</button>
          </div>
        </div>
        <div className="container-lower">
        <div className="container-left"><h3>Users</h3></div>
        <div className="container-right"><h3>Posts</h3>
        <ul>{this.state.posts.map(post => {
          return (
            <Post
              text={post.text}
              userId={post.userId}        
              key={post.id}
              id={post.id}
              editHandler={this.editHandler}
              deleteHandler={this.deleteHandler}
              closeHandler={this.closeHandler}
            />);
        })}
        </ul>
       
        </div>
        <div className="container-middle"><h3>Tags</h3></div>
        </div>
      </div>
    );
  }
}
 
 export default App;
