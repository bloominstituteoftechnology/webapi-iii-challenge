const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { postDb, tagDb, userDb } = require('./data/helpers');

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('tiny'));

const yell = (req, res, next) => {
	req.newUser = { ...req.body};
	req.newUser.name = req.newUser.name.toUpperCase();
	next();
};

server.get('/api/users', (req, res) => {
	userDb.get()
		.then(users => res.status(200).send(users))
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	userDb.get(id)
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).send(user);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

// server.get('/api/users/:id/posts', (req, res) => {
// 	const { id } = req.params.id;
// 	userDb.getUserPosts(parseInt(id))
// 		.then(posts => res.status(200).json(posts))
// 		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
// });

server.post('/api/users', yell, (req, res) => {
	const newUser = req.newUser;
	userDb.insert(newUser)
		.then(id => {
			const newId = id.id;
			userDb.get(newId)
				.then(user => {
					if (!user) {
						return res.status(404).json({ message: `The newly created user with the ID ${ newId } could not be retrieved.` });
					}
					return res.status(201).send(user);
				})
				.catch(err => res.status(500).json({ error: 'The newly created user\'s information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database' }));
});

server.listen(port, () => {
	console.log(`\n=== Listening on port ${ port } ===`)
});
