import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddUser = props => {
	function handleSubmit(event) {
		event.preventDefault();
		const input = Array.from(event.target.querySelectorAll('input'));
		const newUser = {
			name: input[0].value,
		};
		axios
			.post(`http://localhost:5000/api/users`, newUser)
			.then(function(response) {
				props.history.push('/');
			})
			.catch(function(error) {
				console.log('error:', error);
			});
	}

	return (
		<div>
			<form className="TextField" onSubmit={handleSubmit}>
				<label>User</label>
				<input type="text" name="name" />
				<input type="submit" value="Submit" />
			</form>
			<div>
				<Link to="/">Return</Link>
			</div>
		</div>
	);
};