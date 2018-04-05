import React, { Component } from 'react';
import axios from 'axios';

import Post from '../Post/Post';

class UserProfile extends Component {
    state = {
        user: {},
        posts: []
    }
    render() {
        return (
            <div>
                <h1>{this.state.user.name}</h1>
                {this.state.posts.map(post => {
                    return (
                    <div>
                        <h4>{post.text}</h4>
                    </div>
                    )
                })}
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