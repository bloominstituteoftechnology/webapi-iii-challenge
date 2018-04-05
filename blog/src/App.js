import React from 'react';
import styled from 'styled-components';

import Wrapper from './AppPrimatives/Wrapper';

export default () => {
const Title = styled.h1`
  display: flex;
  justify-content: center;
  border-top: solid thick palevioletred;
  border-bottom: solid thick palevioletred;
  border-width: 10px;
  color: palevioletred;
  font-size: 10rem;
`

    return (
      <Wrapper>
        <Title> Hello World </Title>
      </Wrapper>
    );
  
}
