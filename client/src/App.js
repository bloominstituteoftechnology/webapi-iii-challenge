import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

// Components
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import CreatePost from './components/CreatePost';

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
		margin: 20px 0;

		h1 {
			font-size: 2rem;
		}

		.links {
			margin-top: 10px;

			a {
				border: 1px solid black;
				border-radius: 5px;
				padding: 5px 10px;
				text-decoration: none;
				color: black;
				margin: 5px;

				&:hover {
					background-color: #444;
					color: white;
				}
			}
		}
	}
`;

export default class App extends Component {
	state = {
		users: [
			{
				id: '',
				name: '',
			},
		],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/users`)
			.then(users => this.setState({
				users: users.data,
			}))
			.catch(err => console.log(err));
	}

	handleUserPosts = (e, id) => {
		e.preventDefault();
		this.props.history.push(`/users/${ id }`);
	};

	handleDeleteUser = (e, id) => {
		e.preventDefault();
		const URL = 'http://localhost:5000';
		axios.delete(`${ URL }/api/users/${ id }`)
			.then(del => {
				axios.get(`${ URL }/api/users`)
					.then(users => this.setState({
						users: users.data,
					}))
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
		
	};

	handleNewUsers = users => this.setState({ users: users });

	render() {
		const { users } = this.state;
		return (
			<AppDiv>
				<header>
					<h1>Node Blog</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = '/create'>Create New User</Link>
					</div>
				</header>

				<Route exact path = '/' render = { props => <UserList history = { props.history } users = { users } handleUserPosts = { this.handleUserPosts } handleDeleteUser = { this.handleDeleteUser } />} />

				<Route path = '/users/:id' render = { props => <UserPosts history = { props.history } name = { users.find(user => {return user.id === Number(props.match.params.id)}).name } id = { props.match.params.id } /> } />

				<Route exact path = '/create' render = { props => <CreateUser history = { props.history } handleNewUsers = { this.handleNewUsers } /> } />

				<Route path = '/edit/:id' render = { props => <EditUser history = { props.history } handleNewUsers = { this.handleNewUsers } id = { props.match.params.id } /> } />

				<Route path = '/create/:id' render = { props => <CreatePost history = { props.history } id = { props.match.params.id } /> } />
			</AppDiv>
		);
	}
};
