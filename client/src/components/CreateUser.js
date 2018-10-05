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

	input {
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

export default class CreateUser extends Component {
	state = {
		name: '',
	};

	handleInputChange = e => this.setState({ name: e.target.value });

	handleSubmit = e => {
		e.preventDefault();

		const URL = 'http://localhost:5000';
		axios.post(`${ URL }/api/users`, this.state)
			.then(users => this.props.handleNewUsers(users.data))
			.then(this.props.history.push('/'))
			.catch(err => console.log(err));
	}

	render() {
		const { name } = this.state;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				New User Name:
				<input
					placeholder = 'Enter new name...'
					value = { name }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
