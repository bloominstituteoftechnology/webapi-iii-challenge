import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Characters from './Components/Characters';
import Character from './Components/Character';
import Posts from './Components/Posts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:9000/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
        <Header />
        <Route path='/characters' render={props => (
          <Characters {...props} characters={this.state.users} />
        )}/>
        <Route path='/posts' render={props => (
          <Posts {...props} posts={this.state.posts} />
        )}/>
        <Route path='/user/:id' render={props => (
          <Character {...props}  />
        )} />
      </div>
    );
  }
}

export default App;
