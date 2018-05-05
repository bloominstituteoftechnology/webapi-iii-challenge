import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showUpdateUserForm: false,
      name: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getUser(id);
  }

  getUser = id => {
    axios
      .get(`http://localhost:5000/api/users`)
      .then(res => {
        this.setState({ user: res.data[id - 1] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateUser = userId => {
    const user = {};
    if (this.state.name !== '') {
      user.name = this.state.name;
    }
    axios
      .put(`http://localhost:5000/api/users/${userId}`, user)
      .then(res => {
        this.setState({
          showUpdateUserForm: false,
          name: '',
        });
        this.props.getUsers();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteUser = userId => {
    axios
      .delete(`http://localhost:5000/api/users/${userId}`)
      .then(res => {
        window.location = 'http://localhost:3000/users';
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEditUser = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showUpdateUserForm = () => {
    this.setState({ showUpdateUserForm: !this.state.showUpdateUserForm });
  };

  render() {
    if (!this.state.user) {
      return (
        <div>
          <Container className="userContainer">
            <Row className="usersRow">
              <Col sm="12">
                <Card body>
                  <CardTitle>No User found!</CardTitle>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    const { id, name } = this.state.user;
    return (
      <div>
        <Container className="userContainer">
          <Row className="usersRow">
            <Col sm="12">
              <Card body>
                <CardTitle>Name: {name}</CardTitle>
                <div className="editUser">
                  <Button
                    color="warning"
                    className="editUserButton"
                    onClick={this.showUpdateUserForm}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    className="editUserButton"
                    onClick={() => this.deleteUser(id)}
                  >
                    Delete
                  </Button>
                </div>
                {this.state.showUpdateUserForm ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleEditUser}
                      placeholder="name"
                      name="name"
                      value={this.state.name}
                    />
                    <button onClick={() => this.updateUser(id)}>
                      Save User
                    </button>
                  </div>
                ) : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default User;
