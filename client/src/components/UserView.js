import React from 'react';
import {withRouter} from 'react-router-dom';

const UserView = (props) => {
    return (
        <div onClick={() => props.history.push(`/posts/${props.id}`)}>
            <p>{props.user}</p>
        </div>
    )
}

export default withRouter(UserView);