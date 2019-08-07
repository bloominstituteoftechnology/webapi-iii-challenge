const express = 'express';

const server = express();
server.use(logger);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(new Date().toUTCString());
	console.log(req.method);
	console.log(req.url);
}

module.exports = server;
