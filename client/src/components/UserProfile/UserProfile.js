import React, { Component } from 'react';
import axios from 'axios';

import Post from '../Post/Post';
import CreatePost from '../CreatePost/CreatePost';

class UserProfile extends Component {
    state = {
        user: {},
        posts: []
    }
    render() {
        return (
            <div className='Content'>
                <h1 className='Content__heading'>{this.state.user.name}</h1>
                {this.state.posts.map(post => {
                    return <Post className='Post' key={post.id} post={post} />
                })}
                <CreatePost user={this.state.user}/>
            </div>
        );
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios
            .get(`http://localhost:5000/api/users/${id}`)
            .then(response => {
                this.setState({
                    user: response.data
                });
            }).catch(error => {
                console.log(error.message);
            })
        axios.get(`http://localhost:5000/api/users/${id}/posts`)
        .then(response => {
            this.setState({
                posts: response.data
            });
        }).catch(error => {
            console.log(error.message);
        })
    }

}


export default UserProfile;