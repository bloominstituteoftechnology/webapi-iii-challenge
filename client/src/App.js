import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import User from "./components/User";

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

const UsersContainer = styled.div`
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

  render() {
    return (
      <div>
        <Header>
          <Title>NODE BLOG</Title>
        </Header>
        <UsersContainer>
          <UsersTitle>&lt; Users &gt;</UsersTitle>
          {this.state.users.map(user => (
            <User user={user} key={user.id} />
          ))}
        </UsersContainer>
      </div>
    );
  }
}

export default App;
