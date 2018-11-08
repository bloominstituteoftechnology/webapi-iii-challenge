import React from 'react';

const Post = props => {
  const { name } = props.user;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Post;
