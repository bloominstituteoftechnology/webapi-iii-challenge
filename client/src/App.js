import React, { Component } from 'react';
import './App.css';
import axios from 'axios'; 

class App extends Component {
  constructor(){
    super(); 
    this.state={
      users:[],
    }
  }
  componentDidMount() {
    axios
    .get("http://localhost:3001/users")
    .then(res=>{
      this.setState=({users: res.data}); 
    })
    .catch(err=> console.log('Error', err))
  }
  render() {
    return (
      <div className="App">
      <div>
        <h1>Names</h1>
        {this.state.users.map(item=>{
          return(
          <div key={item.id}>
          <p>{item.name}</p>
          </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default App;
