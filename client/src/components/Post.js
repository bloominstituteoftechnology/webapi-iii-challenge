import React from 'react';

import { Link } from 'react-router-dom';

const Post = props => {
  const { name, id } = props.user;
  return (
    <Link to={`/user/${id}/posts`}>
      <div>
        <h1>{name}</h1>
      </div>
    </Link>
  );
};

export default Post;
