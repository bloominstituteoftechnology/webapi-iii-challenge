import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Post = (props) => {
    const deletePost = (id) => {
        axios
            .delete(`http://localhost:5000/api/posts/${id}`)
            .then(response => {
                console.log({...response});
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='Post'>
            <h5>{props.post.text}</h5>
            <Link to={`/edit/${props.post.id}`}>
                <h5>edit</h5>
            </Link>
            <button onClick={() => deletePost(props.post.id)}>Delete</button>
        </div>
    )
}

export default Post;