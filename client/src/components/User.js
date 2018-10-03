import React from 'react';

// Styles
import styled from 'styled-components';

const UserDiv = styled.div`
	border: 1px solid black;
	width: 60%;
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	&:hover {
		background-color: #444;
		cursor: pointer;

		p {
			color: white;
		}
	}
`;

const User = props => {
	const { user, handleUserClick } = props;
	return(
		<UserDiv onClick = { () => handleUserClick(user.id) }>
			<p>ID: { user.id }</p>
			<p>Name: { user.name }</p>
		</UserDiv>
	);
}

export default User;
