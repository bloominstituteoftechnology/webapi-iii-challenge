import React from "react";
import { Link } from "react-router-dom";

const PostList = (props) => {
        return (
            <div className="post-list">
              {props.posts.map(post => {
                let user = props.users.filter(user => user.id === post.userId)[0].name;
                return (
                  <div key={post.id} className="post">
                    <Link to={`/users/${user}`}><h4>{user}</h4></Link>
                    <p>{post.text}</p>
                  </div>
                );
              })}
            </div>
        );
}

export default PostList;