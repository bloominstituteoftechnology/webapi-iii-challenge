import React from 'react'
import User from './User';
import axios from 'axios';
import styled from 'styled-components';
import CreateUser from './CreateUser';

const ContainerUser = styled.div`
	max-width: 480px;
	width: 100%;
	margin: 30px auto;
	border: solid black 1px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`
const TitleUser = styled.h2`
	font-size: 3rem;
	text-align: center;
	margin-top: 30px;
`

class UserList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5555/api/users")
			.then(response => {
				this.setState({users: response.data})
			})
			.catch(err => {
				console.log(err)
			})
	}

	resetUsers = () => {
  	axios
      .get("http://localhost:5555/api/users")
      .then(response => {
        this.setState({users: response.data });
      })
      .catch(err => {
        console.log(err)
      })
  }


	render(){
		return (
			<div>
				<TitleUser>User List</TitleUser>
				<ContainerUser>
					{this.state.users.map(user => (
						<User user={user} key={user.id}/>
					))}
				</ContainerUser>
				<CreateUser resetUsers={this.resetUsers}/>
			</div>
		)
	}
}
export default UserList
