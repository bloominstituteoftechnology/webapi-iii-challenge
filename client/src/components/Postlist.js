import React from 'react';


function Postlist(props) {
  return (
    <div className='post-list'>
      {props.posts.map(post => (
        <div className='post'>
          <p className='title'>{post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Postlist;