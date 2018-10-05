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

export default class EditUser extends Component {
	state = {
		user: {
			id: '',
			name: '',
		},
	};

	handleInputChange = e => this.setState({ user: { ...this.state.user, name: e.target.value } });

	handleSubmit = e => {
		e.preventDefault();
		const updatedUser = {};
		updatedUser.name = this.state.user.name;

		const URL = 'http://localhost:5000';
		axios.put(`${ URL }/api/users/${ this.state.user.id }`, updatedUser)
			.then(users => this.props.handleNewUsers(users.data))
			.then(this.props.history.push('/'))
			.catch(err => console.log(err));
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/users/${ this.props.id }`)
			.then(user => this.setState({
				user: user.data,
			}))
			.catch(err => console.log(err));
	}

	render() {
		const { user } = this.state;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				Edit user's name:
				<input
					value = { user.name }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
