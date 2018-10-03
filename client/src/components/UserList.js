import React from 'react';

// Components
import User from './User';

// Styles
import styled from 'styled-components';

const UserListDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const UserList = props => {
	const { users, handleUserClick } = props;
	return(
		<UserListDiv>
			{ users.map((user, i) => <User key = { i } user = { user } handleUserClick = { handleUserClick } />) }
		</UserListDiv>
	);
};

export default UserList;
