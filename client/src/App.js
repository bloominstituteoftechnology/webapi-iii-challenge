import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

import DisplayUsers from './components/DisplayUsers';
import UserPosts from './components/UserPosts';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      error: ''
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
    .then(users=>{
      this.setState({users: users.data, error: ''});
    })
    .catch(error=>{
      this.setState({error: 'Error retrieving users'})
    })
  }

  render() {
    return (
      <div>
        <h1>Node Blog</h1>
        {this.state.error ?
         <h2>{this.state.error}</h2> :
         null}
        
        <Route exact path="/" render={props=><DisplayUsers users={this.state.users}/>}/>
        <Route path="/:id" render={props=><UserPosts {...props}/>}/>
      </div>
    );
  }
}

export default App;
