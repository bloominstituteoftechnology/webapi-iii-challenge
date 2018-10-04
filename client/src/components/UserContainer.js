import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import UserDetails from "./UserDetails/UserDetails";
import UserList from "./UserList/UserList";
import axios from "axios";
import Navigator from "./Navigator/Navigator";

class UserContainer extends Component {
  state = {
    users: [],
    posts: []
  };

  fetchUsersData = () => {
    axios.get("http://localhost:7000/users").then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  fetchPostsData = () => {
    axios.get("http://localhost:7000/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  render() {
    const { users, posts } = this.state;
    return (
      <div>
        <Route path="/users" render={props => <Navigator {...props}/>}/>
        <Switch>
          <Route
            exact
            path="/users"
            render={props => <UserList users={users} {...props} />}
          />
          <Route
            exact
            path="/users/:id"
            render={props => <UserDetails users={users} {...props} />}
          />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    this.fetchPostsData();
    this.fetchUsersData();
  }
}

export default UserContainer;
