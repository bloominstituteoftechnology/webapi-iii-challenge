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
                {/* formats tags to string list */}
                <p>{(this.state.post.tags) && this.state.post.tags.map((tag, index, tagsArray) => {
                    if (index === 0) {
                        return `tags: #${tag}`;
                    } else if (index === tagsArray.length - 1) {
                        return `#${tag}`;
                    } else {
                        return `#${tag}, `;
                    }
                })}</p>
            </Fragment>
        );
    }
}