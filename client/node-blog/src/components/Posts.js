import React from 'react';
import axios from 'axios';
import styled from "styled-components";

import logo from '../logo.svg';

import Post from './Post';


const Main = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20px;
`;


const url = 'http://localhost:7000/posts';


// Posts Handles postsData + receives usersData as users from App
class Posts extends React.Component {
  state = {
    postsData: []
  }

  componentDidMount() {
    axios.get(url)
    .then(res => {
      this.setState({postsData: res.data})
    })
    .catch(err => console.log(err))
  }

  // sends users prop and postsData info to Post
  render() {
    return (
      <Main>
        {this.props.users.length === 0 || this.state.postsData.length === 0 ?
          <img src={logo} className="App-logo" alt="logo" />
          :
          this.state.postsData.map((post, index) => {
            return (
              <Post key={index} users={this.props.users} userId={post.userId} content={post.text} />
            );
          })
        }
      </Main>
    );
  }
}

export default Posts;
