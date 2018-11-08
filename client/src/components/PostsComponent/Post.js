import React from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <p>{props.content}</p>
        </div>
    );
}
export default Post;