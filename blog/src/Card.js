import React from 'react';
import styled from 'styled-components';

import CardBody from './AppPrimatives/CardBody';

const Card = props => {

const Title = styled.p` 
    font-size: 3rem;
    font-weight: 900;

`

    return (
        <CardBody>
           <Title>{props.user} </Title>
    

        </CardBody>        
    )
}

export default Card;