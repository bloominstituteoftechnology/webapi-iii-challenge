import React from 'react';
import '../App.css';

const User = props => {
  return (
    <div className="posts" onSubmit={props.submitHandler}><div className="post-data">
      <h4>{props.name}</h4>
      <strong>{props.id} </strong>
      
     
      <p></p></div>
      <div className="post-controls">
        <div className="close-button" onClick={() => props.closeHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.editHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default User;

