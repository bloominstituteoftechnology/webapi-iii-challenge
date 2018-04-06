import React, { Component } from 'react';
import axios from 'axios';

import './Edit.css';

class Edit extends Component {
    state = {
        text: '',
    }
    render() {
        return (
            <div className="Content">
                <h1 className="Content__heading">Edit Post</h1>
                <form className="Create" onSubmit={() => this.handleSubmit()}>
                    <input className="Create__text" value={this.state.text} onChange={this.handleChange.bind(this)} />
                </form>
            </div>
        );
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios
            .get(`http://localhost:5000/api/posts/${id}`)
            .then(response => {
                const post = response.data;

                this.setState({
                    id,
                    text: post.text
                });
            }).catch(error => {
                console.log(error);
            })
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
        })
    }

    handleSubmit() {
        axios
            .put(`http://localhost:5000/api/posts/${this.state.id}`, {
                text: this.state.text,
            })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
}

export default Edit;