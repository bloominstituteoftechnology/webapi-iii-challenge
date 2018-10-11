// build server - node dependencies
const express = require('express');
const server = express();
const cors = require('cors');
const port = 8080;

const helmet = require('helmet');

// database
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// middle ware
server.use(cors());
server.use(express.json());

// custom middleware
const upperCase = (req, res, next) => {
	req.body.name = req.body.name.toUpperCase();
	next();
};

// route handlers
server.get('/', (req, res) => {
	res.send('Hope this works!');
});

server.get('/users', (req, res) => {
	userDb
		.get()
		.then((users) => res.status(200).send(users))
		.catch((err) => res.status(500).json({ error: 'User not found' }));
});

server.get('/api/users/:userId', (req, res) => {
	const userId = req.params.userId;
	userDb
		.get(userId)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'User with this ID does not exist.' });
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Could not retrieve user info.', err });
		});
});

server.post('/api/users', upperCase, (req, res) => {
	const { name } = req.body;
	const newUser = { name };
	userDb
		.insert(newUser)
		.then((userId) => {
			const { id } = userId;
			userDb.get(id).then((user) => {
				if (!user) {
					res
						.status(400)
						.json({ errorMessage: 'Please provide name for the user.' });
				}
				res.status(201).json(user);
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: 'Error while saving the user to the database',
				err,
			});
		});
});

server.delete('/api/users/:userId', (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		res.status(404).json({ message: 'User with specified ID not found.' });
	}
	userDb
		.remove(userId)
		.then((removedUser) => {
			res.status(200).json(removedUser);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The user could not be removed', err });
		});
});

server.put('/api/users/:userId', upperCase, (req, res) => {
	const userId = req.params.userId;
	const { name } = req.body;
	const newUser = { name };
	if (!userId) {
		res.status(404).json({ message: 'User with specified ID not found.' });
	} else if (!name) {
		res.status(400).json({ errorMessage: 'Provide name for the user.' });
	}
	userDb
		.update(userId, newUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ error: 'User information could not be modified.', err });
		});
});

// start the server
server.listen(port, () => {
	console.log(`\n=== Server listening on ${port} ===`);
});
