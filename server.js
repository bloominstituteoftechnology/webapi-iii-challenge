const express = require('express');
const userRoutes = require('./users/userRouter')
const server = express();
const helmet = require('helmet');
//use express.json middleware to parse the request body of JSON string text and parse into javascript and put that into the req.body
server.use(express.json());
//Apply logger before any endpoints
server.use(logger);

//Custom routes to be utilized
server.use('/api/user', userRoutes)


server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`)
});

//utilize logger to globally log all requests made to server, of the request method, url and time stamp. The next function allows us to create a chain of causal middleware.
function logger(req, res, next) {
	console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}]`)
	next()
};

function errorHandler(err, req, res, next) {
	console.log(err)
}


module.exports = server;


