import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class PostList extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
	}
	remove = event => {
		axios
			.delete('http://localhost:5000/api/users', {
				params: { id: event.target.id },
			})
			.then(function(response) {
				axios
					.get('http://localhost:5000/api/users')
					.then(response => console.log(response))
					.catch(error => console.log(`Error on ${error}`));
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	render() {
		return (
			<div>
				<Link to="/addpost">Add Post</Link>
				<h3 className="title">Posts</h3>
				<div className="container">
					{this.state.posts.map((post, index) => {
						return (
							<div key={index} className="post">
								<button
									className="DeleteButton"
									id={post.id}
									onClick={this.remove}
								/>
								<div className="friend">{post.text}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/api/posts')
			.then(response => this.setState({ posts: response.data }))
			.catch(error => console.log(`Error on ${error}`));
	}
}