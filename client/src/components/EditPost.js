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

export default class EditPost extends Component {
	state = {
		post: {
			text: '',
		},
	};

	handleInputChange = e => this.setState({ post: { text: e.target.value } });

	handleSubmit = e => {
		e.preventDefault();
		const updatedPost = {};
		updatedPost.text = this.state.post.text;
		
		const URL = 'http://localhost:5000';
		axios.put(`${ URL }/api/posts/${ this.props.id }`, updatedPost)
			.then(this.props.history.push('/'))
			.catch(err => console.log(err));
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/posts/${ this.props.id }`)
			.then(post => this.setState({
				post: post.data,
			}))
			.catch(err => console.log(err));
	};

	render() {
		const { post } = this.state;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				Edit Post:
				<textarea
					value = { post.text }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
