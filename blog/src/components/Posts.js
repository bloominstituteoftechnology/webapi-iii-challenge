import React, { Component } from "react";

import Post from "./Post";

import styled from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const PostContainer = styled.div`
  flex: 0 1 20%;
  min-width: 300px;
  height: 300px;
  background-color: rgb(250, 233, 91);
  border: 0;
  border-radius: 0px;
  box-shadow: 5px 10px rgb(0, 0, 0, 0.12);
  cursor: pointer;
  margin: 10px;
  padding: 15px;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  color: rgb(184, 167, 204);
`;

class Posts extends Component {
  render() {
    return (
      <div>
        <PostsContainer>
          {this.props.posts.map(post => {
            return (
              <PostContainer>
                <Post text={post.text} />
              </PostContainer>
            );
          })}
        </PostsContainer>
      </div>
    );
  }
}

export default Posts;
