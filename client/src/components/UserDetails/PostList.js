import React from 'react'
import Post from './Post';

const PostList = props => {
    const {posts} = props
    return (
        <div>
            {posts.map(post => <Post post={post} {...props}/>)}
        </div>
    )
}

export default PostList