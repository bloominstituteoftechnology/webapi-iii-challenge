import React, { Component } from 'react';
import axios from 'axios';

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
			<form onSubmit = { this.handleSubmit }>
				Edit user's name:
				<input
					value = { user.name }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</form>
		);
	}
};
