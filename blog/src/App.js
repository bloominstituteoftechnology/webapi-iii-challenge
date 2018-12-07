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

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
`;

const User = styled.div`
  text-align: center;
  color: rgb(250, 233, 91);
  border: 3px soild rgb(250, 233, 91);
  padding: 10px;
  width: 200px;
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

  addPost = newPost => {
    axios
      .post("http://localhost:3000/api/posts", newPost)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  deletePost = id => {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  render() {
    console.log(this.state.users);
    return (
      <Container>
        <Nav />
        <UserContainer>
          {this.state.users.map(user => {
            return <User>{user.name}</User>;
          })}
        </UserContainer>
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
