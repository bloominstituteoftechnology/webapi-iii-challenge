import React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';
import CardBody from './AppPrimatives/CardBody';

import './AppPrimatives/CardBody.css';

const Card = props => {

const Title = styled.p` 
    font-size: 3rem;
    font-weight: 900;
    color: palevioletred;

`

    return (
        <CardBody className="hvr-shutter-out-horizontal" onClick={()=> props.history.push(`/posts/${props.id}`) }>
           <Title>{props.user} </Title>
    

        </CardBody>        
    )
}

export default withRouter(Card);