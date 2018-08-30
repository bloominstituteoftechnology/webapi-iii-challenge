import React from 'react';
import axios from 'axios';
import styled from "styled-components";

import logo from '../logo.svg';


const Container = styled.div`
  padding: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Article = styled.article`
  width: 85%;
  margin-top: 25px;
  padding: 15px;
  border: solid 1.5px #61DAFB;
  border-radius: 10px;
  background-color: rgba(34, 34, 34, .9);
  color: white;
`;


const url = 'http://localhost:7000/users';


// UserPosts Handles userPostsData + receives usersData as users from App
class UserPosts extends React.Component {
  state = {
    userPostsData: []
  }

  componentDidMount() {
    axios.get(`${url}/${this.props.match.params.id}`)
    .then(res => {
      this.setState({userPostsData: res.data})
    })
    .catch(err => console.log(err))
  }

  // UsersData filtered to match user for header
  render() {
    let filteredUser = this.props.users.filter(
      user => user.id === parseInt(this.props.match.params.id, 10)
    )
    return (
      <Container>
        <header>
        {filteredUser.length === 0 ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            <h1>{`${filteredUser[0].name}'s Blog Posts`}</h1>
          }
        </header>
        <Main>
          {this.state.userPostsData.length === 0 ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            this.state.userPostsData.map((post, index) => <Article key={index}>{post.text}</Article>)
          }
        </Main>
      </Container>
    );
  }
}

export default UserPosts;
