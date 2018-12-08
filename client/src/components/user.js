import React from 'react';
import '../App.css';

const User = props => {
  return (
    <div className="users" onSubmit={props.submitHandler} onClick={() => props.getUserPosts(props.id)}><div className="user-data">
      <h4>{props.name}</h4>
      <strong>Id: {props.id} </strong><br />
      <strong>Click to view Posts</strong>
     
      <p></p></div>
      <div className="user-controls">
        <div className="close-button" onClick={() => props.closeUserHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.editUserHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteUserHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default User;

