import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import UsersList from './components/UsersList';
import TagsList from './components/TagsList';
import PostsList from './components/PostsList';
import { AddUser } from './components/AddUser';
import { AddTag } from './components/AddTag';
import { AddPost } from './components/AddPost';
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
