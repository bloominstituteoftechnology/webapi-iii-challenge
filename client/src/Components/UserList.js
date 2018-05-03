import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class FriendsList extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
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
					.catch(error => console.log(` Error on ${error}`));
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div>
				<Link to="/adduser">Add User</Link>
				<h3 className="title">User</h3>
				<div className="container">
					{this.state.users.map(friend => {
						return (
							<div key={friend.id} className="riend">
								<button
									className="DeleteButton"
									id={friend.id}
									onClick={this.remove}
								/>
								<div className="friendItem">{friend.name}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/users')
			.then(response => this.setState({ users: response.data }))
			.catch(error => console.log(`You dun goofed: ${error}`));
	}
}