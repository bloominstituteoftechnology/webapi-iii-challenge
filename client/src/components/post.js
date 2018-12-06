import React from 'react';
import '../App.css';

const Post = props => {
  return (
    <div className="posts" onSubmit={props.submitHandler}><div className="post-data">
      <h4>Text: {props.text}</h4>
      <strong>UserId: {props.userId} </strong>
   
      <p></p></div>
      <div className="post-controls">
        <div className="close-button" onClick={() => props.closeHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.editHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default Post;


