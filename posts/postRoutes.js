const express = require('express');
const postDB = require('../data/helpers/postDb.js');
const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const posts = await postDB.get();
			res.status(200).json(posts);
		}
		catch(err) {
			res.status(500).json({ message: 'Error getting the data' });
		}
	})
	.post(async (req, res) => {
		const { userId, text } = req.body;
		try {
			const count = await postDB.insert({userId, text});
			res.status(201).json({ message: 'Post successfully added' });
		}
		catch(err) {
			res.status(500).json({ message: 'Something went wrong in our server' })
		}
	})

router
	.route('/:id')
	.get(async (req, res, next) => {
		const { id } = req.params;
		try {
			const post = await postDB.get(id);
			post
			? res.status(200).json(post)
			: res.status(404).json({ message: 'Specified post could not be found' })
		}
		catch(err) {
			// res.status(500).json({ message: 'Error getting the data' });
			next(err);
		}
	})
	.put(async (req, res) => {
		const { id } = req.params
		const { userId, text } = req.body;
		try {
			const count = await postDB.update(id, {userId, text});
			count > 0
			? res.status(200).json({ message: 'Post successfully updated' })
			: res.status(404).json({ message: 'Specified post could not be found' })
		}
		catch(err) {
			res.status(500).json({ message: 'Something went wrong in our server' })
		}
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		try {
			const count = await postDB.remove(id);
			count > 0
			? res.status(200).json({ message: 'Post successfully deleted' })
			: res.status(404).json({ message: 'Specified post could not be found' })
		}
		catch(err) {
			res.status(500).json({ message: 'Something went wrong in our server' })
		}
	})

module.exports = router;