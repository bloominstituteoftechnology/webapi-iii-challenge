import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div className="App-nav">
						<Link to="/">Users</Link>
						<Link to="/posts">Posts</Link>
						<Link to="/tags">Tags</Link>
					</div>
					<h1 className="App-title">Node Blog</h1>
				</header>
			</div>
		);
	}
}

export default App;
