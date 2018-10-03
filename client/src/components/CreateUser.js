import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 30px 0;
	padding: 5%;
	border: solid black 1px;
	font-size: 2rem;
	background-color: lightgreen;
	> form > input {
		margin: 10px 0;
	}
	> button {
		margin: 10px 0;
	}
`;

const FormContainer = styled.div`
	max-width: 480px;
	width: 100%;
	margin: 30px auto;
`;

const RedSpan = styled.span`
	color: red;
`

class CreateUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			createName: '',
			error: '',
		};
	}

	handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  createUser = () => {
  	const newUser = {
  		name: this.state.createName,
  	}
  	axios
  		.post(`http://localhost:5555/api/users/`, newUser)
  		.then(response => {
  			this.setState({
		  		createName: '',
					error: '',
  			})
  			this.props.resetUsers()
  		})
  		.catch(error =>
  			this.setState({error: error.response.data.msg})
  		);
  }

	render(){
		return (
			<FormContainer>
				<FormDiv>
					<h2> Make new User</h2>
					<form>
						<input
							type="text"
							placeholder="User Name"
							onChange={this.handleChange}
							name="createName"
							value={this.state.createName}
						/>
					</form>
					<button onClick={this.createUser}>Submit new User</button>
					<p><RedSpan>{this.state.error}</RedSpan></p>
				</FormDiv>
			</FormContainer>
		)
	}
}
export default CreateUser
