import React from 'react'
import Post from './Post';
import styled from 'react-emotion'

const PostList = props => {
    const {posts} = props
    return (
        <StyledPostListWrapper>
            {posts.map(post => <Post post={post} {...props}/>)}
        </StyledPostListWrapper>
    )
}

export default PostList

const StyledPostListWrapper = styled('div')`
width: 400px;
`