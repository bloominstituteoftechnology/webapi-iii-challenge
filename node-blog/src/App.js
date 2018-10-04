import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  state = {
  }

  componentDidMount(){
    console.log('CDM')
    axios.get('http://localhost:5000/posts').then(res => {
      this.setState({
        posts: res.data,
      })
    }).catch(err => console.log(err))
    axios.get('http://localhost:5000/users').then(res => {
      this.setState({
        users: res.data,
      })
    }).catch(err => console.log(err))
  }

  getUsername = (userId) => {
    console.log(userId)
    let name = this.state.users.filter(user =>
       user.id === userId)
    console.log(name)
    return name.name;
  }

  render() {
    console.log(this.state.users)
    return (
      <AppDiv>
        {(this.state.posts) && (this.state.users) ?
          (<div className="app">
            {this.state.posts.map(post => {
              return (
                <div key={post.id} className="post">
                  <p>userId: {post.userId}</p>

                  <p>name:
                    {(post.userId) = this.getUsername(post.userId)}
                  </p>

                  <p>text: {post.text}</p>
                  <p>postId: {post.id}</p>
                </div>
              )
            })}
          </div>) :
          (<div>loading</div>)
        }
      </AppDiv>
    )
  }
}

export default App;


const AppDiv = styled.div`
  border: 1px solid black;
  max-width: 1000px;
  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border: 4px solid blue;
    .post{
      border: 1px solid red;
      width: 400px;
      margin: 5px;
      padding: 10px;
    }
  }
`;
