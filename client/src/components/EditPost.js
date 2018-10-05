import React, { Component } from 'react';
import axios from 'axios';

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
			<form onSubmit = { this.handleSubmit }>
				Edit Post:
				<input
					value = { post.text }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</form>
		);
	}
};
