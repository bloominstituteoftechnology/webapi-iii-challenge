import React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';
import CardBody from './AppPrimatives/CardBody';

import './AppPrimatives/CardBody.css';

const Card = props => {





    return (
        <CardBody className="hvr-shutter-out-horizontal" onClick={()=> props.history.push(`/posts/${props.id}`) }>
           <p>{props.user} </p>
    

        </CardBody>        
    )
}

export default withRouter(Card);