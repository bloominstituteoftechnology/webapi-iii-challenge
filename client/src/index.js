import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import UsersList from './Components/UserList.js';
import TagsList from './Components/TagList.js';
import PostsList from './Components/PostList.js';
import { AddUser } from './Components/AddUser.js';
import { AddTag } from './Components/AddTag.js';
import { AddPost } from './Components/AddPost.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/" component={App} />
			<Route exact path="/" component={UsersList} />
			<Route exact path="/tags" component={TagsList} />
			<Route exact path="/posts" component={PostsList} />
			<Route exact path="/addUser" component={AddUser} />
			<Route exact path="/addTag" component={AddTag} />
			<Route exact path="/addPost" component={AddPost} />
		</div>
	</Router>,
	document.getElementById('root')
);