const express = require('express');

const User = require('../../../data/helpers/userDb');

const router = express.Router();

router
	.get('/', async (req, res) => {
		try {
			const users = await User.get(req.body);
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({
				message: 'Error getting users',
			});
		}
	})

	.get('/:id', async (req, res) => {
		try {
			const user = await User.getById(req.params.id);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({
				message: 'Error getting user',
			});
		}
	})

	.get('/:id/posts', async (req, res) => {
		try {
			const posts = await User.getUserPosts(req.params.id);
			res.status(200).json(posts);
		} catch (error) {
			res.status(500).json({
				message: 'Error getting posts',
			});
		}
	})

	.post('/', async (req, res) => {
		try {
			const newUser = await User.insert(req.body);
			console.log(newUser);
			res.status(200).json(newUser);
		} catch (error) {
			res.status(500).json({
				message: 'Error creating user',
			});
		}
	})

	.put('/:id', async (req, res) => {
		try {
			const updatedUser = await User.update(req.params.id, req.body);
			res.status(200).json(updatedUser);
		} catch (error) {
			res.status(500).json({
				message: 'Error updating user',
			});
		}
	})

	.delete('/:id', async (req, res) => {
		try {
			const deletedUser = await User.remove(req.params.id);
			res.status(200).json(deletedUser);
		} catch (error) {
			res.status(500).json({
				message: 'Error deleting user',
			});
		}
	});

module.exports = router;
