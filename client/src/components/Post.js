import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:6001/api/posts/${this.props.post.id}/tags`)
            .then(response => {
                this.setState({tags: response.data})
            })
    }

    render() {
            return (
                <div>
                    <p>Post ID: {this.props.post.id}</p>
                    <p>Text: {this.props.post.text}</p>
                    Tags: {this.state.tags.map(tag => <p>{tag.tag}</p>)}
                    <hr/>
                </div>
            )
    }
}

export default Post;