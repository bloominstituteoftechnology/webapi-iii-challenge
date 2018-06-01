import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
	constructor() {
		super()
		this.state = {
			user: {};
			posts: [];
		}
	}

componentDidMount = () => {
	axios.get
