const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const STATUS_USER_ERROR = 422;
const PORT = 3000;

const users = [];

server.use(bodyParser.json());

server.get('/users', (req, res) => {
	res.send(users);
});

server.post('/users', (req, res) => {
	const user = req.body.user;
	if (!user) {
		res.status(STATUS_USER_ERROR);
		res.json({ error: "Must provide user information" });
		return;
	}
	users.push(user);
	res.json({ users: users });
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port ${PORT}`);
	}
});
