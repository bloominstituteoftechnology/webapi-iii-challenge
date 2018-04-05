import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddPost = props => {
	function handleSubmit(event) {
		event.preventDefault();
		const input = Array.from(event.target.querySelectorAll('input'));
		const newUser = {
			userId: input[0].value,
			text: input[1].value,
		};
		axios
			.post(`http://localhost:5000/api/posts`, newUser)
			.then(function(response) {
				props.history.push('/posts');
			})
			.catch(function(error) {
				console.log('error:', error);
			});
	}

	return (
		<div>
			<form className="TextField" onSubmit={handleSubmit}>
				<label>New Post:</label>
				<input type="text" name="userid" />
				<input type="text" name="text" />
				<input type="submit" value="Submit" />
			</form>
			<div>
				<Link to="/users">Return</Link>
			</div>
		</div>
	);
};
