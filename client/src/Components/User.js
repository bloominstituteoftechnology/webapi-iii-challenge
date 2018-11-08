import React from 'react';
import {Link} from 'react-router-dom';
import './Style.css'


const User = (props) => {
    return (
        <div className = "user-div">  
            <Link to = {`/users/${props.user.id}/posts/`} className = "no-decoration">
                    <h3>{props.user.name}</h3> 
            </Link>
        </div>
    )
}

export default User;