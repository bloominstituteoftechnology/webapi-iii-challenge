import React, { Component } from 'react';
import { EventEmitter } from '../events';

class User extends Component {
	constructor(props) {
    super(props);
    this.state = {
    editingId: '',
    editedName: '',
    };
  }
 
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editUser = (id, name) => {
    this.setState({
      editingId: id,
      editedName: name,
    })
  }

  submitEdit = event => {
    event.preventDefault();
    const { editingId, editedName } = this.state;
    let editedUser = { id: editingId, name: editedName }
    EventEmitter.dispatch('updateUser', editedUser)
    this.setState({
      editingId: '',
      editedName: ''
    })
  }

  render() {
    const { id, name } = this.props.user;
    const { editingId, editedName } = this.state;
    return (
      <div className="user">
        <h3 className='name'>{name}</h3>
        <div className='user-btns'>
          <div 
            className='user-btn' 
            id={id} 
            onClick={() => this.editUser(id, name)}>
            Edit
          </div>
          <div 
            className='user-btn'  
            onClick={() => EventEmitter.dispatch('deleteUser', id)}>
            Delete
          </div>
        </div>
        <div className={editingId === id ? 'editing-form' : 'hidden'}>
          <form onSubmit={this.submitEdit}>
            <input
                className='edit-input'
                onChange={this.handleChange}
                placeholder="Name"
                value={editedName}
                name="editedName"
                required
            />
            <input className='submit-edit' type="submit" value="Submit Edits"/>
          </form>
        </div>
      </div>
    )
  }
};

export default User;