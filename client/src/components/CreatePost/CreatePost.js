import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    state = {
        text: '',
    }
    render() {
        return (
            <div>
                <h3>Create Post for {this.props.user.name}</h3>
                <form onSubmit={() => this.handleSubmit() }>
                    <input onChange={this.handleChange.bind(this)} />
                </form>
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
        });
        console.log(this.state.text);
    }

    handleSubmit() {
        axios
            .post(`http://localhost:5000/api/posts/`, {
                userId: this.props.user.id,
                text: this.state.text,
            })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
}

export default CreatePost;