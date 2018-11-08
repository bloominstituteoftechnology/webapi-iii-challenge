import React from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    return (
        <div className="post">
            <Link to={`/api/posts/${props.post.id}`}><p>{props.post.text}</p></Link>
        </div>
    );
}
export default Post;