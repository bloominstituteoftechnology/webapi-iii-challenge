const express = require('express');
const postDb = require('./helpers/postDb.js');
const router = express.Router();

// POST
router.post('/', async (req, res) => {
	if(!req.body.text || req.body.text === '' || !req.body.user_id) {
		res
			.status(400)
			.json({ message: "Please provide valid text and user id." });
	}
	try {
		const posts = await postDb.insert({ text: req.body.text, used_id: req.body.user_id });
		res.json(posts);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The post could not be added. "});
	}
});

// GET ALL
router.get('/', async (req, res) => {
	try {
		const posts = await postDb.get();
		res.json(posts);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The posts information could not be retrieved." });
	}
});


// GET by ID
router.get('/:id', async (req, res) => {
	try {
		const posts = await postDb.getById(req.params.id);
		if(posts) {
			res.json(posts);
		}
		else {
			res
				.status(404)
				.json({ message: "The post with that ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The post information could not be retrieved." });
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const posts = await postDb.remove(req.params.id);
		if(posts) {
			res.json(posts);
		}
		else {
			res
				.status(404)
				.json({ message: "The user with specified ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The user could not be removed" });
	}
});

// PUT
router.put('/:id', async (req, res) => {
	try {
		const updatePost = await postDb.update(req.params.id, req.body);
		if (req.params.id && req.body) {
			if(updatePost) {
				res
					.status(200)
					.json(updatePost);
			}
			else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		}
		else {
			res
				.status(400)
				.json({ message: "Please provide user id and contents for the post." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The post information could not be modified." });
	}
});

module.exports = router;