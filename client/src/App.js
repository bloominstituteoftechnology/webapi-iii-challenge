import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Userlist from './Userlist.js';

const App = () => (
	<div><Route exact path='/' component={ Userlist }></Route></div>
)

export default App;
