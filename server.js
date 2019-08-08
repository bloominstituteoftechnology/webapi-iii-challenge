const express = require('express');

const server = express();
server.use(express.json());
server.use(logger);
const router = require('./users/userRouter');
server.use('/api/users/', router);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(new Date().toUTCString());
	console.log(req.method);
	console.log(req.url);
	next();
}

module.exports = server;
