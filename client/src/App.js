import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import User from './User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log("App.js CDM '/api/users' res:",res.data);
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log("App.js CDM '/api/users' error:",err);
      });

    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        console.log("App.js CDM '/api/posts' res:",res.data);
        this.setState({ posts: res.data, loading: false });
      })
      .catch(err => {
        console.log("App.js CDM '/api/posts' error:",err);
      });
  }

  render() {
    const card = ({ id, name }) => {
      let postArr;
      let postTxt;
      if (!this.state.loading) {
        postArr = this.state.posts.filter(obj => obj.userId === id);
        postTxt = postArr[postArr.length - 1].text;
      }
      return (
        <article style={{width:"32rem"}} className="hidden ba mv4">
          <h1 className="f4 bg-near-black white mv0 pv2 ph3">{name}</h1>
          <div className="pa3 bt">
            <h5 className="mv2">Latest Post</h5>
            <p className="f6 f5-ns lh-copy measure mv0">
              { this.state.loading ? "Loading..." : postTxt }
            </p>
            <Link to={{
              pathname: `/user/${id}`,
              state: { name, postArr },
            }} style={{styleDecoration:"none",color:"black"}} className="b center mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">All Posts</Link>
          </div>
        </article>  
      );
    }
    return (
      <div className="App">
        <div className="header">
        </div>
        <Route exact path="/" render={() => {
          return (
          <div className="card-gallery flex flex-wrap justify-center">
            { this.state.users.map(userObj => card(userObj)) }
          </div>
          );
        }} />
        <Route path="/user/:id" render={(props) => <User {...props} />} />
      </div>
    );
  }
}

export default App;
