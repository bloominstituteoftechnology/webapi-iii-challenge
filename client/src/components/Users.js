import React, { Component } from 'react';

class Users extends Component {
  state = { users: [] }
  URL = 'http://localhost:5000/api';
  
  componentDidMount() {
    axios.get(`${this.URL}/users`)
      .then(({ data }) => this.setState({ users: data }))
      .catch(err => console.error(err));
  }

  getUserPosts = id => {
    axios.get(`${this.URL}/users/${id}/posts`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  render () {
    return (
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
    );
  }
}

export default Users;
