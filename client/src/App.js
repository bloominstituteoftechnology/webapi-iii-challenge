import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      users:[]
    }
  }

componentDidMount() {
  axios.get('http://localhost:7000/api/users')
  .then(res=>
    this.setState({users:res.data}))
    .catch(err=>console.log(err, "We failed to retrieve the users."))
}

  render() {
if (!this.state.users) {
  return <h1>Retrieving users...</h1>
} else {

    return (
      <div className="App">
 {this.state.users.map(user=>{
   return (
<div key={user.id} className="user-container">
     <div className="user-name">{user.name}</div>
   </div>
     )
 })}
      </div>
    );
  }
}
}

export default App;
