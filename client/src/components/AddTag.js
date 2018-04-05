import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddTag = props => {
	function handleSubmit(event) {
		event.preventDefault();
		const input = Array.from(event.target.querySelectorAll('input'));
		const newUser = {
			tag: input[0].value,
		};
		axios
			.post(`http://localhost:5000/api/tags`, newUser)
			.then(function(response) {
				props.history.push('/tags');
			})
			.catch(function(error) {
				console.log('error:', error);
			});
	}

	return (
		<div>
			<form className="TextField" onSubmit={handleSubmit}>
				<label>New Tag:</label>
				<input type="text" name="name" />
				<input type="submit" value="Submit" />
			</form>
			<div>
				<Link to="/users">Return</Link>
			</div>
		</div>
	);
};
