import React, { Component } from 'react';
import { EventEmitter } from '../events';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  addUser = event => {
    event.preventDefault();
    const { name } = this.state;
    let newUser = { name }
    EventEmitter.dispatch('addUser', newUser);
    this.setState({
      name: ''
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="add-user">
        <form className='add-form' onSubmit={this.addUser}>Add User:
          <input
            className='input-add'
            onChange={this.handleInputChange}
            placeholder="Name"
            value={this.state.name}
            name="name"
          />
          <button className='submit-add' type="submit">Submit User</button>
        </form>
      </div>
    );
  }
}

export default AddUser;