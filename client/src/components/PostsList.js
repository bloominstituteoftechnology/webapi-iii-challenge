import React from 'react';
import Post from './Post';


const PostsList = props => {
  return (
    <div className='posts-list'>
      {props.posts.map(post =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}
export default PostsList;
