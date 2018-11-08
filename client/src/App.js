import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import styled from "styled-components";

const Posts = styled.div`
 width: 200px;
 height: 150px;
 border: 3px solid palevioletred;
 text-align: center;
 font-size: 14px;
 margin: 15px 10px;
 overflow: scroll;
`
const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  border: 2px solid palevioletred;
  margin: 0 auto;
`
const Header = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: palegoldenrod;
`

class App extends Component {
  constructor() {
    super() 
    this.state = {
      users: [],
      posts: [],
    }
  }
  componentDidMount() {
    axios
    .get('http://localhost:7412/api/users')
    .then(res => {
      this.setState({users: res.data})
    })
    axios
    .get('http://localhost:7412/api/posts')
    .then(res => {
      this.setState({posts: res.data})
    })
  }
  render() {
    return (
      <>
      <Header>Posts & Users</Header>
      <Container>
          {!this.state.posts ? <h3>Loading</h3> : this.state.posts.map(post => (
            <Posts><h4>{post.text}</h4></Posts>
          ))}
          
          {!this.state.users ? <h3>Loading</h3> : this.state.users.map(user => (
            <Posts><h4>{user.name}</h4></Posts>
          ))}
          </Container>
          </>
      
    );
  }
}

export default App;
