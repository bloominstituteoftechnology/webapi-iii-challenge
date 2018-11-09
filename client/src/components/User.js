import React from 'react'
import Post from './Post'
import {withRouter} from 'react-router-dom'

const User = props => {
    const {name, id} = props.user
    
    const routeToUser = ev => {
        ev.preventDefault();
      props.history.push(`/${id}`);
    };

    return (
        <div className="individualUser" onClick={ev => routeToUser(ev, id)}>
        <h1>{name}'s Section</h1>
        {props.posts.map(post => {
           return id === post.userId ? <Post key={post.id} post={post}/> : null
        })}
        </div>
    )
}

export default withRouter(User);