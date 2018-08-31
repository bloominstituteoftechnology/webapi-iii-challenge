import React from 'react';
import {withRouter} from 'react-router-dom';

const UserView = (props) => {
    return (
        <a onClick={() => props.history.push(`/posts/${props.id}`)}>
            <p>{props.user}</p>
        </a>
    )
}

export default withRouter(UserView);