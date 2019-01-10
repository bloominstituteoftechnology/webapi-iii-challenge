import React, { Component } from 'react';
import axios from 'axios';

export default class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    changeHandler = e => {
        this.setState({
            ...this.state,
            text: e.target.value
        });
    }

    submitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/posts`, {
            "userId": this.props.match.params.id,
            "text": this.state.text
        })
            .then(console.log('success'))
            .catch(console.log)
    }

    render() {
        return (
            <form onSubmit={() => this.submitHandler}>
                <input 
                    onChange={this.changeHandler}
                    type='text'
                    value={this.state.text}
                    placeholder='Write your post here.'
                />
                <button type='submit'>Submit</button>
            </form>
        );
    }
}