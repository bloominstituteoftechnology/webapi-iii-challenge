const express = require('express');

const Post = require('../../../data/helpers/postDb');

const router = express.Router();

router
	.get('/', async (req, res) => {
		try {
			const posts = await Post.get(req.body);
			res.status(200).json(posts);
		} catch (error) {
			res.status(500).json({
				message: 'Error getting Posts',
			});
		}
	})

	.get('/:id', async (req, res) => {
		try {
			const post = await Post.getById(req.params.id);
			res.status(200).json(post);
		} catch (error) {
			res.status(500).json({
				message: 'Error getting Post',
			});
		}
	})

	.post('/', async (req, res) => {
		try {
			const newPost = await Post.insert(req.body);
			console.log(newPost);
			res.status(200).json(newPost);
		} catch (error) {
			res.status(500).json({
				message: 'Error creating Post',
			});
		}
	})

	.put('/:id', async (req, res) => {
		try {
			const updatedPost = await Post.update(req.params.id, req.body);
			res.status(200).json(updatedPost);
		} catch (error) {
			res.status(500).json({
				message: 'Error updating Post',
			});
		}
	})

	.delete('/:id', async (req, res) => {
		try {
			const deletedPost = await Post.remove(req.params.id);
			res.status(200).json(deletedPost);
		} catch (error) {
			res.status(500).json({
				message: 'Error deleting Post',
			});
		}
	});

module.exports = router;
