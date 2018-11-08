import React from 'react';
import axios from 'axios';
import Card from './Card';

class Cards extends React.Component {
	constructor() {
		super();
		this.state = {
			users: []
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:9000/api/user/')
			.then((res) => {
				console.log(res);
				this.setState({ users: res.data });
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { users } = this.state;
		return (
			<div>
				<Card users={users} />
			</div>
		);
	}
}

export default Cards;
