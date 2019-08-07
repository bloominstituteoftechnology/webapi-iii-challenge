const express = 'express';
const server = express();

const userRouter = require('./')

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	const method = req.method;
	const url = req.url;
	const timestamp = new Date().toUTCString();
	console.log(`You made a ${method} request to ${url} at ${timestamp}`);
}

module.exports = server;
