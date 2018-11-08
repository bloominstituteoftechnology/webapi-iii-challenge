const express = require('express');
const upperCase = require('../../middleware/actions');
const userDB = require('../../../data/helpers/userDb');

const router = express.Router();

////////////USER SECTION////////////////
// get all users
router.get('/', (req, res) => {
	const { id } = req.params;
	userDB
		.get(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(500).json({ message: "can't revieve user data!!" }));
});
// test success ex. localhost:9000/api/user/1 ==> "id": 1, "name": "Frodo Baggings"

router.get('/:id', (req, res) => {
	const { id } = req.params;
	userDB
		.get(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(500).json({ message: "can't revieve user data!!" }));
});

// get all user posts
router.get(`/:id`, (req, res) => {
	const userId = req.query;
	userDB.getUserPosts(userId).then((user) => {
		user.length <= 0 ? res.status(404).json({ message: 'That user was not found' }) : res.status(200).json(user);
	});
});
// test success ex. localhost:9000/api/user/posts/?userId=1 ==> return of posts by Froto

// create a user and uppercase their name
router.post('/', upperCase, (req, res) => {
	userDB
		.insert(req.body)
		.then((userData) => {
			res.status(201).json(userData);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error creating post', err });
		});
});
//test success

// update user by id and uppercase name
router.put('/:id', upperCase, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	userDB
		.update(id, changes)
		.then((user) => {
			user
				? res.status(200).json({ message: 'User updated successfully' })
				: res.status(404).json({ message: 'That user was not found' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error updating user', err });
		});
});
// test successful

// delete user by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	userDB
		.remove(id)
		.then((user) => {
			user
				? res.status(200).json({ message: 'User successfully deleted' })
				: res.status(404).json({ message: 'user not found' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error, could not delete user', err });
		});
});
// test successful

module.exports = router;
