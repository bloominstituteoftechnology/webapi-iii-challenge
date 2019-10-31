import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';


const UserCard = props => {
    return(
        <Card>
            <h1>{props.name}</h1>
            <div>
                <PostCard key={props.id} props={props.user_id}/>
            </div>
        </Card>
    )
}

const Card = styled.div`
    border: 1px solid gray;
    width: 45%;
    min-width: 400px;
    background: white;
    height: 30%;
    overflow: hidden;
    padding: 5px;
    margin: 20px;
    text-align: left;
    margin: 10px auto;
`;

export default UserCard;