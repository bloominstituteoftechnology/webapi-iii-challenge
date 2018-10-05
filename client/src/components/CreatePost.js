import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const StyledForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	textarea {
		margin: 10px;
		border-radius: 5px;
		padding: 5px;
	}

	button {
		padding: 5px;
		border-radius: 5px;
		width: fit-content;

		&:hover {
			background-color: #444;
			color: white;
			cursor: pointer;
		}
	}
`;

export default class CreatePost extends Component {
	state = {
		text: '',
	};

	handleInputChange = e => this.setState({ text: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		const newPost = { text: this.state.text };

		const URL = 'http://localhost:5000';
		axios.post(`${ URL }/api/posts/${ this.props.id }`, newPost)
			.then(posts => this.props.history.push(`/users/${ this.props.id }`))
			.catch(err => console.log(err));
	};

	render() {
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				New Post:
				<textarea
					placeholder = 'Enter new post...'
					value = { this.state.text }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
