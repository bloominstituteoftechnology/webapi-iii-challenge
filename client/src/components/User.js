import React from 'react';
import styled from 'styled-components';


const UserDiv = styled.div`
	padding: 2%;
	width: 25%;
	font-size: 2rem;
	border: solid black 1px;
	margin: 10px 1%;
	background-color: lightgrey;
	&:hover {
		background-color: grey
		color: white;
		cursor: pointer;
	}
`;


class User extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return (
			<UserDiv>
				{this.props.user.name}
			</UserDiv>
		)
	}
}
export default User
