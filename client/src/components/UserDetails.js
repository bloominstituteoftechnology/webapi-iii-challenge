import React from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const UserDetailsDiv = styled.div`
	border: 1px solid black;
	width: 60%;
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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
