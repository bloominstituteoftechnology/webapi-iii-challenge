import React, { Component } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";

import styled from "styled-components";

import Nav from "./components/Nav";
import Posts from "./components/Posts";

const Container = styled.div`
  font-family: "IBM Plex Sans", sans-serif;
  background: rgb(184, 167, 204);
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/posts/")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/api/users/")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.users);
    return (
      <Container>
        <Nav />
        <Route
          exact
          path="/"
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
      </Container>
    );
  }
}

export default withRouter(App);
