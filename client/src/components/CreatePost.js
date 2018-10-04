import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
	state = {
		text: '',
	};

	handleInputChange = e => this.setState({ text: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		const newPost = { text: this.state.text };

		// axios.put();
	};

	render() {
		return(
			<form onSubmit = { this.handleSubmit }>
				New Post:
				<textarea
					placeholder = 'Enter new post...'
					value = { this.state.text }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</form>
		);
	}
};
