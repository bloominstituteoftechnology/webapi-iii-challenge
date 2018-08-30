import React from 'react';

const PostCard = ({ text, postedBy }) => {
  return(
    <div className="post-card">
      <p>{postedBy}</p>
      <p>{text}</p>
    </div>
  );
}

export default PostCard;
