import React from 'react';

const UserCard = props => {
    return (
        <div className='user-container'>
            <p><strong>{props.user.name}</strong></p>
            {props.posts ? props.posts.map(post => <p key={post.id}>{post.text}</p>) : null}
        </div>
    );
}

export default UserCard;