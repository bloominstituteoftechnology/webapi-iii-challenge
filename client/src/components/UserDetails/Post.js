import React from 'react'

const Post = props => {
    const {text, postedBy, id} = props.post

    return(
        <div>
            <p>{text}</p>
            <h6>By: {postedBy}</h6>
        </div>
        

    )
}
export default Post