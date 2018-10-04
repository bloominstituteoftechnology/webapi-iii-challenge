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
`;

const UserPost = props => {
	const { text } = props.post;
	return(
		<UserPostDiv>
			<p>{ text }</p>
		</UserPostDiv>
	);
};

export default UserPost;
