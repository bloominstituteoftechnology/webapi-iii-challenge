import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { Jumbotron } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      tags: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users/').then((result) => {
      this.setState({ users: result.data.users})
    })

    axios.get('http://localhost:5555/api/posts/').then((result) => {
      this.setState({ posts: result.data.post})
    })

    axios.get('http://localhost:5555/api/tags/').then((result) => {
      console.log(result);
      this.setState({ tags: result.data.tag})
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.users.map((user, index) => {
            return (
              <Jumbotron>
                <h1 className="display-3">{user.name}</h1>
              </Jumbotron>
            )
          })
        }
      </div>
    );
  }
}

export default App;
