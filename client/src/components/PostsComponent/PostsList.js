import React from 'react';
import Post from './Post';

const PostsList = (props) => {
    return(
        <div className="posts-list">
            {props.posts.map(post => {
                return(
                    <Post content={post.text}/>
                );
            })}
        </div>
    );
}
export default PostsList;