import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';

import Users from './components/Users';
import Posts from './components/Posts';
class App extends Component {
  // componentDidMount(){
  //   this.getData("http://localhost:9000/users");
  // };
  // getData = URL => {
  //   fetch(URL)
  //     .then( res => {
  //       return res.json();
  //     })
  //     .then( data => {
  //       this.setState({ users: data });
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     });
  // };
  render() {
    return (
      <div className="App">
        <Route exact path="/users" component={Users} />
        <Route exact path="/posts" component={Posts} />
      </div>
    );
  };
};

export default App;
