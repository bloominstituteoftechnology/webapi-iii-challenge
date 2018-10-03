import React, { Fragment } from 'react';
import styled from "styled-components";


const Article = styled.article`
  width: 45%;
  margin-top: 25px;
  padding: 15px;
  border: solid 1.5px #61DAFB;
  border-radius: 10px;
  background-color: rgba(34, 34, 34, .9);

  .author-name {
    font-weight: bold;
    color: #61DAFB;
  }

  .blog-content {
    color: white;
  }
`;


// filters users to match userId
const Post = props => {
  let filteredUser = props.users.filter(
    user => user.id === props.userId
  )
  return (
    <Fragment>
      {filteredUser.length > 0 ?
        <Article>
          <span className="author-name">{`Author: ${filteredUser[0].name}`}</span>
          <p className="blog-content">{props.content}</p>
        </Article>
        :
        <Article>
          <span className="author-name">{`Author: Guest`}</span>
          <p className="blog-content">{props.content}</p>
        </Article>
      }
    </Fragment>
  );
}

export default Post;
