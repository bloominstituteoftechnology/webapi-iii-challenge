import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Post = () => {
    return (
        <div>
            <h5>{this.props.post.text}</h5>
        </div>
    )
}

export default Post;