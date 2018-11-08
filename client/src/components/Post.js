import React from 'react';

const Post = props => {
    return(
        <div>
            <p>{props.post.text}</p>
        </div>
    )
}

export default Post;