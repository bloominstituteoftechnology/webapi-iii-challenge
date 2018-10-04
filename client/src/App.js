import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import "./index.css";
import { Jumbotron } from "reactstrap";

import { Link } from "react-router-dom";

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
    axios.get("http://localhost:3333/api/users").then(result => {
      console.log(result);
      this.setState({ users: result.data.getUsers });
      //  .catch((err) => {
      //    alert(err)
    });

    axios.get("http://localhost:3333/api/posts").then(result => {
      this.setState({ posts: result.data });
    });

    axios.get("http://localhost:3333/api/tags").then(result => {
      this.setState({ tags: result.data.gotTags });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>NODE BLOG</h1>
        <Route
          exact
          path="/users"
          render={() => {
            console.log(this.state.users);
            if(!this.state.users) return false;
            return this.state.users.map((user, index) => {
              return (
                <Link key={index} to={`/users/${user.id}`}>
                  <Jumbotron>
                    <h1 className="name">{user.name}</h1>
                  </Jumbotron>
                </Link>
              );
            });
          }}
        />

        <Route
          path="/users/:id"
          render={props => {
            let user = this.state.users.filter(
              user => Number(props.match.params.id) === user.id
            )[0];
            if (user)
              return (
                <div>
                  <h1> {user.name + "'s posts"}</h1>
                  {this.state.posts
                    .filter(
                      post => Number(props.match.params.id) === post.userId
                    )
                    .map((post, index) => {
                      return (
                        <Jumbotron key={index}>
                          <h1 className="post">{post.text}</h1>
                        </Jumbotron>
                      );
                    })}
                  <Link to="/users">
                    <h1>Back</h1>
                  </Link>
                </div>
              );
            else return <div />;
          }}
        />
      </div>
    );
  }
}

export default App;
