import React, { Component } from 'react';
import axios from 'axios';

// Components
import UserList from './components/UserList';

// Styles
import styled from 'styled-components';

const AppDiv = styled.div`
	header {
		display: flex;
		justify-content: center;

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

	render() {
		return (
			<AppDiv>
				<header>
					<h1>Node Blog</h1>
				</header>

				<UserList users = { this.state.users } />
			</AppDiv>
		);
	}
};
