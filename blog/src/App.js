import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import './index.css'
import {Route} from 'react-router-dom';


const Posts = (props) => {
  return (
    <div>
{ axios
  .get(`http://localhost:7000/api/users/${props.match.params.id}/posts`)
  .then(response => {
    return <div>{response.data}</div>;
  })
  .catch(error => {
    console.error("Server Error", error);
  })}
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    }
  }

  componentDidMount() {
    axios
    .get("http://localhost:7000/api/users")
    .then(response => {
      this.setState(() => ({ users: response.data}));
    })
    .catch(error => {
      console.error("Server Error", error);
    });
    axios
    .get("http://localhost:7000/api/posts")
    .then(response => {
      this.setState(() => ({ posts: response.data}));
    })
    .catch(error => {
      console.error("Server Error", error);
    });
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
      <h1 className="title">Users</h1>
        {this.state.users.map(user => <div className="user">{user.name}</div>)}
      <Route path="/users/:id/posts" component={Posts} />
      </div>
    );
  }
}

export default App;
