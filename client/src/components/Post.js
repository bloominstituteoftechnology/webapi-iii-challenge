import React from 'react';


const Post = props => {
  return (
    <div className='post'>
    <h4>{props.post.text}</h4>
    </div>
  )
}
export default Post;
