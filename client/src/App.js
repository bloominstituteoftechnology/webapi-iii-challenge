import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";

import User from "./components/User";
import UserDetail from "./components/UserDetail";

const Header = styled.header`
  text-align: center;
  margin: 2rem 0;
`;

const Title = styled.h1`
  font-size: 5rem;
  letter-spacing: 1rem;
  display: inline-block;
  padding: 1rem 2rem;
  max-width: 50rem;
  border-bottom: 1px solid #fff;
  border-top: 1px solid #fff;
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
`;

const ListContainer = posed.div({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

export const UsersContainer = styled(ListContainer)`
  max-width: 50rem;
  margin: 4rem auto;
`;

const UsersTitle = styled.h2`
  font-size: 3.6rem;
  margin-bottom: 4rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

class App extends Component {
  state = {
    users: [],
    userPosts: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true }, () =>
      axios
        .get("/api/users")
        .then(response => {
          this.setState({ users: response.data, loading: false });
        })
        .catch(err => console.log(err))
    );
  }

  fetchPosts = id => cb => {
    this.setState({ loading: true }, () =>
      axios
        .get(`/api/users/${id}/posts`)
        .then(response => {
          this.setState({ userPosts: response.data, loading: false });
          cb();
        })
        .catch(err => console.log(err))
    );
  };

  render() {
    return (
      <Route
        children={({ location }) => (
          <div>
            <Header>
              <Title>NODE BLOG</Title>
            </Header>
            <PoseGroup>
              <RouteContainer key={location.key}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={({ history }) => (
                      <UsersContainer>
                        <UsersTitle>&lt; Users &gt;</UsersTitle>
                        {this.state.users.map(user => (
                          <User history={history} user={user} key={user.id} />
                        ))}
                      </UsersContainer>
                    )}
                  />
                  <Route
                    exact
                    path="/users/:id"
                    render={props => (
                      <UserDetail
                        {...props}
                        user={this.state.users.find(
                          user => user.id === Number(props.match.params.id)
                        )}
                        fetchPosts={this.fetchPosts(props.match.params.id)}
                        userPosts={this.state.userPosts}
                      />
                    )}
                  />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          </div>
        )}
      />
    );
  }
}

export default App;
