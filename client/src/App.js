import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

class App extends Component {

  state={
    users:[]
  }
  componentDidMount(){
    this.updateState()
  }
  updateState= ()=>{
axios
.get('http://localhost:5000/users')
.then(response=>{
  this.setState({users:response.data})
})
.catch(err=>{
  console.log(err)
})

  }
  
  render() {
    return (
      <div className="App">
     s
      </div>
    );
  }
}

export default App;
