import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import UserDetails from "./UserDetails/UserDetails";
import UserList from "./UserList/UserList"
import axios from 'axios';

class UserContainer extends Component {
  state = {
    users: [],
    posts: []
  };

  fetchUsersData = () => {
    axios.get('http://localhost:7000/users')
    .then(res => {
        this.setState({
            users: res.data
        })
    })
  }

  fetchPostsData = () => {
    axios.get('http://localhost:7000/posts')
    .then(res => {
        this.setState({
            posts: res.data
        })
    })
  }

  render() {
      const {users, posts} = this.state
    return (
      <Switch>
        <Route exact path="/users" render={props => <UserList users={users} {...props} />} />
        <Route exact path="/users/:id" render={props => <UserDetails users={users} {...props} />}/>
      </Switch>
    );
  }
  componentDidMount(){
      this.fetchPostsData()
      this.fetchUsersData()
  } 
}

export default UserContainer
