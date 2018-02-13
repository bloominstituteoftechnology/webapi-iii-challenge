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
		res.send({ error: `User by the name of (${name}) was not found!`});
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

server.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	let removedUser = null
	for (let i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			removedUser = users.splice(i, 1);
			break;
		}
	}
	if (!removedUser) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: "User not found by that id" });
	} else {
		res.send(removedUser);
	}
});

server.listen(PORT, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`Server listening on port ${PORT}`);
	}
});
