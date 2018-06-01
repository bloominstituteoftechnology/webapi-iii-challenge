import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Userlist from './Userlist.js';
import Userposts from './Userposts.js';

const App = () => (
	<div>
		<Route exact path='/' component={ Userlist }></Route>
		<Route path='/:id/posts' component={ Userposts }></Route>
	</div>
)

export default App;
