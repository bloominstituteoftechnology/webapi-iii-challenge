import React from 'react';

const Post = props => {
  return (
    <ul>
      <li>
        <p>{props.post.text}</p>
      </li>
    </ul>
  );
};

export default Post;
