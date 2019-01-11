import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class UserPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/user/${this.props.match.params.id}/posts`)
            .then(({ data }) => {
                this.setState({
                    posts: data
                });
            })
            .catch(err => console.log(err));
    }

    deletePost = () => {
        console.log('will delete soon');
    }

    render() {
        return (
            <Fragment>
                {(this.state.posts.length) && (<p>posted by: {this.state.posts[0].postedBy}</p>)}
                {this.state.posts.map(post => (
                    <Fragment key={post.id}>
                        <p onClick={() => this.props.history.push(`/post/${post.id}`)}>{post.text}</p>
                        <p onClick={this.deletePost}>delete</p>
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}