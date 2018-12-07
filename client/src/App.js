import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import DisplayUsers from './components/DisplayUsers';
import UserPosts from './components/UserPosts';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  align-items: center;

  h1{
    font-size: 3.2rem;
    margin: 20px 0;
  }
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      error: ''
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
    .then(users=>{
      this.setState({users: users.data, error: ''});
    })
    .catch(error=>{
      this.setState({error: 'Error retrieving users'})
    })
  }

  render() {
    return (
      <AppContainer>
        <h1>Node Blog</h1>
        {this.state.error ?
         <h2>{this.state.error}</h2> :
         null}
        
        <Route exact path="/" render={props=><DisplayUsers users={this.state.users}/>}/>
        <Route path="/:id" render={props=><UserPosts {...props}/>}/>
      </AppContainer>
    );
  }
}

export default App;
