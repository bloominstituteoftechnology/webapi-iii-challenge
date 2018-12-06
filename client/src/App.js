import React, { Component } from 'react';
import axios from 'axios';

import DisplayUsers from './components/DisplayUsers';

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
         <DisplayUsers users={this.state.users}/>
        }
      </div>
    );
  }
}

export default App;
