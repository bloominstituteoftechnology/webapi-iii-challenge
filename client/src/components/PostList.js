import React from 'react';
// Components import
import { Post } from '../components';

const PostList = props => {
  const { users } = props;
  return (
    <div>
      {users.map(user => {
        return <Post user={user} key={user.id} />;
      })}
    </div>
  );
};

export default PostList;
