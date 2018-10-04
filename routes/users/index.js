const express = require('express');

const { userDb } = require('../../data/helpers');

// users middleware
const yell = require('../../config/middleware/users');

const router = express.Router();

// get all users
router.get('/', (req, res) => {
	userDb.get()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});


// get user with given user id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	userDb.get(id)
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).json(user);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

// get all posts from user with given user id
router.get('/:id/posts', (req, res) => {
	const { id } = req.params;
	userDb.getUserPosts(parseInt(id))
		.then(posts => {
			if (!posts.length) {
				return res.status(404).json({ error: `Either the user with the ID ${ id } does not exist or that user has not made any posts.` });
			}
			return res.status(200).json(posts);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

// create new user using yell middleware and return all users
router.post('/', yell, (req, res) => {
	const newUser = req.yelledUser;
	userDb.insert(newUser)
		.then(id => {
			return userDb.get()
				.then(users => res.status(200).json(users))
				.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database.' }));
});

// update user with given user id using yell middleware and return all users
router.put('/:id', yell, (req, res) => {
	const { id } = req.params;
	const updatedUser = req.yelledUser;
	userDb.update(parseInt(id), updatedUser)
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return userDb.get()
				.then(users => res.status(200).json(users))
				.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while updating the user information in the database.' }));
});

// delete user with given user id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	userDb.remove(parseInt(id))
		.then(del => {
			if (!del) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).json({ message: `The user with id ${ id } was successfully deleted.` });
		})
		.catch(err => res.status(500).json({ error: 'There was an error while deleting the user in the database.' }));
});

module.exports = router;
