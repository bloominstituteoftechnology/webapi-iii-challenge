import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
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
        <Link to="/users" style={{
          textDecoration: 'none',
          fontSize: "2rem",
          color: "coral",
          padding: "1rem"
        }}> 
            Users 
        </Link>
        <Link to="/posts" style={{
          textDecoration: 'none',
          fontSize: "2rem",
          color: "coral",
          padding: "1rem"
        }}> 
            Posts
        </Link>
        <Route exact path="/users" component={Users} />
        <Route exact path="/posts" component={Posts} />
      </div>
    );
  };
};

export default App;
