import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Users from './components/Users';
import Posts from './components/Posts';

import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
    };
  }
  
getUsers = () => {
  return axios.get('http://localhost:5555/api/user');
}

getPosts = () => {
  return axios.get('http://localhost:5555/api/post')
}
  
componentDidMount() {
    // axios
    //   .get(`http://localhost:5555/api/user`)
    //     .then(response => {
    //       console.log(response.data)
    //       this.setState(() => ({ users: response.data}))
    //     }) 
    //     .catch(err => {console.log("error on user get:",err)
    //     })

    
    axios.all([this.getUsers(), this.getPosts()])
      .then(axios.spread((users, posts) => {
        console.log("users: ", users)
        console.log("posts: ", posts)
        this.setState(() => ({
          users: users.data,
          posts: posts.data
        }))
      }))
  }

  findUser = (postId) => {
   let  auther = this.state.users.filter(current => {
      return current.id === postId
    }).map(item => {
      return item.name
    })
    // console.log(auther);
    return auther
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/">
          <h1>Keep is Secret you fool!</h1>
        </Route>
        <Route path="/user" render={() => <Users users={this.state.users} />} />
        <Route exact path="/posts" render={() => <Posts posts={this.state.posts} users={this.state.users} findUser={this.findUser} />} />

      </div>
    );
  }
}

export default App;
