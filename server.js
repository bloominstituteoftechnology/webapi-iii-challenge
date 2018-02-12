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
	console.log('name ->', name);
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
