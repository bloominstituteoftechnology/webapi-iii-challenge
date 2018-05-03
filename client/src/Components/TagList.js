import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TagList extends Component {
	constructor() {
		super();
		this.state = {
			tags: [],
		};
	}

	remove = event => {
		axios
			.delete('http://localhost:5000/api/tags', {
				params: { id: event.target.id },
			})
			.then(function(response) {
				axios
					.get('http://localhost:5000/api/tags')
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
				<Link to="/addtag">Add Tag</Link>
				<h3 className="title">Tag</h3>
				<div className="container">
					{this.state.tags.map(tag => {
						return (
							<div key={tag.id} className="friend">
								<button
									className="DeleteButton"
									id={tag.id}
									onClick={this.remove}
								/>
								<div className="frienditem">{tag.tag}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/tags')
			.then(response => this.setState({ tags: response.data }))
			.catch(error => console.log(`Error on ${error}`));
	}
}