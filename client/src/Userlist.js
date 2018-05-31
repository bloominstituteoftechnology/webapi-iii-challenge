import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

class Userlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}
componentDidMount() {
	this.gatherUsers();
}

gatherUsers = () => {
	axios.get('http://localhost:5555/api/users')
		.then(response => {
			console.log(response)
			this.setState({ users: response.data.users });
		})
		.catch(error => console.log(error));
}

  render() {
    return (
	<div>
		{this.state.users.map(user => {
			return (
				<Table striped>
					<tbody>
						<tr>
							<td>{user.name}</td>
						</tr>
					</tbody>
				</Table>
			);
		})}
	</div>
    );
  }
}

export default Userlist;
