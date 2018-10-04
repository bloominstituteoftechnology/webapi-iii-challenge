import React from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const UserDetailsDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	background-color: #ddd;
	width: 200px;
	height: 200px;
	margin: 20px;
	box-shadow: 0 8px 16px 0 rgba(0,0,0,1);
	transition: 0.3s;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	animation-name: grow-anim;
	animation-duration: 1s;
	animation-fill-mode: forwards;

	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}

	p {
		text-align:center;
	}
`;

export default class UserDetails extends React.Component {
	state = {
		user: {},
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/users/${ this.props.id }`)
			.then(user => this.setState({
				user: user.data,
			}))
			.catch(err => console.log(err));
	};

	render() {
		const { user } = this.state;
		return(
			<UserDetailsDiv>
				<p>ID: { user.id }</p>
				<p>Name: { user.name }</p>
			</UserDetailsDiv>
		);
	}
};
