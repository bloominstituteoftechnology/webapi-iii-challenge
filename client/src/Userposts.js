import React, { Component } from 'react';
import axios from 'axios';

class Userposts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: []
		}
	}

componentDidMount() {
	this.gatherPosts();
	}
		
gatherPosts = () => {
	axios.get('http://localhost:5555/api/users/:id/posts')
		.then(response => {
			this.setState({ posts: response.data.posts })
		})
}

render() {
	return (
		<div>
			<ul>
				{this.state.posts.map(event => {
					return (
						<li key = {event.id}>{event.text}</li>
					);
				})}
			</ul>
		</div>
	);
}
}
export default Userposts;

