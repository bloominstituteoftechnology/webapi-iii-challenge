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
//    todo: return message when user with same name already exists
server.post('/api/users', cruiseControl, (req, res) => {
	if (!req.body.name) {
		console.log(`\n=== USER NAME NOT PROVIDED ===\n\n`);
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

// delete user by id
server.delete('/api/users/:id', (req, res) => {
	userDb
		.remove(req.params.id)
		.then(removedUser => {
			if (!removedUser) {
				console.log(`\n=== NO USER BY THAT ID ===\n\n`);
				return res
					.status(404)
					.json({ message: 'User with the specified ID does not exist.' });
			}
			console.log(
				`\n=== DELETED USER ===\n\n User with id ${
					req.params.id
				} removed from db('users')\n`
			);
			res.status(200).json({ message: 'User was successfully deleted.' });
		})
		.catch(err => {
			console.log('\n=== UH OH ===\n\n', err);
			res.status(500).json({ error: 'User could not be deleted' });
		});
});

// update user by id
server.put('/api/users/:id', cruiseControl, (req, res) => {
	if (!req.body.name) {
		console.log(`\n=== USER NAME NOT PROVIDED ===\n\n`);
		return res.status(400).json({
			errorMessage: 'Please provide name for the user.'
		});
	}
	userDb
		.update(req.params.id, req.body)
		.then(updatedUser => {
			if (!updatedUser) {
				console.log('\n=== NO USER BY THAT ID ===\n\n');
				return res
					.status(404)
					.json({ message: 'User with the specified ID does not exist.' });
			}
			console.log(
				`\n=== UPDATED USER ===\n\n User with id ${
					req.params.id
				} has been updated\n`
			);
			res.status(200).json({ message: 'User was successfully updated.' });
		})
		.catch(err => {
			console.log('\n=== UH OH ===\n\n', err);
			res.status(500).json({ error: 'User could not be modified.' });
		});
});

// listen to port
const port = 5000;
server.listen(port, () => {
	console.log(`\n=== LISTENING TO PORT ${port} ===\n`);
});
