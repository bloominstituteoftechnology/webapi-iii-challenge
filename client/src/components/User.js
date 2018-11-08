import React from 'react'
import Post from './Post'

const User = props => {
    const {name, id} = props.user
    return (
        <div className="individualUser">
        <h1>{name}'s Section</h1>
        {props.posts.map(post => {
           return id === post.userId ? <Post key={post.id} post={post} user={props.user}/> : null
        })}
        </div>
    )
}

export default User;