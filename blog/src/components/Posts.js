import React from 'react';

const Posts = (props) => {
  return (
    <div>
      {props.posts.map(posts => {
        return (
          <div key={posts.id}>
            <div>{posts.text}</div>
            <div>{props.findUser(posts.userId)}</div>
            
          </div>
      )
      })}
    </div>
  )
}
 
export default Posts;