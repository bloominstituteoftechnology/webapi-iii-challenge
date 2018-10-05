import React from 'react';

import styled from 'styled-components';

const UserPostDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	background-color: #ddd;
	width: 80%;
	height: 100px;
	margin: 20px;
	padding: 10px;
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
		font-size: 1.2rem;
		text-align: center;
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

		.delete-btn {
			background-color: red;

			&:hover {
				color: red;
			}
		}
	}
`;

const UserPost = props => {
	const { post, history, handleDeletePost } = props;
	return(
		<UserPostDiv>
			<p>{ post.text }</p>

			<div className = 'buttons'>
				<button className = 'edit-btn' onClick = { () => history.push(`/editpost/${ post.id }`) }>Edit Post</button>
				<button className = 'delete-btn' onClick = { e => handleDeletePost(e, post.id) }>Delete Post</button>
			</div>
		</UserPostDiv>
	);
};

export default UserPost;
