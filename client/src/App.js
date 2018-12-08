import React, { Component } from 'react';
import logo from './logo.svg';
import Post from "./components/post";
import User from "./components/user";
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

      axios
      .get('http://localhost:5050/api/users')
      .then(response => {
        this.setState(() => ({ users: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });





  }

  closeHandler = (id) => {
alert("CLOSE function is disabled in BLOG LITE version, Please purchase the full version to enable this feature.")

  }

  closeUserHandler = (id) => {
    alert("function is unavailable at this time...")
    
      }

  editHandler = id => {
    alert("Function EDIT is disabled in BLOG LITE version, Please purchase the FULL version to enable this feature.")

  }

  editUserHandler = id => {
    alert("Function EDIT is disabled in BLOG LITE version, Please purchase the FULL version to enable this feature.")

  }
  getUserPosts = id => {
    axios
    .get(`http://localhost:5050/api/users/posts/${id}`)
    .then(response => {
      console.log("response:", response)
      this.setState(() => ({ posts: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });


  }

  deleteHandler = (id) => {
    console.log("id:", id)
    axios
    .delete(`http://localhost:5050/api/posts/${id}`)
    .then(response => {
      console.log("response:", response)
      this.getHandler();
      
     // window.location.reload();
      //getHandler;
     /*  this.setState(() => ({ posts: response.data })); */
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  deleteUserHandler = (id) => {
    console.log("id:", id)
    axios
    .delete(`http://localhost:5050/api/users/${id}`)
    .then(response => {
      console.log("response:", response)
     // window.location.reload();
    this.getUserHandler();
     /*  this.setState(() => ({ posts: response.data })); */
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  getHandler = (e) => {
    axios
    .get('http://localhost:5050/api/posts')
    .then(response => {
      this.setState(() => ({ posts: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  getUserHandler = e => {
    axios
    .get('http://localhost:5050/api/users')
    .then(response => {
      this.setState(() => ({ users: response.data }));
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
        <div className="container-left"><h3>Users</h3><ul>{this.state.users.map(user => {
          return (
            <User
              name={user.name}
              id={user.id}        
              key={user.id}
              getUserPosts={this.getUserPosts}
              editUserHandler={this.editUserHandler}
              deleteUserHandler={this.deleteUserHandler}
              closeUserHandler={this.closeUserHandler}
            />);
        })}
        </ul></div>
        <div className="container-middle"><h3>Posts</h3>
        <ul>{this.state.posts.map(post => {
          return (
            <Post
              text={post.text}
              userId={post.userId}        
              key={post.id}
              id={post.id}
              postedBy={post.postedBy}
              editHandler={this.editHandler}
              deleteHandler={this.deleteHandler}
              closeHandler={this.closeHandler}
            />);
        })}
        </ul>
       
        </div>
        <div className="container-right"><h3>Tags</h3></div>
        </div>
      </div>
    );
  }
}
 
 export default App;
