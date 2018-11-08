import React from "react";

const PostPage = props => {
    if (props.posts.length) {
        let post = props.posts.find(post => `${post.id}` === props.match.params.id);

        return (
            <div className="post-page">
                <h2 className="post-username">{post.postedBy}</h2>
                <div className="note-body">{post.text}</div>
            </div>
        );
    } else {
        return <p>Loading...</p>
    }

};

export default PostPage;
