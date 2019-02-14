import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      userPosts: [],
    };
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:3333/api/users')
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.users);
    return (
      <div>
        {/* <Form
          onSubmit={null}
          style={{
            border: '1px solid grey',
            width: '800px',
            margin: '0 auto',
            padding: '20px 50px 0 50px',
          }}
        >
          <FormGroup row>
            <Label for="user" sm={2}>
              Title
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                placeholder="add a title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="content" sm={2}>
              Content
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="contents"
                placeholder="add content"
                value={this.state.contents}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup style={{ textAlign: 'center' }}>
            <Button type="submit">Add User</Button>
          </FormGroup>
        </Form> */}

        <h2 style={{ textAlign: 'center' }}>Users List</h2>

        <section className="usersContainer">
          {this.state.users.map(user => {
            return (
              <Link key={user.id} to={`/users/${user.id}`}>
                <ul>
                  <li>
                    <p>{user.name}</p>
                  </li>
                </ul>
              </Link>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Users;
