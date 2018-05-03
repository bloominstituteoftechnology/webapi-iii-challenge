import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div className="App-nav">
						<Link to="/">User</Link>
						<Link to="/posts">Post</Link>
						<Link to="/tags">Tag</Link>
					</div>
					<p className="App-title">Node Blog</p>
				</header>
			</div>
		);
	}
}

export default App;