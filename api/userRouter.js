const express = require('express');
const dbUsers = require('../data/helpers/userDb.js');

const router = express.Router();

router.use(express.json());

//get all users

router.get('/', (req, res) => {
	dbUsers
		.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

//get individual user

router.get('/:id', (req, res) => {
	const id = req.params.id;
	console.log('id' + id);
	dbUsers
		.get(id)
		.then(user => {
			if (user) {
				res.status(200).json(user);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The user information could not be retrieved.' });
		});
});

//create user

router.post('/', (req, res) => {
	let user = req.body;

	if (user.name) {
		dbUsers
			.insert(user)
			.then(userId => {
				dbUsers.getById(userId).then(newuser => {
					user = newpost;
				});
			})
			.then(res.status(201).json(user))
			.catch(err => {
				res.status(500).json({
					error: 'There was an error while saving the user to the database'
				});
			});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide a name!!!!'
		});
	}
});

//update user,
router.put('/:id', (req, res) => {
	let updatedUser = req.body;
	let { id } = req.params;

	if (updatedUser.name) {
		//
		console.log('name' + id);
		console.log('updated user' + updatedUser.name);
		dbUsers.update(id, updatedUser).then(number => {
			console.log(number);
			if (!number) {
				res.status(404).json({
					error: 'The user with the specified ID does not exist'
				});
			} else {
				res.status(200).json({ success: 'user edited successfully' });
			}
		});
	}
});

//delete user

router.delete('/:id', (req, res) => {
	let { id } = req.params;

	dbUsers.get(id).then(user => {
		dbUsers
			.remove(id)
			.then(
				user
					? res.status(200).json({ removed: `${user.name}` })
					: res.status(404).json({
							message: 'The user with the specified ID does not exist.'
					  })
			)
			.catch(res.status(500).json({ error: 'The user could not be removed' }));
	});
});

module.exports = router;
