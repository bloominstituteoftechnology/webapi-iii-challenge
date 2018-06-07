import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      users:[{}]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
      .then( res =>{
        console.log(this.state, "before CWM");
        this.setState(res.data)
          console.log(this.state.users, "after CWM")
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Lambda Node Blog</h1>
            <p>Lord of the Rings Wiki</p>
            
            <div className="nav-bar">
              <h4>Blog</h4>
              <h4>Characters</h4>
              <h4>Posts</h4>
              <h4>The Novels</h4>
              <h4>The Films</h4>
              <h4>Contact Me!</h4>
          </div>
        </header>
        <div className="list-of-users">
          {this.state.users.map(user =>{
            return(
              <div className="card-container">
              <div key={user.id}>
                {user.name}
              </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
