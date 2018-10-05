import React from 'react';

// Styles
import styled from 'styled-components';

const UserDiv = styled.div`
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
		background-color: #444;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

		p {
			color: white;
		}
	}

	p {
		text-align:center;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		flex-direction: row;

		button {
			&:hover {
				background-color: black;
				cursor: pointer;
			}
		}

		* {
			margin: 5px;
			padding: 5px 10px;
			border-radius: 5px;
			color: white;
		}

		.edit-btn {
			background-color: blue;

			&:hover {
				color: cyan;
			}
		}

		.posts-btn {
			background-color: green;

			&:hover {
				color: lime;
			}
		}

		.delete-btn {
			background-color: red;

			&:hover {
				color: red;
			}
		}
	}
`;

const User = props => {
	const { user, handleUserPosts, handleDeleteUser, history } = props;
	return(
		<UserDiv>
			<p>{ user.name }</p>

			<div className = 'buttons'>
				<button className = 'edit-btn' onClick = { () => history.push(`/edit/${ user.id }`) }>Edit User</button>
				<button className = 'posts-btn' onClick = { e => handleUserPosts(e, user.id) }>User Posts</button>
				<button className = 'delete-btn' onClick = { e => handleDeleteUser(e, user.id) }>Delete User</button>
			</div>
		</UserDiv>
	);
}

export default User;
