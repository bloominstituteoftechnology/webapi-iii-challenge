import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios'

import './App.css';
import User from './components/User'
import Posts from './components/Posts'

function App() {
  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      
  }, [])

  if(!users) return <div>Loading</div>



  return (
    <div className="App">
      <Route exact path='/' render={props => (
        <User {...props} setUsers={setUsers} users={users} /> )} />
      <Route path='/:id' render={props => (
        <Posts {...props} users={users} /> )} />
    </div>
  );
}

export default App;
