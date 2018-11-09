import React from 'react'
import User from './User'


const BlogListView = props => {
    return (
        <div className="userCont">
            {props.users.map(user => {
                return <User 
                key={user.id}
                user={user}
                posts={props.posts}
                
                />
            })}
            
        </div>
    )
}

export default BlogListView;