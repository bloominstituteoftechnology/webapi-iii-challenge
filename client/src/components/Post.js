import React from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <p className="postContent">{props.post.text}</p>
            <p className="postAuthor">By: {props.post.postedBy}</p>
        </div>
    )
}
 
export default Post;