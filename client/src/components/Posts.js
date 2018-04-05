import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Posts.css';

export default class ListView extends Component {
  state = {
    posts: [],
    users: [],
    tags: [],
    search: ''
  };

  updateSearch = e => {
    if (e.target.value.length < this.state.search.length) {
      this.getPosts();
      // this.filterAndChange(); // How to refilter at current value?
    }
    this.setState({ search: e.target.value });
    this.filterAndChange();
  };

  //filters the state to match values for onChange event

  filterAndChange = () => {
    let filterposts = this.state.posts.filter(post => {
      if (
        post.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        // || post.userId.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        //   -1
      ) {
        return true;
      }
    });
    this.setState({ posts: filterposts });
  };

  getPosts = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting posts: ${error}`);
      });
  };

  getUsers = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting users: ${error}`);
      });
  };

  getTags = () => {
    axios
      .get('http://localhost:5000/api/tags')
      .then(response => {
        this.setState({ tags: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting tags: ${error}`);
      });
  };

  componentDidMount = () => {
    this.getPosts();
    this.getUsers();
    this.getTags();
  };

  render() {
    console.log(this.state.posts);
    return (
      <div className="container">
        <div className="d-flex align-items-baseline mb-3">
          <h4>Posts:</h4>
          <nav className="navbar navbar-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Posts"
                aria-label="Search"
                value={this.state.search}
                onChange={this.updateSearch}
              />
              <button className="btn my-2 my-sm-0 search-button" type="submit">
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="row">
          {this.state.posts.map(post => {
            return (
              <div className="col-lg-4 col-md-8 col-sm-12" key={post.id}>
                <Link
                  to={`/postview/${post.id}`}
                  style={{ textDecoration: 'none' }}
                  className="card"
                >
                  <div className="card-block">
                    <h5 className="text-truncate card-title">{post.text}</h5>
                    {this.state.users.map(user => {
                      if (user.id === post.userId) {
                        return (
                          <h6 className="text-truncate card-text">
                            <strong>{user.name}</strong>
                          </h6>
                        );
                      }
                    })}
                    {this.state.tags.map(tag => {
                      if (tag.id === post.id) {
                        return (
                          <p className="text-truncate card-text">{tag.tag}</p>
                        );
                      }
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
