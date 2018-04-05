import React from 'react';
import styled from 'styled-components';

import Wrapper from './AppPrimatives/Wrapper';
import BlogsListWrapper from './AppPrimatives/BlogsListWrapper';

import BlogsList from './BlogsList';

export default () => {
const Title = styled.h1`
  display: flex;
  justify-content: center;
  border-top: solid thick palevioletred;
  border-bottom: solid thick palevioletred;
  border-width: 10px;
  width: 100%;
  color: palevioletred;
  font-size: 10rem;
`

    return (
      <Wrapper>
        <Title> Hello World </Title>
        <BlogsListWrapper>
          <BlogsList />
        </BlogsListWrapper>  
      </Wrapper>
    );
  
}
