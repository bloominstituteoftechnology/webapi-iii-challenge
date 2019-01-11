import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/posts/${this.props.match.params.id}`)
            .then(({data}) => {
                this.setState({
                    post: data
                })
            })
            .catch(console.log)
    }

    render() {
        return (
            <Fragment>
                <p>posted by: {this.state.post.postedBy}</p>
                <p>{this.state.post.text}</p>
                {(this.state.post.tags) &&
                    this.state.post.tags.map((tag, index) => (
                        <p key={index}>#{tag}</p>
                    ))
                }
            </Fragment>
        );
    }
}