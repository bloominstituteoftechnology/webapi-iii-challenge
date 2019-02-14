import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import User from './components/Users/User'
import Posts from './components/Posts/Posts';
import Users from './components/Users/Users';

class App extends Component {
  
  // componentDidMount = () => {
  //   axios
  //     .get('http://localhost:3333/api/posts')
  //     .then(res => {
  //       this.setState({ posts: res.data.posts });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        
        
        <Route exact path='/' component={Users} />
        <Route path='/users/:id' component={User} />
        {/* <Posts /> */}
        
      </div>
    );
  }
}

export default App;
