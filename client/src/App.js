import React, { Component } from 'react';

import './App.css';
import axios  from 'axios';

class App extends Component {
 constructor(props) {
 super(props);
 this.state = {
   users:[{}],
   posts:[{}],
   tags:[{}]
  };
 }

 componentDidMount() {
   axios
    .get('http://localhost:5000/api/users')
    .then( response => {
        this.setState({ users: response.data.users})
    })
    /* axios
    .get('http://localhost:5000/api/posts')
    .then( response => {
        this.setState({ posts: response.data.posts})
    })
    axios
    .get('http://localhost:5000/api/tags')
    .then( response => {
        this.setState({ tags: response.data.tags})
    }) */
 }

 render() {
   console.log(this.state)
   return(
      <div className = 'App'>
        {this.state.users.map(user => {
          return <div key={user.id+user.name}>{user.name}</div>
        })}
        </div>
   );
  }
}

export default App;
