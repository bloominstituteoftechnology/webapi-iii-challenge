import React, { Component } from 'react';
import Axios from 'axios';

import Post from '../Post/Post';
import './PostFeed.css';

class PostFeed extends Component {
    state = {
        posts: []
    }
    render() {
        return (
            <div className='Content'>
                <h1 className='Content__heading'>Post Feed</h1>
                {this.state.posts.map(post => {
                    return <Post key={post.id} post={post}/>
                })}
            </div>
        );
    }

    componentDidMount() {
        Axios
            .get('http://localhost:5000/api/posts')
            .then(response => {
                this.setState({
                    posts: response.data
                })
            })
            .catch(error => console.log(error));
    }
}

export default PostFeed;