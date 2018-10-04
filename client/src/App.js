import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

// Components
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

// Styles
import styled from 'styled-components';

const AppDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	animation-name: fade-in-anim;
	animation-duration: 2s;
	animation-fill-mode: forwards;

	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 20px;

		h1 {
			font-size: 2rem;
		}
	}
`;

export default class App extends Component {
	state = {
		users: [],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/users`)
			.then(users => this.setState({
				users: users.data,
			}))
			.catch(err => console.log(err));
	}

	handleUserClick = id => {
		this.props.history.push(`/users/${ id }`);
	};

	render() {
		const { users } = this.state;
		return (
			<AppDiv>
				<header>
					<h1>Node Blog</h1>
					<div>
						<Link to = '/'>Home</Link>
					</div>
				</header>

				<Route exact path = '/' render = { () => <UserList users = { users } handleUserClick = { this.handleUserClick } />} />

				<Route path = '/users/:id' render = { props => <UserDetails id = { props.match.params.id } /> } />
			</AppDiv>
		);
	}
};
