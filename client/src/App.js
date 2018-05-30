import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      tags: [],
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res)
        this.setState({ users: res.data })
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map((e) => {
          return (
            <div key={e.id}><h6>{e.name}</h6>
              {/* </{e.posts.map(e => {
                return (
                  <div><p>{e}</p></div>
                );
              })} */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
