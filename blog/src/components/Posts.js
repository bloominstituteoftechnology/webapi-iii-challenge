import React from 'react';
import styled from 'react-emotion'

const Posts = (props) => {

  const Container = styled(`div`)`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    
  `
  const Post = styled('div')`
    width: 30%;
    border: solid thin black;
    margin: 5px auto;
  `
   

  return (
    <Container>
      {props.posts.map(posts => {
        return (
          <Post key={posts.id}>
            
            <div>{posts.text}</div>
            <div>-{props.findUser(posts.userId)}</div>  
            
          </Post>
      )
      })}
    </Container>
  )
}
 
export default Posts;