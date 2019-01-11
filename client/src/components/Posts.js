import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/posts')
            .then(({ data }) => {
                this.setState({
                    posts: data
                });
            })
            .catch(console.log);
    }

    deletePost = () => {
        axios.get()
    }

    render() {
        return (
            <Fragment>
                {this.state.posts.map(post => (
                    <Fragment onClick={() => {this.props.history.push(`/post/${post.id}/edit`)}} key={post.id}>
                        <p>{post.text}</p><p onClick={() => this.deletePost}>delete</p>
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}