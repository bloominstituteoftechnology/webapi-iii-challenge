import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from 'reactstrap';
import axios from 'axios';

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
  	</header>
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
      </div>
    );
  }
}

export default App;
