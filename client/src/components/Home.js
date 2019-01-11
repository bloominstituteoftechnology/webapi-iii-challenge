import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`

`

export default function Home(props) {
    return (
        <HomeContainer>
            <Link to='/users'>Users</Link>
            <Link to="/posts">Posts</Link>
        </HomeContainer>
    );
}