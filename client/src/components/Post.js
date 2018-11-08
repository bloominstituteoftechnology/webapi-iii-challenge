import React from 'react'

const Post = props => {
    return (
        <div >
        <section className="postsContainer">
        <strong>Post #{props.post.id}:</strong> <p>{props.post.text}</p>
        </section>
        </div>
    )
}

export default Post;