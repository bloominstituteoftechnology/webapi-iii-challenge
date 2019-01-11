import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import UserPosts from './components/UserPosts';
import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path="/" component={Home} />
				<Route exact path="/users" component={Users} />
				<Route exact path="/user/:id" component={User} />
				<Route exact path="/user/:id/posts" component={UserPosts} />
				<Route exact path="/user/:id/posts/new" component={NewPost} />
				<Route exact path="/posts" component={Posts} />
				<Route exact path="/post/:id" component={Post} />
			</div>
		);
	}
}

export default App;
