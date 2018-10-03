// DEPENDENCIES
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// DATABASES
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

// SERVER
const server = express();

// MIDDLEWARE
const cruiseControl = (req, res, next) => {
	req.body.name = req.body.name.toUpperCase();
	next();
};

server.use(logger('tiny'), cors(), helmet(), express.json());

// console logging
// consoleLarge()

// ROUTING
// get users (for testing)
server.get('/api/users', (req, res) => {
	userDb
		.getUsers()
		.then(users => {
			console.log('\n=== RETURNED USERS: ===\n\n', users, '\n');
			res.status(200).json(users);
		})
		.catch(err => {
			console.log('\n=== UH OH ===\n', err);
			res
				.status(500)
				.json({ error: 'Users information could not be retrieved.' });
		});
});

// get user by id
server.get('/api/users/:id', (req, res) => {
	userDb
		.getUser(req.params.id)
		.then(user => {
			if (!user) {
				console.log('\n=== NO USER BY THAT ID ===\n');
				return res
					.status(404)
					.json({ message: 'User with specified ID does not exist.' });
			}
			console.log('\n=== RETURNED USER: ===\n\n', user[0], '\n');
			res.status(200).json(user);
		})
		.catch(err => {
			console.log('\n=== UH OH ===\n\n', err);
			res
				.status(500)
				.json({ error: 'User information could not be retrieved.' });
		});
});

// add new user
server.post('/api/users', cruiseControl, (req, res) => {
	console.log(req);
	if (!req.body.name) {
		return res.status(400).json({
			errorMessage: 'Please provide name for the user.'
		});
	}
	userDb
		.insert(req.body)
		.then(({ id }) => {
			userDb.getUser(id).then(user => {
				console.log('\n=== ADDED USER: ===\n\n', user, '\n');
				res.status(201).json(user);
			});
		})
		.catch(err => {
			console.log('\n=== UH OH ===\n\n', err);
			res.status(500).json({
				error: 'There was an error while saving the user to the database'
			});
		});
});

// listen to port
const port = 5000;
server.listen(port, () => {
	console.log(`\n=== LISTENING TO PORT ${port} ===\n`);
});
