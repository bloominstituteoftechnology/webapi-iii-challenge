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
	const { users, handleUserPosts, handleDeleteUser, history } = props;
	return(
		<UserListDiv>
			{ users.map((user, i) => <User history = { history } key = { i } user = { user } handleUserPosts = { handleUserPosts } handleDeleteUser = { handleDeleteUser } />) }
		</UserListDiv>
	);
};

export default UserList;
