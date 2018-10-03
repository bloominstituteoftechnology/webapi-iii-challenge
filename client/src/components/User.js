import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from 'axios';

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

const ErrorP = styled.p`
	color: red;
	font-size: 1.2rem;
`

const EditInput = styled.input`
	width: 100px;
`

class User extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			editedUser: '',
			toggleEdit: false,
			error: '',
		};
	}

	deleteUser = () => {
		axios
			.delete(
				`http://localhost:5555/api/users/${this.props.user.id}`
			)
			.then(response => {
				console.log(response)
				this.props.resetUsers()
			})
			.catch(err => console.log(err));
	}

	editUser = (id) => {
		const editedUser = {
			name: this.state.editedUser,
		}
		axios
			.put(
				`http://localhost:5555/api/users/${id}`, editedUser
			)
			.then(response => {
				console.log(response)
				this.props.resetUsers()
				this.setState({
					editedUser: '',
					error: '',
				})
			})
			.catch(error => {
				this.setState({
					error: error.response.data.msg
				})
			})
	}


	handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  toggleEdit = () => {
		this.setState({
			toggleEdit: !this.state.toggleEdit,
		})
	}


	render(){
		return (
			<UserDiv>
				<Link to={`/users/${this.props.user.id}`}>
					{this.props.user.name}
				</Link>
				<br />
				{this.state.toggleEdit ? (
					<div>
						<form>
							<EditInput
								type="text"
								name="editedUser"
								value={this.state.editedUser}
								placeholder="Edit Name"
								onChange={this.handleChange}
							/>
						</form>
						<button onClick={() => {this.editUser(this.props.user.id)}}> Edit User </button>
						<button onClick={this.deleteUser}>Delete User</button>
					</div>
					) : null
				}
				<button onClick={this.toggleEdit}>Toggle Edit</button>
				<ErrorP>{this.state.error}</ErrorP>
			</UserDiv>
		)
	}
}
export default User
