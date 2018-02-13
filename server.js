const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;
const PORT = 3000;

const users = [
	{
		name: 'Hailie',
		id: 0
	},
	{
		name: 'Guelmis',
		id: 1
	}
];

// server.get('/search/:name', (req, res) => {
// 	res.send('Hello bro');
// });

server.get('/users', (req, res) => {
	res.json(users);
});

server.get('/users/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	let foundUser = null;
	users.forEach(user => {
		if (user.id == id) foundUser = user;
	});
	if (!foundUser) {
		res.status(STATUS_USER_ERROR);
		res.json({ error: "User not found by that id" });
	} else {
		res.send(foundUser);
	}
});

server.get('/search', (req, res) => {
	const name = req.query.name;
	if (!name) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: "Must provide a name" });
		return;
	}
	const names = users.filter(user => {
		return user.name === name;
	});
	if (!names.length) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: "User not found!" });
		return;
	}
	res.send({ users: names });
});

let userId = 2;

server.post('/users', (req, res) => {
	const { name } = req.body;
	const newUser = { name, id: userId };
	if (!name) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: "Must provide user information (name)" });
		return;
	}
	users.push(newUser);
	userId++;
	res.send({ users: users });
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port ${PORT}`);
	}
});
