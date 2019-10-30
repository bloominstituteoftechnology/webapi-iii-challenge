import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';


export default UserCard = props => {
    return(
        <Card>
            <h1>{props.name}</h1>
            <div>
                <PostCard key={id} />
            </div>
        </Card>
    )
}

const Card = styled.div`
    border: 1px solid gray;
    width: 45%;
    height: 30%;
    overflow: hidden;
    padding: 5px;
    margin: 20px;
    h1{
        background: black;
        color: white;
    }
`;