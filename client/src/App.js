import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      users: [], 
      user: { name: 'loading...', id: -1}, 
      posts: [{ text: 'Currently loading...', id: -1 }],
      tags: [ { tag: 'Loading...' } ]
    };
  }

  URL = 'http://localhost:5000/api';

  componentDidMount() {
    axios.get(`${this.URL}/users`)
      .then(({ data }) => this.setState({ users: data }))
      .catch(err => console.error(err));
  }

  getUserPosts = (id) => {
    axios.get(`${this.URL}/users/${id}/posts`)
      .then(({ data }) => {
        this.setState({ posts: data, user: this.state.users.find(user => user.id === id) })
      })
      .catch(err => console.error(err));
  };

  getPostTags = (id) => {
    axios.get(`${this.URL}/posts/${id}/tags`)
      .then(({ data }) => this.setState({ tags: data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Blog</h1>
        </header>

        <Route exact path="/" render={() => (
          <div className="users">
            {this.state.users.map(user => {
              const { id, name } = user;
              return (
                <div className="user" key={id}>
                  <h3>
                    <Link 
                      to={`/users/${id}`} 
                      onClick={() => this.getUserPosts(id)}
                    >
                    {name}
                    </Link>
                  </h3>
                </div>
              );
            })}
          </div>
        )} />

        <Route exact path="/users/:id" render={() => (
          <div>
            <div className="users">
              <div className="user" key={this.state.users.id}>
                <h3>{this.state.user.name}</h3>
              </div>
            </div>
            <div className="posts">
              {this.state.posts.map(post => {
                const { id, text } = post;
                return (
                  <div className="post" key={id}>
                    <p>
                      <Link 
                        to={`/users/${this.state.user.id}/${id}`}
                        onClick={() => this.getPostTags(id)}
                      >
                        {text}
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )} />

      <Route path="/users/:id/:postId" render={() => (
        <div className="tags">
          <br />
          <h3>Tags for post</h3>
          {this.state.tags.map((tag, ind) => (
            <div key={ind}>
              <span>
                {tag.tag}
              </span>
              &emsp;
            </div>
          ))}
        </div>
      )} />
        
      </div>
    );
  }
}

export default App;
