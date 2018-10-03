import React from 'react';

const Post = (props) => {
        return(
            <div>
                <div>
                <h1>{props.text}</h1>
                <p>{props.contents}</p>
                </div>
            </div>
        )
}

export default Post;