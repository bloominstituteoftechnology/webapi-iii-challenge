import React from 'react'



const Post = props => {
    const {text, postedBy, id} = props.post
    const deletePost = () => {
        props.deletePost(id)
    }   
    return(
        <div>
            <p>{text}</p>
            <h6>By: {postedBy}</h6>
            <input/>
            <button>Update</button>
            <button onClick={deletePost}>Delete</button>
        </div>
        

    )
}
export default Post