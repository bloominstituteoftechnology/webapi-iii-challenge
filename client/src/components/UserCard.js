import React from 'react';
import { Link } from 'react-router-dom';
import user_img from '../user_img.png';

const UserCard = (props) => {
    return (
        <div className="userCard">
            <img src={user_img} className="userImg" alt="photo of user"/>
            <p className="userName">{props.user.name}</p>
            <Link to={{
                pathname: `/users/${props.user.id}/posts`,
                state: { id: props.user.id }
            }}><button className="btn">Follow</button></Link>
        </div>
    )
}
 
export default UserCard;