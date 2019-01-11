import React, { Component } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import UserPosts from "./components/UserPosts";

import styled from "styled-components";
import { Navbar, NavItem } from "react-materialize";

const AppContainer = styled.div`
  padding: 20px 50px;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar>
            <NavItem href="get-started.html">
              <NavLink to="/">
                <h4>Home</h4>
              </NavLink>
            </NavItem>
          </Navbar>

          <AppContainer>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/users/:id/posts" component={UserPosts} />
            </Switch>
          </AppContainer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
