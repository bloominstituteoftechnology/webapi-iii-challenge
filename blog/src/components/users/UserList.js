import React from 'react';
import {Link} from 'react-router-dom';

import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import styled from 'styled-components';

const Collection = styled.div`
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
`;

class UserList extends React.Component {
  state = {
    Users: [],
  }
  render() {
    return (
      <Collection className="UserList">
        <h2>List of Users</h2>
        <ListGroup>
        {this.state.Users.map(user => (
          <div key={user.id}>
              <ListGroupItem><Link to={`/api/users/${user.id}`}>{user.name}</Link></ListGroupItem>
          </div>
          ))}
          </ListGroup>
      </Collection>
    );
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/users`)
      .then(response => response.json())
      .then(data => this.setState({
        Users: data,
      }));
  }
}

export default UserList;