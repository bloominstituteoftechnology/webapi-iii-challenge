const cors = require('cors');
const express = require('express');
const userRouter = require('../RESTful API/Users/userRouter');
const postRouter = require('../RESTful API/Posts/postRouter');

module.exports = (server) => {
	server.use(cors());
	server.use(express.json());

	server.use('/api/user', userRouter);
	server.use('/api/post', postRouter);
};
