import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PostsList extends Component {
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
					.catch(error => console.log(`You dun goofed: ${error}`));
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div>
				<Link to="/addpost">Add Post</Link>
				<h3 className="FriendsList__Title">Look at all these Posts!</h3>
				<div className="FriendsList__container">
					{this.state.posts.map((post, index) => {
						return (
							<div key={index} className="Posts__post">
								<button
									className="DeleteButton"
									id={post.id}
									onClick={this.remove}
								/>
								<div className="FriendsList__friendItem">{post.text}</div>
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
			.catch(error => console.log(`You dun goofed: ${error}`));
	}
}
